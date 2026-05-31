// Browser-side OpenAI Realtime voice over WebRTC (GA API). Uses a short-lived
// client secret from /api/realtime/session, so the OpenAI key never reaches the
// client. Model is bound to the token server-side; the browser only exchanges SDP.

export type VoiceSession = { stop: () => void };

export async function startVoice(onStatus?: (s: string) => void): Promise<VoiceSession> {
  onStatus?.("connecting");
  const res = await fetch("/api/realtime/session", { method: "POST" });
  if (!res.ok) throw new Error("voice unavailable");
  const { clientSecret } = await res.json();
  if (!clientSecret) throw new Error("no session token");

  const pc = new RTCPeerConnection();

  const audioEl = document.createElement("audio");
  audioEl.autoplay = true;
  pc.ontrack = (e) => {
    audioEl.srcObject = e.streams[0];
  };

  const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
  mic.getTracks().forEach((t) => pc.addTrack(t, mic));
  pc.createDataChannel("oai-events");

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  // GA SDP-exchange endpoint (model is bound to the ephemeral token)
  const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
    method: "POST",
    body: offer.sdp,
    headers: { Authorization: `Bearer ${clientSecret}`, "Content-Type": "application/sdp" },
  });
  if (!sdpRes.ok) throw new Error("realtime handshake failed");

  await pc.setRemoteDescription({ type: "answer", sdp: await sdpRes.text() });
  onStatus?.("live");

  return {
    stop() {
      pc.getSenders().forEach((s) => s.track?.stop());
      mic.getTracks().forEach((t) => t.stop());
      pc.close();
      audioEl.srcObject = null;
      audioEl.remove();
      onStatus?.("ended");
    },
  };
}

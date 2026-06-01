import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { AgentsTeaser } from "@/components/AgentsTeaser";
import { Background } from "@/components/Background";
import { HowIWork } from "@/components/HowIWork";
import { LatestWriting } from "@/components/LatestWriting";
import { FreeValue } from "@/components/FreeValue";
import { WhoIHelp } from "@/components/WhoIHelp";
import { Availability } from "@/components/Availability";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Proof />
        <AgentsTeaser />
        <Background />
        <HowIWork />
        <LatestWriting />
        <FreeValue />
        <WhoIHelp />
        <Availability />
      </main>
      <Footer />
    </>
  );
}

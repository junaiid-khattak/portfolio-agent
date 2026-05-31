import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HonestMath } from "@/components/HonestMath";
import { OldVsNew } from "@/components/OldVsNew";
import { Origin } from "@/components/Origin";
import { HowIWork } from "@/components/HowIWork";
import { Proof } from "@/components/Proof";
import { FreeValue } from "@/components/FreeValue";
import { WhoIHelp } from "@/components/WhoIHelp";
import { Availability } from "@/components/Availability";
import { Footer } from "@/components/Footer";
import { DigitalTwin } from "@/components/DigitalTwin";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <HonestMath />
        <OldVsNew />
        <Origin />
        <HowIWork />
        <Proof />
        <FreeValue />
        <WhoIHelp />
        <Availability />
      </main>
      <Footer />
      <DigitalTwin />
    </>
  );
}

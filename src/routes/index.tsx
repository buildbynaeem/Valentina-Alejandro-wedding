import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Gallery } from "@/components/gallery";
import { Details } from "@/components/details";
import { Rsvp } from "@/components/rsvp";
import { Footer } from "@/components/footer";
import { EnvelopeIntro } from "@/components/envelope-intro";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [introPlayed, setIntroPlayed] = useState(false);

  return (
    <>
      {/* Envelope intro — disappears once video ends */}
      {!introPlayed && <EnvelopeIntro onDone={() => setIntroPlayed(true)} />}

      {/* Main site — always in the DOM but hidden behind the overlay */}
      <main className="bg-cream text-ink">
        <Nav />
        <Hero />
        <Story />
        <Gallery />
        <Details />
        <Rsvp />
        <Footer />
      </main>
    </>
  );
}

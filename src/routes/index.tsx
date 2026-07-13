import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Gallery } from "@/components/gallery";
import { Details } from "@/components/details";
import { Rsvp } from "@/components/rsvp";
import { Closing } from "@/components/closing";
import { Footer } from "@/components/footer";
import { EnvelopeIntro } from "@/components/envelope-intro";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [introPlayed, setIntroPlayed] = useState(false);

  if (!introPlayed) {
    return <EnvelopeIntro onDone={() => setIntroPlayed(true)} />;
  }

  return (
    <main className="bg-cream text-ink">
      <Nav />
      <Hero />
      <Story />
      <Gallery />
      <Details />
      <Rsvp />
      <Closing />
      <Footer />
    </main>
  );
}

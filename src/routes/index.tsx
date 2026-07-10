import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Gallery } from "@/components/gallery";
import { Details } from "@/components/details";
import { Rsvp } from "@/components/rsvp";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="bg-cream text-ink">
      <Nav />
      <Hero />
      <Story />
      <Gallery />
      <Details />
      <Rsvp />
      <Footer />
    </main>
  );
}

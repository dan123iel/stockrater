import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "@/components/pondex/Nav";
import { FinalCTA } from "@/components/pondex/FinalCTA";
import { Footer } from "@/components/pondex/Footer";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      {/* Page content renders here */}
      <Outlet />
      {/* FinalCTA + Footer always at the bottom */}
      <div
        style={{
          backgroundImage: "url('/stockrater/hero-landscape.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}

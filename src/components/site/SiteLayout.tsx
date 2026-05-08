import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

export function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

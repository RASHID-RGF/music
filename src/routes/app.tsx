import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { PlayerBar } from "@/components/player-bar";
import { PlayerProvider } from "@/lib/player-context";
import { Toaster } from "@/components/ui/sonner";
import { ScrollHoverReveal } from "@/components/scroll-hover";
import { RequireAuth } from "@/lib/require-auth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <RequireAuth>
      <AppLayoutInner />
    </RequireAuth>
  );
}

function AppLayoutInner() {
  return (
    <PlayerProvider>
      <Navigate to="/app" replace />
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="flex min-h-0 flex-1 gap-0">
          <AppSidebar />
          <main className="scroll-hover-anim scrollbar-thin glass mx-3 mb-[92px] mt-3 flex-1 overflow-y-auto rounded-2xl px-6 py-4 md:mx-0 md:mr-3">
            <ScrollHoverReveal />
            <Outlet />
          </main>
        </div>
        <PlayerBar />
        <Toaster />
      </div>
    </PlayerProvider>
  );
}

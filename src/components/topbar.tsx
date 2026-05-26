import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { signOutUser, subscribeToAuthStateChanges } from "@/integrations/firebase/client";

const profileImageUrl = new URL("../../assets/music.jpeg", import.meta.url).href;

export function TopBar({ title }: { title?: string }) {
  const nav = useNavigate();
  const [user, setUser] = useState<null | { displayName: string | null; email: string | null; photoURL: string | null }>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthStateChanges((firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
            }
          : null,
      );
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      nav({ to: "/auth" });
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <div className="sticky top-0 z-30 -mx-6 mb-4 flex items-center justify-between gap-3 bg-gradient-to-b from-background/80 to-background/0 px-6 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <button
          className="grid size-8 place-items-center rounded-full bg-black/40 text-muted-foreground hover:text-white"
          aria-label="Back"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          className="grid size-8 place-items-center rounded-full bg-black/40 text-muted-foreground hover:text-white"
          aria-label="Forward"
        >
          <ChevronRight className="size-4" />
        </button>
        {title && <h1 className="ml-2 text-base font-semibold">{title}</h1>}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {user ? (
          <>
            <button
              onClick={handleSignOut}
              className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black shadow hover:scale-[1.02]"
              aria-label="Sign out"
            >
              Sign out
            </button>
            <button
              className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Profile"
              title={user.displayName ?? user.email ?? "Profile"}
            >
              <Avatar className="h-7 w-7">
                <AvatarImage
                  className="h-7 w-7 rounded-full object-cover"
                  src={user.photoURL ?? profileImageUrl}
                  alt="Profile"
                />
                <AvatarFallback className="rounded-full">
                  {user.displayName?.slice(0, 2) ?? user.email?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black shadow hover:scale-[1.02]"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}

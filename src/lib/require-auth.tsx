import { Navigate } from "@tanstack/react-router";
import { subscribeToAuthStateChanges, getCurrentUser } from "@/integrations/firebase/client";
import { useEffect, useState } from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [loading, setLoading] = useState(user === null);

  useEffect(() => {
    const unsub = subscribeToAuthStateChanges((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-slate-300">Checking authentication…</div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}

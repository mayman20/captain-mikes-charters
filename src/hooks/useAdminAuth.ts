import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAdminAuth() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const timeoutId = window.setTimeout(() => {
      if (!mounted) return;
      setError("Supabase auth is taking too long to respond. Try reloading in a moment.");
      setLoading(false);
    }, 8000);

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!mounted) return;
        window.clearTimeout(timeoutId);
        if (error) {
          setError(error.message);
          setSession(null);
          setLoading(false);
          return;
        }
        setSession(data.session);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        window.clearTimeout(timeoutId);
        setError(err instanceof Error ? err.message : "Unable to reach Supabase auth.");
        setSession(null);
        setLoading(false);
      });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      window.clearTimeout(timeoutId);
      setSession(newSession);
      setError(null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      window.clearTimeout(timeoutId);
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { loading, session, error };
}

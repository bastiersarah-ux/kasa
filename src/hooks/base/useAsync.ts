import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type UseAsyncOptions = {
  enabled?: boolean;
};

/**
 * Exécute une promesse dès que les dépendances changent.
 * Gère loading / erreur et peut être désactivé via `enabled`.
 */
export function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[] = [],
  options: UseAsyncOptions = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const enabled = options.enabled ?? true;

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    fn()
      .then((result) => {
        if (!controller.signal.aborted) {
          setData(result);
          setStatus("success");
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setError(err.message ?? "Erreur inconnue");
          setStatus("error");
        }
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return { data, status, error, loading: status === "loading" };
}

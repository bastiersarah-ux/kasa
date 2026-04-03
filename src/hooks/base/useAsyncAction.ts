import { useCallback, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Wrappe une action asynchrone déclenchée à la demande (ex : formulaire).
 * Renvoie la fonction `run` à appeler, plus loading/erreur/données.
 */
export function useAsyncAction<Args extends unknown[], Result>(
  action: (...args: Args) => Promise<Result>,
) {
  const [data, setData] = useState<Result | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (...args: Args) => {
      setStatus("loading");
      setError(null);
      try {
        const result = await action(...args);
        setData(result);
        setStatus("success");
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Une erreur est survenue";
        setError(message);
        setStatus("error");
        throw err;
      }
    },
    [action],
  );

  return { run, data, status, error, loading: status === "loading" };
}

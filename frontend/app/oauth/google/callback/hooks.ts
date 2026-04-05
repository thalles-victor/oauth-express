"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type State =
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; errorMessage: string };

export function useGoogleCallback(): State {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");
  const stateParam = searchParams.get("state");

  const [state, setState] = useState<State>(() =>
    code && stateParam
      ? { status: "loading" }
      : { status: "error", errorMessage: "Invalid callback parameters." },
  );

  useEffect(() => {
    if (!code || !stateParam) return;

    fetch("http://localhost:3000/oauth/google/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ code, state: stateParam }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Falha na autenticacao com Google.");
        }
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setState({ status: "success" });
        setTimeout(() => router.replace("/"), 1500);
      })
      .catch((err: Error) => {
        setState({ status: "error", errorMessage: err.message });
      });
  }, [code, stateParam, router]);

  return state;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success" }
  | { status: "error"; errorMessage: string };

interface UseSignInReturn {
  state: AuthState;
  submit: (email: string, password: string) => void;
}

interface UseSignUpReturn {
  state: AuthState;
  submit: (name: string, email: string, password: string) => void;
}

export function useSignIn(): UseSignInReturn {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({ status: "idle" });

  function submit(email: string, password: string) {
    setState({ status: "loading" });

    fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Falha ao entrar.");
        }
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setState({ status: "success" });
        setTimeout(() => router.replace("/"), 1000);
      })
      .catch((err: Error) => {
        setState({ status: "error", errorMessage: err.message });
      });
  }

  return { state, submit };
}

export function useSignUp(): UseSignUpReturn {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({ status: "idle" });

  function submit(name: string, email: string, password: string) {
    setState({ status: "loading" });

    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Falha ao criar conta.");
        }
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setState({ status: "success" });
        setTimeout(() => router.replace("/"), 1000);
      })
      .catch((err: Error) => {
        setState({ status: "error", errorMessage: err.message });
      });
  }

  return { state, submit };
}

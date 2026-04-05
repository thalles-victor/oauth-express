"use client";

import { useRouter } from "next/navigation";
import { useGoogleCallback } from "./hooks";
import { Spinner } from "@/app/components/spinner";

export default function GoogleCallbackHandler() {
  const router = useRouter();
  const state = useGoogleCallback();

  if (state.status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <Spinner />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Autenticando com Google...
        </p>
      </div>
    );
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <svg
            className="h-6 w-6 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-50">
            Autenticado com sucesso!
          </p>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Redirecionando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
        <svg
          className="h-6 w-6 text-red-600 dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div>
        <p className="font-medium text-zinc-900 dark:text-zinc-50">
          Falha na autenticacao
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {state.errorMessage}
        </p>
      </div>
      <button
        onClick={() => router.replace("/")}
        className="mt-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Voltar para o inicio
      </button>
    </div>
  );
}

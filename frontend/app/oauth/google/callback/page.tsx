import { Suspense } from "react";
import GoogleCallbackHandler from "./handler";

export default function GoogleCallbackPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <Suspense fallback={<CallbackLoading />}>
        <GoogleCallbackHandler />
      </Suspense>
    </div>
  );
}

function CallbackLoading() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Spinner />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Autenticando com Google...
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-8 w-8 animate-spin text-zinc-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

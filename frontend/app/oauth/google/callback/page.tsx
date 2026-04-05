import { Suspense } from "react";
import GoogleCallbackHandler from "./handler";
import { Spinner } from "@/app/components/spinner";

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


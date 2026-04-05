"use client";

import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {tab === "signin" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {tab === "signin"
              ? "Entre com sua conta para continuar"
              : "Preencha os dados abaixo para começar"}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Tabs */}
          <div className="mb-6 flex rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
              onClick={() => setTab("signin")}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
                tab === "signin"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
                tab === "signup"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              Criar conta
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            {tab === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="voce@email.com"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
              />
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {tab === "signin" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-400 dark:text-zinc-500">ou</span>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-zinc-200 bg-white py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
              <path
                d="M47.532 24.552c0-1.636-.132-3.202-.396-4.698H24.48v9.01h12.955c-.576 2.964-2.268 5.478-4.8 7.158v5.898h7.74c4.536-4.176 7.157-10.326 7.157-17.368z"
                fill="#4285F4"
              />
              <path
                d="M24.48 48c6.48 0 11.916-2.142 15.888-5.814l-7.74-5.898c-2.148 1.44-4.896 2.292-8.148 2.292-6.264 0-11.568-4.23-13.464-9.918H2.976v6.084C6.936 42.696 15.12 48 24.48 48z"
                fill="#34A853"
              />
              <path
                d="M11.016 28.662A14.322 14.322 0 0 1 10.26 24c0-1.62.282-3.192.756-4.662v-6.084H2.976A23.94 23.94 0 0 0 .48 24c0 3.864.924 7.524 2.496 10.746l8.04-6.084z"
                fill="#FBBC05"
              />
              <path
                d="M24.48 9.426c3.528 0 6.696 1.212 9.186 3.594l6.852-6.852C36.39 2.394 30.954 0 24.48 0 15.12 0 6.936 5.304 2.976 13.254l8.04 6.084c1.896-5.688 7.2-9.912 13.464-9.912z"
                fill="#EA4335"
              />
            </svg>
            Continuar com Google
          </button>
        </div>
      </div>
    </div>
  );
}

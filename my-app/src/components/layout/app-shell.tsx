"use client";

import Cookies from "js-cookie";
import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    Cookies.remove("token");
    router.replace("/login");
    router.refresh();
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-slate-950 text-slate-300">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20">
            <ShieldCheck size={22} strokeWidth={2.4} />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-wide text-white">
              My Admin
            </span>
            <span className="block text-xs text-slate-400">Control center</span>
          </span>
        </Link>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6" aria-label="Main navigation">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          Menu
        </p>
        {navigation.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/30"
                  : "hover:bg-white/[0.07] hover:text-white"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={19} />
              <span className="flex-1">{item.name}</span>
              <ChevronRight
                size={16}
                className={active ? "opacity-70" : "opacity-0 transition-opacity group-hover:opacity-60"}
              />
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl bg-white/[0.05] p-4">
          <p className="text-xs font-medium text-slate-400">Signed in as</p>
          <p className="mt-1 truncate text-sm font-semibold text-white">admin@example.com</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-svh bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        {sidebar}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
          <aside className="relative h-full w-72 max-w-[85vw] shadow-2xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div>
              <p className="text-xs font-medium text-slate-400">Welcome back</p>
              <h1 className="font-semibold text-slate-900">Admin workspace</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 sm:px-4"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <div className="h-8 w-px bg-slate-200" />

            <button
              type="button"
              className="grid size-11 place-items-center rounded-full bg-linear-to-br from-emerald-400 to-teal-600 text-sm font-bold text-white ring-4 ring-emerald-50"
              aria-label="Open profile"
              title="Admin profile"
            >
              AD
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

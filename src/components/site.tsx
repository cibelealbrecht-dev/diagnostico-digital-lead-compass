import { Link } from "@tanstack/react-router";
import { BarChart3, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { APP_NAME, SLOGAN, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className={cn("grid h-9 w-9 place-items-center rounded-lg", light ? "bg-primary-foreground/10 text-gold" : "bg-primary text-gold")}>
        <BarChart3 className="h-5 w-5" />
      </span>
      <span className={cn("font-display text-lg font-semibold tracking-tight", light ? "text-primary-foreground" : "text-primary")}>{APP_NAME}</span>
    </Link>
  );
}

export function WhatsAppButton({ message, children, className }: { message: string; children: ReactNode; className?: string | undefined }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground transition hover:brightness-110", className)}
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <Link to="/diagnostico" className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex">
          Fazer diagnóstico
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo light />
        <p className="text-sm text-primary-foreground/70">{SLOGAN}</p>
      </div>
      <div className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {APP_NAME}
      </div>
    </footer>
  );
}

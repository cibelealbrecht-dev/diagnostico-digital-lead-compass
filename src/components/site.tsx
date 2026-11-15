import { Link } from "@tanstack/react-router";
import { BarChart3, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import type { ReactNode } from "react";
import { APP_NAME, SLOGAN, WHATSAPP_NUMBER, whatsappLink } from "@/lib/constants";
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

/**
 * Abre o link em uma nova aba. Em uma página aberta diretamente, o próprio
 * navegador cuida do target="_blank"; dentro de um quadro (iframe) o clique
 * precisa ser aberto explicitamente para nunca carregar na visualização do app.
 */
export function openWhatsApp(href: string) {
  const popup = window.open(href, "_blank");
  if (popup) {
    try {
      popup.opener = null;
    } catch {
      /* nada a fazer */
    }
    return true;
  }
  return false;
}

export function WhatsAppAnchor({ href, className, children }: { href: string; className?: string | undefined; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (window.top === window.self) return; // página aberta diretamente: o navegador abre uma nova aba
        e.preventDefault();
        if (openWhatsApp(href)) return;
        try {
          if (window.top) window.top.location.href = href;
          else throw new Error("sem quadro superior");
        } catch {
          toast.error("Não foi possível abrir o WhatsApp automaticamente. Clique com o botão direito no botão e escolha “Abrir link em uma nova aba”.");
        }
      }}
      className={className}
    >
      {children}
    </a>
  );
}

export function WhatsAppButton({ message, children, className, number = WHATSAPP_NUMBER }: { message: string; children: ReactNode; className?: string | undefined; number?: string }) {
  return (
    <WhatsAppAnchor
      href={whatsappLink(message, number)}
      className={cn("inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground transition hover:brightness-110", className)}
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </WhatsAppAnchor>
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

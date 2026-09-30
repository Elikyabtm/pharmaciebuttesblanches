"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { CtaArrow } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { isConfigured, pharmacy, telHref, TODO } from "@/config/pharmacy";

/**
 * Assistant de NAVIGATION (pas de conseil médical).
 * Chaque réponse rapide affiche une courte réponse et un lien vers la bonne page.
 */
type QuickReply = {
  label: string;
  answer: string;
  cta: { label: string; href: string | typeof TODO };
};

const doctolibReady = isConfigured(pharmacy.links.doctolib);

const quickReplies: QuickReply[] = [
  {
    label: "Nos produits",
    answer: "Découvrez nos six univers : herboristerie, parapharmacie, hygiène, compléments, matériel médical et bébé.",
    cta: { label: "Voir nos produits", href: "/produits" },
  },
  {
    label: "Livraison",
    answer: "Nous pouvons vous livrer à domicile. Remplissez une demande en ligne, nous vous recontactons.",
    cta: { label: "Demander une livraison", href: "/livraison" },
  },
  {
    label: "Pilulier",
    answer: "Notre service pilulier s'adresse aux particuliers, aux infirmier·ère·s et aux EHPAD.",
    cta: { label: "Découvrir le service", href: "/pilulier" },
  },
  {
    label: "Empressa",
    answer: "Empressa est notre service dédié aux demandes d'envoi vers Madagascar.",
    cta: { label: "En savoir plus", href: "/empressa-madagascar" },
  },
  {
    label: "Prendre rendez-vous",
    answer: doctolibReady
      ? "Vous pouvez prendre rendez-vous en ligne directement sur Doctolib."
      : `La prise de rendez-vous en ligne arrive bientôt. En attendant, appelez-nous au ${pharmacy.phone.display}.`,
    cta: doctolibReady
      ? { label: "Ouvrir Doctolib", href: pharmacy.links.doctolib }
      : { label: "Appeler la pharmacie", href: telHref },
  },
  {
    label: "Contacter la pharmacie",
    answer: "Téléphone, SMS, WhatsApp ou formulaire : choisissez le moyen qui vous convient.",
    cta: { label: "Nous contacter", href: "/contact" },
  },
];

type Message = { from: "bot" | "user"; text: string; cta?: QuickReply["cta"] };

const greeting: Message = { from: "bot", text: "Bonjour 👋\nComment pouvons-nous vous aider ?" };

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, reduce]);

  const ask = (reply: QuickReply) => {
    setMessages((m) => [...m, { from: "user", text: reply.label }, { from: "bot", text: reply.answer, cta: reply.cta }]);
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="chat-panel"
            role="dialog"
            aria-label="Assistant de la pharmacie"
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="flex max-h-[min(36rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-card-lg border border-line bg-white shadow-lift outline-none sm:w-[23rem]"
          >
            <div className="flex items-center justify-between gap-3 bg-forest px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-white/10">
                  <LogoMark tone="light" className="size-6" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold">{pharmacy.name}</p>
                  <p className="text-xs text-white/60">Assistant de navigation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Fermer l'assistant"
                className="inline-flex size-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-cream/60 px-4 py-5" aria-live="polite">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={reduce || i === 0 ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: m.from === "bot" && i > 0 ? 0.15 : 0 }}
                  className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      m.from === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-sm font-medium text-forest"
                        : "max-w-[88%] rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-ink"
                    }
                  >
                    {m.text}
                    {m.cta && (
                      <SmartLink
                        href={m.cta.href}
                        onClick={() => setOpen(false)}
                        className="group/btn mt-2.5 flex items-center gap-1.5 font-semibold text-brand-strong hover:text-forest"
                      >
                        {m.cta.label}
                        <CtaArrow />
                      </SmartLink>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-line bg-white px-4 pt-4 pb-3">
              <p id="chat-replies-label" className="sr-only">
                Réponses rapides
              </p>
              <ul aria-labelledby="chat-replies-label" className="flex flex-wrap gap-2">
                {quickReplies.map((r) => (
                  <li key={r.label}>
                    <button
                      type="button"
                      onClick={() => ask(r)}
                      className="min-h-9 rounded-full border border-line px-3.5 text-[0.8rem] font-semibold text-forest transition-colors hover:border-brand hover:bg-sage"
                    >
                      {r.label}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[0.72rem] leading-snug text-muted">
                Pour toute question médicale, adressez-vous directement à votre pharmacien.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant de la pharmacie"}
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex size-14 items-center justify-center rounded-full bg-brand text-forest shadow-lift transition-colors hover:bg-brand-hover"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X aria-hidden className="size-6" /> : <MessageCircle aria-hidden className="size-6" strokeWidth={1.8} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

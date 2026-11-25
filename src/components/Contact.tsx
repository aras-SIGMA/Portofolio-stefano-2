import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { useI18n } from "../i18n";
import LangTitle from "./LangTitle";
import { Reveal, RevealItem, RevealStagger } from "./motion/Reveal";

export default function Contact() {
  const { t } = useI18n();
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: `github.com/${profile.username}`, href: profile.github },
    { label: "LinkedIn", value: "linkedin.com/in/stefano", href: profile.linkedin },
    { label: "WhatsApp", value: "+62 858-••••-••32", href: profile.whatsapp },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          Contact
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          <LangTitle k="contact.title" />
        </h2>
        <p className="mt-4 max-w-xl text-sm text-text-muted sm:text-base">
          {t("contact.subtitle")}
        </p>
      </Reveal>

      <RevealStagger className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
        {channels.map((c) => (
          <RevealItem key={c.label}>
            <motion.a
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group block touch-manipulation rounded-2xl border border-surface-border bg-surface-card p-5 transition-colors active:bg-accent-soft/50 sm:p-6 sm:hover:shadow-[0_8px_24px_rgba(42,37,41,0.10)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {c.label}
              </p>
              <p className="mt-2 break-all text-sm font-medium underline-offset-4 group-hover:underline sm:text-base">
                {c.value}
              </p>
            </motion.a>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}

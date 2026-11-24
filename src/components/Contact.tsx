import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { Reveal, RevealItem, RevealStagger } from "./motion/Reveal";

export default function Contact() {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: `github.com/${profile.username}`, href: profile.github },
    { label: "LinkedIn", value: "linkedin.com/in/stefano", href: profile.linkedin },
    { label: "WhatsApp", value: "+62 858-8927-0732", href: profile.whatsapp },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
          Contact
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Mari Terhubung
        </h2>
        <p className="mt-4 max-w-xl text-text-muted">
          Terbuka untuk kesempatan PKL, kolaborasi project, atau sekadar
          diskusi seputar web &amp; mobile development.
        </p>
      </Reveal>

      <RevealStagger className="mt-10 grid gap-4 sm:grid-cols-2">
        {channels.map((c) => (
          <RevealItem key={c.label}>
            <motion.a
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group block rounded-2xl border border-surface-border bg-surface-card p-6 hover:shadow-[0_8px_24px_rgba(42,37,41,0.10)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {c.label}
              </p>
              <p className="mt-2 font-medium underline-offset-4 group-hover:underline">
                {c.value}
              </p>
            </motion.a>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}

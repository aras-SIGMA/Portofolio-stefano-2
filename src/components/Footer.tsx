import HalftoneWordmarkFooter from "./ui/halftone-wordmark-footer";
import { profile } from "../data/profile";
import { useI18n } from "../i18n";
import { useTheme } from "../hooks/useTheme";

export default function Footer() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Warna footer mengikuti tema situs (design.md):
  // light → Pale Ivory canvas + Charcoal ink; dark → Charcoal canvas + Ivory ink.
  const palette = isDark
    ? { background: "#2a2529", ink: "#f3f0e7", warm: "#c9a227" }
    : { background: "#f3f0e7", ink: "#2a2529", warm: "#b4574e" };

  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="stefano"
        label="Stefano — Portofolio"
        meta={`©${new Date().getFullYear()} · ${profile.location}`}
        columns={[
          {
            title: t("footer.work"),
            links: [
              { label: "Projects", href: "#projects" },
              { label: "Skills", href: "#skills" },
              { label: "Certifications", href: "#certifications" },
            ],
          },
          {
            title: t("footer.social"),
            links: [
              { label: "GitHub", href: profile.github },
              { label: "LinkedIn", href: profile.linkedin },
              { label: "WhatsApp", href: profile.whatsapp },
            ],
          },
          {
            title: t("footer.contact"),
            links: [
              { label: profile.email, href: `mailto:${profile.email}` },
              { label: t("footer.backToTop"), href: "#home" },
            ],
          },
        ]}
        palette={palette}
        height="480px"
      />
    </div>
  );
}

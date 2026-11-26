import HalftoneWordmarkFooter from "./ui/halftone-wordmark-footer";
import { profile } from "../data/profile";
import { useI18n } from "../i18n";
import { useIsDark } from "../hooks/useIsDark";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Footer() {
  const { t } = useI18n();
  const isDark = useIsDark();
  const isMobile = useIsMobile();

  // Warna footer mengikuti tema situs (60-30-10):
  // light → Soft White #FAFAFA + Obsidian #141416; dark → Obsidian #141416 + Soft White #F5F5F7; aksen → Denim Blue #1560BD.
  const palette = isDark
    ? { background: "#141416", ink: "#f5f5f7", warm: "#1560bd" }
    : { background: "#fafafa", ink: "#141416", warm: "#1560bd" };

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
        height={isMobile ? "460px" : "480px"}
        dotGap={isMobile ? 8 : 6}
        grain={isMobile ? 0 : 0.5}
      />
    </div>
  );
}

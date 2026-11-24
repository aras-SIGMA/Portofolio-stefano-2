import HalftoneWordmarkFooter from "./ui/halftone-wordmark-footer";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="stefano"
        label="Stefano — Portofolio"
        meta={`©${new Date().getFullYear()} · ${profile.location}`}
        columns={[
          {
            title: "Work",
            links: [
              { label: "Projects", href: "#projects" },
              { label: "Skills", href: "#skills" },
              { label: "Certifications", href: "#certifications" },
            ],
          },
          {
            title: "Social",
            links: [
              { label: "GitHub", href: profile.github },
              { label: "LinkedIn", href: profile.linkedin },
              { label: "WhatsApp", href: profile.whatsapp },
            ],
          },
          {
            title: "Contact",
            links: [
              { label: profile.email, href: `mailto:${profile.email}` },
              { label: "Back to top ↑", href: "#home" },
            ],
          },
        ]}
        preset="night"
        height="480px"
      />
    </div>
  );
}

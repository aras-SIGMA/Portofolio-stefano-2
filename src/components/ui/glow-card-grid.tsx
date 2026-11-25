import { useEffect, useRef } from "react";

import { cn } from "../../lib/utils";

export type GlowCardGridProps = React.ComponentPropsWithoutRef<"div"> & {
  // Card parameters
  cardRadius?: number;

  // Icon parameters
  iconBlur?: number;
  iconSaturate?: number;
  iconBrightness?: number;
  iconScale?: number;
  iconOpacity?: number;

  // Border parameters
  borderWidth?: number;

  children: React.ReactNode;
};

export function GlowCardGrid({
  cardRadius = 16,

  iconBlur = 25,
  iconSaturate = 5.0,
  iconBrightness = 1.3,
  iconScale = 4,
  iconOpacity = 0.3,

  borderWidth = 3,

  className,
  style,
  ...props
}: GlowCardGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip expensive per-frame getBoundingClientRect() tracking on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll<HTMLElement>(
        "[data-slot='glow-card']",
      );

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (event.clientX - centerX) / (rect.width / 2);
        const y = (event.clientY - centerY) / (rect.height / 2);

        card.style.setProperty("--pointer-x", x.toFixed(3));
        card.style.setProperty("--pointer-y", y.toFixed(3));
      });
    };

    document.addEventListener("pointermove", handlePointerMove);

    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3",
        className,
      )}
      style={
        {
          "--card-radius": `${cardRadius}px`,
          "--card-icon-blur": `${iconBlur}px`,
          "--card-icon-saturate": iconSaturate,
          "--card-icon-brightness": iconBrightness,
          "--card-icon-scale": iconScale,
          "--card-icon-opacity": iconOpacity,
          "--card-border-width": `${borderWidth}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export type GlowCardProps = {
  name: string;
  handle: string;
  avatar: string;
  className?: string;
};

export function GlowCard({ name, handle, avatar, className }: GlowCardProps) {
  return (
    <div
      data-slot="glow-card"
      className={cn(
        "@container-size relative h-44 w-full touch-manipulation overflow-hidden rounded-(--card-radius) ring-1 ring-border transition-[translate,scale] select-none active:scale-[0.98] sm:h-52",
        className,
      )}
    >
      <div className="flex size-full overflow-hidden rounded-(--card-radius) [clip-path:inset(0_round_var(--card-radius))]">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center",
            "translate-x-[calc(var(--pointer-x,-10)*50cqi)] translate-y-[calc(var(--pointer-y,-10)*50cqh)] translate-z-0 scale-(--card-icon-scale)",
            "max-sm:blur-xl max-sm:opacity-20 sm:blur-(--card-icon-blur) sm:brightness-(--card-icon-brightness) sm:saturate-(--card-icon-saturate) sm:opacity-(--card-icon-opacity)",
            "will-change-[transform,filter]",
          )}
        >
          <img className="size-16 sm:size-20" src={avatar} alt={name} loading="lazy" />
        </div>

        <div className="z-1 flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center sm:gap-4">
          <img className="size-16 rounded-full object-cover sm:size-20" src={avatar} alt={name} loading="lazy" />

          <div className="flex flex-col items-center gap-1">
            <h2 className="text-base leading-none font-semibold text-foreground">
              {name}
            </h2>
            <p className="text-sm leading-none text-foreground/50">{handle}</p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 translate-z-0 rounded-(--card-radius)",
          "border-(length:--card-border-width) border-solid border-primary/40",
          "sm:backdrop-blur-[6px] sm:backdrop-saturate-150",
          "[clip-path:inset(0_round_var(--card-radius))]",
        )}
        style={
          {
            maskImage:
              "linear-gradient(#fff 0 100%), linear-gradient(#fff 0 100%)",
            maskOrigin: "border-box, padding-box",
            maskClip: "border-box, padding-box",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          } as React.CSSProperties
        }
      />
    </div>
  );
}

export default GlowCardGrid;

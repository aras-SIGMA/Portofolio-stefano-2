import { useI18n, type TKey } from "../i18n";
import FoldText from "./ui/FoldText";

/** Judul section yang melipat ulang tiap bahasa berganti. */
export default function LangTitle({ k }: { k: TKey }) {
  const { lang, t } = useI18n();

  return (
    <FoldText
      key={lang}
      text={t(k)}
      splitBy="char"
      foldStyle="paper"
      hinge="top"
      trigger="mount"
      duration={0.55}
      stagger={0.028}
      foldAngle={92}
      creaseShading={0.3}
      fontSize="clamp(1.875rem, 4vw, 2.25rem)"
      fontWeight={600}
      style={{ letterSpacing: "-0.025em", lineHeight: 1.1 }}
    />
  );
}

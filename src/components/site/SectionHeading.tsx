import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase glass text-primary-foreground/90 border border-primary/30">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-base sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

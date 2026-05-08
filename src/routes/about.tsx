import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RKS Tech Solutions" },
      { name: "description", content: "Learn about RKS Tech Solutions — our mission, vision, and the team helping students and businesses ship real software." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Mission", desc: "Empower every student & business with real-time IT skills and production-ready projects." },
  { icon: Eye, title: "Vision", desc: "Be the most trusted bridge between learners and the industry." },
  { icon: Heart, title: "Values", desc: "Honesty, mentorship, craft, and outcomes over hype." },
];

const why = [
  { icon: Zap, title: "Real-Time Mentoring", desc: "Live 1:1 sessions, not pre-recorded fluff." },
  { icon: Award, title: "Affordable Pricing", desc: "Premium quality without the premium tag." },
  { icon: Users, title: "1-to-1 Support", desc: "Dedicated mentors for every learner." },
];

const team = [
  { name: "Ramesh K. Sharma", role: "Founder & Lead Mentor", initials: "RKS" },
  { name: "Anita Verma", role: "Java Full Stack Lead", initials: "AV" },
  { name: "Suresh N.", role: "AI / ML Mentor", initials: "SN" },
  { name: "Pooja Rao", role: "Career Coach", initials: "PR" },
];

function AboutPage() {
  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs glass border border-primary/30">About Us</span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-bold text-gradient">Built by builders, for builders.</h1>
          <p className="mt-6 text-muted-foreground text-lg">
            RKS Tech Solutions started with a simple belief — students deserve real projects,
            real mentors, and real opportunities. Today we partner with learners and companies
            across India to deliver software that actually ships.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="glass gradient-border bg-transparent border-0 p-8 h-full hover-lift">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <v.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-muted-foreground">{v.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why Choose Us" title="Real outcomes, real support." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {why.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="glass gradient-border bg-transparent border-0 p-6 h-full hover-lift">
                  <w.icon className="w-8 h-8 text-primary" />
                  <h3 className="mt-4 font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Team" title="Meet the mentors" />
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="glass gradient-border bg-transparent border-0 p-6 text-center hover-lift">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary grid place-items-center mx-auto text-2xl font-bold shadow-glow">
                    {m.initials}
                  </div>
                  <h3 className="mt-4 font-semibold">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

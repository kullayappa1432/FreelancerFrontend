import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — RKS Tech Solutions" },
      { name: "description", content: "Internship projects, IT training, and freelance development services for students and businesses." },
    ],
  }),
  component: ServicesPage,
});

const categories = [
  {
    icon: Briefcase,
    title: "Internship Projects",
    items: ["MCA Projects", "B.Tech Projects", "AI Projects", "Web Development", "Java Projects", "Python Projects"],
  },
  {
    icon: GraduationCap,
    title: "Training Services",
    items: ["Java Full Stack", "React Development", "Backend Development", "Database Management", "Docker & Cloud", "DevOps Basics"],
  },
  {
    icon: Code2,
    title: "Freelance Development",
    items: ["Business Websites", "Admin Dashboards", "REST & GraphQL APIs", "Mobile Apps", "Deployment Support", "Maintenance"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs glass border border-primary/30">Services</span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-bold text-gradient">Everything you need to ship.</h1>
          <p className="mt-6 text-muted-foreground text-lg">
            Three pillars — projects, training, and freelance — engineered for learners and businesses.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="glass gradient-border bg-transparent border-0 p-8 h-full hover-lift">
                <div className="w-14 h-14 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-5">
                  <c.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-semibold">{c.title}</h2>
                <ul className="mt-5 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  <Badge className="bg-gradient-primary text-primary-foreground">Popular</Badge>
                  <Badge variant="secondary" className="bg-white/5">Mentor-led</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

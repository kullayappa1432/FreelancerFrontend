import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Code2, Download, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — RKS Tech Solutions" },
      { name: "description", content: "Browse internship and freelance projects across web, AI, mobile and database categories." },
    ],
  }),
  component: ProjectsPage,
});

type Project = {
  title: string;
  desc: string;
  category: "Web" | "AI/ML" | "Mobile" | "Database";
  tech: string[];
  price: string;
  duration: string;
};

const projects: Project[] = [
  { title: "Hostel Management System", desc: "Admin & student portal with role-based access.", category: "Web", tech: ["Java", "Spring", "MySQL"], price: "₹4,999", duration: "3 weeks" },
  { title: "Face Recognition Attendance", desc: "Real-time face detection with admin dashboard.", category: "AI/ML", tech: ["Python", "OpenCV"], price: "₹6,999", duration: "4 weeks" },
  { title: "E-Commerce Website", desc: "Storefront with cart, payments and admin panel.", category: "Web", tech: ["React", "Node", "Stripe"], price: "₹5,999", duration: "4 weeks" },
  { title: "Food Recognition App", desc: "AI dish identification with calorie estimates.", category: "Mobile", tech: ["TensorFlow", "RN"], price: "₹7,499", duration: "5 weeks" },
  { title: "AI Chat Application", desc: "Streaming chat with conversation memory.", category: "AI/ML", tech: ["Next.js", "OpenAI"], price: "₹5,499", duration: "3 weeks" },
  { title: "Student Data Handling", desc: "Secure records with analytics dashboard.", category: "Database", tech: ["NestJS", "Prisma"], price: "₹4,499", duration: "3 weeks" },
  { title: "Hospital Management", desc: "Doctors, patients, appointments & billing.", category: "Web", tech: ["Java", "Spring", "Postgres"], price: "₹6,499", duration: "4 weeks" },
  { title: "Job Portal", desc: "Recruiters, applicants, resume parsing.", category: "Web", tech: ["React", "Nest", "Mongo"], price: "₹5,999", duration: "4 weeks" },
];

const categories = ["All", "Web", "AI/ML", "Mobile", "Database"] as const;

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat = cat === "All" || p.category === cat;
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(q.toLowerCase()));
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs glass border border-primary/30">Project Gallery</span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-bold text-gradient">Find your next big project.</h1>
          <p className="mt-6 text-muted-foreground text-lg">Filter by category, search by tech — every project includes source code, docs and mentor support.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="glass gradient-border bg-transparent border-0 p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects or tech..." className="pl-9 bg-white/5 border-white/10" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-smooth ${
                    cat === c ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <Card className="glass gradient-border bg-transparent border-0 overflow-hidden hover-lift group h-full flex flex-col">
                <div className="aspect-video bg-gradient-to-br from-primary/30 via-accent/20 to-background relative">
                  <div className="absolute inset-0 grid-pattern opacity-50" />
                  <div className="absolute inset-0 grid place-items-center">
                    <Code2 className="w-14 h-14 text-primary/60 group-hover:scale-110 transition-smooth" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-gradient-primary">{p.category}</Badge>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => <Badge key={t} variant="secondary" className="bg-white/5">{t}</Badge>)}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gradient-primary font-bold text-lg">{p.price}</span>
                    <span className="text-muted-foreground text-xs">{p.duration}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-gradient-primary flex-1"><ExternalLink className="w-3.5 h-3.5 mr-1" /> Demo</Button>
                    <Button size="sm" variant="outline" className="glass border-white/20"><Download className="w-3.5 h-3.5 mr-1" /> PDF</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground">No projects match your filter.</div>
          )}
        </div>
      </section>
    </>
  );
}

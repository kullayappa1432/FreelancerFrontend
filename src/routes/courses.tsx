import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, BarChart3, User, Code2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — RKS Tech Solutions" },
      { name: "description", content: "Live, mentor-led courses in Java Full Stack, React, NestJS, Database, Docker and Deployment." },
    ],
  }),
  component: CoursesPage,
});

const courses = [
  { title: "Java Full Stack", instructor: "Ramesh Sharma", duration: "12 weeks", level: "Beginner → Advanced", price: "₹9,999" },
  { title: "React Development", instructor: "Anita Verma", duration: "8 weeks", level: "Intermediate", price: "₹6,999" },
  { title: "NestJS Backend", instructor: "Suresh N.", duration: "6 weeks", level: "Intermediate", price: "₹5,999" },
  { title: "Database Mastery", instructor: "Pooja Rao", duration: "4 weeks", level: "All levels", price: "₹3,999" },
  { title: "Docker & Deployment", instructor: "Ramesh Sharma", duration: "3 weeks", level: "Intermediate", price: "₹3,499" },
  { title: "AI & ML Foundations", instructor: "Suresh N.", duration: "10 weeks", level: "Beginner", price: "₹8,499" },
];

function CoursesPage() {
  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs glass border border-primary/30">Courses</span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-bold text-gradient">Live, mentor-led learning.</h1>
          <p className="mt-6 text-muted-foreground text-lg">No fluff. Build, ship and get hired with hands-on projects in every course.</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="glass gradient-border bg-transparent border-0 overflow-hidden hover-lift group h-full flex flex-col">
                <div className="aspect-video bg-gradient-to-br from-primary/30 via-accent/20 to-background relative">
                  <div className="absolute inset-0 grid-pattern opacity-50" />
                  <div className="absolute inset-0 grid place-items-center">
                    <Code2 className="w-14 h-14 text-primary/60 group-hover:scale-110 transition-smooth" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {c.instructor}</div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {c.duration}</div>
                    <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> {c.level}</div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gradient-primary">{c.price}</span>
                    <Badge variant="secondary" className="bg-white/5">Live</Badge>
                  </div>
                  <Button className="mt-5 w-full bg-gradient-primary shadow-glow">Enroll Now</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

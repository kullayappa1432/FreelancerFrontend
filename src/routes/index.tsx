import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, GraduationCap, Code2, Briefcase, Database,
  Brain, Cloud, FileText, Rocket, Star, CheckCircle2, ChevronDown,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RKS Tech Solutions — Transform Your Career With Real-Time IT Skills" },
      { name: "description", content: "Internship projects, IT training, and freelance development for students and businesses. Java, React, NestJS, AI/ML, deployment support and more." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Briefcase, title: "Internship Projects", desc: "Real-time, mentor-led projects across MCA, B.Tech and AI domains." },
  { icon: GraduationCap, title: "Java Full Stack", desc: "Spring Boot + React + PostgreSQL with deployment & interview prep." },
  { icon: Code2, title: "React Development", desc: "Modern React with hooks, state management and production patterns." },
  { icon: Database, title: "NestJS Backend", desc: "Type-safe APIs with NestJS, Prisma & PostgreSQL." },
  { icon: Brain, title: "AI & ML Projects", desc: "Face recognition, NLP, and applied ML use-cases." },
  { icon: Cloud, title: "Deployment Support", desc: "Docker, CI/CD and managed cloud hosting." },
  { icon: FileText, title: "Resume Building", desc: "ATS-friendly resumes & 1:1 interview coaching." },
  { icon: Rocket, title: "Project Mentoring", desc: "Architecture reviews, debugging help & code reviews." },
];

const techStack = [
  "Java", "Spring Boot", "React", "Next.js", "Node.js", "NestJS",
  "PostgreSQL", "MongoDB", "Docker", "GitHub", "Prisma", "Python", "ML",
];

const projects = [
  { title: "Hostel Management System", tech: ["Java", "Spring", "MySQL"], desc: "Complete hostel admin & student portal with role-based access." },
  { title: "Face Recognition Attendance", tech: ["Python", "OpenCV", "Flask"], desc: "Real-time face detection attendance with admin dashboard." },
  { title: "E-Commerce Website", tech: ["React", "Node", "Stripe"], desc: "Full storefront with cart, payments and admin panel." },
  { title: "Food Recognition App", tech: ["TensorFlow", "React Native"], desc: "AI model to identify dishes & estimate calories." },
  { title: "AI Chat Application", tech: ["Next.js", "OpenAI"], desc: "Streaming chat UI with conversation memory." },
  { title: "Student Data Handling", tech: ["NestJS", "Prisma", "Postgres"], desc: "Secure student records with analytics dashboard." },
];

const stats = [
  { n: "1200+", l: "Students Trained" },
  { n: "450+", l: "Projects Delivered" },
  { n: "98%", l: "Placement Assistance" },
  { n: "24/7", l: "Mentor Support" },
];

const testimonials = [
  { name: "Aarav Shah", course: "Java Full Stack", quote: "The mentorship was incredible. I shipped 3 real projects and landed my first dev job within 2 months.", rating: 5 },
  { name: "Priya Reddy", course: "React Development", quote: "Hands-on, no fluff. The instructors actually care and review your code line by line.", rating: 5 },
  { name: "Karthik Iyer", course: "AI & ML Projects", quote: "Best decision I made for my final year. The face recognition project blew the panel away.", rating: 5 },
];

const plans = [
  { name: "Basic", price: "₹2,999", features: ["1 Live project", "Source code", "Documentation", "Email support"], highlight: false },
  { name: "Premium", price: "₹6,999", features: ["3 Live projects", "1:1 mentoring", "Resume review", "Deployment help"], highlight: true },
  { name: "Internship", price: "₹9,999", features: ["6 weeks program", "Internship letter", "Real client work", "Portfolio site"], highlight: false },
  { name: "Enterprise", price: "Custom", features: ["Custom curriculum", "Team training", "Dedicated mentor", "SLA support"], highlight: false },
];

const faqs = [
  { q: "Do you provide internship certificates?", a: "Yes, you receive a verifiable internship certificate after completing your project successfully." },
  { q: "Are the courses live or recorded?", a: "Both — live mentor sessions plus recorded modules you can revisit anytime." },
  { q: "Will I get help with placements?", a: "We offer resume reviews, mock interviews and referrals through our network." },
  { q: "Can I get the project source code?", a: "Absolutely. You receive full source code, documentation and deployment guides." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>

        {/* Floating tech blobs */}
        {techStack.slice(0, 6).map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={`hidden lg:block absolute glass px-4 py-2 rounded-xl text-xs font-mono animate-float`}
            style={{
              top: `${15 + (i * 11) % 60}%`,
              left: i % 2 === 0 ? `${4 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {t}
          </motion.div>
        ))}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium border border-primary/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            #1 Real-Time IT Training & Internship Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Transform Your Career With <br />
            <span className="text-gradient-primary">Real-Time IT Skills</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground"
          >
            RKS Tech Solutions provides internship projects, IT training, and freelance
            development services for students and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Button asChild size="lg" className="bg-gradient-primary shadow-glow hover:opacity-95">
              <Link to="/courses">Explore Courses <ArrowRight className="ml-1 w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass border-white/20 hover:bg-white/10">
              <Link to="/projects">Get Internship Project</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex justify-center"
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="What We Offer"
            title="Services Built For Real Outcomes"
            subtitle="From your first line of code to your first paycheck — we've got every step covered."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="glass gradient-border hover-lift p-6 h-full bg-transparent border-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-4">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Our Stack" title="Technologies We Master" />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {techStack.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/20 hover:scale-105 transition-smooth cursor-default"
              >
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Featured Work"
            title="Projects That Get You Hired"
            subtitle="Production-grade, mentor-reviewed projects you can showcase with confidence."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Card className="glass gradient-border bg-transparent border-0 overflow-hidden hover-lift group">
                  <div className="aspect-video bg-gradient-to-br from-primary/30 via-accent/20 to-background relative overflow-hidden">
                    <div className="absolute inset-0 grid-pattern opacity-50" />
                    <div className="absolute inset-0 grid place-items-center">
                      <Code2 className="w-16 h-16 text-primary/60 group-hover:scale-110 transition-smooth" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="bg-white/5 hover:bg-primary/20">{t}</Badge>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-2">
                      <Button size="sm" className="bg-gradient-primary flex-1">Live Demo</Button>
                      <Button size="sm" variant="outline" className="glass border-white/20">GitHub</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="glass-strong gradient-border bg-transparent border-0 p-10 sm:p-14 shadow-elegant">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-gradient-primary">{s.n}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Student Voices" title="Loved By Learners" />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass gradient-border bg-transparent border-0 p-6 h-full hover-lift">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-primary grid place-items-center font-semibold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.course}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Pricing"
            title="Plans That Grow With You"
            subtitle="Simple, transparent pricing. Cancel anytime."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`p-6 h-full bg-transparent border-0 hover-lift relative ${
                  p.highlight ? "glass-strong gradient-border shadow-glow" : "glass gradient-border"
                }`}>
                  {p.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-semibold">{p.name}</h3>
                  <div className="mt-3 text-3xl font-bold text-gradient">{p.price}</div>
                  <ul className="mt-5 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`mt-6 w-full ${p.highlight ? "bg-gradient-primary" : "glass"}`}>
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQs" title="Questions, Answered" />
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass gradient-border rounded-xl px-5 border-0">
                <AccordionTrigger className="text-left hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Card className="glass-strong gradient-border bg-transparent border-0 p-10 sm:p-16 text-center shadow-elegant relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-60" />
            <h2 className="text-3xl sm:text-5xl font-bold text-gradient">Ready to build your future?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join hundreds of students shipping real projects and landing real jobs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="bg-gradient-primary shadow-glow">Enroll Now</Button>
              <Button size="lg" variant="outline" className="glass border-white/20">WhatsApp Us</Button>
              <Button size="lg" variant="ghost">Schedule a Call</Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { Code2, Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/50">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="font-display font-bold">RKS Tech Solutions</div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Real-time IT training, internship projects & freelance development for ambitious students and businesses.
            </p>
            <div className="flex gap-2 mt-4">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-lg glass hover:bg-primary/20 transition-smooth">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                ["About", "/about"],
                ["Services", "/services"],
                ["Projects", "/projects"],
                ["Courses", "/courses"],
                ["Contact", "/contact"],
                ["Admin Login", "/admin/login"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-foreground transition-smooth">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> hello@rkstech.dev</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 90000 00000</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Hyderabad, India</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">New courses, projects & offers in your inbox.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="you@email.com" className="bg-white/5 border-white/10" />
              <Button className="bg-gradient-primary">Join</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} RKS Tech Solutions. All rights reserved.</p>
          <p>Crafted with passion for builders & learners.</p>
        </div>
      </div>
    </footer>
  );
}

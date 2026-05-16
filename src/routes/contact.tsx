import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSubmitContactMutation } from "@/hooks/useContactQuery";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RKS Tech Solutions" },
      { name: "description", content: "Get in touch with RKS Tech Solutions for IT training, internship projects, and freelance development." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutate: submitContact, isPending } = useSubmitContactMutation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    submitContact({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }, {
      onSuccess: () => {
        formRef.current?.reset();
      },
    });
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs glass border border-primary/30">Contact</span>
          <h1 className="mt-4 text-4xl sm:text-6xl font-bold text-gradient">Let's build something great.</h1>
          <p className="mt-6 text-muted-foreground text-lg">Questions about a course, project or freelance work? We typically reply within a few hours.</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="glass gradient-border bg-transparent border-0 p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Send us a message</h2>
              <form ref={formRef} onSubmit={onSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input required name="name" placeholder="Your name" maxLength={100} className="bg-white/5 border-white/10" />
                <Input required name="email" type="email" placeholder="Email address" maxLength={255} className="bg-white/5 border-white/10" />
                <Input name="phone" placeholder="Phone (optional)" maxLength={20} className="sm:col-span-2 bg-white/5 border-white/10" />
                <Input required name="subject" placeholder="Subject" maxLength={150} className="sm:col-span-2 bg-white/5 border-white/10" />
                <Textarea required name="message" placeholder="Tell us about your project or question..." maxLength={1000} rows={5} className="sm:col-span-2 bg-white/5 border-white/10" />
                <Button disabled={isPending} type="submit" size="lg" className="sm:col-span-2 bg-gradient-primary shadow-glow">
                  {isPending ? "Sending..." : <><Send className="w-4 h-4 mr-2" /> Send message</>}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@rkstech.dev" },
              { icon: Phone, label: "Phone", value: "+91 90000 00000" },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat with us" },
              { icon: MapPin, label: "Location", value: "Hyderabad, India" },
            ].map((c) => (
              <Card key={c.label} className="glass gradient-border bg-transparent border-0 p-5 hover-lift flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-primary grid place-items-center shadow-glow shrink-0">
                  <c.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Card className="glass gradient-border bg-transparent border-0 overflow-hidden">
            <div className="aspect-[16/7] bg-gradient-to-br from-primary/20 via-accent/10 to-background relative">
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <div className="absolute inset-0 grid place-items-center text-center px-6">
                <div>
                  <MapPin className="w-10 h-10 text-primary mx-auto" />
                  <div className="mt-3 font-semibold">Hyderabad, Telangana</div>
                  <div className="text-sm text-muted-foreground">India · Open Mon–Sat, 10am–8pm IST</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

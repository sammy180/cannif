import React, { useState } from "react";
import { motion } from "framer-motion";
import { Car, ShieldCheck, Cpu, Waves, GitBranch, Sparkles, CheckCircle2, Mail, User, Building2, Loader2, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// --- Utility components ---
const Section = ({ id, className = "", children }) => (
  <section id={id} className={cn("py-16 md:py-24", className)}>
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">{children}</div>
  </section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide">
    {children}
  </span>
);

const Feature = ({ icon: Icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="rounded-2xl border p-3 shadow-sm"><Icon className="h-6 w-6" /></div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  </div>
);

// --- Waitlist Form ---
function WaitlistForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    variant: "CAN FD",
    notes: "",
    agree: false,
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.agree) {
      setStatus({ state: "error", message: "Please fill your name, email, and accept the terms." });
      return;
    }
    try {
      setStatus({ state: "loading", message: "" });
      // Replace this endpoint with your backend handler (e.g., /api/waitlist, Formspree, Airtable, Supabase, etc.)
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ state: "success", message: "You're on the list! We'll be in touch." });
      setForm({ name: "", email: "", company: "", variant: "CAN FD", notes: "", agree: false });
    } catch (err) {
      console.error(err);
      setStatus({ state: "error", message: "Could not submit right now. Please try again later." });
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Join the waitlist</CardTitle>
        <p className="text-sm text-muted-foreground">Be first to know when units ship and get access to early documentation.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="h-4 w-4 absolute left-3 top-3" />
              <Input id="name" placeholder="Ada Lovelace" className="pl-9" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="h-4 w-4 absolute left-3 top-3" />
              <Input id="email" type="email" placeholder="you@company.com" className="pl-9" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company / Org (optional)</Label>
            <div className="relative">
              <Building2 className="h-4 w-4 absolute left-3 top-3" />
              <Input id="company" placeholder="e.g., Autonomo Labs" className="pl-9" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="variant">Variant</Label>
            <select id="variant" className="w-full rounded-md border bg-background px-3 py-2" value={form.variant} onChange={(e) => setForm({ ...form, variant: e.target.value })}>
              <option>CAN</option>
              <option>CAN FD</option>
              <option>LIN</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="notes">Notes (use case, volume, questions)</Label>
            <Textarea id="notes" placeholder="Tell us how you'll use it" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <div className="md:col-span-2 flex items-start gap-3 text-sm">
            <input id="agree" type="checkbox" className="mt-1" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} />
            <Label htmlFor="agree" className="font-normal text-muted-foreground">
              I agree to be contacted about this launch and accept the <a className="underline" href="#privacy">privacy notice</a>.
            </Label>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full md:w-auto" disabled={status.state === "loading"}>
              {status.state === "loading" ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting…</>) : ("Join waitlist")}
            </Button>
            {status.state === "success" && (
              <p className="mt-3 text-sm text-green-600 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> {status.message}</p>
            )}
            {status.state === "error" && (
              <p className="mt-3 text-sm text-red-600">{status.message}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// --- Main Page ---
export default function LaunchSite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur border-b">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl border grid place-content-center shadow-sm"><Cpu className="h-5 w-5" /></div>
            <span className="font-bold tracking-tight">OpenCAN-ESP32</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#variants" className="hover:underline">Variants</a>
            <a href="#opensource" className="hover:underline">Open Source</a>
            <a href="#waitlist" className="hover:underline">Waitlist</a>
            <a href="#faq" className="hover:underline">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#waitlist"><Button size="sm">Join waitlist</Button></a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section id="hero" className="pt-10 md:pt-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge>Automotive-grade • IP68 • Flexible Data-Rate</Badge>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                ESP32-based CAN/CAN&nbsp;FD & LIN Interface
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-prose">
                Meet <strong>OpenCAN-ESP32</strong> — an open-source, automotive-grade interface board built around ESP32 with isolated transceivers and robust power design. Rated <strong>IP68</strong> and engineered for <strong>Flexible Data-Rate (CAN&nbsp;FD)</strong>.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#waitlist"><Button size="lg">Get early access</Button></a>
                <a href="#variants" className="text-sm underline flex items-center gap-1">Explore variants <LinkIcon className="h-4 w-4" /></a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge>Automotive grade</Badge>
                <Badge>IP68 enclosure</Badge>
                <Badge>ESP32 + Wi‑Fi/BLE</Badge>
                <Badge>Isolated CAN</Badge>
                <Badge>LIN bus option</Badge>
                <Badge>Open hardware</Badge>
              </div>
            </motion.div>
          </div>
          <div>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="border-2">
                <CardContent className="p-0">
                  <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 grid place-content-center">
                    <img 
                      src="/images/hero/product-hero.svg" 
                      alt="OpenCAN-ESP32 Product Overview"
                      className="w-full h-full object-contain p-6"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features">
        <div className="grid md:grid-cols-3 gap-8">
          <Feature icon={ShieldCheck} title="Automotive Grade">
            Designed for harsh environments with ESD protection, wide input supply, and isolation. IP68-ready enclosure for dust & water ingress protection.
          </Feature>
          <Feature icon={Waves} title="CAN FD with FDR">
            Supports Flexible Data-Rate on CAN FD for faster payloads while staying compatible with classic CAN networks.
          </Feature>
          <Feature icon={Cpu} title="ESP32 Inside">
            Dual-core connectivity with Wi‑Fi/BLE for OTA updates, telemetry, and cloud-connected applications.
          </Feature>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <Card>
            <CardHeader>
              <CardTitle>Built for real-world vehicles</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="mb-4">
                <img 
                  src="/images/features/ip68-demo.svg" 
                  alt="IP68 Protection Demo"
                  className="w-full h-32 object-contain mb-4"
                />
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li>Isolated CAN transceivers, bus-fault tolerant design</li>
                <li>12–36 V input with protection (OVP, reverse, surge)</li>
                <li>Sealed connectors and gasketed housing (IP68)</li>
                <li>Temperature & vibration considerations for automotive use</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Developer-friendly</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc pl-5 space-y-2">
                <li>Open-source hardware & firmware (Arduino/ESP-IDF)</li>
                <li>REST/MQTT bridge, OTA updates, example apps</li>
                <li>Easy provisioning via mobile or web</li>
                <li>Rich diagnostics: bus load, error frames, logging</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Variants */}
      <Section id="variants" className="bg-muted/30 rounded-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Choose your bus</h2>
          <p className="text-muted-foreground mt-2">Three ready-to-deploy variants at launch.</p>
        </div>
        <div className="mb-8">
          <img 
            src="/images/products/variants-comparison.svg" 
            alt="Product Variants Comparison"
            className="w-full max-w-4xl mx-auto"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            title: "OpenCAN – CAN",
            subtitle: "Classic CAN 2.0B",
            points: ["Isolated transceiver", "1 Mbps", "Extended IDs", "DBC-friendly"],
          }, {
            title: "OpenCAN – CAN FD",
            subtitle: "Flexible Data-Rate",
            points: ["Up to 5 Mbps data", "Backwards compatible", "Error handling", "Time-triggered ready"],
          }, {
            title: "OpenCAN – LIN",
            subtitle: "LIN Bus 1.x/2.x",
            points: ["Master or slave", "Automotive LIN transceiver", "Sleep/wake", "Low-cost nodes"],
          }].map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{v.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{v.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {v.points.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> {p}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#waitlist"><Button size="lg">Reserve your spot</Button></a>
        </div>
      </Section>

      {/* Open Source */}
      <Section id="opensource">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Open source by design</h2>
            <p className="mt-3 text-muted-foreground">Schematics, board files, and firmware will be released under permissive licenses. Contribute drivers, examples, and integrations with a familiar GitHub workflow.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="https://github.com/your-org/opencan-esp32" className="inline-flex"><Button variant="outline" className="gap-2"><GitBranch className="h-4 w-4" /> View repo</Button></a>
              <a href="#waitlist" className="inline-flex"><Button className="gap-2"><Sparkles className="h-4 w-4" /> Get early docs</Button></a>
            </div>
          </div>
          <div>
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">MCU</p>
                    <p className="font-medium">ESP32</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ingress Protection</p>
                    <p className="font-medium">IP68</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Buses</p>
                    <p className="font-medium">CAN / CAN FD / LIN</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Connectivity</p>
                    <p className="font-medium">Wi‑Fi, BLE</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Power</p>
                    <p className="font-medium">12–36 V input</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Isolation</p>
                    <p className="font-medium">Yes (CAN)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Waitlist */}
      <Section id="waitlist" className="bg-muted/30 rounded-3xl">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Be first in line</h2>
            <p className="mt-3 text-muted-foreground">We’re gearing up for a limited pilot batch. Add your name to the list — we’ll notify you as soon as preorders open.</p>
            <div className="mt-6 grid gap-4 text-sm">
              <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5" /> Automotive-grade design</div>
              <div className="flex items-center gap-3"><Waves className="h-5 w-5" /> CAN FD with Flexible Data-Rate</div>
              <div className="flex items-center gap-3"><Car className="h-5 w-5" /> Variants for CAN, CAN FD, and LIN</div>
            </div>
          </div>
          <WaitlistForm />
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <Card>
            <CardHeader>
              <CardTitle>What does IP68 mean for this product?</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">IP68 means dust-tight and protected against continuous water immersion under conditions specified by the manufacturer. Our enclosure, seals, and connectors are selected to meet this rating.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Is it compatible with classic CAN?</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Yes. The CAN FD variant supports classic CAN frames and arbitration. You can run at classic speeds and enable higher data rates for the data phase as needed.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Will the hardware and firmware be open source?</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Yes. We plan to publish schematics/PCBs and firmware examples (ESP-IDF/Arduino) under permissive licenses. Community contributions are welcome.</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How do I integrate the waitlist with my backend?</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Replace the <code>/api/waitlist</code> endpoint in the form’s <code>fetch</code> call with your API. Expect a JSON POST with name, email, company, variant, notes, agree, and createdAt. Return a 200/201 to show success.</CardContent>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl py-10 grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl border grid place-content-center shadow-sm"><Cpu className="h-5 w-5" /></div>
              <span className="font-bold tracking-tight">OpenCAN-ESP32</span>
            </div>
            <p className="text-sm text-muted-foreground">Open-source ESP32 interface for CAN, CAN FD, and LIN. Automotive-grade, IP68-rated.</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold mb-2">Links</p>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#variants" className="hover:underline">Variants</a></li>
              <li><a href="#opensource" className="hover:underline">Open Source</a></li>
              <li><a href="#waitlist" className="hover:underline">Waitlist</a></li>
            </ul>
          </div>
          <div className="text-sm" id="privacy">
            <p className="font-semibold mb-2">Privacy</p>
            <p className="text-muted-foreground">We’ll only use your contact details to update you about this launch. You can opt out anytime via the link in our emails.</p>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground pb-8">© {new Date().getFullYear()} OpenCAN-ESP32. All rights reserved.</div>
      </footer>
    </div>
  );
}

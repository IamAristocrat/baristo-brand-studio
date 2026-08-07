import { useEffect, useMemo, useState } from "react";
import type { FormEvent, InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { CheckCircle2, Copy, Loader2, Mail, X } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type LeadForm = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  city: string;
  preferredRoast: string;
  brewStyle: string;
  coffeeFrequency: string;
  role: string;
  interest: string;
  marketingConsent: boolean;
  company: string;
};

const initialForm: LeadForm = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  country: "India",
  city: "",
  preferredRoast: "Both",
  brewStyle: "Espresso / Moka Pot",
  coffeeFrequency: "Daily",
  role: "",
  interest: "Amazon launch & product access",
  marketingConsent: false,
  company: "",
};

function leadText(form: LeadForm) {
  return [
    "Baristo First Pour Circle signup",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.countryCode} ${form.phone}`,
    `Country: ${form.country}`,
    `City: ${form.city}`,
    `Preferred roast: ${form.preferredRoast}`,
    `Brew style: ${form.brewStyle}`,
    `Coffee frequency: ${form.coffeeFrequency}`,
    `Role / identity: ${form.role}`,
    `Primary interest: ${form.interest}`,
    "Marketing consent: Yes",
  ].join("\n");
}

export function FirstPourLayer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [leadId, setLeadId] = useState("");
  const [acknowledgementSent, setAcknowledgementSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const fallbackText = useMemo(() => leadText(form), [form]);
  const fallbackMailto = useMemo(() => {
    const subject = encodeURIComponent("Join the Baristo First Pour Circle");
    const body = encodeURIComponent(fallbackText);
    return `mailto:support@baristo.online?subject=${subject}&body=${body}`;
  }, [fallbackText]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const label = anchor.textContent?.replace(/\s+/g, " ").trim() ?? "";
      if (!/first pour/i.test(label)) return;
      event.preventDefault();
      setOpen(true);
      setStatus("idle");
      setMessage("");
      setLeadId("");
      setAcknowledgementSent(false);
      setCopied(false);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "submitting") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, status]);

  function close() {
    if (status === "submitting") return;
    setOpen(false);
    setForm(initialForm);
    setStatus("idle");
    setMessage("");
    setLeadId("");
    setAcknowledgementSent(false);
    setCopied(false);
  }

  async function copyLead() {
    try {
      await navigator.clipboard.writeText(fallbackText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setCopied(false);

    try {
      const response = await fetch("/api/first-pour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          page: window.location.href,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        leadId?: string;
        acknowledgementSent?: boolean;
        message?: string;
      };
      if (!response.ok || !data.ok) throw new Error(data.message || "First Pour signup could not be submitted.");
      setLeadId(data.leadId || "");
      setAcknowledgementSent(Boolean(data.acknowledgementSent));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "First Pour signup could not be submitted.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-obsidian/80 px-3 py-4 backdrop-blur-md sm:px-5 sm:py-7"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="first-pour-title"
        className="premium-dialog max-h-full w-full max-w-3xl overflow-y-auto rounded-[1.4rem] border border-rosegold/30 bg-ivory shadow-luxe"
      >
        <div className="sticky top-0 z-20 flex items-start justify-between border-b border-rosegold/15 bg-ivory/95 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
          <div>
            <p className="smallcaps text-[10px] text-rosegold-light">Private launch circle</p>
            <h2 id="first-pour-title" className="mt-1 font-display text-3xl font-semibold text-espresso sm:text-4xl">
              Join the First Pour Circle
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={status === "submitting"}
            aria-label="Close First Pour form"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rosegold/20 text-espresso transition hover:bg-champagne/35 disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 py-12 text-center sm:px-12 sm:py-16">
            <CheckCircle2 className="mx-auto h-12 w-12 text-rosegold-light" />
            <h3 className="mt-5 font-display text-4xl font-semibold text-espresso sm:text-5xl">You are inside the First Pour Circle.</h3>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-espresso/65">
              Reference <strong>{leadId}</strong>. Your preferences have been recorded for launch segmentation, roast updates, recipes and Baristo coffee intelligence.
              {acknowledgementSent
                ? " A confirmation was sent to the email address provided."
                : " Your signup is recorded even though the acknowledgement email could not be delivered."}
            </p>
            <p className="mx-auto mt-5 max-w-lg text-xs leading-6 text-espresso/45">
              This is a marketing and launch-access signup, not a reservation or confirmed order. You can unsubscribe from future marketing at any time by contacting support@baristo.online.
            </p>
            <button type="button" onClick={close} className="smallcaps mt-8 rounded-sm bg-gradient-rose px-8 py-3 text-xs font-bold text-espresso shadow-rose">
              Return to Baristo
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-7 px-5 py-6 sm:px-8 sm:py-8">
            <div className="premium-glass rounded-2xl border border-rosegold/18 p-5">
              <p className="smallcaps text-[10px] text-rosegold-light">Why join</p>
              <p className="mt-2 font-display text-2xl text-espresso">Early access without an order commitment.</p>
              <p className="mt-3 text-xs leading-6 text-espresso/55">
                Receive launch availability, Noble Dark and Truly Dark updates, selected recipes, evidence-led coffee intelligence and occasional private offers. Your answers help Baristo segment future communication instead of sending generic marketing.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required value={form.name} onChange={(value) => setForm((state) => ({ ...state, name: value }))} autoComplete="name" />
              <Field label="Email address" required type="email" value={form.email} onChange={(value) => setForm((state) => ({ ...state, email: value }))} autoComplete="email" />
              <div className="grid grid-cols-[110px_1fr] gap-3 sm:col-span-2">
                <Field label="Country code" required value={form.countryCode} onChange={(value) => setForm((state) => ({ ...state, countryCode: value }))} autoComplete="tel-country-code" inputMode="tel" placeholder="+91" />
                <Field label="Mobile / WhatsApp" required value={form.phone} onChange={(value) => setForm((state) => ({ ...state, phone: value }))} autoComplete="tel-national" inputMode="tel" />
              </div>
              <Field label="Country" required value={form.country} onChange={(value) => setForm((state) => ({ ...state, country: value }))} autoComplete="country-name" />
              <Field label="City" value={form.city} onChange={(value) => setForm((state) => ({ ...state, city: value }))} autoComplete="address-level2" />

              <SelectField label="Preferred roast" required value={form.preferredRoast} onChange={(value) => setForm((state) => ({ ...state, preferredRoast: value }))}>
                <option>Noble Dark</option>
                <option>Truly Dark</option>
                <option>Both</option>
                <option>Not sure yet</option>
              </SelectField>
              <SelectField label="Primary brew style" value={form.brewStyle} onChange={(value) => setForm((state) => ({ ...state, brewStyle: value }))}>
                <option>Espresso / Moka Pot</option>
                <option>French Press</option>
                <option>Pour-Over</option>
                <option>Cold Brew</option>
                <option>Milk-based coffee</option>
                <option>Still exploring</option>
              </SelectField>
              <SelectField label="Coffee rhythm" value={form.coffeeFrequency} onChange={(value) => setForm((state) => ({ ...state, coffeeFrequency: value }))}>
                <option>Daily</option>
                <option>Several times a week</option>
                <option>Weekends / ritual occasions</option>
                <option>Occasionally</option>
              </SelectField>
              <SelectField label="Primary interest" value={form.interest} onChange={(value) => setForm((state) => ({ ...state, interest: value }))}>
                <option>Amazon launch & product access</option>
                <option>Private home coffee ritual</option>
                <option>Recipes & cognitive coffee intelligence</option>
                <option>Gifting</option>
                <option>Office / team coffee</option>
                <option>All Baristo updates</option>
              </SelectField>
              <div className="sm:col-span-2">
                <Field label="Role / identity (optional)" value={form.role} onChange={(value) => setForm((state) => ({ ...state, role: value }))} placeholder="Founder, researcher, creator, professional, student…" />
              </div>
            </div>

            <label className="sr-only" aria-hidden="true">
              Company
              <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(event) => setForm((state) => ({ ...state, company: event.target.value }))} />
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-rosegold/15 bg-white/55 p-4 text-xs leading-6 text-espresso/65">
              <input
                required
                type="checkbox"
                checked={form.marketingConsent}
                onChange={(event) => setForm((state) => ({ ...state, marketingConsent: event.target.checked }))}
                className="mt-1 h-4 w-4 shrink-0 accent-[#b77054]"
              />
              <span>
                I agree to receive Baristo launch, product, recipe, educational and promotional communication by email and, where appropriate, phone/WhatsApp. I can unsubscribe at any time. This signup is not a reservation or purchase.
              </span>
            </label>

            {status === "error" && (
              <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                <p>{message}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a href={fallbackMailto} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-xs font-semibold">
                    <Mail className="h-4 w-4" /> Join by email
                  </a>
                  <button type="button" onClick={copyLead} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-xs font-semibold">
                    <Copy className="h-4 w-4" /> {copied ? "Details copied" : "Copy signup details"}
                  </button>
                </div>
              </div>
            )}

            <button
              disabled={status === "submitting"}
              className="smallcaps inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-gradient-rose px-6 py-4 text-xs font-bold text-espresso shadow-rose disabled:cursor-wait disabled:opacity-60"
            >
              {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Joining First Pour</> : "Enter the First Pour Circle"}
            </button>
            <p className="text-center text-[11px] leading-5 text-espresso/45">
              Your data is used for Baristo communication and segmentation. It is not a reservation, payment or confirmed order.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  ...inputProps
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type" | "required">) {
  return (
    <label className="block text-xs font-semibold text-espresso/75">
      {label}{required && <span aria-hidden="true"> *</span>}
      <input
        {...inputProps}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-md border border-rosegold/20 bg-white/85 px-3 text-sm text-espresso outline-none transition focus:border-rosegold focus:ring-2 focus:ring-rosegold/15"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  required,
  children,
  ...selectProps
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  children: React.ReactNode;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange" | "required">) {
  return (
    <label className="block text-xs font-semibold text-espresso/75">
      {label}{required && <span aria-hidden="true"> *</span>}
      <select
        {...selectProps}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-md border border-rosegold/20 bg-white/85 px-3 text-sm text-espresso outline-none transition focus:border-rosegold focus:ring-2 focus:ring-rosegold/15"
      >
        {children}
      </select>
    </label>
  );
}

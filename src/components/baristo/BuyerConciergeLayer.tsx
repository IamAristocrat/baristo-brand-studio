import { useEffect, useMemo, useState } from "react";
import type { FormEvent, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { CheckCircle2, Copy, Loader2, Mail, MessageCircleQuestion, X } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type InquiryForm = {
  name: string;
  email: string;
  phone: string;
  city: string;
  postalCode: string;
  preferredRoast: string;
  topic: string;
  question: string;
  company: string;
};

const initialForm: InquiryForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  postalCode: "",
  preferredRoast: "Not sure yet",
  topic: "Which roast should I choose?",
  question: "",
  company: "",
};

function inquiryText(form: InquiryForm) {
  return [
    "Baristo buyer inquiry",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone || "Not provided"}`,
    `City: ${form.city || "Not provided"}`,
    `Postal code: ${form.postalCode || "Not provided"}`,
    `Preferred roast: ${form.preferredRoast}`,
    `Topic: ${form.topic}`,
    "",
    "Question:",
    form.question,
  ].join("\n");
}

export function BuyerConciergeLayer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [inquiryId, setInquiryId] = useState("");
  const [acknowledgementSent, setAcknowledgementSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const fallbackText = useMemo(() => inquiryText(form), [form]);
  const fallbackMailto = useMemo(() => {
    const subject = encodeURIComponent(`Baristo buyer question — ${form.topic}`);
    const body = encodeURIComponent(fallbackText);
    return `mailto:support@baristo.online?subject=${subject}&body=${body}`;
  }, [fallbackText, form.topic]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const label = anchor.textContent?.replace(/\s+/g, " ").trim() ?? "";
      if (!anchor.dataset.baristoInquiry && !/ask baristo|roast concierge|ask about this roast|need help choosing/i.test(label)) return;
      event.preventDefault();

      const roast = anchor.dataset.inquiryRoast;
      setForm((state) => ({
        ...state,
        preferredRoast:
          roast === "Noble Dark" || roast === "Truly Dark" ? roast : state.preferredRoast,
      }));
      setOpen(true);
      setStatus("idle");
      setMessage("");
      setInquiryId("");
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
    setInquiryId("");
    setAcknowledgementSent(false);
    setCopied(false);
  }

  async function copyInquiry() {
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
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          page: window.location.href,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        inquiryId?: string;
        acknowledgementSent?: boolean;
        message?: string;
      };
      if (!response.ok || !data.ok) throw new Error(data.message || "Your question could not be submitted.");
      setInquiryId(data.inquiryId || "");
      setAcknowledgementSent(Boolean(data.acknowledgementSent));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your question could not be submitted.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-obsidian/82 px-3 py-4 backdrop-blur-md sm:px-5 sm:py-7"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="buyer-concierge-title"
        className="premium-dialog max-h-full w-full max-w-3xl overflow-y-auto rounded-[1.4rem] border border-rosegold/30 bg-ivory shadow-luxe"
      >
        <div className="sticky top-0 z-20 flex items-start justify-between border-b border-rosegold/20 bg-ivory/98 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
          <div>
            <p className="smallcaps text-[10px] text-rosegold-light">Private buyer concierge</p>
            <h2 id="buyer-concierge-title" className="mt-1 font-display text-3xl font-semibold text-espresso sm:text-4xl">
              Ask Baristo
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={status === "submitting"}
            aria-label="Close buyer concierge"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rosegold/25 bg-white/65 text-espresso transition hover:bg-champagne/40 disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 py-12 text-center sm:px-12 sm:py-16">
            <CheckCircle2 className="mx-auto h-12 w-12 text-rosegold-light" />
            <h3 className="mt-5 font-display text-4xl font-semibold text-espresso sm:text-5xl">Your question is with Baristo.</h3>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-espresso/78">
              Reference <strong>{inquiryId}</strong>. Your message has reached support@baristo.online.
              {acknowledgementSent
                ? " We also sent you the Baristo Private Buyer Brief with roast specifications, product guidance and direct links."
                : " Your inquiry is recorded even though the automatic buyer brief could not be delivered."}
            </p>
            <p className="mx-auto mt-4 max-w-lg text-xs leading-6 text-espresso/60">
              Reply to the buyer brief at any time to continue directly with Baristo.
            </p>
            <button type="button" onClick={close} className="smallcaps mt-8 rounded-sm bg-gradient-rose px-8 py-3 text-xs font-bold text-espresso shadow-rose">
              Return to Baristo
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-7 px-5 py-6 sm:px-8 sm:py-8">
            <div className="rounded-2xl border border-rosegold/22 bg-gradient-to-br from-white via-ivory to-champagne/45 p-5 shadow-card-luxe">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-obsidian text-ivory">
                  <MessageCircleQuestion className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold text-espresso">Ask before you reserve.</p>
                  <p className="mt-2 text-xs leading-6 text-espresso/72">
                    Ask about Noble Dark, Truly Dark, roast architecture, brewing, On-Demand Batch availability, delivery or gifting. Your question goes to support@baristo.online, and your email receives an immediate buyer brief while Baristo can continue the conversation.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required value={form.name} onChange={(value) => setForm((state) => ({ ...state, name: value }))} autoComplete="name" />
              <Field label="Email address" required type="email" value={form.email} onChange={(value) => setForm((state) => ({ ...state, email: value }))} autoComplete="email" />
              <Field label="Mobile / WhatsApp (optional)" value={form.phone} onChange={(value) => setForm((state) => ({ ...state, phone: value }))} autoComplete="tel" inputMode="tel" />
              <Field label="City (optional)" value={form.city} onChange={(value) => setForm((state) => ({ ...state, city: value }))} autoComplete="address-level2" />
              <Field label="PIN code (optional)" value={form.postalCode} onChange={(value) => setForm((state) => ({ ...state, postalCode: value }))} autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} />

              <SelectField label="Roast you are considering" value={form.preferredRoast} onChange={(value) => setForm((state) => ({ ...state, preferredRoast: value }))}>
                <option>Noble Dark</option>
                <option>Truly Dark</option>
                <option>Both</option>
                <option>Not sure yet</option>
              </SelectField>

              <div className="sm:col-span-2">
                <SelectField label="What would you like help with?" value={form.topic} onChange={(value) => setForm((state) => ({ ...state, topic: value }))}>
                  <option>Which roast should I choose?</option>
                  <option>Roast specifications and science</option>
                  <option>Brewing and recipes</option>
                  <option>On-Demand Batch and delivery</option>
                  <option>Gifting or multiple packs</option>
                  <option>Product and packaging questions</option>
                  <option>Other</option>
                </SelectField>
              </div>

              <div className="sm:col-span-2">
                <TextArea
                  label="Your question"
                  required
                  value={form.question}
                  onChange={(value) => setForm((state) => ({ ...state, question: value }))}
                  placeholder="Example: I use a moka pot and prefer low acidity with a dense body. Which roast should I reserve, and how should I brew it?"
                />
              </div>
            </div>

            <label className="sr-only" aria-hidden="true">
              Company
              <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(event) => setForm((state) => ({ ...state, company: event.target.value }))} />
            </label>

            {status === "error" && (
              <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                <p>{message}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a href={fallbackMailto} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-xs font-semibold">
                    <Mail className="h-4 w-4" /> Ask by email
                  </a>
                  <button type="button" onClick={copyInquiry} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-xs font-semibold">
                    <Copy className="h-4 w-4" /> {copied ? "Question copied" : "Copy question"}
                  </button>
                </div>
              </div>
            )}

            <button
              disabled={status === "submitting"}
              className="smallcaps inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-gradient-rose px-6 py-4 text-xs font-bold text-espresso shadow-rose disabled:cursor-wait disabled:opacity-60"
            >
              {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending to Baristo</> : "Send My Question"}
            </button>
            <p className="text-center text-[11px] leading-5 text-espresso/58">
              This form is for product and purchase guidance. It does not create a reservation or collect payment.
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
    <label className="block text-xs font-semibold text-espresso/82">
      {label}{required && <span aria-hidden="true"> *</span>}
      <input
        {...inputProps}
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-md border border-rosegold/28 bg-white px-3 text-sm text-espresso outline-none transition focus:border-rosegold focus:ring-2 focus:ring-rosegold/20"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
  ...selectProps
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange">) {
  return (
    <label className="block text-xs font-semibold text-espresso/82">
      {label}
      <select
        {...selectProps}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-md border border-rosegold/28 bg-white px-3 text-sm text-espresso outline-none transition focus:border-rosegold focus:ring-2 focus:ring-rosegold/20"
      >
        {children}
      </select>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
  ...textareaProps
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "required">) {
  return (
    <label className="block text-xs font-semibold text-espresso/82">
      {label}{required && <span aria-hidden="true"> *</span>}
      <textarea
        {...textareaProps}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        minLength={8}
        maxLength={1600}
        className="mt-2 w-full resize-y rounded-md border border-rosegold/28 bg-white px-3 py-3 text-sm leading-6 text-espresso outline-none transition focus:border-rosegold focus:ring-2 focus:ring-rosegold/20"
      />
    </label>
  );
}

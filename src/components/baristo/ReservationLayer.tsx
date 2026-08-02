import { useEffect, useMemo, useState } from "react";
import type { FormEvent, InputHTMLAttributes } from "react";
import { CheckCircle2, Copy, Loader2, Mail, Minus, Plus, X } from "lucide-react";

const UNIT_PRICE = 4279;
const PACK = "12 oz / 340 g";

type RoastName = "Noble Dark" | "Truly Dark";
type SubmitStatus = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  quantity: number;
  consent: boolean;
  company: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  quantity: 1,
  consent: false,
  company: "",
};

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function reservationText(roast: RoastName, form: FormState, total: number) {
  return [
    `Product: ${roast}`,
    `Pack: ${PACK}`,
    `Quantity: ${form.quantity}`,
    `Provisional total: ${formatInr(total)}`,
    "",
    `Customer: ${form.name}`,
    `Email: ${form.email}`,
    `Mobile: ${form.phone}`,
    `Address: ${form.address}, ${form.city}, ${form.state} ${form.postalCode}`,
    "",
    "Status requested: Pending availability, delivery and payment verification",
  ].join("\n");
}

export function ReservationLayer() {
  const [roast, setRoast] = useState<RoastName | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [acknowledgementSent, setAcknowledgementSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const total = useMemo(() => UNIT_PRICE * form.quantity, [form.quantity]);
  const fallbackText = useMemo(
    () => (roast ? reservationText(roast, form, total) : ""),
    [roast, form, total],
  );
  const fallbackMailto = useMemo(() => {
    if (!roast) return "mailto:support@baristo.online";
    const subject = encodeURIComponent(`Baristo reservation request — ${roast}`);
    const body = encodeURIComponent(fallbackText);
    return `mailto:support@baristo.online?subject=${subject}&body=${body}`;
  }, [roast, fallbackText]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const label = anchor.textContent?.trim() ?? "";
      if (!label.startsWith("Reserve ")) return;
      event.preventDefault();
      const selected: RoastName = label.includes("Truly Dark") ? "Truly Dark" : "Noble Dark";
      setRoast(selected);
      setStatus("idle");
      setMessage("");
      setReservationId("");
      setAcknowledgementSent(false);
      setCopied(false);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!roast) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "submitting") setRoast(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [roast, status]);

  function close() {
    if (status === "submitting") return;
    setRoast(null);
    setForm(initialForm);
    setStatus("idle");
    setMessage("");
    setReservationId("");
    setAcknowledgementSent(false);
    setCopied(false);
  }

  async function copyReservation() {
    try {
      await navigator.clipboard.writeText(fallbackText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!roast) return;
    setStatus("submitting");
    setMessage("");
    setCopied(false);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          roast,
          pack: PACK,
          unitPrice: UNIT_PRICE,
          page: window.location.href,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        reservationId?: string;
        acknowledgementSent?: boolean;
        code?: string;
        message?: string;
      };
      if (!response.ok || !data.ok) throw new Error(data.message || "Reservation could not be submitted.");
      setReservationId(data.reservationId || "");
      setAcknowledgementSent(Boolean(data.acknowledgementSent));
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Reservation could not be submitted.");
    }
  }

  if (!roast) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/75 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        className="max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl border border-rosegold/30 bg-ivory shadow-luxe"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-rosegold/15 bg-ivory/95 px-5 py-4 backdrop-blur-xl sm:px-7">
          <div>
            <p className="smallcaps text-[10px] text-rosegold-light">Private reservation</p>
            <h2 id="reservation-title" className="mt-1 font-display text-3xl font-semibold text-espresso">
              Reserve {roast}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            disabled={status === "submitting"}
            aria-label="Close reservation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-rosegold/20 text-espresso hover:bg-champagne/35 disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 py-12 text-center sm:px-10">
            <CheckCircle2 className="mx-auto h-12 w-12 text-rosegold-light" />
            <h3 className="mt-5 font-display text-4xl font-semibold text-espresso">Reservation received.</h3>
            <p className="mt-4 text-sm leading-7 text-espresso/65">
              Reference <strong>{reservationId}</strong>. Baristo received your reservation at support@baristo.online.
              {acknowledgementSent
                ? " An acknowledgement was sent to the email address provided."
                : " The customer acknowledgement could not be delivered, but your reservation is recorded."}
            </p>
            <div className="mx-auto mt-7 max-w-md rounded-xl border border-rosegold/18 bg-white/65 p-5 text-left text-sm leading-7 text-espresso/70">
              <p><strong>{roast}</strong> · {PACK}</p>
              <p>Quantity: {form.quantity}</p>
              <p>Provisional merchandise total: {formatInr(total)}</p>
              <p className="mt-3 text-xs text-espresso/50">
                This reservation is not a confirmed order. Baristo will verify availability, delivery and payment before dispatch.
              </p>
            </div>
            <button type="button" onClick={close} className="smallcaps mt-8 rounded-sm bg-gradient-rose px-7 py-3 text-xs font-bold text-espresso shadow-rose">
              Return to Baristo
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6 px-5 py-6 sm:px-7">
            <div className="rounded-xl border border-rosegold/18 bg-white/65 p-4 text-sm text-espresso/70">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <strong className="font-display text-xl text-espresso">{roast}</strong>
                  <p className="text-xs">{PACK} · {formatInr(UNIT_PRICE)} per pack</p>
                </div>
                <div className="flex items-center rounded-full border border-rosegold/25 bg-ivory">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setForm((value) => ({ ...value, quantity: Math.max(1, value.quantity - 1) }))} className="flex h-9 w-9 items-center justify-center">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-8 text-center font-semibold">{form.quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setForm((value) => ({ ...value, quantity: Math.min(10, value.quantity + 1) }))} className="flex h-9 w-9 items-center justify-center">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <p className="mt-3 border-t border-rosegold/12 pt-3">
                <strong>Provisional total: {formatInr(total)}</strong>{" "}
                <span className="text-xs opacity-60">before any confirmed delivery charge</span>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required value={form.name} onChange={(value) => setForm((state) => ({ ...state, name: value }))} autoComplete="name" />
              <Field label="Mobile number" required value={form.phone} onChange={(value) => setForm((state) => ({ ...state, phone: value }))} autoComplete="tel" inputMode="tel" />
              <div className="sm:col-span-2"><Field label="Email address" required type="email" value={form.email} onChange={(value) => setForm((state) => ({ ...state, email: value }))} autoComplete="email" /></div>
              <div className="sm:col-span-2"><Field label="Shipping address" required value={form.address} onChange={(value) => setForm((state) => ({ ...state, address: value }))} autoComplete="street-address" /></div>
              <Field label="City" required value={form.city} onChange={(value) => setForm((state) => ({ ...state, city: value }))} autoComplete="address-level2" />
              <Field label="State" required value={form.state} onChange={(value) => setForm((state) => ({ ...state, state: value }))} autoComplete="address-level1" />
              <Field label="Postal code" required value={form.postalCode} onChange={(value) => setForm((state) => ({ ...state, postalCode: value }))} autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" />
            </div>

            <label className="sr-only" aria-hidden="true">
              Company
              <input tabIndex={-1} autoComplete="off" value={form.company} onChange={(event) => setForm((state) => ({ ...state, company: event.target.value }))} />
            </label>

            <label className="flex items-start gap-3 text-xs leading-6 text-espresso/65">
              <input required type="checkbox" checked={form.consent} onChange={(event) => setForm((state) => ({ ...state, consent: event.target.checked }))} className="mt-1 h-4 w-4 accent-[#b77054]" />
              <span>I consent to Baristo contacting me about this reservation, availability, delivery and payment. I understand this submission is not a confirmed order.</span>
            </label>

            {status === "error" && (
              <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                <p>{message}</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a href={fallbackMailto} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-xs font-semibold">
                    <Mail className="h-4 w-4" /> Email completed reservation
                  </a>
                  <button type="button" onClick={copyReservation} className="inline-flex items-center justify-center gap-2 rounded-md border border-red-300 bg-white px-4 py-2 text-xs font-semibold">
                    <Copy className="h-4 w-4" /> {copied ? "Details copied" : "Copy reservation details"}
                  </button>
                </div>
              </div>
            )}

            <button disabled={status === "submitting"} className="smallcaps inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-rose px-6 py-4 text-xs font-bold text-espresso shadow-rose disabled:cursor-wait disabled:opacity-60">
              {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending reservation</> : `Submit reservation · ${formatInr(total)}`}
            </button>
            <p className="text-center text-[11px] leading-5 text-espresso/45">
              No payment is collected on this page. Baristo sends a secure payment link only after verification.
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
        className="mt-2 h-12 w-full rounded-md border border-rosegold/20 bg-white px-3 text-sm text-espresso outline-none transition focus:border-rosegold focus:ring-2 focus:ring-rosegold/15"
      />
    </label>
  );
}

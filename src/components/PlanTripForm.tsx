import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { CONTACT, destinations, whatsappLink } from "@/lib/site-data";

const tripTypes = ["Trek", "Women-Only", "Weekend Escape", "Beach Camping", "Heritage Walk", "Corporate"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function PlanTripForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({
    name: "",
    dates: "",
    region: "",
    type: "",
    month: "",
    group: "",
    notes: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = [
      `Hi ${CONTACT.brand}! I'd like to plan a trip.`,
      form.name && `Name: ${form.name}`,
      form.dates && `Preferred dates: ${form.dates}`,
      form.region && `Region: ${form.region}`,
      form.type && `Trip type: ${form.type}`,
      form.month && `Month: ${form.month}`,
      form.group && `Group size: ${form.group}`,
      form.notes && `Notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join("\n");
    toast.success("Sending your request to our team on WhatsApp…");
    window.open(whatsappLink(message), "_blank", "noreferrer");
  };

  const field =
    "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring/50";

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      {!compact && (
        <input
          className={field}
          placeholder="Your name"
          value={form.name}
          onChange={set("name")}
          required
        />
      )}
      <input
        className={field}
        type="date"
        aria-label="Preferred dates"
        value={form.dates}
        onChange={set("dates")}
      />
      <select className={field} value={form.region} onChange={set("region")}>
        <option value="">Select region</option>
        {destinations.map((d) => (
          <option key={d.slug}>{d.name}</option>
        ))}
      </select>
      <select className={field} value={form.type} onChange={set("type")}>
        <option value="">Select trip type</option>
        {tripTypes.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <select className={field} value={form.month} onChange={set("month")}>
        <option value="">Select month</option>
        {months.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>
      <input
        className={field}
        placeholder="Number of travelers"
        inputMode="numeric"
        value={form.group}
        onChange={set("group")}
      />
      <textarea
        className={`${field} sm:col-span-2`}
        rows={3}
        placeholder="E.g. Budget, food preference, etc."
        value={form.notes}
        onChange={set("notes")}
      />
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-forest-deep sm:col-span-2"
      >
        Plan My Trip
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

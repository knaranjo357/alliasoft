import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, CheckCircle2, Clock3, ExternalLink, Loader2, RefreshCw, Video } from 'lucide-react';

type Slot = {
  start: string;
  end: string;
  label: string;
};

type BookingResult = {
  ok?: boolean;
  meet_url?: string;
  calendar_url?: string;
  error?: string;
};

const content = {
  es: {
    tag: 'AGENDA DIRECTA',
    title: 'Escoge un espacio de 30 minutos con el equipo',
    body: 'Consulta la disponibilidad real del calendario. Al confirmar, recibirás la invitación y el enlace de Google Meet cuando la cuenta lo permita.',
    open: 'Ver horarios disponibles',
    loading: 'Consultando disponibilidad…',
    unavailable: 'No pudimos consultar la agenda. Puedes continuar por WhatsApp y coordinaremos el espacio contigo.',
    empty: 'No hay espacios disponibles en los próximos días. Escríbenos y buscaremos otra alternativa.',
    choose: 'Selecciona un horario',
    name: 'Nombre completo',
    email: 'Correo para la invitación',
    phone: 'WhatsApp o teléfono',
    company: 'Empresa (opcional)',
    context: '¿Qué te gustaría revisar? (opcional)',
    consent: 'Autorizo el tratamiento de mis datos para gestionar la reunión conforme al Aviso de Privacidad y la Política de Tratamiento de Datos.',
    confirm: 'Confirmar reunión de 30 minutos',
    booking: 'Confirmando el espacio…',
    success: 'Reunión confirmada',
    successBody: 'El evento quedó reservado. Revisa tu correo para aceptar la invitación.',
    meet: 'Abrir Google Meet',
    conflict: 'Ese espacio acaba de ocuparse. Actualiza la disponibilidad y elige otro horario.',
    retry: 'Actualizar horarios',
  },
  en: {
    tag: 'DIRECT SCHEDULING',
    title: 'Choose a 30-minute slot with the team',
    body: 'Check real calendar availability. Once confirmed, you will receive an invitation and a Google Meet link when the account supports it.',
    open: 'View available times',
    loading: 'Checking availability…',
    unavailable: 'We could not load the calendar. Continue on WhatsApp and we will coordinate a time with you.',
    empty: 'There are no available times in the next few days. Message us and we will find another option.',
    choose: 'Choose a time',
    name: 'Full name',
    email: 'Email for the invitation',
    phone: 'WhatsApp or phone',
    company: 'Company (optional)',
    context: 'What would you like to discuss? (optional)',
    consent: 'I authorize the processing of my data to manage this meeting under the Privacy Notice and Personal Data Processing Policy.',
    confirm: 'Confirm 30-minute meeting',
    booking: 'Confirming the time…',
    success: 'Meeting confirmed',
    successBody: 'The event has been booked. Check your email to accept the invitation.',
    meet: 'Open Google Meet',
    conflict: 'That time was just booked. Refresh availability and choose another slot.',
    retry: 'Refresh times',
  },
};

const BookingScheduler: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'es';
  const text = content[language];
  const [isOpen, setIsOpen] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [result, setResult] = useState<BookingResult | null>(null);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', company: '', message: '', consent: false });

  const loadSlots = async () => {
    setIsOpen(true);
    setIsLoading(true);
    setLoadFailed(false);
    setBookingError('');
    try {
      const response = await fetch('/api/availability');
      const data = (await response.json()) as { slots?: Slot[] };
      if (!response.ok || !Array.isArray(data.slots)) throw new Error('availability_failed');
      setSlots(data.slots);
      setSelectedSlot((current) => data.slots?.find((slot) => slot.start === current?.start) || null);
    } catch {
      setLoadFailed(true);
      setSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitBooking = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedSlot || !form.consent || isBooking) return;
    setIsBooking(true);
    setBookingError('');
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          lead_id: window.crypto?.randomUUID?.() || `booking-${Date.now()}`,
          service: 'Reunión de diagnóstico desde alliasoft.com',
          start: selectedSlot.start,
          end: selectedSlot.end,
          consent_at: new Date().toISOString(),
        }),
      });
      const data = (await response.json()) as BookingResult;
      if (!response.ok || !data.ok) throw new Error(data.error || 'booking_failed');
      setResult(data);
    } catch {
      setBookingError(text.conflict);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <section id="booking" className="mt-16 rounded-[2rem] border border-cyan-400/15 bg-cyan-400/[0.045] p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-300">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {text.tag}
          </span>
          <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">{text.title}</h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">{text.body}</p>
          {!isOpen ? (
            <button type="button" onClick={() => void loadSlots()} className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-200">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              {text.open}
            </button>
          ) : null}
        </div>

        {isOpen ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 sm:p-6">
            {result?.ok ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-300" aria-hidden="true" />
                <h4 className="mt-4 text-xl font-extrabold text-white">{text.success}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">{text.successBody}</p>
                {result.meet_url ? (
                  <a href={result.meet_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-extrabold text-slate-950">
                    <Video className="h-4 w-4" aria-hidden="true" />
                    {text.meet}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : isLoading ? (
              <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-slate-300">
                <Loader2 className="h-5 w-5 animate-spin text-cyan-300" aria-hidden="true" />
                {text.loading}
              </div>
            ) : loadFailed || slots.length === 0 ? (
              <div className="py-6 text-center">
                <p className="text-sm leading-6 text-slate-400">{loadFailed ? text.unavailable : text.empty}</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => void loadSlots()} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-bold text-slate-200">
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    {text.retry}
                  </button>
                  <a href="https://wa.me/573176964215" target="_blank" rel="noreferrer" className="rounded-full bg-emerald-400 px-4 py-2.5 text-xs font-extrabold text-slate-950">WhatsApp</a>
                </div>
              </div>
            ) : (
              <form onSubmit={submitBooking} className="space-y-5">
                <fieldset>
                  <legend className="mb-3 text-sm font-bold text-white">{text.choose}</legend>
                  <div className="grid max-h-52 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                    {slots.map((slot) => (
                      <button key={slot.start} type="button" onClick={() => setSelectedSlot(slot)} className={`rounded-xl border px-3 py-3 text-left text-xs font-bold transition ${selectedSlot?.start === slot.start ? 'border-cyan-300 bg-cyan-300 text-slate-950' : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/40'}`}>
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input required value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} placeholder={text.name} aria-label={text.name} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white" />
                  <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder={text.email} aria-label={text.email} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white" />
                  <input required type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder={text.phone} aria-label={text.phone} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white" />
                  <input value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder={text.company} aria-label={text.company} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white" />
                </div>
                <textarea rows={3} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder={text.context} aria-label={text.context} className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white" />
                <label className="flex items-start gap-3 text-xs leading-5 text-slate-400">
                  <input type="checkbox" required checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-0.5 h-4 w-4 accent-cyan-400" />
                  <span>{text.consent}</span>
                </label>
                {bookingError ? <p className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-xs text-amber-200">{bookingError}</p> : null}
                <button type="submit" disabled={!selectedSlot || !form.consent || isBooking} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">
                  {isBooking ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CalendarDays className="h-4 w-4" aria-hidden="true" />}
                  {isBooking ? text.booking : text.confirm}
                </button>
              </form>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default BookingScheduler;

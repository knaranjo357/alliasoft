function getWebhookUrl() {
  if (process.env.N8N_BOOKING_WEBHOOK_URL) return process.env.N8N_BOOKING_WEBHOOK_URL;
  if (!process.env.N8N_BASE_URL) return '';
  return `${process.env.N8N_BASE_URL.replace(/\/$/, '')}/webhook/alliasoft/webpage/booking`;
}

function clean(value, maxLength = 1000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') return response.status(405).json({ ok: false, error: 'method_not_allowed' });

  const body = request.body || {};
  const booking = {
    lead_id: clean(body.lead_id, 120),
    full_name: clean(body.full_name, 160),
    email: clean(body.email, 200),
    phone: clean(body.phone, 80),
    company: clean(body.company, 200),
    service: clean(body.service, 240),
    message: clean(body.message, 3000),
    start: clean(body.start, 80),
    end: clean(body.end, 80),
    timezone: 'America/Bogota',
    consent: body.consent === true,
    consent_at: clean(body.consent_at, 80) || new Date().toISOString(),
  };

  if (!booking.full_name || !booking.email || !booking.phone || !booking.start || !booking.end || !booking.consent) {
    return response.status(400).json({ ok: false, error: 'missing_required_fields' });
  }

  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) return response.status(503).json({ ok: false, error: 'calendar_not_configured' });

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (process.env.N8N_WEBHOOK_TOKEN) headers['X-Alliasoft-Webhook-Token'] = process.env.N8N_WEBHOOK_TOKEN;
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(booking),
    });
    const result = await upstream.json().catch(() => ({}));
    return response.status(upstream.ok ? 200 : 409).json(result);
  } catch {
    return response.status(502).json({ ok: false, error: 'calendar_unavailable' });
  }
}

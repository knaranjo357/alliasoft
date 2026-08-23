const MAX_TEXT_LENGTH = 4000;

function getWebhookUrl() {
  if (process.env.N8N_LEADS_WEBHOOK_URL) return process.env.N8N_LEADS_WEBHOOK_URL;
  if (!process.env.N8N_BASE_URL) return '';
  return `${process.env.N8N_BASE_URL.replace(/\/$/, '')}/webhook/alliasoft/webpage`;
}

function clean(value, maxLength = MAX_TEXT_LENGTH) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') return response.status(405).json({ ok: false, error: 'method_not_allowed' });

  const body = request.body || {};
  if (body.company_website) return response.status(200).json({ ok: true });

  const lead = {
    lead_id: clean(body.lead_id, 120),
    created_at: clean(body.created_at, 80) || new Date().toISOString(),
    source: clean(body.source, 120) || 'alliasoft_webpage',
    locale: clean(body.locale, 10) || 'es',
    full_name: clean(body.full_name, 160),
    email: clean(body.email, 200),
    phone: clean(body.phone, 80),
    company: clean(body.company, 200),
    service: clean(body.service, 240),
    message: clean(body.message),
    page_url: clean(body.page_url, 1000),
    referrer: clean(body.referrer, 1000),
    utm_source: clean(body.utm_source, 200),
    utm_medium: clean(body.utm_medium, 200),
    utm_campaign: clean(body.utm_campaign, 200),
    utm_content: clean(body.utm_content, 200),
    utm_term: clean(body.utm_term, 200),
    consent: body.consent === true,
    consent_at: clean(body.consent_at, 80),
    whatsapp_opened: body.whatsapp_opened === true,
    user_agent: clean(request.headers['user-agent'], 500),
  };

  if (!lead.lead_id || !lead.full_name || !lead.email || !lead.phone || !lead.message || !lead.consent) {
    return response.status(400).json({ ok: false, error: 'missing_required_fields' });
  }

  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) return response.status(503).json({ ok: false, error: 'lead_service_not_configured' });

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (process.env.N8N_WEBHOOK_TOKEN) headers['X-Alliasoft-Webhook-Token'] = process.env.N8N_WEBHOOK_TOKEN;

    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(lead),
    });
    const result = await upstream.json().catch(() => ({}));
    return response.status(upstream.ok ? 200 : 502).json({ ok: upstream.ok, lead_id: lead.lead_id, upstream: result });
  } catch {
    return response.status(502).json({ ok: false, error: 'lead_service_unavailable' });
  }
}

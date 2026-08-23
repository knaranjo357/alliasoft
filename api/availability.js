function getWebhookUrl() {
  if (process.env.N8N_AVAILABILITY_WEBHOOK_URL) return process.env.N8N_AVAILABILITY_WEBHOOK_URL;
  if (!process.env.N8N_BASE_URL) return '';
  return `${process.env.N8N_BASE_URL.replace(/\/$/, '')}/webhook/alliasoft/webpage/availability`;
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'GET') return response.status(405).json({ ok: false, error: 'method_not_allowed' });

  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) return response.status(503).json({ ok: false, error: 'calendar_not_configured', slots: [] });

  try {
    const headers = {};
    if (process.env.N8N_WEBHOOK_TOKEN) headers['X-Alliasoft-Webhook-Token'] = process.env.N8N_WEBHOOK_TOKEN;
    const upstream = await fetch(webhookUrl, { headers });
    const result = await upstream.json().catch(() => ({ slots: [] }));
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    return response.status(upstream.ok ? 200 : 502).json(result);
  } catch {
    return response.status(502).json({ ok: false, error: 'calendar_unavailable', slots: [] });
  }
}

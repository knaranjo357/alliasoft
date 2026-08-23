# Base de captación de Alliasoft

Puedes usar un único Google Sheet o Excel llamado `Alliasoft CRM básico`. Las dos primeras hojas son obligatorias; las demás son opcionales.

## 1. Hoja `Leads` — obligatoria

Copia esta línea en la celda A1:

```text
lead_id	created_at	status	source	locale	full_name	email	phone	company	service	message	page_url	referrer	utm_source	utm_medium	utm_campaign	utm_content	utm_term	consent	consent_at	whatsapp_opened	user_agent	assigned_to	next_follow_up	last_contact_at	notes
```

- `lead_id` evita duplicados si el navegador reintenta guardar el formulario.
- Valor inicial de `status`: `Nuevo`.
- `next_follow_up`, `last_contact_at`, `assigned_to` y `notes` se completan manualmente.
- Crea un filtro en la fila 1 y congélala.

## 2. Hoja `Agenda` — obligatoria para reservas

Copia esta línea en A1:

```text
booking_id	created_at	lead_id	status	start	end	timezone	full_name	email	phone	company	service	message	calendar_event_id	calendar_url	meet_url	consent	consent_at	notes
```

- Valor inicial de `status`: `Confirmada`.
- El flujo guarda aquí el identificador de Calendar y el enlace de Meet cuando Google lo entrega.

## 3. Hoja `Catalogos` — opcional

Copia esta línea en A1:

```text
tipo	valor	orden	activo
```

Valores iniciales recomendados:

```text
estado_lead	Nuevo	1	SI
estado_lead	Contactado	2	SI
estado_lead	Calificado	3	SI
estado_lead	Propuesta	4	SI
estado_lead	Ganado	5	SI
estado_lead	Perdido	6	SI
estado_agenda	Confirmada	1	SI
estado_agenda	Realizada	2	SI
estado_agenda	Cancelada	3	SI
```

## 4. Hoja `Dashboard` — opcional

Indicadores recomendados: leads nuevos, leads contactados, reuniones confirmadas, propuestas y negocios ganados. Esta hoja no la usa n8n; sirve únicamente para seguimiento.

## Configuración mínima en n8n

1. Crea las hojas y encabezados exactamente como aparecen arriba.
2. Importa los tres archivos JSON de la carpeta `n8n`.
3. En n8n crea una credencial `Header Auth`: nombre `X-Alliasoft-Webhook-Token` y como valor un secreto largo y aleatorio. Selecciónala en los tres nodos Webhook protegidos.
4. En cada nodo de Google Sheets selecciona tu credencial, el archivo `Alliasoft CRM básico` y la hoja indicada.
5. En los nodos de Google Calendar selecciona la credencial y el calendario comercial.
6. Prueba cada webhook con su URL de prueba y luego activa los tres flujos.
7. Configura `N8N_BASE_URL` y el mismo secreto como `N8N_WEBHOOK_TOKEN` en el hosting de la página. La web llamará a n8n desde funciones privadas y no expondrá la URL ni el secreto en el navegador.

## Flujo de atención sugerido

`Nuevo → Contactado → Calificado → Propuesta → Ganado/Perdido`

Regla práctica: ningún lead debe quedarse en `Nuevo` sin `assigned_to` y `next_follow_up`.

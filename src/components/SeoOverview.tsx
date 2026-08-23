import React from 'react';
import { ArrowRight, Bot, Code2, Route, Workflow } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const content = {
  es: {
    eyebrow: 'Soluciones empresariales con alcance claro',
    title: 'Tecnología útil para operaciones que ya están creciendo',
    introduction:
      'Alliasoft combina inteligencia artificial, automatización y desarrollo de software a medida. El objetivo es resolver fricciones concretas sin obligar a tu equipo a cambiar todo de una vez. Cada proyecto parte del proceso real, de las herramientas existentes y de una prioridad medible.',
    cards: [
      {
        title: 'Agentes de IA con transferencia humana',
        text: 'Diseñamos agentes para WhatsApp y web que orientan clientes, consultan información aprobada, preparan cotizaciones y recopilan datos. También definimos límites claros. Cuando una solicitud requiere criterio, negociación o una decisión sensible, la conversación pasa a una persona con el contexto necesario para continuar.',
      },
      {
        title: 'Software a medida para tu operación',
        text: 'Construimos plataformas para pedidos, clientes, inventarios, trazabilidad y flujos internos. La interfaz sigue la forma en que trabaja el equipo. Antes de escribir código revisamos usuarios, permisos, datos e integraciones. Así evitamos funciones decorativas y concentramos la inversión en los pasos que sostienen la operación diaria.',
      },
      {
        title: 'Automatización e integraciones confiables',
        text: 'Conectamos WhatsApp, formularios, correo, CRM, ERP, facturación y bases de datos para reducir la doble digitación. Cada automatización incluye reglas de validación y rutas de excepción. La meta no es ocultar el proceso, sino hacerlo más rápido, trazable y fácil de supervisar por el equipo responsable.',
      },
      {
        title: 'Implementación por etapas y con evidencia',
        text: 'Empezamos con un diagnóstico breve y proponemos una ruta por entregables. Probamos con casos reales, recogemos observaciones y ajustamos antes de ampliar el alcance. Los plazos, el soporte y las medidas de seguridad dependen de la complejidad de cada proyecto. Todo se acuerda antes de avanzar.',
      },
    ],
    productPrefix: 'Para restaurantes y operaciones gastronómicas, conoce',
    productLink: 'AlliaFood, nuestro producto especializado',
    productSuffix: 'en pedidos, cocina, inventario, punto de venta y domicilios.',
    method: 'Ver nuestra metodología',
    experience: 'Revisar experiencia',
    legalPrefix: 'Consulta también nuestra',
    privacy: 'política de tratamiento de datos',
  },
  en: {
    eyebrow: 'Business solutions with a clear scope',
    title: 'Useful technology for operations that are already growing',
    introduction:
      'Alliasoft combines artificial intelligence, automation, and custom software development. The goal is to solve concrete friction without forcing your team to change everything at once. Every project starts with the real process, existing tools, and a measurable priority.',
    cards: [
      {
        title: 'AI agents with human handoff',
        text: 'We design WhatsApp and web agents that guide customers, consult approved information, prepare quotes, and collect data. We also define clear limits. When a request requires judgment, negotiation, or a sensitive decision, the conversation moves to a person with the context needed to continue.',
      },
      {
        title: 'Custom software for your operation',
        text: 'We build platforms for orders, customers, inventory, traceability, and internal workflows. The interface follows how the team actually works. Before writing code, we review users, permissions, data, and integrations. This avoids decorative features and focuses investment on the steps that support daily operations.',
      },
      {
        title: 'Reliable automation and integrations',
        text: 'We connect WhatsApp, forms, email, CRM, ERP, billing, and databases to reduce duplicate data entry. Every automation includes validation rules and exception paths. The goal is not to hide the process. It is to make it faster, traceable, and easier for the responsible team to supervise.',
      },
      {
        title: 'Phased implementation backed by evidence',
        text: 'We begin with a short diagnostic and propose a deliverable-based route. We test with real cases, collect feedback, and adjust before expanding scope. Timelines, support, and security measures depend on each project’s complexity. Everything is agreed before work moves forward.',
      },
    ],
    productPrefix: 'For restaurants and food-service operations, explore',
    productLink: 'AlliaFood, our specialized product',
    productSuffix: 'for orders, kitchen workflows, inventory, point of sale, and delivery.',
    method: 'See our methodology',
    experience: 'Review our experience',
    legalPrefix: 'You can also review our',
    privacy: 'personal data processing policy',
  },
} as const;

const icons = [Bot, Code2, Workflow, Route] as const;

const SeoOverview: React.FC = () => {
  const { i18n } = useTranslation();
  const copy = content[i18n.resolvedLanguage === 'en' ? 'en' : 'es'];

  return (
    <section
      id="services-overview"
      aria-labelledby="services-overview-title"
      className="relative overflow-hidden border-y border-white/[0.06] bg-slate-950 px-6 py-20 text-white sm:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(8,145,178,0.12),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-300">{copy.eyebrow}</p>
          <h2 id="services-overview-title" className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-6 text-pretty text-base leading-8 text-slate-300 sm:text-lg">{copy.introduction}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {copy.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <article key={card.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 sm:p-7">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-white">{card.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{card.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-blue-400/15 bg-blue-500/[0.06] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl leading-7 text-slate-300">
            {copy.productPrefix}{' '}
            <a className="font-extrabold text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 hover:text-cyan-200" href="https://alliafood.com" target="_blank" rel="noopener noreferrer">
              {copy.productLink}
            </a>{' '}
            {copy.productSuffix}
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white hover:border-white/30 hover:bg-white/[0.05]" href="#process">
              {copy.method}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan-300 px-5 text-sm font-extrabold text-slate-950 hover:bg-cyan-200" href="#portfolio">
              {copy.experience}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-400">
          {copy.legalPrefix}{' '}
          <a className="font-bold text-slate-200 underline underline-offset-4 hover:text-white" href="/privacy.html">
            {copy.privacy}
          </a>.
        </p>
      </div>
    </section>
  );
};

export default SeoOverview;

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Code2,
  DatabaseZap,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Search,
  ShoppingCart,
  UtensilsCrossed,
  Workflow,
} from 'lucide-react';
import LeanHeader from './components/LeanHeader';
import LeanHero from './components/LeanHero';

const SmartChatWidget = lazy(() => import('./components/SmartChatWidget'));
const WHATSAPP_URL =
  'https://wa.me/573176964215?text=Hola%20Alliasoft%2C%20quiero%20conversar%20sobre%20un%20reto%20de%20mi%20empresa.';

const content = {
  es: {
    solutions: {
      tag: 'Qué hacemos',
      title: 'IA aplicada y software construido alrededor de tu operación.',
      intro:
        'No empezamos por una herramienta. Entendemos el proceso, encontramos la fricción y construimos la solución que genera una mejora verificable.',
      items: [
        ['Agentes de IA', 'Asistentes para web y WhatsApp que responden, orientan, cotizan y califican oportunidades con el contexto de tu negocio.'],
        ['Software a medida', 'Plataformas, portales y CRM diseñados para el flujo real de tu equipo, sin obligarlo a trabajar alrededor de una plantilla.'],
        ['Automatización e integraciones', 'Conectamos datos, formularios, inventarios, facturación, ERP, CRM y canales comerciales para eliminar doble digitación.'],
        ['Experiencias web de alto rendimiento', 'Sitios y aplicaciones rápidas, accesibles y pensadas para convertir visitas en conversaciones comerciales.'],
      ],
    },
    work: {
      tag: 'Soluciones desarrolladas',
      title: 'Experiencia en múltiples plataformas y sectores.',
      intro:
        'Nuestro portafolio combina productos propios, soluciones empresariales e integraciones creadas para operaciones reales en Colombia y otros mercados.',
      items: [
        ['AlliaFood', 'Producto de Alliasoft para restaurantes: POS, comandas, cocina, inventario y domicilios en una operación conectada.', 'Producto propio', 'https://alliafood.com'],
        ['Agentes comerciales con IA', 'Atención, orientación y calificación de prospectos en canales digitales, con transferencia clara al equipo humano.', 'IA conversacional', '#contact'],
        ['Plataformas operativas', 'CRM, trazabilidad, pedidos, inventarios y paneles de control adaptados a procesos empresariales específicos.', 'Software a medida', '#contact'],
        ['Comercio digital e integraciones', 'E-commerce, automatizaciones y conexiones entre sistemas para reducir trabajo manual y mantener datos consistentes.', 'Web & automatización', '#contact'],
      ],
    },
    about: {
      tag: 'Talento tecnológico local',
      title: 'Alliasoft, inteligencia artificial y software para empresas.',
      body:
        'El equipo de Alliasoft desarrolla soluciones de inteligencia artificial, automatización y software a medida. El trabajo combina entendimiento operativo, diseño de producto e ingeniería para atender empresas en Colombia y Latinoamérica.',
      body2:
        'Cuando una empresa necesita explorar una solución, el primer paso es una conversación con el equipo. Hay personas disponibles para una reunión virtual en la que pueden conocer el problema, revisar el proceso actual y proponer una ruta realista, sin agendas automáticas ni respuestas impersonales.',
    },
    process: {
      tag: 'Cómo trabajamos',
      title: 'Del problema a una solución adoptada por el equipo.',
      steps: [
        ['01', 'Entender', 'Conversamos con las personas que viven el proceso y definimos el problema que sí vale la pena resolver.'],
        ['02', 'Diseñar', 'Convertimos necesidades, datos e integraciones en una arquitectura clara y una experiencia fácil de usar.'],
        ['03', 'Construir', 'Entregamos avances funcionales, probamos con casos reales y ajustamos con evidencia.'],
        ['04', 'Acompañar', 'Apoyamos la puesta en marcha y la evolución de la solución junto con tu equipo.'],
      ],
    },
    faq: {
      tag: 'Preguntas frecuentes',
      title: 'Respuestas directas antes de conversar.',
      items: [
        ['¿Qué tipo de empresas atiende Alliasoft?', 'Trabajamos con empresas que quieren automatizar tareas, integrar información o construir software propio. Tenemos experiencia en gastronomía, turismo, logística, comercio, equipos B2B y operaciones centradas en WhatsApp.'],
        ['¿Alliasoft está en Bucaramanga?', 'Sí. Alliasoft desarrolla tecnología desde Bucaramanga, Colombia, y puede trabajar de forma virtual con equipos en Colombia y Latinoamérica.'],
        ['¿Qué es AlliaFood?', 'AlliaFood es un producto de Alliasoft para la operación gastronómica. Integra funciones como POS, pedidos, comandas de cocina, inventario y domicilios.'],
        ['¿Puedo hablar con una persona?', 'Sí. Puedes escribir al WhatsApp +57 317 696 4215. Una persona del equipo puede conocer tu problemática y coordinar contigo una reunión virtual; el sitio no reserva horarios automáticamente.'],
        ['¿Cómo se define el costo de un proyecto?', 'Depende del alcance, las integraciones, los usuarios y el estado actual del proceso. Primero entendemos el problema y luego proponemos una solución con alcance y etapas claras.'],
      ],
    },
    contact: {
      tag: 'Hablemos',
      title: 'Cuéntanos qué está frenando hoy a tu empresa.',
      body:
        'No necesitas tener una especificación técnica. Describe el proceso, la tarea manual o la información que hoy está dispersa. Nuestro equipo puede conversar contigo y, si tiene sentido, continuar en una reunión virtual.',
      primary: 'Escribir por WhatsApp',
      secondary: 'Enviar un correo',
      note: 'Contacto directo con el equipo · Sin agendamiento automático',
    },
    footer: 'IA, automatización y software a medida desde Bucaramanga para Colombia y Latinoamérica.',
  },
  en: {
    solutions: {
      tag: 'What we do',
      title: 'Applied AI and software built around your operation.',
      intro: 'We understand the process, find the friction, and build a solution that produces a measurable improvement.',
      items: [
        ['AI agents', 'Web and WhatsApp assistants that answer, guide, quote, and qualify opportunities with your business context.'],
        ['Custom software', 'Platforms, portals, and CRMs designed for your team’s real workflow rather than a rigid template.'],
        ['Automation and integrations', 'We connect data, inventory, billing, ERP, CRM, forms, and sales channels to remove duplicate work.'],
        ['High-performance web experiences', 'Fast, accessible websites and applications designed to turn visits into business conversations.'],
      ],
    },
    work: {
      tag: 'Solutions delivered',
      title: 'Experience across platforms and industries.',
      intro: 'Our work combines proprietary products, business platforms, and integrations for real operations in Colombia and other markets.',
      items: [
        ['AlliaFood', 'An Alliasoft product for restaurants: POS, orders, kitchen, inventory, and delivery in one connected operation.', 'Own product', 'https://alliafood.com'],
        ['AI sales agents', 'Digital support and lead qualification with a clear handoff to the human team.', 'Conversational AI', '#contact'],
        ['Operational platforms', 'CRM, traceability, orders, inventory, and dashboards adapted to specific business processes.', 'Custom software', '#contact'],
        ['Digital commerce and integrations', 'E-commerce, automations, and system connections that reduce manual work and keep data consistent.', 'Web & automation', '#contact'],
      ],
    },
    about: {
      tag: 'Local technology talent',
      title: 'Alliasoft, artificial intelligence and software for business.',
      body: 'The Alliasoft team builds artificial intelligence, automation, and custom software solutions for companies across Colombia and Latin America.',
      body2: 'The first step is a conversation with the team. People are available for a virtual meeting to understand the problem and review a realistic path, without automatic booking or impersonal handoffs.',
    },
    process: {
      tag: 'How we work',
      title: 'From the problem to a solution your team adopts.',
      steps: [
        ['01', 'Understand', 'We talk to the people who live the process and define the problem worth solving.'],
        ['02', 'Design', 'We turn needs, data, and integrations into a clear architecture and an easy experience.'],
        ['03', 'Build', 'We deliver functional progress, test with real cases, and adjust using evidence.'],
        ['04', 'Support', 'We help launch and evolve the solution alongside your team.'],
      ],
    },
    faq: {
      tag: 'Frequently asked questions',
      title: 'Direct answers before we talk.',
      items: [
        ['What companies does Alliasoft work with?', 'We work with companies that want to automate tasks, integrate information, or build proprietary software, including gastronomy, tourism, logistics, commerce, B2B teams, and WhatsApp-centered operations.'],
        ['Is Alliasoft based in Bucaramanga?', 'Yes. Alliasoft builds technology from Bucaramanga, Colombia, and works virtually with teams across Colombia and Latin America.'],
        ['What is AlliaFood?', 'AlliaFood is an Alliasoft product for restaurant operations, bringing together POS, orders, kitchen workflows, inventory, and delivery.'],
        ['Can I speak with a person?', 'Yes. Message +57 317 696 4215 on WhatsApp. A team member can learn about your problem and coordinate a virtual meeting; the website does not automatically book time slots.'],
        ['How is project pricing defined?', 'It depends on scope, integrations, users, and the current process. We first understand the problem and then propose a solution with clear scope and stages.'],
      ],
    },
    contact: {
      tag: 'Let’s talk',
      title: 'Tell us what is holding your company back today.',
      body: 'You do not need a technical specification. Describe the process, manual task, or scattered information. Our team can discuss it and continue in a virtual meeting when useful.',
      primary: 'Message us on WhatsApp',
      secondary: 'Send an email',
      note: 'Direct team contact · No automatic scheduling',
    },
    footer: 'AI, automation, and custom software from Bucaramanga for Colombia and Latin America.',
  },
};

const solutionIcons = [Bot, Code2, DatabaseZap, MonitorSmartphone];
const workIcons = [UtensilsCrossed, MessageCircle, Workflow, ShoppingCart];

const SectionHeading = ({ tag, title, intro }: { tag: string; title: string; intro?: string }) => (
  <div className="max-w-3xl">
    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">{tag}</p>
    <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h2>
    {intro ? <p className="mt-5 text-pretty text-base leading-7 text-slate-400 sm:text-lg">{intro}</p> : null}
  </div>
);

const LandingPage: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'es';
  const text = content[language];
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowChat(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const isEnglish = language === 'en';
    const title = isEnglish
      ? 'Alliasoft | AI and custom software from Bucaramanga'
      : 'Alliasoft | IA, automatización y software a medida en Colombia';
    const description = isEnglish
      ? 'Alliasoft builds AI agents, automation, AlliaFood, and custom software from Bucaramanga for companies across Colombia and Latin America.'
      : 'Alliasoft desarrolla agentes de IA, automatizaciones, AlliaFood y software a medida para empresas en Colombia y Latinoamérica.';
    document.documentElement.lang = language;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [language]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-slate-100 selection:bg-cyan-300 selection:text-slate-950">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <LeanHeader />

      <main id="main-content">
        <LeanHero />

        <section id="solutions" className="deferred-section border-t border-white/[0.06] bg-slate-950 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading tag={text.solutions.tag} title={text.solutions.title} intro={text.solutions.intro} />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {text.solutions.items.map(([title, description], index) => {
                const Icon = solutionIcons[index];
                return (
                  <article key={title} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 sm:p-8">
                    <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-extrabold text-white">{title}</h3>
                    <p className="mt-3 leading-7 text-slate-400">{description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="deferred-section border-t border-white/[0.06] bg-[#050b17] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading tag={text.work.tag} title={text.work.title} intro={text.work.intro} />
            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {text.work.items.map(([title, description, label, href], index) => {
                const Icon = workIcons[index];
                const external = href.startsWith('http');
                return (
                  <article key={title} className="group rounded-3xl border border-white/[0.08] bg-slate-950/60 p-6 transition hover:border-cyan-300/25 sm:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-slate-400">{label}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-extrabold text-white">{title}</h3>
                    <p className="mt-3 leading-7 text-slate-400">{description}</p>
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-cyan-300 hover:text-cyan-200"
                    >
                      {external ? 'alliafood.com' : text.contact.primary}
                      {external ? <ExternalLink className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="company" className="deferred-section relative overflow-hidden border-t border-white/[0.06] bg-slate-950 px-6 py-20 sm:py-28">
          <div aria-hidden="true" className="absolute right-[-10%] top-[-40%] h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.05] p-7">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">Bucaramanga · Colombia</p>
              <div className="mt-6 space-y-4">
                {[
                  [Search, 'Inteligencia artificial aplicada'],
                  [Code2, 'Desarrollo de software'],
                  [Workflow, 'Automatización empresarial'],
                  [UtensilsCrossed, 'AlliaFood'],
                ].map(([Icon, label]) => {
                  const ItemIcon = Icon as typeof Search;
                  return (
                    <div key={label as string} className="flex items-center gap-3 text-sm font-bold text-slate-200">
                      <ItemIcon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                      <span>{label as string}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">{text.about.tag}</p>
              <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{text.about.title}</h2>
              <p className="mt-6 text-pretty text-lg leading-8 text-slate-300">{text.about.body}</p>
              <p className="mt-4 leading-7 text-slate-400">{text.about.body2}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-extrabold text-emerald-300 hover:text-emerald-200">
                {text.contact.primary}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="process" className="deferred-section border-t border-white/[0.06] bg-[#050b17] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading tag={text.process.tag} title={text.process.title} />
            <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {text.process.steps.map(([number, title, description]) => (
                <li key={number} className="rounded-3xl border border-white/[0.08] bg-slate-950/60 p-6">
                  <span className="font-mono text-sm font-bold text-cyan-300">{number}</span>
                  <h3 className="mt-8 text-xl font-extrabold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="deferred-section border-t border-white/[0.06] bg-slate-950 px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <SectionHeading tag={text.faq.tag} title={text.faq.title} />
            <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {text.faq.items.map(([question, answer], index) => (
                <details key={question} className="group py-2" open={index === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-lg font-bold text-white marker:hidden">
                    {question}
                    <ChevronRight className="h-5 w-5 shrink-0 text-cyan-300 transition group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <p className="max-w-3xl pb-6 pr-8 leading-7 text-slate-400">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="deferred-section border-t border-white/[0.06] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,.18),transparent_48%),#050b17] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">{text.contact.tag}</p>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{text.contact.title}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300">{text.contact.body}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-7 text-sm font-extrabold text-slate-950 transition hover:bg-emerald-300">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {text.contact.primary}
              </a>
              <a href="mailto:alliasoftsas@gmail.com" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-bold text-white transition hover:border-white/30">
                <Mail className="h-5 w-5" aria-hidden="true" />
                {text.contact.secondary}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4 text-emerald-300" />+57 317 696 4215</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" />Bucaramanga, Colombia</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" />{text.contact.note}</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#02050b] px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <a href="#home" className="text-xl font-extrabold text-white">Alliasoft<span className="text-cyan-300">.</span></a>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">{text.footer}</p>
          </div>
          <div className="text-sm text-slate-500">© {new Date().getFullYear()} Alliasoft S.A.S.</div>
        </div>
      </footer>

      {showChat ? (
        <Suspense fallback={null}>
          <SmartChatWidget />
        </Suspense>
      ) : null}
    </div>
  );
};

export default LandingPage;

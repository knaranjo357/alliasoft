import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CodeWindowIcon, HandoffIcon, IntegrationIcon, RouteIcon } from './icons/AlliaIcons';
import { useTranslation } from 'react-i18next';
import '../styles/editorial.css';

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

const icons = [HandoffIcon, CodeWindowIcon, IntegrationIcon, RouteIcon] as const;

const SeoOverview: React.FC = () => {
  const { i18n } = useTranslation();
  const copy = content[i18n.resolvedLanguage === 'en' ? 'en' : 'es'];

  return (
    <section
      id="services-overview"
      aria-labelledby="services-overview-title"
      className="editorial-section editorial-overview"
    >
      <div className="editorial-container">
        <div className="editorial-kicker"><span aria-hidden="true">01 /</span><p>{copy.eyebrow}</p></div>
        <div className="editorial-intro">
          <h2 id="services-overview-title" className="editorial-title">{copy.title}</h2>
          <div className="editorial-intro-note"><span className="editorial-mark" aria-hidden="true">↗</span><p>{copy.introduction}</p></div>
        </div>

        <div className="editorial-services">
          {copy.cards.map((card, index) => {
            const Icon = icons[index];
            return (
              <article key={card.title} className="editorial-service">
                <div className="editorial-service-meta">
                  <span aria-hidden="true">0{index + 1}</span>
                  <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>

        <div className="editorial-product-strip">
          <p>
            {copy.productPrefix}{' '}
            <a href="https://alliafood.com" target="_blank" rel="noopener noreferrer">
              {copy.productLink}
            </a>{' '}
            {copy.productSuffix}
          </p>
          <div className="editorial-strip-links">
            <a href="#process">
              {copy.method}<ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#portfolio">
              {copy.experience}<ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="editorial-legal">
          {copy.legalPrefix}{' '}
          <a href="/privacy.html">
            {copy.privacy}
          </a>.
        </p>
      </div>
    </section>
  );
};

export default SeoOverview;

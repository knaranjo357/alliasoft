import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { AgentIcon, CalendarIcon, ChatIcon, ClocheIcon, CursorIcon, DiagnosisIcon, PaperPlaneIcon, PinIcon, TrayIcon, TruckIcon, WhatsAppIcon, WrenchIcon } from './icons/AlliaIcons';
import '../styles/portfolio-art.css';

const categoryThemes: Record<string, { watermark: string }> = {
  ai: { watermark: 'AI & TOURISM' },
  product: { watermark: 'ALLIAFOOD' },
  crm: { watermark: 'CUSTOM SOFTWARE' },
  ecommerce: { watermark: 'WEB DESIGN & DEVELOPMENT' },
};

interface ProjectConceptProps {
  category: string;
  index: number;
  name: string;
  isEnglish: boolean;
}

const BrowserChrome = ({ label }: { label: string }) => (
  <div className="concept-browser-chrome"><span><i /><i /><i /></span><b>{label}</b><span>↗</span></div>
);

const FoodConcept = ({ isEnglish, index }: Pick<ProjectConceptProps, 'isEnglish' | 'index'>) => (
  <div className={`case-concept-stage food-scene food-scene-${index}`}>
    <div className="food-brand-ghost">alliafood</div>
    <div className="food-order-window">
      <BrowserChrome label="alliafood" />
      <div className="food-menu-header"><span>{isEnglish ? 'Your menu' : 'Tu menú'}</span><ClocheIcon size={18} strokeWidth={1.4} /></div>
      <div className="food-menu-list">
        {[0, 1, 2].map((item) => (
          <div className="food-menu-dish" key={item}>
            <div className={`food-dish-illustration dish-${item}`}><i /><i /><i /></div>
            <div className="concept-copy-lines"><i /><i /></div>
            <span className="food-dish-add">+</span>
          </div>
        ))}
      </div>
      <div className="food-menu-action">{isEnglish ? 'Organized orders' : 'Pedidos organizados'}<ArrowUpRight size={12} /></div>
    </div>
    <div className="food-order-ticket">
      <ClocheIcon size={21} strokeWidth={1.3} />
      <strong>{isEnglish ? 'ORDER' : 'PEDIDO'}</strong>
      <span className="food-ticket-rule" />
      {[0, 1, 2].map((item) => <div key={item} className="food-ticket-item"><i /><i /></div>)}
      <span className="food-ticket-rule" />
      <div className="food-ticket-check"><Check size={16} /></div>
      <div className="food-ticket-barcode" />
    </div>
    <div className="food-message"><WhatsAppIcon size={22} strokeWidth={1.5} /><div><strong>WhatsApp</strong><span>{isEnglish ? 'Connected to your operation' : 'Conectado con tu operación'}</span></div><Check size={13} /></div>
  </div>
);

const TourismConcept = ({ name, isEnglish, index }: Pick<ProjectConceptProps, 'name' | 'isEnglish' | 'index'>) => (
  <div className={`case-concept-stage travel-scene travel-scene-${index}`}>
    <div className="travel-map">
      <svg viewBox="0 0 400 270" fill="none" preserveAspectRatio="xMidYMid slice">
        <path className="map-contour" d="M-20 30C57-27 92 85 168 39S306-10 430 15M-20 55C57-2 92 110 168 64S306 15 430 40M-20 80C57 23 92 135 168 89S306 40 430 65M-20 105C57 48 92 160 168 114S306 65 430 90M-20 130C57 73 92 185 168 139S306 90 430 115M-20 155C57 98 92 210 168 164S306 115 430 140M-20 180C57 123 92 235 168 189S306 140 430 165M-20 205C57 148 92 260 168 214S306 165 430 190M-20 230C57 173 92 285 168 239S306 190 430 215M-20 255C57 198 92 310 168 264S306 215 430 240" />
        <path className="map-river" d="M130-20C210 60 82 99 125 155S270 193 210 290" />
        <path className="map-route" d="M77 174C70 102 174 180 198 94S310 43 325 98" />
        <circle className="map-pin-halo" cx="77" cy="174" r="13" /><circle className="map-pin-point" cx="77" cy="174" r="5" />
        <circle className="map-pin-halo" cx="325" cy="98" r="13" /><circle className="map-pin-point" cx="325" cy="98" r="5" />
      </svg>
      <span className="travel-map-city">Medellín</span>
      <span className="travel-compass">N<span>↑</span></span>
    </div>
    <div className="travel-reservation">
      <div className="travel-ticket-heading"><PaperPlaneIcon size={19} strokeWidth={1.5} /><span>{isEnglish ? 'Travel experiences' : 'Experiencias de viaje'}</span></div>
      <strong>{name}</strong>
      <div className="travel-ticket-route"><span>MEDELLÍN</span><i /><PinIcon size={15} /></div>
      <div className="travel-ticket-bottom"><span>{isEnglish ? 'Reservations' : 'Reservas'}</span><div className="travel-ticket-code" /></div>
    </div>
    <div className="travel-chat"><AgentIcon size={17} /><span>{isEnglish ? 'AI & human handoff' : 'IA + atención humana'}</span></div>
  </div>
);

const OperationsConcept = ({ isEnglish }: Pick<ProjectConceptProps, 'isEnglish'>) => {
  const nodes = [
    { Icon: ChatIcon, label: isEnglish ? 'Messages' : 'Mensajes' },
    { Icon: CalendarIcon, label: isEnglish ? 'Appointments' : 'Citas' },
    { Icon: DiagnosisIcon, label: isEnglish ? 'Diagnostics' : 'Diagnóstico' },
    { Icon: TruckIcon, label: isEnglish ? 'Shipping' : 'Envíos' },
  ];
  return (
    <div className="case-concept-stage operations-scene">
      <div className="operations-board">
        <BrowserChrome label="Wiltech" />
        <div className="operations-board-heading"><span>{isEnglish ? 'Connected operation' : 'Operación conectada'}</span><i /></div>
        <div className="operations-diagram">
          <svg viewBox="0 0 360 190" fill="none" className="operations-connectors"><path d="M80 42H145Q180 42 180 78V111Q180 147 215 147H280M280 42H215Q180 42 180 78M80 147H145Q180 147 180 111" /><circle cx="180" cy="95" r="23" /></svg>
          <div className="operations-hub"><WrenchIcon size={24} strokeWidth={1.25} /></div>
          {nodes.map(({ Icon, label }, index) => <div key={label} className={`operations-node operations-node-${index}`}><Icon size={20} strokeWidth={1.4} /><span>{label}</span></div>)}
        </div>
        <div className="operations-bottom-track"><i /><i /><i /><i /><i /></div>
      </div>
      <div className="operations-device"><div className="operations-device-speaker" /><div className="operations-device-check"><Check size={20} /></div><div className="concept-copy-lines"><i /><i /></div><div className="operations-device-grid"><i /><i /><i /><i /></div><span /></div>
      <div className="operations-caption">{isEnglish ? 'Custom software' : 'Software a medida'}<ArrowUpRight size={13} /></div>
    </div>
  );
};

const WebsiteIllustration = ({ index }: { index: number }) => (
  <svg viewBox="0 0 240 150" fill="none" className="website-industry-drawing">
    {index === 5 ? <>
      <path className="web-drawing-fill" d="M70 40H167C181 40 188 54 192 72L203 113C206 128 189 133 179 121L155 101H84L61 121C49 134 33 127 37 112L48 71C52 52 57 40 70 40Z" />
      <path d="M73 60V85M60 73H86M149 72H150M170 61H171M104 83H133" /><circle cx="150" cy="73" r="5" /><circle cx="170" cy="61" r="5" />
      <path className="web-drawing-detail" d="M49 25H69M59 15V35M185 18L188 27L197 30L188 33L185 42L182 33L173 30L182 27Z" />
    </> : index === 6 ? <>
      <path className="web-drawing-fill" d="M37 51H174V109H37Z" /><path d="M43 61H165M59 61V99M92 61V99M125 61V99M174 109H206L191 88H174M28 110H214" />
      <circle className="web-drawing-fill" cx="72" cy="111" r="13" /><circle className="web-drawing-fill" cx="132" cy="111" r="13" /><circle cx="72" cy="111" r="5" /><circle cx="132" cy="111" r="5" /><path className="web-drawing-detail" d="M20 131H224M91 31H160M115 21H183" />
    </> : index === 7 ? <>
      <path className="web-drawing-fill" d="M26 77L84 31L140 77V126H26ZM133 56L176 25L218 56V126H140V77Z" /><path d="M18 77L84 23L148 77M130 55L176 17L226 55M51 83H73V105H51ZM91 83H114V126H91ZM161 58H184V80H161ZM177 99H200V126H177Z" /><path className="web-drawing-detail" d="M14 135H228M39 20H54M46 13V27" />
    </> : <>
      <path className="web-drawing-fill" d="M49 83L158 81L190 62L204 73L181 96C173 107 144 110 107 106L66 98Z" /><path d="M105 82L120 62H151L163 81M121 62L113 51H96M32 121Q55 109 78 121T124 121T170 121T216 121M44 137Q67 125 90 137T136 137T182 137" /><circle className="web-drawing-detail" cx="181" cy="27" r="13" /><path className="web-drawing-detail" d="M28 53H70M37 41H89" />
    </>}
  </svg>
);

const WebsiteConcept = ({ index, name, isEnglish }: Pick<ProjectConceptProps, 'index' | 'name' | 'isEnglish'>) => (
  <div className={`case-concept-stage website-scene website-scene-${index}`}>
    <div className="website-desktop">
      <BrowserChrome label={name} />
      <div className="website-navigation"><strong>{name}</strong><span /><span /><i /></div>
      <div className="website-hero"><div className="website-hero-copy"><i /><i /><i /><span /><b>↗</b></div><WebsiteIllustration index={index} /></div>
      <div className="website-grid-preview"><div /><div /><div /></div>
    </div>
    <div className="website-mobile"><span className="website-mobile-camera" /><div className="website-mobile-brand" /><WebsiteIllustration index={index} /><div className="concept-copy-lines"><i /><i /></div><span className="website-mobile-action" /><i /></div>
    <div className="website-responsive-label"><CursorIcon size={15} strokeWidth={1.6} /><span>{isEnglish ? 'Responsive design' : 'Diseño adaptable'}</span></div>
  </div>
);

const ProjectConcept = ({ category, index, name, isEnglish }: ProjectConceptProps) => (
  <div className={`portfolio-case-art portfolio-concept portfolio-concept-${category}`} aria-hidden="true">
    <div className="portfolio-art-topline"><span>{categoryThemes[category].watermark}</span><span>/{String(index + 1).padStart(2, '0')}</span></div>
    {category === 'product' ? <FoodConcept isEnglish={isEnglish} index={index} />
      : category === 'ai' ? <TourismConcept name={name} isEnglish={isEnglish} index={index} />
        : category === 'crm' ? <OperationsConcept isEnglish={isEnglish} />
          : <WebsiteConcept index={index} name={name} isEnglish={isEnglish} />}
    <div className="portfolio-concept-caption"><span>{isEnglish ? 'Visual concept' : 'Concepto visual'}</span><span>ALLIASOFT</span></div>
  </div>
);

const projectMeta = [
  { url: 'https://alliafood.com', category: 'product' },
  { url: 'https://alliafood.com', category: 'product' },
  {
    url: 'https://wa.me/573176964215?text=Hola%20Alliasoft%2C%20quiero%20conocer%20el%20caso%20de%20automatizaci%C3%B3n%20para%20tours.',
    category: 'ai',
  },
  {
    url: 'https://wa.me/573176964215?text=Hola%20Alliasoft%2C%20quiero%20conocer%20el%20caso%20de%20tours%20privados%20multiling%C3%BCes.',
    category: 'ai',
  },
  { url: '#contact', category: 'crm' },
  { url: 'https://konisgamesandmore.com/', category: 'ecommerce' },
  { url: 'https://www.jfptrailerrentals.com/', category: 'ecommerce' },
  { url: 'https://jfpcontracting.com/', category: 'ecommerce' },
  { url: 'https://lmjetskirentals.com/', category: 'ecommerce' },
];

const filterIds = ['all', 'product', 'ai', 'crm', 'ecommerce'] as const;

const Portfolio: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const reducedMotion = useReducedMotion();
  const isEnglish = i18n.resolvedLanguage === 'en';
  const filterLabels = isEnglish
    ? ['All stories', 'AlliaFood', 'AI & WhatsApp', 'Custom operations', 'Web projects in the US']
    : ['Todas las historias', 'AlliaFood', 'IA & WhatsApp', 'Operación a medida', 'Web para EE. UU.'];
  const industryLabels = isEnglish
    ? ['Gastronomy', 'Fast food', 'Tourism', 'Private tourism', 'Repair center', 'Entertainment', 'Trailer rentals', 'Contracting', 'Watercraft rentals']
    : ['Gastronomía', 'Comidas rápidas', 'Turismo', 'Turismo privado', 'Centro de reparaciones', 'Entretenimiento', 'Alquiler de tráileres', 'Contratación', 'Alquiler acuático'];
  const projectsData = t('portfolio.projects', { returnObjects: true }) as { title: string; description: string; tags: string[] }[];
  const projects = projectsData.map((project, index) => ({
    ...project,
    index,
    url: projectMeta[index]?.url || '#contact',
    category: projectMeta[index]?.category || 'ai',
    industry: industryLabels[index] || '',
  }));
  const filteredProjects = activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="portfolio" className="studio-portfolio" aria-labelledby="portfolio-heading">
      <div className="showcase-shell">
        <div className="showcase-section-label">
          <span className="showcase-label-dot" aria-hidden="true" />
          <span>{t('nav.portfolio')}</span>
          <span className="showcase-label-index" aria-hidden="true">{String(projects.length).padStart(2, '0')}</span>
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="portfolio-intro"
        >
          <h2 id="portfolio-heading">{t('portfolio.heading')}</h2>
          <p>{t('portfolio.subheading')}</p>
        </motion.div>

        <div className="portfolio-filters" role="group" aria-label={isEnglish ? 'Filter projects' : 'Filtrar proyectos'}>
          {filterIds.map((id, index) => (
            <button
              type="button"
              key={id}
              onClick={() => setActiveFilter(id)}
              aria-pressed={activeFilter === id}
              aria-controls="portfolio-results"
              className={activeFilter === id ? 'is-active' : ''}
            >
              {filterLabels[index]}
              <span aria-hidden="true">{String(id === 'all' ? projects.length : projects.filter((project) => project.category === id).length).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <div id="portfolio-results" aria-live="polite" aria-atomic="false">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="portfolio-empty">
                <TrayIcon size={32} />
                <h3>{isEnglish ? 'No work in this category' : 'No hay experiencia en esta categoría'}</h3>
                <p>{isEnglish ? 'Choose another category or return to “All work”.' : 'Selecciona otra categoría o vuelve a “Toda la experiencia”.'}</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
                className="portfolio-grid"
              >
                {filteredProjects.map((project, index) => {
                  const [projectName, ...titleRest] = project.title.split(' — ');
                  const isExternal = !project.url.startsWith('#');
                  const isFeatured = index === 0;

                  return (
                    <motion.a
                      key={project.index}
                      href={project.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      initial={reducedMotion ? false : { opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.4 }}
                      className={`portfolio-case portfolio-case-${project.category} ${isFeatured ? 'portfolio-case-featured' : ''}`}
                    >
                      <ProjectConcept category={project.category} index={project.index} name={projectName} isEnglish={isEnglish} />
                      <div className="portfolio-case-copy">
                        <div className="portfolio-case-meta">
                          <span>{project.industry}</span>
                          <span className="portfolio-open-icon"><ArrowUpRight size={21} aria-hidden="true" /></span>
                        </div>
                        <h3>
                          <span className="portfolio-case-name">{projectName}</span>
                          {titleRest.length > 0 && <><span className="sr-only"> — </span><span className="portfolio-case-subtitle">{titleRest.join(' — ')}</span></>}
                        </h3>
                        <p>{project.description}</p>
                        <ul className="portfolio-case-tags">
                          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                        </ul>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="portfolio-proof"><span aria-hidden="true">↗</span><p>{t('portfolio.proofNote')}</p></div>
      </div>
    </section>
  );
};

export default Portfolio;

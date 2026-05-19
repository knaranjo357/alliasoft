import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// Gradient accents per project category
const projectAccents = [
  { from: 'from-teal-400', to: 'to-emerald-500', label: 'Turismo', pattern: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)' },
  { from: 'from-amber-400', to: 'to-orange-500', label: 'Producto Propio', pattern: 'linear-gradient(135deg, white 2px, transparent 2px), linear-gradient(-135deg, white 2px, transparent 2px)' },
  { from: 'from-blue-500', to: 'to-indigo-600', label: 'Logística', pattern: 'radial-gradient(circle, white 1px, transparent 1px)' },
  { from: 'from-violet-500', to: 'to-purple-600', label: 'E-commerce', pattern: 'linear-gradient(45deg, white 1px, transparent 1px)' },
  { from: 'from-rose-400', to: 'to-pink-600', label: 'Retail', pattern: 'radial-gradient(circle at 30% 70%, white 1.5px, transparent 1.5px)' },
];

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const projectsData = t('portfolio.projects', {
    returnObjects: true,
  }) as { title: string; description: string; tags: string[] }[];

  const staticData = [
    { url: '#project-1' },
    { url: 'https://alliafood.com' },
    { url: '#project-3' },
    { url: '#project-4' },
    { url: '#project-5' },
  ];

  const projects = projectsData.map((proj, i) => ({
    ...proj,
    url: staticData[i]?.url || '#',
    accent: projectAccents[i] || projectAccents[0],
  }));

  return (
    <section id="portfolio" className="py-32 px-6 bg-[#FAFAFA] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[5%] left-[-8%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-br from-violet-100/40 to-purple-100/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-br from-amber-100/30 to-orange-100/20 blur-[80px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">
            {t('nav.portfolio')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {t('portfolio.heading')}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            {t('portfolio.subheading')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              variants={itemVariants}
              className="group flex flex-col bg-white rounded-[2rem] border border-black/[0.03] overflow-hidden hover:shadow-[0_24px_64px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Color band header */}
              <div className="h-56 relative overflow-hidden shrink-0">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.accent.from} ${project.accent.to} group-hover:scale-110 transition-transform duration-700 ease-[0.22,1,0.36,1]`}
                />
                {/* Decorative pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: project.accent.pattern,
                    backgroundSize: '28px 28px',
                  }}
                />
                {/* Category label */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-7">
                  <span className="text-white/60 text-xs font-bold tracking-[0.15em] uppercase mb-1">
                    {project.accent.label}
                  </span>
                  <span className="text-white text-2xl font-black tracking-tight leading-snug max-w-[85%] drop-shadow-sm">
                    {project.title}
                  </span>
                </div>
                {/* External link icon */}
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Card body */}
              <div className="p-8 flex flex-col flex-1 bg-white">
                <p className="text-slate-500 mb-6 leading-relaxed text-[1.02rem] flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-[0.75rem] font-bold bg-slate-50 border border-slate-100 text-slate-700 rounded-full tracking-wide group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
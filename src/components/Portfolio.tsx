import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const projectsData = t('portfolio.projects', { returnObjects: true }) as { title: string, description: string, tags: string[] }[];

  const staticData = [
    { url: '#project-1' },
    { url: '#project-2' },
    { url: '#project-3' },
    { url: '#project-4' },
    { url: '#project-5' }
  ];

  const projects = projectsData.map((proj, i) => ({
    ...proj,
    url: staticData[i]?.url || '#'
  }));

  return (
    <section id="portfolio" className="py-32 px-6 bg-[#FAFAFA]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
           initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
           variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
           className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase mb-4 block">
            {t('nav.portfolio')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            {t('portfolio.heading')}
          </h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            {t('portfolio.subheading')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              variants={itemVariants}
              className="group flex flex-col bg-white rounded-[2rem] border border-black/[0.03] overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-60 bg-slate-100 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1]">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent opacity-80 text-center px-4 mix-blend-multiply drop-shadow-sm tracking-tight">{project.title}</span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1 relative z-10 bg-white">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-slate-900 tracking-tight pr-4 leading-snug">{project.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shadow-sm text-slate-400 group-hover:text-blue-600 group-hover:shadow-md group-hover:bg-white transition-all duration-300 shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-slate-500 mb-8 leading-relaxed text-[1.05rem] flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-[0.75rem] font-semibold bg-slate-50 border border-slate-100 text-blue-600 rounded-full shadow-sm tracking-wide"
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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tags, image, url, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-white border border-slate-100 overflow-hidden rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block flex-1 flex flex-col">
        <div className="h-56 bg-slate-50 relative overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500 ease-out">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-teal-50/50 flex items-center justify-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-400 bg-clip-text text-transparent opacity-60 text-center px-4 mix-blend-multiply">{title}</span>
          </div>
        </div>
        
        <div className="p-8 flex flex-col flex-1 bg-white relative z-10">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight pr-4">{title}</h3>
            <ExternalLink className={`w-5 h-5 flex-shrink-0 transition-colors ${isHovered ? 'text-blue-600' : 'text-slate-300'}`} />
          </div>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[0.7rem] uppercase tracking-wider font-semibold bg-slate-50 border border-slate-200 text-slate-500 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: t('portfolio.project1.title'),
      description: t('portfolio.project1.description'),
      tags: t('portfolio.project1.tags', { returnObjects: true }) as string[],
      image: 'https://via.placeholder.com/600x400',
      url: 'https://compuya.store',
    },
    {
      title: t('portfolio.project2.title'),
      description: t('portfolio.project2.description'),
      tags: t('portfolio.project2.tags', { returnObjects: true }) as string[],
      image: 'https://via.placeholder.com/600x400',
      url: 'https://kevinnaranjo.com/',
    },
    {
      title: t('portfolio.project3.title'),
      description: t('portfolio.project3.description'),
      tags: t('portfolio.project3.tags', { returnObjects: true }) as string[],
      image: 'https://via.placeholder.com/600x400',
      url: 'https://gomezyasociados.netlify.app',
    },
    {
      title: t('portfolio.project4.title'),
      description: t('portfolio.project4.description'),
      tags: t('portfolio.project4.tags', { returnObjects: true }) as string[],
      image: 'https://via.placeholder.com/600x400',
      url: 'https://casamateo.netlify.app',
    },
    {
      title: t('portfolio.project5.title'),
      description: t('portfolio.project5.description'),
      tags: t('portfolio.project5.tags', { returnObjects: true }) as string[],
      image: 'https://via.placeholder.com/600x400',
      url: 'https://dainty-bienenstitch-c636f1.netlify.app',
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-4 bg-white border-b border-gray-100">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t('portfolio.heading')}
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {t('portfolio.subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              url={project.url}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
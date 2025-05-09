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
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="h-72 bg-gradient-to-br from-blue-400 to-teal-400 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-white opacity-20">{title}</span>
          </div>
        </div>
        
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end transform transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-20'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <ExternalLink className="w-5 h-5 text-white" />
          </div>
          <p className="text-white/90 mb-4 text-sm">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-white/20 text-white rounded-full"
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
    <section id="portfolio" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('portfolio.heading')}
          </h2>
          <p className="text-gray-600 text-lg">
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
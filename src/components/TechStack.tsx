import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Layers, Bot, Cpu, Database, Layout } from 'lucide-react';

type TechCategory = 'ai' | 'automation' | 'backend' | 'frontend';

interface TechItem {
  name: string;
  category: TechCategory;
  desc: string;
  icon: string;
}

const techList: TechItem[] = [
  { name: 'OpenAI GPT-4o', category: 'ai', desc: 'Modelos de lenguaje avanzados para razonamiento complejo', icon: '⚡' },
  { name: 'Anthropic Claude 3.5', category: 'ai', desc: 'Procesamiento seguro de documentos y análisis contextual', icon: '🧠' },
  { name: 'Flowise AI', category: 'ai', desc: 'Orquestación visual de agentes y pipelines RAG', icon: '⚙️' },
  { name: 'WhatsApp Business API', category: 'automation', desc: 'Conexión oficial directa para conversaciones automatizadas', icon: '💬' },
  { name: 'n8n & Webhooks', category: 'automation', desc: 'Flujos de integración multi-sistema en tiempo real', icon: '🔄' },
  { name: 'Python & FastAPI', category: 'backend', desc: 'Servicios de alta velocidad para motores de IA', icon: '🐍' },
  { name: 'Node.js & TypeScript', category: 'backend', desc: 'Arquitectura backend escalable de bajo downtime', icon: '🚀' },
  { name: 'PostgreSQL & Supabase', category: 'backend', desc: 'Bases de datos relacionales ultra seguras', icon: '🗄️' },
  { name: 'React 18 & Vite', category: 'frontend', desc: 'Interfaces web SPA ultrarrápidas y fluidas', icon: '⚛️' },
  { name: 'Tailwind CSS & Framer', category: 'frontend', desc: 'Diseños responsive premium con micro-animaciones', icon: '🎨' },
  { name: 'AWS & Docker', category: 'backend', desc: 'Infraestructura distribuida en la nube', icon: '☁️' },
  { name: 'LangChain & VectorDBs', category: 'ai', desc: 'Búsqueda semántica sobre bases de datos corporativas', icon: '🔍' },
];

const marqueeTechs = [
  'OpenAI', 'WhatsApp API', 'Claude 3.5', 'Flowise', 'Python', 'React 18',
  'TypeScript', 'PostgreSQL', 'Node.js', 'Docker', 'AWS', 'Supabase', 'TailwindCSS', 'n8n'
];

const TechStack: React.FC = () => {
  const { t } = useTranslation();
  const [activeCat, setActiveCat] = useState<TechCategory | 'all'>('all');

  const filteredTechs = activeCat === 'all'
    ? techList
    : techList.filter((item) => item.category === activeCat);

  return (
    <section id="tech-stack" className="py-24 px-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4 inline-flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            {t('techStack.tag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3 mb-4 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {t('techStack.heading')}
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            {t('techStack.subheading')}
          </p>
        </motion.div>

        {/* Marquee Infinite Logo Slider */}
        <div className="mb-14 overflow-hidden relative py-4 bg-slate-900/60 border-y border-slate-800/80">
          <div className="flex space-x-12 animate-marquee whitespace-nowrap">
            {[...marqueeTechs, ...marqueeTechs].map((tech, idx) => (
              <span
                key={idx}
                className="text-slate-400 text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2 font-mono hover:text-white transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCat('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeCat === 'all'
                ? 'bg-slate-100 text-slate-900 shadow-md'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
            }`}
          >
            Todos los Componentes
          </button>
          {(['ai', 'automation', 'backend', 'frontend'] as TechCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeCat === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat === 'ai' && <Bot className="w-3.5 h-3.5 text-blue-400" />}
              {cat === 'automation' && <Cpu className="w-3.5 h-3.5 text-emerald-400" />}
              {cat === 'backend' && <Database className="w-3.5 h-3.5 text-purple-400" />}
              {cat === 'frontend' && <Layout className="w-3.5 h-3.5 text-amber-400" />}
              {t(`techStack.categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechs.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform w-fit">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

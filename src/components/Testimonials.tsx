import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    name: "Alejandro Restrepo",
    role: "CEO & Fundador",
    company: "Medellín VIP Travel",
    metric: "−85% Tiempo de Respuesta",
    text: "Antes de Alliasoft perdiendo clientes porque tardábamos horas en responder WhatsApp por la noche. El agente de IA ahora cotiza, responde dudas complejas y agenda reservas automáticamente 24/7.",
    stars: 5,
    sector: "Turismo & Experiencias"
  },
  {
    name: "Carolina Gómez",
    role: "Directora de Operaciones",
    company: "Cadena Gastronómica D'Amico",
    metric: "100% Control de Inventario",
    text: "Con AlliaFood unificamos pedidos, cocina y domicilios en nuestras 5 sedes. Eliminamos los errores de digitación a mano y la coordinación pasó de tomar horas a funcionar sola.",
    stars: 5,
    sector: "Restaurantes & AlliaFood"
  },
  {
    name: "Mauricio Silva",
    role: "Gerente de Logística",
    company: "LogiCargo Express",
    metric: "+3.5x Capacidad de Despacho",
    text: "Pasamos de controlar agendas en hojas de cálculo a un CRM propio con trazabilidad en tiempo real. La adopción fue total en la primera semana porque el sistema fue hecho a nuestra medida.",
    stars: 5,
    sector: "Logística & Transporte"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 px-6 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4 inline-flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            TESTIMONIOS & IMPACTO REAL
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3 mb-4 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Lo que dicen quienes ya automatizaron su empresa
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <Quote className="w-16 h-16 text-blue-600/20 absolute top-6 left-6 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: testimonials[currentIndex].stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div>
                <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h4>
                <p className="text-slate-400 text-sm">{testimonials[currentIndex].role} — <span className="text-blue-400 font-semibold">{testimonials[currentIndex].company}</span></p>
              </div>
            </div>

            {/* Right Badge */}
            <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-3 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Impacto Medido
              </span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono block">
                {testimonials[currentIndex].metric}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-300 font-medium px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> {testimonials[currentIndex].sector}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-blue-500 w-8' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
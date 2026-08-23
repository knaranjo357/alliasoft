import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Bot,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  UtensilsCrossed,
  Workflow,
} from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/573176964215?text=Hola%20Alliasoft%2C%20quiero%20evaluar%20una%20soluci%C3%B3n%20para%20mi%20empresa.';

const LeanHero: React.FC = () => {
  const { t } = useTranslation();
  const solutionItems = [
    { icon: Bot, label: t('hero.preview.aiAgents') },
    { icon: MonitorSmartphone, label: t('hero.preview.customSoftware') },
    { icon: Workflow, label: t('hero.preview.integrations') },
    { icon: UtensilsCrossed, label: 'AlliaFood' },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-[#030712] pb-20 pt-32 text-white sm:pb-24 sm:pt-36">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(20,184,166,0.16),transparent_32%)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <div>
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-xs font-bold text-cyan-200">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {t('hero.statusBadge')}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300">
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem]">
            {t('hero.title_line1')}{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              {t('hero.title_highlight')}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {t('hero.description')}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 text-sm font-extrabold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {t('hero.cta1')}
            </a>
            <a
              href="#solutions"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              {t('hero.cta2')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-blue-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/85 shadow-2xl shadow-blue-950/50">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Alliasoft</p>
                <p className="mt-1 font-bold text-white">{t('hero.preview.engine')}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {t('hero.preview.live')}
              </span>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {solutionItems.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                  <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  <p className="mt-3 text-sm font-bold text-white">{label}</p>
                </div>
              ))}
            </div>

            <div className="mx-5 mb-5 rounded-2xl border border-blue-400/20 bg-blue-500/[0.08] p-5">
              <p className="text-sm font-bold text-white">{t('hero.preview.availability')}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{t('hero.preview.line1')}</p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200">
                {t('hero.preview.scroll')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeanHero;

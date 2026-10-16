import { forwardRef, type ReactNode, type SVGProps } from 'react';
import '../../styles/icons.css';

/*
 * Alliasoft icon family.
 * Drawn on a 24px grid with 1.5px rounded strokes. Every icon carries a single
 * accent element (the "alliance point": a spark, node or highlight) that takes
 * the brand accent through --allia-icon-accent and reacts on hover.
 * The API mirrors lucide-react (size, strokeWidth, className) so both coexist.
 */

export interface AlliaIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}

const Accent = ({ children, line = false }: { children: ReactNode; line?: boolean }) => (
  <g className="allia-icon-accent" fill={line ? 'none' : 'currentColor'} stroke={line ? 'currentColor' : 'none'}>{children}</g>
);

const Dots = ({ children }: { children: ReactNode }) => <g fill="currentColor" stroke="none">{children}</g>;

const n = (value: number) => +value.toFixed(2);

/** Four-point spark with concave sides, the recurring motif of the family. */
const spark = (cx: number, cy: number, r: number) => {
  const q = r * 0.16;
  return [
    `M${n(cx)} ${n(cy - r)}`,
    `Q${n(cx + q)} ${n(cy - q)} ${n(cx + r)} ${n(cy)}`,
    `Q${n(cx + q)} ${n(cy + q)} ${n(cx)} ${n(cy + r)}`,
    `Q${n(cx - q)} ${n(cy + q)} ${n(cx - r)} ${n(cy)}`,
    `Q${n(cx - q)} ${n(cy - q)} ${n(cx)} ${n(cy - r)}Z`,
  ].join('');
};

const createIcon = (name: string, body: ReactNode) => {
  const Icon = forwardRef<SVGSVGElement, AlliaIconProps>(({ size = 24, strokeWidth = 1.5, className, title, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={['allia-icon', `allia-icon-${name}`, className].filter(Boolean).join(' ')}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {body}
    </svg>
  ));
  Icon.displayName = `${name.replace(/(^|-)(\w)/g, (_match, _dash, letter: string) => letter.toUpperCase())}Icon`;
  return Icon;
};

/* ── Services & capabilities ─────────────────────────────────────────── */

/** AI agent: a conversation that carries intelligence inside. */
export const AgentIcon = createIcon('agent', <>
  <path d="M20 11.5c0 4.14-3.58 7.5-8 7.5-1.13 0-2.2-.22-3.18-.61L4 20l1.2-3.6A7.1 7.1 0 0 1 4 11.5C4 7.36 7.58 4 12 4s8 3.36 8 7.5Z" />
  <Accent><path d={spark(12, 11.5, 3.6)} /></Accent>
</>);

/** AI agent that hands the conversation over to a person. */
export const HandoffIcon = createIcon('handoff', <>
  <path d="M5 3.5h7a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5H8.5L5 15v-2.5A2.5 2.5 0 0 1 2.5 10V6A2.5 2.5 0 0 1 5 3.5Z" />
  <circle cx="17.5" cy="12.25" r="2.5" />
  <path d="M13 21c.45-2.6 2.25-4.2 4.5-4.2S21.55 18.4 22 21" />
  <Accent><path d={spark(8.5, 8, 2.6)} /></Accent>
</>);

/** Custom software: an application window with code and a live caret. */
export const CodeWindowIcon = createIcon('code-window', <>
  <rect x="3" y="4" width="18" height="16" rx="2.5" />
  <path d="M3 8.5h18M6 6.25h.01M8.5 6.25h.01" />
  <path d="m9.5 12-2.5 2.25 2.5 2.25M14.5 12l2.5 2.25-2.5 2.25" />
  <Accent><rect x="11.3" y="12.4" width="1.4" height="3.7" rx=".7" /></Accent>
</>);

/** Integrations: separate systems flowing into a single hub. */
export const IntegrationIcon = createIcon('integration', <>
  <rect x="2.5" y="4" width="6" height="6" rx="1.8" />
  <rect x="2.5" y="14" width="6" height="6" rx="1.8" />
  <path d="M8.5 7c3.2 0 3.3 5 6.5 5M8.5 17c3.2 0 3.3-5 6.5-5" />
  <circle cx="18" cy="12" r="3" />
  <Accent><circle cx="18" cy="12" r="1.25" /></Accent>
</>);

/** Phased roadmap: a path with turns that ends in a clear milestone. */
export const RouteIcon = createIcon('route', <>
  <circle cx="5" cy="18.5" r="2" />
  <path d="M7 18.5h7.5a3 3 0 0 0 0-6h-5a3 3 0 0 1 0-6H17" />
  <Accent><circle cx="19" cy="6.5" r="2.1" /></Accent>
</>);

/** Operational diagnosis: a lens reading the pulse of a process. */
export const DiagnosisIcon = createIcon('diagnosis', <>
  <circle cx="10.5" cy="10.5" r="7" />
  <path d="m15.6 15.6 4.9 4.9" />
  <Accent line><path pathLength={1} d="M6.4 11h1.7l1.3-2.8 2 5.6 1.3-2.8h1.6" /></Accent>
</>);

/** Business AI: a processor with a spark at its core. */
export const AiCoreIcon = createIcon('ai-core', <>
  <rect x="6" y="6" width="12" height="12" rx="2.5" />
  <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
  <Accent><path d={spark(12, 12, 3.4)} /></Accent>
</>);

/** Platforms and dashboards built around the operation. */
export const DashboardIcon = createIcon('dashboard', <>
  <rect x="3" y="4" width="18" height="16" rx="2.5" />
  <path d="M8.5 4v16M5.4 8h.8M5.4 11h.8M12 16.5V14M15 16.5v-5" />
  <Accent line><path pathLength={1} d="M18 16.5V8.5" /></Accent>
</>);

/** Team enablement: people working side by side. */
export const TeamIcon = createIcon('team', <>
  <circle cx="9" cy="8.5" r="3" />
  <path d="M3 20c.7-3.4 3.1-5.5 6-5.5s5.3 2.1 6 5.5M16.6 13.3c2.4.3 4 2 4.6 4.7" />
  <Accent><circle cx="17" cy="7.6" r="2.3" /></Accent>
</>);

/** Security with an approved check. */
export const ShieldIcon = createIcon('shield', <>
  <path d="M12 3.2 19 5.8v5.6c0 4.3-2.8 7.9-7 9.4-4.2-1.5-7-5.1-7-9.4V5.8Z" />
  <Accent line><path pathLength={1} d="m9 12.2 2.1 2.1 4-4.2" /></Accent>
</>);

/** Experience designed for every screen. */
export const MultiDeviceIcon = createIcon('multi-device', <>
  <path d="M14.5 15.5h-10a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v2.5" />
  <path d="M7.5 19.5h4.5M9.75 15.5v4" />
  <rect x="14.5" y="10" width="7" height="10.5" rx="1.8" />
  <path d="M17.3 18h1.4" />
  <Accent><path d={spark(9.75, 9.75, 2.6)} /></Accent>
</>);

/** Continuous evolution measured over time. */
export const GrowthIcon = createIcon('growth', <>
  <path d="M4 3.5V18a2 2 0 0 0 2 2h14.5" />
  <path d="m8 15 3.5-4.5 3 2.5 4-5" />
  <Accent><circle cx="19.5" cy="7" r="1.9" /></Accent>
</>);

/* ── Methodology ─────────────────────────────────────────────────────── */

/** Discovery: the layered architecture also drawn in the hero. */
export const LayersIcon = createIcon('layers', <>
  <path d="M12 3 21 7.5 12 12 3 7.5Z" />
  <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
  <Accent><path d="M12 5.7 15.6 7.5 12 9.3 8.4 7.5Z" /></Accent>
</>);

/** Prioritization: aiming at the highest-impact target. */
export const TargetIcon = createIcon('target', <>
  <path d="M18.6 10.4A8 8 0 1 1 13.6 5.4" />
  <path d="M14.8 12.2a4 4 0 1 1-3-3" />
  <path d="m11 13 8.5-8.5M16.5 4.5h3v3" />
  <Accent><circle cx="11" cy="13" r="1.6" /></Accent>
</>);

/** Solution design: a technical document with a wireframe. */
export const BlueprintIcon = createIcon('blueprint', <>
  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
  <path d="M14 3v5h5M14 12h2M14 14.5h2M8 18h8" />
  <Accent><rect x="8" y="11.3" width="3.6" height="3.6" rx=".7" /></Accent>
</>);

/** Modular development: blocks assembled inside the code. */
export const ModulesIcon = createIcon('modules', <>
  <path d="M7.5 7 3 12l4.5 5M16.5 7l4.5 5-4.5 5" />
  <rect x="9" y="8" width="2.7" height="3.3" rx=".8" />
  <rect x="12.3" y="8" width="2.7" height="3.3" rx=".8" />
  <Accent><rect x="9" y="12.7" width="6" height="3.3" rx=".9" /></Accent>
</>);

/** Launch and continuous improvement. */
export const LaunchIcon = createIcon('launch', <>
  <path d="M12 2.8c2.9 1.9 4.4 5.2 4.4 9.2v3.7H7.6V12c0-4 1.5-7.3 4.4-9.2Z" />
  <path d="M7.6 12.8 5 15.4v3.1l2.6-1.3M16.4 12.8l2.6 2.6v3.1l-2.6-1.3" />
  <circle cx="12" cy="9.3" r="1.7" />
  <Accent><path d="M10.2 17.2h3.6L12 21.3Z" /></Accent>
</>);

/* ── Channels & ecosystem ────────────────────────────────────────────── */

export const WhatsAppIcon = createIcon('whatsapp', <>
  <path d="m3.5 20.5 1.25-4.15A8.5 8.5 0 1 1 7.9 19.4Z" />
  <Accent line><path pathLength={1} d="M9.2 7.9h1.1l1 2.3-.9 1.1a5.6 5.6 0 0 0 2.3 2.3l1.1-.9 2.3 1v1.1a1.4 1.4 0 0 1-1.6 1.4 6.7 6.7 0 0 1-6.7-6.7 1.4 1.4 0 0 1 1.4-1.6Z" /></Accent>
</>);

export const TikTokIcon = createIcon('tiktok', <>
  <path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5" />
  <Accent line><path pathLength={1} d="M14 3.5c.5 2.7 2.3 4.4 5 4.7" /></Accent>
</>);

export const YouTubeIcon = createIcon('youtube', <>
  <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
  <Accent><path d="M10.2 9.2v5.6l4.8-2.8Z" /></Accent>
</>);

/** AlliaEdu: an open book with a bookmark. */
export const BookIcon = createIcon('book', <>
  <path d="M12 6.8C10.2 5.3 7.7 4.6 3.5 4.6v13.2c4.2 0 6.7.7 8.5 2.2 1.8-1.5 4.3-2.2 8.5-2.2V4.6c-4.2 0-6.7.7-8.5 2.2ZM12 6.8V20" />
  <Accent><path d="M15.3 5.1h3.2v5.6l-1.6-1.2-1.6 1.2Z" /></Accent>
</>);

/** AlliaFood: a serving cloche, hospitality first. */
export const ClocheIcon = createIcon('cloche', <>
  <path d="M4.5 16a7.5 7.5 0 0 1 15 0M2.5 16h19M5.5 19.5h13" />
  <path d="M8.2 13a4.2 4.2 0 0 1 2.6-2.6" opacity=".55" />
  <Accent><circle cx="12" cy="6.9" r="1.6" /></Accent>
</>);

/** AlliaMoney and savings. */
export const CoinIcon = createIcon('coin', <>
  <circle cx="12" cy="12" r="9" />
  <Accent line><path pathLength={1} d="M14.6 9.4c-.4-.9-1.4-1.4-2.6-1.4-1.5 0-2.6.8-2.6 1.9 0 2.7 5.2 1.4 5.2 4.2 0 1.1-1.1 2-2.6 2-1.2 0-2.2-.5-2.6-1.4M12 6.3V8M12 16.1v1.6" /></Accent>
</>);

/* ── Measurement ─────────────────────────────────────────────────────── */

/** Recovered time. */
export const StopwatchIcon = createIcon('stopwatch', <>
  <circle cx="12" cy="13.5" r="7.5" />
  <path d="M10 2.75h4M12 2.75V6M18.2 6.8l1.3-1.3" />
  <Accent line><path pathLength={1} d="M12 13.5 15 10.5" /></Accent>
  <Dots><circle cx="12" cy="13.5" r="1.2" /></Dots>
</>);

/** Hours currently spent on manual work. */
export const HourglassIcon = createIcon('hourglass', <>
  <path d="M6.5 3h11M6.5 21h11" />
  <path d="M7.5 3v2.5c0 2.2 1.9 4 4.5 6.5 2.6-2.5 4.5-4.3 4.5-6.5V3M7.5 21v-2.5c0-2.2 1.9-4 4.5-6.5 2.6 2.5 4.5 4.3 4.5 6.5V21" />
  <Accent><path d="M9.2 19.4c.45-1.5 1.35-2.5 2.8-3.7 1.45 1.2 2.35 2.2 2.8 3.7Z" /></Accent>
</>);

export const CalculatorIcon = createIcon('calculator', <>
  <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
  <rect x="8" y="5.5" width="8" height="3.6" rx=".8" />
  <Dots>
    <circle cx="8.75" cy="13" r="1" /><circle cx="12" cy="13" r="1" /><circle cx="15.25" cy="13" r="1" />
    <circle cx="8.75" cy="17" r="1" /><circle cx="12" cy="17" r="1" />
  </Dots>
  <Accent><circle cx="15.25" cy="17" r="1.25" /></Accent>
</>);

/* ── Demo scenarios ──────────────────────────────────────────────────── */

export const PersonIcon = createIcon('person', <>
  <circle cx="12" cy="8" r="3.5" />
  <path d="M5 20.5c.9-3.9 3.6-6 7-6s6.1 2.1 7 6" />
</>);

/** Lead qualification: contacts filtered into opportunities. */
export const FunnelIcon = createIcon('funnel', <>
  <path d="M3.5 7.5h17l-6.5 7.3v4.7l-4 1.8v-6.5Z" />
  <circle cx="7.5" cy="3.6" r="1.2" />
  <circle cx="16.5" cy="3.6" r="1.2" />
  <Accent><circle cx="12" cy="3.2" r="1.45" /></Accent>
</>);

/** Data extraction: a document converted into structured data. */
export const ExtractIcon = createIcon('extract', <>
  <rect x="3.5" y="3" width="9.5" height="14" rx="1.5" />
  <path d="M6.5 7h3.5M6.5 10h3.5M6.5 13h2" />
  <rect x="14" y="13.5" width="7" height="7.5" rx="1.5" />
  <path d="M14 17.25h7M17.5 13.5V21" />
  <Accent line><path pathLength={1} d="M13 7h3.5A1.5 1.5 0 0 1 18 8.5V11m-2-1.5 2 2 2-2" /></Accent>
</>);

export const TerminalIcon = createIcon('terminal', <>
  <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
  <path d="m7 9.5 3 2.5-3 2.5" />
  <Accent line><path pathLength={1} d="M12.5 14.5H17" /></Accent>
</>);

/* ── Support content ─────────────────────────────────────────────────── */

/** Technical questions: configuration and parameters. */
export const SlidersIcon = createIcon('sliders', <>
  <path d="M4 7h8M16 7h4M4 12h2M10 12h10M4 17h10M18 17h2" />
  <circle cx="14" cy="7" r="2" />
  <circle cx="16" cy="17" r="2" />
  <Accent><circle cx="8" cy="12" r="2.1" /></Accent>
</>);

/** Plans and pricing. */
export const PriceTagIcon = createIcon('price-tag', <>
  <path d="M3.5 12.4V5A1.5 1.5 0 0 1 5 3.5h7.4c.4 0 .78.16 1.06.44l7.1 7.1a1.5 1.5 0 0 1 0 2.12l-7.4 7.4a1.5 1.5 0 0 1-2.12 0l-7.1-7.1a1.5 1.5 0 0 1-.44-1.06Z" />
  <Accent><circle cx="8.2" cy="8.2" r="1.7" /></Accent>
</>);

export const MailIcon = createIcon('mail', <>
  <path d="M16.5 6H5a2.5 2.5 0 0 0-2.5 2.5v8A2.5 2.5 0 0 0 5 19h11a2.5 2.5 0 0 0 2.5-2.5V10" />
  <path d="m3 7.5 7.5 5.5 4.2-3.1" />
  <Accent><circle cx="19" cy="5.5" r="2.4" /></Accent>
</>);

export const ShareIcon = createIcon('share', <>
  <circle cx="6" cy="12" r="2.5" />
  <circle cx="18" cy="18.5" r="2.5" />
  <path d="m8.3 10.8 7.4-4.1M8.3 13.2l7.4 4.1" />
  <Accent><circle cx="18" cy="5.5" r="2.5" /></Accent>
</>);

export const PinIcon = createIcon('pin', <>
  <path d="M12 21.5s-7-5.9-7-11.5a7 7 0 0 1 14 0c0 5.6-7 11.5-7 11.5Z" />
  <Accent><circle cx="12" cy="10" r="2.2" /></Accent>
</>);

export const ChatIcon = createIcon('chat', <>
  <path d="M20 11.5c0 4.14-3.58 7.5-8 7.5-1.13 0-2.2-.22-3.18-.61L4 20l1.2-3.6A7.1 7.1 0 0 1 4 11.5C4 7.36 7.58 4 12 4s8 3.36 8 7.5Z" />
  <Dots><circle cx="8.6" cy="11.5" r="1" /><circle cx="15.4" cy="11.5" r="1" /></Dots>
  <Accent><circle cx="12" cy="11.5" r="1.2" /></Accent>
</>);

export const SparkIcon = createIcon('spark', <>
  <path d={spark(10, 9.5, 6)} />
  <Accent><path d={spark(18, 17.5, 3)} /></Accent>
</>);

export const CalendarIcon = createIcon('calendar', <>
  <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
  <path d="M3.5 10h17M8 3v4M16 3v4" />
  <Dots>
    <circle cx="8" cy="13.75" r="1" /><circle cx="12" cy="13.75" r="1" />
    <circle cx="8" cy="17" r="1" /><circle cx="12" cy="17" r="1" /><circle cx="16" cy="17" r="1" />
  </Dots>
  <Accent><rect x="14.6" y="12.35" width="2.8" height="2.8" rx=".7" /></Accent>
</>);

/* ── Portfolio scenes ────────────────────────────────────────────────── */

/** Travel experiences. */
export const PaperPlaneIcon = createIcon('paper-plane', <>
  <path d="M21 3 14.5 21l-4-7.5-7.5-4Z" />
  <Accent line><path pathLength={1} d="M21 3 10.5 13.5" /></Accent>
</>);

/** Repair center. */
export const WrenchIcon = createIcon('wrench', <>
  <g transform="rotate(45 12 12)">
    <path d="M10.5 2.76V6h3V2.76A4.5 4.5 0 0 1 13.7 11.17v8.13a1.7 1.7 0 0 1-3.4 0v-8.13A4.5 4.5 0 0 1 10.5 2.76Z" />
    <Accent><circle cx="12" cy="18.6" r=".95" /></Accent>
  </g>
</>);

/** Shipping and logistics. */
export const TruckIcon = createIcon('truck', <>
  <path d="M13.5 16.5v-10h-11v10h1.9M8.6 16.5h6.8M13.5 9.5h4l3 3.5v3.5h-1.4" />
  <circle cx="6.5" cy="17" r="2.1" />
  <circle cx="17.5" cy="17" r="2.1" />
  <Accent><path d="M15 11h2.2l1.6 2H15Z" /></Accent>
</>);

/** Responsive, interactive web design. */
export const CursorIcon = createIcon('cursor', <>
  <path d="m7 7 5 13 2-5.5 5.5-2Z" />
  <Accent line><path pathLength={1} d="M4.5 7h-2M5.25 5.25 3.8 3.8M7 4.5v-2" /></Accent>
</>);

/** Empty state. */
export const TrayIcon = createIcon('tray', <>
  <path d="M5.5 5h13l2.5 8.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4.5Z" />
  <Accent line><path pathLength={1} d="M3 13.5h5l1.5 2.5h5l1.5-2.5h5" /></Accent>
</>);

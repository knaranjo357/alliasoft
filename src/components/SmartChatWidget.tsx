import React, { FormEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Bot, ExternalLink, Loader2, MessageCircle, Send, X } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const WHATSAPP_URL =
  'https://wa.me/573176964215?text=Hola%20Alliasoft%2C%20vengo%20desde%20el%20asistente%20web%20y%20quiero%20hablar%20con%20el%20equipo.';

const copy = {
  es: {
    title: 'Asistente Alliasoft',
    status: 'IA para orientarte, equipo humano para continuar',
    welcome:
      '¡Hola! Puedo contarte cómo Alliasoft aborda agentes de IA, software a medida, automatizaciones y AlliaFood. ¿Qué problema quieres resolver?',
    placeholder: 'Escribe tu pregunta…',
    open: 'Pregúntale a Alliasoft',
    close: 'Cerrar asistente',
    send: 'Enviar mensaje',
    contact: 'Hablar con el equipo',
    error:
      'No pude conectarme en este momento. El equipo está disponible en WhatsApp al +57 317 696 4215 para conocer tu caso.',
    prompts: ['¿Qué puede automatizar Alliasoft?', '¿Cómo funciona AlliaFood?', 'Quiero hablar de mi proyecto'],
  },
  en: {
    title: 'Alliasoft Assistant',
    status: 'AI guidance, human team for the next step',
    welcome:
      'Hi! I can explain how Alliasoft approaches AI agents, custom software, automation, and AlliaFood. What problem would you like to solve?',
    placeholder: 'Type your question…',
    open: 'Ask Alliasoft',
    close: 'Close assistant',
    send: 'Send message',
    contact: 'Talk to the team',
    error:
      'I could not connect right now. The team is available on WhatsApp at +57 317 696 4215 to learn about your case.',
    prompts: ['What can Alliasoft automate?', 'How does AlliaFood work?', 'I want to discuss my project'],
  },
};

function getLocalAnswer(message: string, language: 'es' | 'en') {
  const normalized = message.toLocaleLowerCase();
  const isEnglish = language === 'en';

  if (/^(hola|holi|buenas|buenos días|buenas tardes|buenas noches|hello|hi|hey)[!. ]*$/.test(normalized)) {
    return isEnglish
      ? 'Hi! I’m Allia AI, Alliasoft’s virtual assistant. I can guide you through our AI agents, custom software, automation, integrations, and AlliaFood. What would you like to know?'
      : '¡Hola! Soy Allia AI, el asistente virtual de Alliasoft. Puedo orientarte sobre nuestros agentes de IA, software a medida, automatizaciones, integraciones y AlliaFood. ¿Qué te gustaría conocer?';
  }

  if (
    normalized.includes('quién eres') ||
    normalized.includes('quien eres') ||
    normalized.includes('qué eres') ||
    normalized.includes('que eres') ||
    normalized.includes('who are you')
  ) {
    return isEnglish
      ? 'I’m Allia AI, Alliasoft’s virtual assistant. My role is to answer questions about our solutions and help you identify which type of technology may fit your operation. When you want to continue with a person, the team is available at +57 317 696 4215.'
      : 'Soy Allia AI, el asistente virtual de Alliasoft. Mi función es responder preguntas sobre nuestras soluciones y ayudarte a identificar qué tecnología puede encajar con tu operación. Cuando quieras continuar con una persona, el equipo está disponible en el +57 317 696 4215.';
  }

  if (normalized.includes('alliafood') || normalized.includes('restaurante') || normalized.includes('restaurant')) {
    return isEnglish
      ? 'AlliaFood is an Alliasoft product for restaurant operations. It brings together POS, orders, kitchen workflows, inventory, and delivery in one platform. To review whether it fits your restaurant, message the team on WhatsApp at +57 317 696 4215.'
      : 'AlliaFood es un producto de Alliasoft para la operación de restaurantes. Integra POS, pedidos, comandas de cocina, inventario y domicilios en una sola plataforma. Para revisar si encaja con tu restaurante, escribe al equipo por WhatsApp al +57 317 696 4215.';
  }

  if (
    normalized.includes('proyecto') ||
    normalized.includes('reunión') ||
    normalized.includes('reunion') ||
    normalized.includes('contact') ||
    normalized.includes('hablar')
  ) {
    return isEnglish
      ? 'Tell us which process, manual task, or disconnected information is causing the problem. A person from the Alliasoft team can learn about your case and continue with you in a virtual meeting. Write on WhatsApp at +57 317 696 4215.'
      : 'Cuéntanos qué proceso, tarea manual o información desconectada está causando el problema. Una persona del equipo Alliasoft puede conocer tu caso y continuar contigo en una reunión virtual. Escríbenos por WhatsApp al +57 317 696 4215.';
  }

  return isEnglish
    ? 'Alliasoft can help with AI agents for web and WhatsApp, custom software, business automation, system integrations, and AlliaFood. Which process currently takes the most time or creates the most errors? You can also contact the team at +57 317 696 4215.'
    : 'Alliasoft puede ayudarte con agentes de IA para web y WhatsApp, software a medida, automatización empresarial, integraciones y AlliaFood. ¿Qué proceso consume hoy más tiempo o genera más errores? También puedes hablar con el equipo al +57 317 696 4215.';
}

const SmartChatWidget: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'es';
  const text = copy[language];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: text.welcome },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const openChat = () => {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 80);
  };

  const sendMessage = async (content: string) => {
    const cleanContent = content.trim().slice(0, 600);
    if (!cleanContent || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: cleanContent }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 22000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: language,
          messages: nextMessages.slice(-10),
        }),
        signal: controller.signal,
      });
      const data = (await response.json()) as { answer?: string };
      if (!response.ok || !data.answer) throw new Error('Chat request failed');
      setMessages((current) => [...current, { role: 'assistant', content: data.answer!.slice(0, 2000) }]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: getLocalAnswer(cleanContent, language) },
      ]);
    } finally {
      window.clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section
          aria-label={text.title}
          className="flex h-[min(620px,calc(100vh-2rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/60"
        >
          <header className="flex items-center justify-between border-b border-white/[0.08] bg-slate-900 px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-sm font-extrabold text-white">{text.title}</h2>
                <p className="mt-0.5 truncate text-[11px] text-slate-400">{text.status}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={text.close}
              className="grid h-9 w-9 place-items-center rounded-full text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === 'user'
                    ? 'ml-auto rounded-br-md bg-blue-600 text-white'
                    : 'rounded-bl-md border border-white/[0.07] bg-white/[0.05] text-slate-200'
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading ? (
              <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.05] px-4 py-3 text-sm text-slate-300">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Allia AI…
              </div>
            ) : null}
          </div>

          {messages.length === 1 ? (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {text.prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2 text-left text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/10"
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          <div className="border-t border-white/[0.08] bg-slate-900/80 p-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={600}
                autoComplete="off"
                placeholder={text.placeholder}
                aria-label={text.placeholder}
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label={text.send}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cyan-300 text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1.5 py-1 text-xs font-bold text-emerald-300 hover:text-emerald-200"
            >
              {text.contact} · +57 317 696 4215
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={openChat}
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-slate-900 px-3 py-3 text-white shadow-2xl shadow-black/40 transition hover:-translate-y-0.5 hover:border-cyan-300/30 sm:pl-5"
          aria-label={text.open}
        >
          <span className="hidden text-sm font-extrabold sm:block">{text.open}</span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan-300 text-slate-950 transition group-hover:bg-cyan-200">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
};

export default SmartChatWidget;

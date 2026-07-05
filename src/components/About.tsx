import Reveal from './Reveal';
import { iconMap } from '../lib/icons';
import { useHighlights, useTimeline } from '../hooks/useApi';

function calculateDuration(startDate: string, endDate: string | null = null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalMonths = Math.round(totalDays / 30.44);

  const years = Math.floor(totalMonths / 12);
  const months = Math.round(totalMonths % 12);

  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  }
  if (months > 0) {
    parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  }

  return parts.length > 0 ? parts.join(' ') : '< 1 mo';
}

type Segment = { text: string; bold?: boolean };

function renderSegments(segments: Segment[]) {
  return segments.map((seg, i) =>
    seg.bold
      ? <strong key={i} className="font-semibold text-gray-900 dark:text-white">{seg.text}</strong>
      : <span key={i}>{seg.text}</span>
  );
}

export default function About() {
  const { data: highlights } = useHighlights();
  const { data: timeline } = useTimeline();

  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">02</span>
            <span className="h-px w-8 bg-blue-500" />
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">About</span>
          </div>
        </Reveal>

        <Reveal delay={50}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-balance">
            Engineer at <span className="gradient-text">heart</span>, founder by choice.
          </h2>
        </Reveal>

        {/* Intro paragraphs */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Reveal delay={100}>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                I'm a backend-focused software engineer based in Indonesia with extensive
                experience building scalable APIs, microservices, and AI-powered platforms
                using <span className="text-blue-600 dark:text-blue-400 font-medium">Node.js, Golang, and NestJS</span>.
              </p>
              <p>
                I've delivered production systems for enterprise clients across Indonesia,
                Australia, Singapore, and Japan — with hands-on expertise in cloud (Azure,
                GCP, AWS), Linux server administration, CI/CD, and AI integrations using
                OpenAI, Claude, Gemini, and Local LLMs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                In March 2026, I founded{' '}
                <span className="text-blue-600 dark:text-blue-400 font-medium">Hompimpa</span>,
                a software studio focused on delivering production-ready web, mobile, and
                hardware-integrated solutions for clients.
              </p>
              <p>
                I care about systems that are not just functional, but maintainable,
                observable, and built to serve real users at scale.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {highlights.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={index} delay={index * 80}>
                <div className="glass-card rounded-xl p-5 hover-lift group h-full">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg gradient-bg text-white mb-4 group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Experience timeline */}
        <Reveal>
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-8">
            Experience
          </h3>
        </Reveal>
        <div className="relative mb-20">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-blue-400/50 to-transparent" />
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <Reveal key={item.id || index} delay={index * 100}>
                <div className="relative pl-8">
                  <div className={`absolute -left-[5px] top-1.5 w-3 h-3 rounded-full border-2 ${item.highlight ? 'bg-blue-500 border-blue-500' : 'bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-600'}`} />
                  <div className={`rounded-xl p-5 hover-lift ${item.highlight ? 'bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50' : 'glass-card'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
                        {item.period}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        {calculateDuration(item.startDate, item.endDate)}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {item.company} · {item.location}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 italic">
                      {item.companyDesc}
                    </p>
                    <ul className="space-y-2">
                      {item.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{renderSegments(bullet)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

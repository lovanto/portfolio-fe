import { Layout, Wrench } from 'lucide-react';
import Reveal from './Reveal';
import { iconMap } from '../lib/icons';
import { useSkills } from '../hooks/useApi';

export default function Skills() {
  const { data } = useSkills();

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">04</span>
            <span className="h-px w-8 bg-blue-500" />
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">Skills</span>
          </div>
        </Reveal>

        <Reveal delay={50}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            The <span className="gradient-text">stack</span> I build with
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-16">
            Battle-tested through real enterprise delivery across multiple countries and industries.
          </p>
        </Reveal>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {data.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="glass-card rounded-xl p-6 hover-lift h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-lg gradient-bg text-white">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, si) => (
                      <span
                        key={si}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Frontend */}
        <Reveal>
          <div className="glass-card rounded-xl p-6 hover-lift mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-lg gradient-bg text-white">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">
                Frontend &amp; Mobile
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.frontendSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Tools */}
        <Reveal>
          <div className="flex items-center gap-3 mb-5">
            <Wrench className="w-4 h-4 text-blue-500" />
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">
              Tools &amp; methodologies
            </h3>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <div className="flex flex-wrap gap-2 mb-8">
            {data.tools.map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Soft skills */}
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-2">
            {data.softSkills.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3.5 py-1.5 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border border-orange-200/50 dark:border-orange-800/50 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

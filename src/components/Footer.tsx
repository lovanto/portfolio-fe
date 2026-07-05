import { iconMap } from '../lib/icons';
import { useNav } from '../hooks/useApi';

export default function Footer() {
  const { data } = useNav();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 lg:px-16 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-xs font-bold text-white font-display">RL</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {year} Rifky Lovanto
            </span>
          </div>
          <div className="flex gap-2">
            {data.socials.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  aria-label={s.label}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

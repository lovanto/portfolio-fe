import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  localStorage.setItem('theme', theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(
    (event?: React.MouseEvent) => {
      const next = theme === 'light' ? 'dark' : 'light';

      const hasViewTransition = 'startViewTransition' in document;
      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!hasViewTransition || hasReducedMotion || !event) {
        setTheme(next);
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = document.startViewTransition?.(() => {
        setTheme(next);
      });

      if (!transition) {
        setTheme(next);
        return;
      }

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
    },
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

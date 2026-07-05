import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useSidebar } from '../hooks/useSidebar';
import { useNav } from '../hooks/useApi';
import { iconMap } from '../lib/icons';

function linkClass(collapsed: boolean) {
  return ({ isActive }: { isActive: boolean }) => {
    const base = 'sidebar-link';
    const state = isActive ? 'sidebar-link-active' : 'sidebar-link-inactive';
    const collapsedStyle = collapsed ? 'justify-center px-0' : '';
    return `${base} ${state} ${collapsedStyle}`;
  };
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { collapsed, setCollapsed } = useSidebar();
  const { data } = useNav();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-screen flex-col justify-between border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 py-10 z-40 transition-all duration-300 ${
          collapsed ? 'w-20 px-3' : 'w-72 px-8'
        }`}
      >
        {/* Identity */}
        <div>
          <NavLink to="/" className={`block ${collapsed ? 'mb-6' : 'mb-10'}`}>
            <div className={`rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/30 ${collapsed ? 'mx-auto w-12 h-12' : 'w-14 h-14 mb-4'}`}>
              <img src="/file.png" alt="Rifky Lovanto" className="w-full h-full object-cover" />
            </div>
            {!collapsed && (
              <>
                <h1 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Rifky Lovanto
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Backend Engineer
                </p>
              </>
            )}
          </NavLink>

          {/* Navigation */}
          <nav className="space-y-1">
            {data.navLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.to === '/'}
                  className={linkClass(collapsed)}
                  title={collapsed ? link.name : undefined}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  {!collapsed && (
                    <>
                      <span className="text-xs font-mono opacity-50">{link.num}</span>
                      <span>{link.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Socials + Theme + Collapse */}
        <div>
          {/* Socials */}
          <div className={`flex ${collapsed ? 'flex-col items-center gap-2' : 'gap-2'} mb-6`}>
            {data.socials.map((s) => {
              const SIcon = iconMap[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={s.label}
                  title={s.label}
                >
                  {SIcon && <SIcon className="w-4 h-4" />}
                </a>
              );
            })}
          </div>

          {/* Theme toggle */}
          {!collapsed && (
            <button
              onClick={(e) => toggleTheme(e)}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4" />
                  <span>Dark mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                  <span>Light mode</span>
                </>
              )}
            </button>
          )}

          {/* Theme toggle button (collapsed mode) */}
          {collapsed && (
            <button
              onClick={(e) => toggleTheme(e)}
              className="flex items-center justify-center p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mx-auto mb-4"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          )}

          {/* Collapse toggle */}
          {!collapsed ? (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </button>
          ) : (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="flex items-center justify-center p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mx-auto"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200 dark:border-gray-800 px-5 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg overflow-hidden ring-2 ring-blue-500/30">
            <img src="/file.png" alt="Rifky Lovanto" className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-bold text-gray-900 dark:text-white">Rifky Lovanto</span>
        </NavLink>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => toggleTheme(e)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm pt-16"
          onClick={() => setMobileOpen(false)}
        >
          <nav
            className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-5 py-6 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            {data.navLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.to === '/'}
                  className={linkClass(false)}
                  onClick={() => setMobileOpen(false)}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span className="text-xs font-mono opacity-50">{link.num}</span>
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
            <div className="flex gap-2 pt-4">
              {data.socials.map((s) => {
                const SIcon = iconMap[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                    aria-label={s.label}
                  >
                    {SIcon && <SIcon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, FileText } from 'lucide-react';
import { useHero } from '../hooks/useApi';

export default function Hero() {
  const { data } = useHero();
  const roles = data.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!roles.length) return;
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, roles]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-orange-400/10 dark:bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-16 py-20">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Available for new projects
          </span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-balance mb-6 animate-slide-up">
          <span className="text-gray-900 dark:text-white">Building</span>
          <br />
          <span className="gradient-text">scalable systems</span>
          <br />
          <span className="text-gray-900 dark:text-white">that last.</span>
        </h1>

        {/* Animated role */}
        <div className="h-8 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-mono">
            <span className="text-blue-600 dark:text-blue-400">{'>'}</span>{' '}
            {displayed}
            <span className="ml-0.5 w-0.5 h-5 bg-blue-500 inline-block animate-pulse" />
          </p>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-10 animate-slide-up text-balance" style={{ animationDelay: '0.2s' }}>
          I'm Rifky Lovanto — a backend-focused engineer delivering production APIs,
          microservices, and AI-powered platforms for enterprise clients across
          Indonesia, Australia, Singapore &amp; Japan.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 px-7 py-3.5 gradient-bg text-white rounded-full font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
          >
            View my work
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold text-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5"
          >
            Get in touch
          </Link>
          <a
            href="/Rifky_Lovanto_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-semibold text-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-8 mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {data.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

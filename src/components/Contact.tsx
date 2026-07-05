import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import Reveal from './Reveal';
import { iconMap } from '../lib/icons';
import { useContactInfo } from '../hooks/useApi';
import { apiPost } from '../lib/api';

export default function Contact() {
  const { data } = useContactInfo();
  const [formState, setFormState] = useState({ name: '', email: '', message: '', website: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const MAX_NAME = 200;
  const MAX_EMAIL = 320;
  const MAX_MESSAGE = 5000;
  const THROTTLE_MS = 15_000;
  const THROTTLE_KEY = 'contact:lastSubmitAt';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (formState.website) {
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '', website: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
      return;
    }

    if (formState.name.length > MAX_NAME) {
      setSubmitError(`Name must be ${MAX_NAME} characters or less.`);
      return;
    }
    if (formState.email.length > MAX_EMAIL) {
      setSubmitError(`Email must be ${MAX_EMAIL} characters or less.`);
      return;
    }
    if (formState.message.length > MAX_MESSAGE) {
      setSubmitError(`Message must be ${MAX_MESSAGE} characters or less.`);
      return;
    }

    const last = Number(sessionStorage.getItem(THROTTLE_KEY) || '0');
    const now = Date.now();
    if (now - last < THROTTLE_MS) {
      const waitSec = Math.ceil((THROTTLE_MS - (now - last)) / 1000);
      setSubmitError(`Please wait ${waitSec}s before sending another message.`);
      return;
    }

    setIsSubmitting(true);

    try {
      await apiPost('/api/contact', {
        name: formState.name,
        email: formState.email,
        message: formState.message,
      });
      sessionStorage.setItem(THROTTLE_KEY, String(now));
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '', website: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setSubmitError('Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center pt-20 lg:pt-0 pb-12 lg:pb-0">
      <div className="max-w-5xl mx-auto px-6 lg:px-16 w-full py-12">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">05</span>
            <span className="h-px w-8 bg-blue-500" />
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={50}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            Let's build <span className="gradient-text">together</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
            Open to freelance projects, collaborations, and full-time roles. Drop a message and I'll get back to you.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {data.contactInfo.map((item, i) => {
              const Icon = iconMap[item.icon];
              const content = (
                <div className="flex items-start gap-3 group">
                  <div className="p-2.5 rounded-lg gradient-bg text-white shrink-0">
                    {Icon && <Icon className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-gray-900 dark:text-white font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
              return (
                <Reveal key={i} delay={i * 80}>
                  {item.href ? (
                    <a href={item.href} className="block">{content}</a>
                  ) : (
                    content
                  )}
                </Reveal>
              );
            })}

            {/* Socials */}
            <Reveal delay={240}>
              <div className="flex gap-2 pt-2">
                {data.socials.map((s) => {
                  const Icon = iconMap[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={s.label}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                    </a>
                  );
                })}
              </div>
            </Reveal>

            {/* Availability */}
            <Reveal delay={320}>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-semibold text-blue-700 dark:text-blue-400 text-sm">
                    Open to opportunities
                  </span>
                </div>
                <p className="text-blue-600 dark:text-blue-500/80 text-xs">
                  Available for freelance, collaborations, and full-time roles.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <div className="glass-card rounded-2xl p-6 md:p-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                    <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center mb-4">
                      <CheckCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">Message sent!</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Thanks for reaching out — I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formState.website}
                        onChange={handleChange}
                      />
                    </div>
                    {submitError && (
                      <div className="flex items-start gap-3 p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-xl">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700 dark:text-red-300">{submitError}</p>
                      </div>
                    )}
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        maxLength={MAX_NAME}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        maxLength={MAX_EMAIL}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        maxLength={MAX_MESSAGE}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none text-sm"
                        placeholder="Tell me about your project or idea..."
                      />
                      <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500 text-right">
                        {formState.message.length}/{MAX_MESSAGE}
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 gradient-bg text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

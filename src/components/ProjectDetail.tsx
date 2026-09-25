import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Lock, ExternalLink, ChevronLeft, ChevronRight, Play, ZoomIn, X } from 'lucide-react';
import Reveal from './Reveal';
import { useState } from 'react';
import { useProjectBySlug } from '../hooks/useApi';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, loading } = useProjectBySlug(slug || '');
  const [activeMedia, setActiveMedia] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  if (loading) {
    return (
      <section className="section-padding min-h-[60vh] flex items-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-16 text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading project...</p>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="section-padding min-h-[60vh] flex items-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-16 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h2>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all projects
          </Link>
        </div>
      </section>
    );
  }

  const hasMultipleMedia = project.media.length > 1;

  const prevMedia = () => setActiveMedia((prev) => (prev === 0 ? project.media.length - 1 : prev - 1));
  const nextMedia = () => setActiveMedia((prev) => (prev === project.media.length - 1 ? 0 : prev + 1));
  const activeItem = project.media[activeMedia];

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        <Reveal>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>
        </Reveal>

        {/* Hero media */}
        <Reveal delay={50}>
          <div className="relative rounded-2xl overflow-hidden h-64 md:h-96 mb-4 bg-gray-900">
            {project.media[activeMedia]?.type === 'video' ? (
              <video
                key={activeMedia}
                src={project.media[activeMedia].src}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.media[activeMedia]?.src}
                alt={project.media[activeMedia]?.alt || project.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {activeItem?.type === 'image' && (
              <button
                type="button"
                onClick={() => setIsImageZoomed(true)}
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-2 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-black/65"
                aria-label={`View ${project.title} image larger`}
              >
                <ZoomIn className="h-4 w-4" />
                Enlarge
              </button>
            )}

            {hasMultipleMedia && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur rounded-full text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur rounded-full text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
              <span className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur px-2.5 py-1 rounded-full mb-3 inline-block">
                {project.label}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                {project.title}
              </h1>
            </div>
          </div>
        </Reveal>

        {isImageZoomed && activeItem?.type === 'image' && (
          <div
            className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden bg-black/90 p-4 pt-20 md:p-8 lg:left-72"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} enlarged image`}
            onClick={() => setIsImageZoomed(false)}
          >
            <button
              type="button"
              onClick={() => setIsImageZoomed(false)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25"
              aria-label="Close enlarged image"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={activeItem.src}
              alt={activeItem.alt || project.title}
              className="max-h-[calc(100dvh-5rem)] max-w-[calc(100vw-2rem)] rounded-lg object-contain shadow-2xl md:max-h-[calc(100dvh-4rem)] md:max-w-[calc(100vw-4rem)] lg:max-w-[calc(100vw-22rem)]"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}

        {/* Thumbnail strip */}
        {hasMultipleMedia && (
          <Reveal delay={75}>
            <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
              {project.media.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMedia(index)}
                  className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    index === activeMedia
                      ? 'border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <img src={item.src} alt={item.alt || ''} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {!hasMultipleMedia && <div className="mb-10" />}

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Reveal delay={100}>
              <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                {project.description}
              </p>
            </Reveal>

          </div>

          <div className="space-y-6">
            <Reveal delay={150}>
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">App Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((technology) => (
                    <span
                      key={technology}
                      className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-md font-medium"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Status</h3>
                {project.isPrivate ? (
                  <span className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                    <Lock className="w-3.5 h-3.5" />
                    Private / Enterprise
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Public
                  </span>
                )}
              </div>
            </Reveal>

            {!project.isPrivate && project.href && (
              <Reveal delay={300}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-5 flex items-center justify-between group hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">External Link</h3>
                    <span className="text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      View project details
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

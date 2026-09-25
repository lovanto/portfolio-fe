import { Lock, X, Layers, Search, Filter, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { useState, useMemo } from 'react';
import { useProjects } from '../hooks/useApi';

function PrivateBadge({ isPrivate }: { isPrivate: boolean }) {
  if (!isPrivate) return null;
  return (
    <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 font-medium">
      <Lock className="w-3 h-3" />
      Private / Enterprise
    </span>
  );
}

export default function Projects() {
  const { data: projects } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(),
    [projects],
  );

  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.techStack.some((technology) => technology.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [projects, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">03</span>
            <span className="h-px w-8 bg-blue-500" />
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">Work</span>
          </div>
        </Reveal>

        <Reveal delay={50}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            Selected <span className="gradient-text">projects</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-16">
            Production systems and products I've built across enterprise clients, my own ventures, and academic research.
          </p>
        </Reveal>

        {/* Featured projects — large cards */}
        <div className="space-y-8 mb-16">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <Link to={`/work/${project.slug}`} className="block">
                <article className="group glass-card rounded-2xl overflow-hidden hover-lift">
                  <div className="grid lg:grid-cols-5 gap-0">
                    <div className="lg:col-span-2 relative h-56 lg:h-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">
                          {project.label}
                        </span>
                      </div>
                    </div>
                    <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-md font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <PrivateBadge isPrivate={project.isPrivate} />
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Other projects — compact grid */}
        <Reveal>
          <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-6">
            Other notable work
          </h3>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {other.slice(0, 3).map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <Link to={`/work/${project.slug}`} className="block h-full">
                <article className="glass-card rounded-xl overflow-hidden hover-lift group h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur px-2 py-0.5 rounded-full">
                        {project.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-display text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <PrivateBadge isPrivate={project.isPrivate} />
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* View All Projects CTA */}
        <Reveal>
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                setIsModalOpen(true);
                clearFilters();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium text-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:-translate-y-0.5"
            >
              <Layers className="w-4 h-4" />
              View all {projects.length} projects
            </button>
          </div>
        </Reveal>
      </div>

      {/* All Projects Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">All Projects</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {filteredProjects.length} of {projects.length} projects
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects by name, description, or tech..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Tag Filters */}
                <div className="flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mr-1">
                    <Filter className="w-3 h-3" />
                    Filter:
                  </span>
                  {allTags.slice(0, 14).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                  {selectedTags.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs px-2.5 py-1 text-red-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(80vh-220px)] p-6">
                {filteredProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">No projects match your filters</p>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Clear filters to see all projects
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredProjects.map((project) => (
                      <Link key={project.slug} to={`/work/${project.slug}`} onClick={() => setIsModalOpen(false)}>
                        <article className="glass-card rounded-xl overflow-hidden hover-lift group">
                          <div className="relative h-36 overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute top-3 left-3">
                              <span className="text-xs font-medium text-white/90 bg-black/30 backdrop-blur px-2 py-0.5 rounded-full">
                                {project.label}
                              </span>
                            </div>
                            {project.href && (
                              <span className="absolute top-3 right-3 p-1.5 bg-black/30 backdrop-blur rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-3 h-3 text-white" />
                              </span>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {project.title}
                            </h4>
                            <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
                              {project.shortDescription}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

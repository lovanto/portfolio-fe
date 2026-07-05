import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { SidebarProvider, useSidebar } from './hooks/useSidebar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';

function Layout({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 relative">
      <ScrollToTop />
      {/* Dot grid pattern */}
      <div className="fixed inset-0 dot-grid opacity-40 dark:opacity-20 pointer-events-none z-0" />

      {/* Gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <Sidebar />
      <div className={`flex flex-col min-h-screen transition-all duration-300 relative z-10 ${collapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Hero /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/work" element={<Layout><Projects /></Layout>} />
            <Route path="/work/:slug" element={<Layout><ProjectDetail /></Layout>} />
            <Route path="/skills" element={<Layout><Skills /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;

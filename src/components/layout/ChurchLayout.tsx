import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CHURCH_INFO } from '@/lib/data';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
export function ChurchLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Give', path: '/give' },
    { name: 'Contact', path: '/contact' },
  ];
  return (
    <div className="min-h-screen flex flex-col relative">
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8",
        isScrolled ? "py-3 bg-white/95 backdrop-blur-md border-b-2 border-deep-ocean shadow-sm" : "py-6 bg-transparent"
      )}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-terra-cotta flex items-center justify-center sketchy-border-sm hard-shadow-sm group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="font-display font-bold text-xl hidden sm:inline-block">Harvest Faith</span>
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-semibold hover:text-terra-cotta transition-colors",
                  location.pathname === link.path ? "text-terra-cotta underline underline-offset-4 decoration-2" : "text-deep-ocean"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button className="bg-deep-ocean hover:bg-deep-ocean/90 text-white sketchy-border-sm hard-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ml-2">
              Join Us
            </Button>
          </div>
          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </nav>
      </header>
      {/* Custom Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-deep-ocean/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-bush-sand z-[70] p-8 hard-shadow flex flex-col border-l-2 border-deep-ocean"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-display font-bold text-2xl">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-8 h-8" />
                </Button>
              </div>
              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={cn(
                      "text-3xl font-display font-bold hover:text-terra-cotta transition-colors",
                      location.pathname === link.path ? "text-terra-cotta" : "text-deep-ocean"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-12">
                <Button className="w-full bg-terra-cotta h-14 text-white font-bold text-lg sketchy-border hard-shadow">
                  Give Online
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-deep-ocean text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 border-b border-white/10 pb-12 mb-8">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-2xl">Harvest Faith Chapel</h3>
            <p className="text-white/70 italic text-sm">"{CHURCH_INFO.tagline}"</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-terra-cotta transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-lg border-b border-terra-cotta w-fit pb-1">Connect</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-terra-cotta" /> {CHURCH_INFO.contact.address}</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-terra-cotta" /> {CHURCH_INFO.contact.phone}</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-terra-cotta" /> {CHURCH_INFO.contact.email}</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-lg border-b border-terra-cotta w-fit pb-1">Worship Times</h4>
            <ul className="space-y-1 text-white/70 text-sm">
              <li>Sun: 8:30 AM (Main Service)</li>
              <li>Wed: 6:00 PM (Mid-Week)</li>
              <li>Fri: 10:00 PM (Monthly Vigil)</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-white/40 text-xs px-4">
          © {new Date().getFullYear()} Harvest Faith Chapel Ghana. Built with Grace.
        </div>
      </footer>
    </div>
  );
}
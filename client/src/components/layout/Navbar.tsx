import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, LogIn, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { isAdmin } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isDark = theme === 'dark';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/#about', label: 'About' },
        { path: '/#products', label: 'Products' },
        { path: '/#contact', label: 'Contact' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (path.startsWith('/#')) {
            const id = path.substring(2);
            if (location.pathname === '/') {
                e.preventDefault();
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
                setMobileOpen(false);
            }
        }
    };

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/' && !location.hash;
        if (path.startsWith('/#')) return location.hash === path.substring(1);
        return location.pathname === path;
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? isDark ? 'glass-dark shadow-2xl py-2' : 'glass-light shadow-xl py-2'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold
              ${isDark ? 'bg-gold-muted/20 text-gold' : 'bg-gold/10 text-gold'} 
              group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gold/10`}
                        >
                            V
                        </div>
                        <span className={`font-serif text-xl font-semibold tracking-wide
              ${isDark ? 'text-dark-text' : 'text-charcoal'}`}
                        >
                            Vino's Creation
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                    className={`relative px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full
                    ${isActive(link.path)
                                            ? isDark ? 'text-gold' : 'text-gold'
                                            : isDark ? 'text-dark-text/60 hover:text-gold hover:bg-gold-muted/5' : 'text-light-text hover:text-gold hover:bg-gold/5'
                                        }`}
                                >
                                    {link.label}
                                    {isActive(link.path) && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 border border-gold/30 rounded-full"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gold/10">
                            {/* Theme Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleTheme}
                                className={`p-2.5 rounded-full transition-all duration-300 shadow-md
                  ${isDark
                                        ? 'bg-dark-card text-gold hover:bg-dark-border border border-dark-border'
                                        : 'bg-white text-gold hover:bg-beige-dark border border-beige-dark/20'
                                    }`}
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={theme}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>

                            {/* Login / Admin Button */}
                            {isAdmin ? (
                                <Link
                                    to="/admin"
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
                    ${isDark
                                            ? 'bg-gold-muted/10 text-gold border border-gold-muted/30 hover:bg-gold-muted/20'
                                            : 'bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 shadow-sm shadow-gold/10'
                                        }`}
                                >
                                    <LayoutDashboard size={14} />
                                    Admin
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
                    ${isDark
                                            ? 'bg-gold-muted text-charcoal hover:bg-gold hover:shadow-[0_0_15px_rgba(212,168,83,0.3)]'
                                            : 'bg-charcoal text-white hover:bg-charcoal/90 hover:shadow-lg'
                                        }`}
                                >
                                    <LogIn size={14} />
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-2 md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark ? 'text-gold' : 'text-gold'}`}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className={`p-2 transition-colors ${mobileOpen ? 'text-gold' : (isDark ? 'text-dark-text' : 'text-charcoal')}`}
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`md:hidden overflow-hidden border-t shadow-2xl
              ${isDark ? 'bg-charcoal/98 border-dark-border' : 'bg-white border-beige-dark/20'}`}
                    >
                        <div className="px-6 py-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                    className={`block text-sm font-bold tracking-widest uppercase transition-colors
                    ${isActive(link.path)
                                            ? 'text-gold translate-x-1'
                                            : isDark ? 'text-dark-text/60' : 'text-light-text/80'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-gold/10">
                                {isAdmin ? (
                                    <Link
                                        to="/admin"
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest
                      ${isDark ? 'bg-gold-muted/10 text-gold border border-gold-muted/20' : 'bg-gold/10 text-gold border border-gold/20'}`}
                                    >
                                        <LayoutDashboard size={16} />
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-gold to-gold-muted text-charcoal shadow-lg shadow-gold/10"
                                    >
                                        <LogIn size={16} />
                                        Admin Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}


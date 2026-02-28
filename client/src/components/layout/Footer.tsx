import { motion } from 'framer-motion';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const socialLinks = [
        { icon: Instagram, href: 'https://www.instagram.com/vino4144/', label: 'Instagram' },
        { icon: Mail, href: 'mailto:pvino4898@gmail.com', label: 'Email' },
        { icon: Phone, href: 'https://wa.me/917200331655?text=Hi! I have a general enquiry about Vino\'s Creation.', label: 'WhatsApp' },
    ];

    return (
        <footer className={`relative overflow-hidden ${isDark ? 'bg-charcoal' : 'bg-beige'}`} id="contact">
            {/* Decorative top border */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className={`font-serif text-2xl font-semibold mb-4
              ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                            Vino's Creation
                        </h3>
                        <p className={`text-sm leading-relaxed max-w-xs
              ${isDark ? 'text-dark-text/60' : 'text-light-text/70'}`}>
                            Crafting tradition into timeless kolam designs. Each stencil is a bridge between
                            generations of artistic heritage and modern creativity.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={`font-serif text-lg font-medium mb-4
              ${isDark ? 'text-gold' : 'text-gold'}`}>
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'About', href: '/#about' },
                                { name: 'Products', href: '/#products' },
                                { name: 'Contact', href: '/#contact' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={`text-sm transition-colors duration-300 hover:text-gold
                      ${isDark ? 'text-dark-text/60' : 'text-light-text/70'}`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className={`font-serif text-lg font-medium mb-4
              ${isDark ? 'text-gold' : 'text-gold'}`}>
                            Get in Touch
                        </h4>
                        <div className="space-y-3">
                            <div className={`flex items-center gap-3 text-sm
                ${isDark ? 'text-dark-text/60' : 'text-light-text/70'}`}>
                                <MapPin size={16} className="text-gold shrink-0" />
                                <span>Tamil Nadu, India</span>
                            </div>
                            <div className={`flex items-center gap-3 text-sm
                ${isDark ? 'text-dark-text/60' : 'text-light-text/70'}`}>
                                <Mail size={16} className="text-gold shrink-0" />
                                <span>pvino4898@gmail.com</span>
                            </div>
                            <div className={`flex items-center gap-3 text-sm
                ${isDark ? 'text-dark-text/60' : 'text-light-text/70'}`}>
                                <Phone size={16} className="text-gold shrink-0" />
                                <span>+91 72003 31655</span>
                            </div>
                            <div className="flex items-center gap-3 mt-4">
                                {socialLinks.map(({ icon: Icon, href, label }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-2.5 rounded-full transition-colors duration-300
                      ${isDark
                                                ? 'bg-dark-card text-gold hover:bg-dark-border'
                                                : 'bg-cream text-gold hover:bg-white'
                                            }`}
                                        aria-label={label}
                                    >
                                        <Icon size={18} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4
          ${isDark ? 'border-dark-border' : 'border-beige-dark'}`}>
                    <p className={`text-xs ${isDark ? 'text-dark-text/40' : 'text-light-text/50'}`}>
                        © {new Date().getFullYear()} Vino's Creation. All rights reserved.
                    </p>
                    <p className={`text-xs ${isDark ? 'text-dark-text/40' : 'text-light-text/50'}`}>
                        Handcrafted with love for tradition
                    </p>
                </div>
            </div>
        </footer>
    );
}

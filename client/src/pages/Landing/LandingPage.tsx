import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Star, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ui/ProductCard';
import SkeletonCard from '../../components/ui/SkeletonCard';
import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SIZES = ['All', '6x6', '8x8', '10x10', '12x12'];

export default function LandingPage() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const location = useLocation();
    const { products, loading } = useProducts();
    const [sizeFilter, setSizeFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesSize = sizeFilter === 'All' || p.size === sizeFilter;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSize && matchesSearch;
        });
    }, [products, sizeFilter, searchQuery]);

    return (
        <div className={`min-h-screen ${isDark ? 'bg-charcoal' : 'bg-cream'}`}>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 ${isDark
                        ? 'bg-gradient-to-br from-charcoal via-dark-surface to-charcoal'
                        : 'bg-gradient-to-br from-cream via-beige/40 to-cream'
                        }`} />
                    {/* Decorative Kolam-inspired pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 800">
                        <defs>
                            <pattern id="kolam" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <circle cx="50" cy="50" r="3" fill="currentColor" />
                                <circle cx="0" cy="0" r="3" fill="currentColor" />
                                <circle cx="100" cy="0" r="3" fill="currentColor" />
                                <circle cx="0" cy="100" r="3" fill="currentColor" />
                                <circle cx="100" cy="100" r="3" fill="currentColor" />
                                <path d="M50 0 Q75 25 50 50 Q25 25 50 0" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                <path d="M0 50 Q25 75 50 50 Q25 25 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                <path d="M50 100 Q75 75 50 50 Q25 75 50 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                <path d="M100 50 Q75 75 50 50 Q75 25 100 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="800" height="800" fill="url(#kolam)" className={isDark ? 'text-gold' : 'text-gold'} />
                    </svg>
                    {/* Floating orbs */}
                    <motion.div
                        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl
              ${isDark ? 'bg-gold-muted/5' : 'bg-gold/5'}`}
                    />
                    <motion.div
                        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                        className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl
              ${isDark ? 'bg-terracotta/5' : 'bg-terracotta/5'}`}
                    />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-6"
                    >
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest
              ${isDark ? 'bg-gold-muted/10 text-gold border border-gold-muted/20' : 'bg-gold/10 text-gold border border-gold/20'}`}>
                            <Sparkles size={14} />
                            Handcrafted with Love
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6
              ${isDark ? 'text-dark-text' : 'text-charcoal'}`}
                    >
                        Vino's{' '}
                        <span className="text-gradient">Creation</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className={`font-serif text-lg sm:text-xl md:text-2xl italic mb-8
              ${isDark ? 'text-gold/70' : 'text-gold'}`}
                    >
                        "Crafting Tradition into Timeless Kolam Designs"
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className={`text-base max-w-2xl mx-auto mb-12 leading-relaxed
              ${isDark ? 'text-dark-text/50' : 'text-light-text/70'}`}
                    >
                        Discover our collection of premium kolam stencils, each designed to bring the beauty
                        of traditional South Indian art into your home with effortless elegance.
                    </motion.p>

                    <motion.a
                        href="#products"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider
              bg-gradient-to-r from-gold to-gold-muted text-charcoal
              hover:shadow-[0_8px_30px_rgba(212,168,83,0.3)] transition-shadow duration-500`}
                    >
                        Explore Collection
                        <ArrowDown size={16} />
                    </motion.a>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1
            ${isDark ? 'border-gold-muted/30' : 'border-gold/30'}`}>
                        <motion.div
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-gold"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ===== ABOUT SECTION ===== */}
            <section id="about" className={`py-24 sm:py-32 ${isDark ? 'bg-dark-surface' : 'bg-beige/30'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest mb-4
                ${isDark ? 'text-gold' : 'text-gold'}`}>
                                <Star size={14} />
                                Our Story
                            </span>
                            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight
                ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                                Where Tradition <br />
                                Meets <span className="text-gradient">Artistry</span>
                            </h2>
                            <div className={`space-y-4 text-base leading-relaxed
                ${isDark ? 'text-dark-text/60' : 'text-light-text/70'}`}>
                                <p>
                                    Vino's Creation was born from a deep love for the ancient art of Kolam —
                                    the sacred geometric patterns that have graced South Indian thresholds for centuries.
                                </p>
                                <p>
                                    Each stencil in our collection is meticulously designed to capture the intricate
                                    beauty of traditional kolam patterns while making them accessible to everyone.
                                </p>
                                <p>
                                    Whether you're a seasoned artist or discovering kolam for the first time, our
                                    premium stencils bring the joy of this cultural art form to your doorstep with
                                    unmatched precision and elegance.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Feature cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { icon: Sparkles, title: 'Premium Quality', desc: 'Durable, reusable stencils crafted with precision' },
                                { icon: Palette, title: 'Authentic Designs', desc: 'Traditional patterns with a modern touch' },
                                { icon: Star, title: 'Multiple Sizes', desc: 'From compact 6x6 to grand 12x12 inches' },
                                { icon: Sparkles, title: 'Easy to Use', desc: 'Perfect results every single time' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    whileHover={{ y: -4 }}
                                    className={`p-6 rounded-2xl transition-all duration-300
                    ${isDark
                                            ? 'bg-dark-card border border-dark-border hover:border-gold-muted/30'
                                            : 'bg-white border border-beige-dark/20 hover:border-gold/30'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3
                    ${isDark ? 'bg-gold-muted/10 text-gold' : 'bg-gold/10 text-gold'}`}>
                                        <item.icon size={20} />
                                    </div>
                                    <h4 className={`font-serif text-sm font-semibold mb-1
                    ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                                        {item.title}
                                    </h4>
                                    <p className={`text-xs leading-relaxed
                    ${isDark ? 'text-dark-text/50' : 'text-light-text/60'}`}>
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== PRODUCTS SECTION ===== */}
            <section id="products" className={`py-24 sm:py-32 ${isDark ? 'bg-charcoal' : 'bg-cream'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest mb-4
              ${isDark ? 'text-gold' : 'text-gold'}`}>
                            <Palette size={14} />
                            Our Collection
                        </span>
                        <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4
              ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                            Kolam <span className="text-gradient">Stencils</span>
                        </h2>
                        <p className={`text-base max-w-xl mx-auto
              ${isDark ? 'text-dark-text/50' : 'text-light-text/60'}`}>
                            Browse through our curated collection of handcrafted kolam stencil designs,
                            perfect for every occasion and space.
                        </p>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center gap-4 mb-12"
                    >
                        {/* Search */}
                        <div className="relative flex-1 w-full sm:max-w-md">
                            <input
                                type="text"
                                placeholder="Search designs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-4 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300
                  ${isDark
                                        ? 'bg-dark-card border border-dark-border text-dark-text placeholder:text-dark-text/30 focus:border-gold-muted/50'
                                        : 'bg-white border border-beige-dark/30 text-charcoal placeholder:text-light-text/40 focus:border-gold/50'
                                    }`}
                            />
                        </div>

                        {/* Size filter */}
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            {SIZES.map((size) => (
                                <motion.button
                                    key={size}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSizeFilter(size)}
                                    className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300
                    ${sizeFilter === size
                                            ? 'bg-gradient-to-r from-gold to-gold-muted text-charcoal shadow-lg'
                                            : isDark
                                                ? 'bg-dark-card border border-dark-border text-dark-text/60 hover:text-gold hover:border-gold-muted/30'
                                                : 'bg-white border border-beige-dark/30 text-light-text/60 hover:text-gold hover:border-gold/30'
                                        }`}
                                >
                                    {size}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Palette size={48} className={`mx-auto mb-4 ${isDark ? 'text-dark-border' : 'text-beige-dark'}`} />
                            <p className={`font-serif text-xl ${isDark ? 'text-dark-text/40' : 'text-light-text/40'}`}>
                                No designs found
                            </p>
                            <p className={`text-sm mt-2 ${isDark ? 'text-dark-text/30' : 'text-light-text/30'}`}>
                                Try adjusting your search or filter
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ===== CTA / CONTACT SECTION ===== */}
            <section id="contact" className={`py-24 sm:py-32 ${isDark ? 'bg-dark-surface' : 'bg-beige/30'}`}>
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6
              ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                            Bring <span className="text-gradient">Tradition</span> Home
                        </h2>
                        <p className={`text-base leading-relaxed mb-10 max-w-xl mx-auto
              ${isDark ? 'text-dark-text/50' : 'text-light-text/60'}`}>
                            Interested in our kolam stencils? Get in touch with us to explore custom designs,
                            bulk orders, or any inquiries about our collection.
                        </p>
                        <motion.a
                            href="mailto:contact@vinoscreation.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider
                bg-gradient-to-r from-gold to-gold-muted text-charcoal
                hover:shadow-[0_8px_30px_rgba(212,168,83,0.3)] transition-shadow duration-500"
                        >
                            Contact Us
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Ruler, Layers, Sparkles, Hash } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProduct } from '../../hooks/useProducts';
import { useState } from 'react';

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { product, loading, error } = useProduct(id!);
    const [imageZoomed, setImageZoomed] = useState(false);

    if (loading) {
        return (
            <div className={`min-h-screen pt-24 ${isDark ? 'bg-charcoal' : 'bg-cream'}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className={`aspect-square rounded-2xl skeleton ${isDark ? 'bg-dark-card' : 'bg-beige'}`} />
                        <div className="space-y-4 py-8">
                            <div className={`h-8 w-3/4 rounded skeleton ${isDark ? 'bg-dark-card' : 'bg-beige'}`} />
                            <div className={`h-4 w-1/4 rounded skeleton ${isDark ? 'bg-dark-card' : 'bg-beige'}`} />
                            <div className={`h-4 w-full rounded skeleton ${isDark ? 'bg-dark-card' : 'bg-beige'}`} />
                            <div className={`h-4 w-full rounded skeleton ${isDark ? 'bg-dark-card' : 'bg-beige'}`} />
                            <div className={`h-4 w-2/3 rounded skeleton ${isDark ? 'bg-dark-card' : 'bg-beige'}`} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className={`min-h-screen pt-24 flex items-center justify-center ${isDark ? 'bg-charcoal' : 'bg-cream'}`}>
                <div className="text-center">
                    <p className={`font-serif text-2xl mb-4 ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                        Product not found
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gold hover:underline"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-20 pb-24 ${isDark ? 'bg-charcoal' : 'bg-cream'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="py-6"
                >
                    <Link
                        to="/#products"
                        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300
              ${isDark ? 'text-dark-text/50 hover:text-gold' : 'text-light-text/60 hover:text-gold'}`}
                    >
                        <ArrowLeft size={16} />
                        Back to Collection
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div
                            className={`relative rounded-2xl overflow-hidden cursor-zoom-in
                ${isDark ? 'bg-dark-card' : 'bg-white'}
                ${imageZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                            onClick={() => setImageZoomed(!imageZoomed)}
                        >
                            <motion.img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full aspect-square object-cover"
                                animate={{ scale: imageZoomed ? 1.5 : 1 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                        </div>
                        <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl
              ${isDark ? 'bg-gold-muted/10' : 'bg-gold/10'}`} />
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center py-4"
                    >
                        <span className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest mb-4
              ${isDark ? 'text-gold' : 'text-gold'}`}>
                            <Sparkles size={14} />
                            Kolam Stencil
                        </span>

                        <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6
              ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                            {product.name}
                        </h1>

                        {/* Info badges */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                ${isDark ? 'bg-dark-card border border-dark-border text-dark-text/70' : 'bg-beige border border-beige-dark/30 text-light-text'}`}>
                                <Ruler size={14} className="text-gold" />
                                {product.size} inches
                            </div>
                            {product.material && (
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                  ${isDark ? 'bg-dark-card border border-dark-border text-dark-text/70' : 'bg-beige border border-beige-dark/30 text-light-text'}`}>
                                    <Layers size={14} className="text-gold" />
                                    {product.material}
                                </div>
                            )}
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                ${isDark ? 'bg-dark-card border border-dark-border text-dark-text/40' : 'bg-beige border border-beige-dark/30 text-light-text/50'}`}>
                                <Hash size={14} className="text-gold" />
                                {product.id.slice(0, 8)}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className={`font-serif text-lg font-semibold mb-3
                ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                                Description
                            </h3>
                            <p className={`text-sm leading-relaxed
                ${isDark ? 'text-dark-text/60' : 'text-light-text/70'}`}>
                                {product.description}
                            </p>
                        </div>

                        {/* Usage Suggestion */}
                        {product.usage_suggestion && (
                            <div className={`p-6 rounded-2xl mb-8
                ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-beige/50 border border-beige-dark/20'}`}>
                                <h3 className={`font-serif text-lg font-semibold mb-3
                  ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                                    Usage Suggestion
                                </h3>
                                <p className={`text-sm leading-relaxed
                  ${isDark ? 'text-dark-text/60' : 'text-light-text/70'}`}>
                                    {product.usage_suggestion}
                                </p>
                            </div>
                        )}

                        {/* CTA */}
                        <motion.a
                            href="mailto:contact@vinoscreation.com"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider
                bg-gradient-to-r from-gold to-gold-muted text-charcoal w-full sm:w-auto
                hover:shadow-[0_8px_30px_rgba(212,168,83,0.3)] transition-shadow duration-500"
                        >
                            Inquire About This Design
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

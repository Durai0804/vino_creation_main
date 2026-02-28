import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link to={`/product/${product.id}`}>
                <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`group rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-500
            ${isDark
                            ? 'bg-dark-card border border-dark-border hover:shadow-[0_20px_60px_-15px_rgba(184,150,62,0.15)]'
                            : 'bg-white border border-beige-dark/30 hover:shadow-[0_20px_60px_-15px_rgba(212,168,83,0.2)]'
                        }`}
                >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
              ${isDark
                                ? 'bg-gradient-to-t from-charcoal/60 to-transparent'
                                : 'bg-gradient-to-t from-black/20 to-transparent'
                            }`}
                        />
                        {/* Size badge */}
                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium
              ${isDark
                                ? 'bg-charcoal/80 text-gold backdrop-blur-sm'
                                : 'bg-white/80 text-gold backdrop-blur-sm'
                            }`}>
                            {product.size}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className={`font-serif text-lg font-semibold mb-1.5 transition-colors duration-300
              ${isDark ? 'text-dark-text group-hover:text-gold' : 'text-charcoal group-hover:text-gold'}`}>
                            {product.name}
                        </h3>
                        <p className={`text-sm leading-relaxed line-clamp-2
              ${isDark ? 'text-dark-text/50' : 'text-light-text/60'}`}>
                            {product.description}
                        </p>
                        <div className={`mt-4 flex items-center gap-2 text-xs font-medium tracking-wider uppercase
              text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            <span>View Details</span>
                            <motion.span
                                className="inline-block"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

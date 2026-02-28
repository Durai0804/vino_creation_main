import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, LogOut, Package, BarChart3, Search, X, Upload, Save, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { productService } from '../../services/api';
import type { Product, ProductFormData } from '../../types';
import { useNavigate } from 'react-router-dom';

const SIZES = ['6x6', '8x8', '10x10', '12x12'];

export default function AdminDashboard() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { logout, user } = useAuth();
    const { products, loading, refetch } = useProducts();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        size: '6x6',
        material: '',
        usage_suggestion: '',
        image: null,
    });

    const resetForm = () => {
        setFormData({ name: '', description: '', size: '6x6', material: '', usage_suggestion: '', image: null });
        setEditingProduct(null);
        setShowForm(false);
        setFormError('');
    };

    const openEditForm = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            size: product.size,
            material: product.material || '',
            usage_suggestion: product.usage_suggestion || '',
            image: null,
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');

        try {
            if (editingProduct) {
                await productService.update(editingProduct.id, formData);
            } else {
                if (!formData.image) {
                    setFormError('Please select an image');
                    setFormLoading(false);
                    return;
                }
                await productService.create(formData);
            }
            resetForm();
            refetch();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await productService.delete(id);
            setDeleteConfirm(null);
            refetch();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`min-h-screen pt-20 pb-12 ${isDark ? 'bg-charcoal' : 'bg-cream'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <div>
                        <h1 className={`font-serif text-3xl font-bold ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                            Admin Dashboard
                        </h1>
                        <p className={`text-sm mt-1 ${isDark ? 'text-dark-text/50' : 'text-light-text/60'}`}>
                            Welcome back, {user?.email}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setEditingProduct(null); setShowForm(true); }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                bg-gradient-to-r from-gold to-gold-muted text-charcoal
                hover:shadow-[0_4px_20px_rgba(212,168,83,0.3)] transition-shadow duration-300"
                        >
                            <Plus size={16} />
                            Add Product
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleLogout}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${isDark
                                    ? 'bg-dark-card border border-dark-border text-dark-text/60 hover:text-red-400 hover:border-red-400/30'
                                    : 'bg-white border border-beige-dark/30 text-light-text/60 hover:text-red-500 hover:border-red-500/30'
                                }`}
                        >
                            <LogOut size={16} />
                            Logout
                        </motion.button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    {[
                        { icon: Package, label: 'Total Products', value: products.length },
                        { icon: BarChart3, label: 'Sizes Available', value: [...new Set(products.map(p => p.size))].length },
                        { icon: Package, label: 'Latest Added', value: products.length > 0 ? new Date(products[products.length - 1]?.created_at).toLocaleDateString() : 'N/A' },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ y: -2 }}
                            className={`p-5 rounded-2xl ${isDark
                                ? 'bg-dark-card border border-dark-border'
                                : 'bg-white border border-beige-dark/20'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                  ${isDark ? 'bg-gold-muted/10 text-gold' : 'bg-gold/10 text-gold'}`}>
                                    <stat.icon size={20} />
                                </div>
                                <div>
                                    <p className={`text-xs uppercase tracking-wider ${isDark ? 'text-dark-text/40' : 'text-light-text/50'}`}>
                                        {stat.label}
                                    </p>
                                    <p className={`text-lg font-semibold ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2
              ${isDark ? 'text-dark-text/30' : 'text-light-text/30'}`} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300
                ${isDark
                                    ? 'bg-dark-card border border-dark-border text-dark-text placeholder:text-dark-text/25 focus:border-gold-muted/50'
                                    : 'bg-white border border-beige-dark/30 text-charcoal placeholder:text-light-text/30 focus:border-gold/50'
                                }`}
                        />
                    </div>
                </div>

                {/* Products Table/Cards */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <Package size={48} className={`mx-auto mb-4 ${isDark ? 'text-dark-border' : 'text-beige-dark'}`} />
                        <p className={`font-serif text-xl ${isDark ? 'text-dark-text/40' : 'text-light-text/40'}`}>
                            No products found
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`rounded-2xl overflow-hidden group
                  ${isDark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-beige-dark/20'}`}
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 flex items-center justify-center gap-3
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    ${isDark ? 'bg-charcoal/70' : 'bg-black/40'}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => openEditForm(product)}
                                            className="p-3 rounded-full bg-white/90 text-charcoal hover:bg-gold hover:text-white transition-colors"
                                        >
                                            <Edit size={16} />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setDeleteConfirm(product.id)}
                                            className="p-3 rounded-full bg-white/90 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </motion.button>
                                    </div>
                                    <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs
                    ${isDark ? 'bg-charcoal/80 text-gold' : 'bg-white/80 text-gold'}`}>
                                        {product.size}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className={`font-serif text-sm font-semibold mb-1 truncate
                    ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                                        {product.name}
                                    </h3>
                                    <p className={`text-xs truncate ${isDark ? 'text-dark-text/40' : 'text-light-text/50'}`}>
                                        {product.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* ===== PRODUCT FORM MODAL ===== */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => resetForm()}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8
                ${isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-beige-dark/20'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className={`font-serif text-xl font-bold
                  ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button
                                    onClick={resetForm}
                                    className={`p-2 rounded-full hover:bg-opacity-10 transition-colors
                    ${isDark ? 'text-dark-text/40 hover:text-dark-text' : 'text-light-text/40 hover:text-charcoal'}`}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {formError && (
                                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                    <AlertCircle size={16} />
                                    {formError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className={`block text-xs font-medium uppercase tracking-wider mb-1.5
                    ${isDark ? 'text-dark-text/60' : 'text-light-text/60'}`}>
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="e.g. Traditional Lotus Kolam"
                                        className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300
                      ${isDark
                                                ? 'bg-dark-card border border-dark-border text-dark-text placeholder:text-dark-text/25 focus:border-gold-muted/50'
                                                : 'bg-beige/50 border border-beige-dark/30 text-charcoal placeholder:text-light-text/30 focus:border-gold/50'
                                            }`}
                                    />
                                </div>

                                {/* Size */}
                                <div>
                                    <label className={`block text-xs font-medium uppercase tracking-wider mb-1.5
                    ${isDark ? 'text-dark-text/60' : 'text-light-text/60'}`}>
                                        Size *
                                    </label>
                                    <div className="flex gap-2 flex-wrap">
                                        {SIZES.map((size) => (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, size })}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                          ${formData.size === size
                                                        ? 'bg-gradient-to-r from-gold to-gold-muted text-charcoal'
                                                        : isDark
                                                            ? 'bg-dark-card border border-dark-border text-dark-text/60'
                                                            : 'bg-beige/50 border border-beige-dark/30 text-light-text/60'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className={`block text-xs font-medium uppercase tracking-wider mb-1.5
                    ${isDark ? 'text-dark-text/60' : 'text-light-text/60'}`}>
                                        Description *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        rows={3}
                                        placeholder="Describe the kolam design..."
                                        className={`w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300
                      ${isDark
                                                ? 'bg-dark-card border border-dark-border text-dark-text placeholder:text-dark-text/25 focus:border-gold-muted/50'
                                                : 'bg-beige/50 border border-beige-dark/30 text-charcoal placeholder:text-light-text/30 focus:border-gold/50'
                                            }`}
                                    />
                                </div>

                                {/* Material */}
                                <div>
                                    <label className={`block text-xs font-medium uppercase tracking-wider mb-1.5
                    ${isDark ? 'text-dark-text/60' : 'text-light-text/60'}`}>
                                        Material
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.material || ''}
                                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                        placeholder="e.g. PVC, Acrylic"
                                        className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300
                      ${isDark
                                                ? 'bg-dark-card border border-dark-border text-dark-text placeholder:text-dark-text/25 focus:border-gold-muted/50'
                                                : 'bg-beige/50 border border-beige-dark/30 text-charcoal placeholder:text-light-text/30 focus:border-gold/50'
                                            }`}
                                    />
                                </div>

                                {/* Usage Suggestion */}
                                <div>
                                    <label className={`block text-xs font-medium uppercase tracking-wider mb-1.5
                    ${isDark ? 'text-dark-text/60' : 'text-light-text/60'}`}>
                                        Usage Suggestion
                                    </label>
                                    <textarea
                                        value={formData.usage_suggestion || ''}
                                        onChange={(e) => setFormData({ ...formData, usage_suggestion: e.target.value })}
                                        rows={2}
                                        placeholder="How to best use this stencil..."
                                        className={`w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300
                      ${isDark
                                                ? 'bg-dark-card border border-dark-border text-dark-text placeholder:text-dark-text/25 focus:border-gold-muted/50'
                                                : 'bg-beige/50 border border-beige-dark/30 text-charcoal placeholder:text-light-text/30 focus:border-gold/50'
                                            }`}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className={`block text-xs font-medium uppercase tracking-wider mb-1.5
                    ${isDark ? 'text-dark-text/60' : 'text-light-text/60'}`}>
                                        Product Image {!editingProduct && '*'}
                                    </label>
                                    <label className={`flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300
                    ${formData.image
                                            ? isDark ? 'border-gold-muted/50 bg-gold-muted/5' : 'border-gold/50 bg-gold/5'
                                            : isDark ? 'border-dark-border hover:border-gold-muted/30' : 'border-beige-dark/30 hover:border-gold/30'
                                        }`}>
                                        <Upload size={24} className={`mb-2 ${isDark ? 'text-dark-text/30' : 'text-light-text/30'}`} />
                                        <span className={`text-xs ${isDark ? 'text-dark-text/40' : 'text-light-text/40'}`}>
                                            {formData.image ? formData.image.name : 'Click to upload image'}
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                                        />
                                    </label>
                                </div>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={formLoading}
                                    whileHover={{ scale: formLoading ? 1 : 1.02 }}
                                    whileTap={{ scale: formLoading ? 1 : 0.98 }}
                                    className={`w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300
                    ${formLoading ? 'opacity-60 cursor-not-allowed' : ''}
                    bg-gradient-to-r from-gold to-gold-muted text-charcoal`}
                                >
                                    {formLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                                            {editingProduct ? 'Updating...' : 'Creating...'}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <Save size={16} />
                                            {editingProduct ? 'Update Product' : 'Create Product'}
                                        </span>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== DELETE CONFIRMATION MODAL ===== */}
            <AnimatePresence>
                {deleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`w-full max-w-sm p-6 rounded-2xl
                ${isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-beige-dark/20'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className={`font-serif text-lg font-bold mb-2
                ${isDark ? 'text-dark-text' : 'text-charcoal'}`}>
                                Delete Product
                            </h3>
                            <p className={`text-sm mb-6 ${isDark ? 'text-dark-text/50' : 'text-light-text/60'}`}>
                                Are you sure? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${isDark
                                            ? 'bg-dark-card border border-dark-border text-dark-text/60 hover:text-dark-text'
                                            : 'bg-beige border border-beige-dark/30 text-light-text/60 hover:text-charcoal'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

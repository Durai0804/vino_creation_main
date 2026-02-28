import type { Product, ProductFormData } from '../types';
import { supabase } from '../config/supabase';

const API_BASE = (import.meta.env.VITE_API_BASE as string) || '/api';

const getAuthHeaders = async (): Promise<Record<string, string>> => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const productService = {
    async getAll(): Promise<Product[]> {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        return data.products;
    },

    async getById(id: string): Promise<Product> {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        return data.product;
    },

    async create(formData: ProductFormData): Promise<Product> {
        const authHeaders = await getAuthHeaders();
        const body = new FormData();

        body.append('name', formData.name);
        body.append('description', formData.description);
        body.append('size', formData.size);
        if (formData.price) body.append('price', formData.price);
        if (formData.material) body.append('material', formData.material);
        if (formData.usage_suggestion) body.append('usage_suggestion', formData.usage_suggestion);
        if (formData.image) body.append('image', formData.image);

        const res = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: authHeaders,
            body,
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Failed to create product');
        }
        const data = await res.json();
        return data.product;
    },

    async update(id: string, formData: ProductFormData): Promise<Product> {
        const authHeaders = await getAuthHeaders();
        const body = new FormData();

        body.append('name', formData.name);
        body.append('description', formData.description);
        body.append('size', formData.size);
        if (formData.price) body.append('price', formData.price);
        if (formData.material) body.append('material', formData.material);
        if (formData.usage_suggestion) body.append('usage_suggestion', formData.usage_suggestion);
        if (formData.image) body.append('image', formData.image);

        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: 'PUT',
            headers: authHeaders,
            body,
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Failed to update product');
        }
        const data = await res.json();
        return data.product;
    },

    async delete(id: string): Promise<void> {
        const authHeaders = await getAuthHeaders();
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: 'DELETE',
            headers: { ...authHeaders },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Failed to delete product');
        }
    },
};

export interface Product {
    id: string;
    name: string;
    description: string;
    size: string;
    image_url: string;
    material?: string;
    usage_suggestion?: string;
    created_at: string;
    updated_at: string;
}

export interface ProductFormData {
    name: string;
    description: string;
    size: string;
    material?: string;
    usage_suggestion?: string;
    image?: File | null;
}

export interface AdminUser {
    uid: string;
    email: string;
    displayName?: string;
}

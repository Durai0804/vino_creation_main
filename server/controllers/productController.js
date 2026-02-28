const supabase = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const STORAGE_BUCKET = 'product-images';

/**
 * Upload an image to Supabase Storage and return the public URL.
 */
async function uploadImage(file) {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;

    const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from(STORAGE_BUCKET)
        .upload(filename, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        });

    if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase
        .storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filename);

    return publicUrl;
}

/**
 * Delete an image from Supabase Storage by URL.
 */
async function deleteImage(imageUrl) {
    try {
        // Extract filename from Supabase public URL
        // Format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[filename]
        const parts = imageUrl.split(`${STORAGE_BUCKET}/`);
        const filename = parts[parts.length - 1];

        if (filename) {
            const { error } = await supabase
                .storage
                .from(STORAGE_BUCKET)
                .remove([filename]);

            if (error) throw error;
        }
    } catch (error) {
        console.error('Failed to delete image from Supabase:', error.message);
    }
}

// GET all products
exports.getAllProducts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json({ products: data });
    } catch (error) {
        console.error('Get all products error:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// GET single product
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Product not found' });

        res.json({ product: data });
    } catch (error) {
        console.error('Get product error:', error.message);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// POST create product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, size, price, material, usage_suggestion } = req.body;

        if (!name || !description || !size) {
            return res.status(400).json({ error: 'Name, description, and size are required' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Product image is required' });
        }

        const image_url = await uploadImage(req.file);

        const { data, error } = await supabase
            .from('products')
            .insert([{
                name,
                description,
                size,
                price: price || null,
                material: material || null,
                usage_suggestion: usage_suggestion || null,
                image_url,
            }])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ product: data });
    } catch (error) {
        console.error('Create product error:', error.message);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// PUT update product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, size, price, material, usage_suggestion } = req.body;

        if (!name || !description || !size) {
            return res.status(400).json({ error: 'Name, description, and size are required' });
        }

        const updates = {
            name,
            description,
            size,
            price: price || null,
            material: material || null,
            usage_suggestion: usage_suggestion || null,
            updated_at: new Date().toISOString(),
        };

        // If a new image was uploaded, handle it
        if (req.file) {
            // Delete old image
            const { data: existing } = await supabase
                .from('products')
                .select('image_url')
                .eq('id', id)
                .single();

            if (existing?.image_url) {
                await deleteImage(existing.image_url);
            }

            updates.image_url = await uploadImage(req.file);
        }

        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Product not found' });

        res.json({ product: data });
    } catch (error) {
        console.error('Update product error:', error.message);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Get image URL before deleting
        const { data: existing } = await supabase
            .from('products')
            .select('image_url')
            .eq('id', id)
            .single();

        if (existing?.image_url) {
            await deleteImage(existing.image_url);
        }

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error.message);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

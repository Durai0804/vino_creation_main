const supabase = require('../config/supabase');
const { db } = require('../config/firebase');
const crypto = require('crypto');
const path = require('path');

const STORAGE_BUCKET = 'product-images';
const COLLECTION = 'products';

/**
 * Upload an image to Supabase Storage and return the public URL.
 */
async function uploadImage(file) {
    const ext = path.extname(file.originalname);
    const filename = `${crypto.randomUUID()}${ext}`;

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
        const snapshot = await db.collection(COLLECTION).orderBy('created_at', 'desc').get();
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json({ products });
    } catch (error) {
        console.error('Get all products error:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// GET single product
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection(COLLECTION).doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ product: { id: doc.id, ...doc.data() } });
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

        const productData = {
            name,
            description,
            size,
            price: price || null,
            material: material || null,
            usage_suggestion: usage_suggestion || null,
            image_url,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const docRef = await db.collection(COLLECTION).add(productData);
        res.status(201).json({
            product: { id: docRef.id, ...productData }
        });
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

        if (req.file) {
            const doc = await db.collection(COLLECTION).doc(id).get();
            if (doc.exists && doc.data().image_url) {
                await deleteImage(doc.data().image_url);
            }
            updates.image_url = await uploadImage(req.file);
        }

        await db.collection(COLLECTION).doc(id).update(updates);
        const updatedDoc = await db.collection(COLLECTION).doc(id).get();

        res.json({
            product: { id: updatedDoc.id, ...updatedDoc.data() }
        });
    } catch (error) {
        console.error('Update product error:', error.message);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const doc = await db.collection(COLLECTION).doc(id).get();
        if (doc.exists && doc.data().image_url) {
            await deleteImage(doc.data().image_url);
        }

        await db.collection(COLLECTION).doc(id).delete();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error.message);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

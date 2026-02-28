const supabase = require('../config/supabase');

const ADMIN_EMAILS = [
    'pvino4898@gmail.com',
    'chairmadurai0804@gmail.com'
];

/**
 * Middleware to verify Supabase Auth session and restrict to admin emails.
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split('Bearer ')[1];

        // Verify with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid session' });
        }

        if (!user.email || !ADMIN_EMAILS.includes(user.email)) {
            return res.status(403).json({ error: 'Forbidden: Admin access required' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(401).json({ error: 'Unauthorized: System error during verification' });
    }
};

module.exports = authMiddleware;

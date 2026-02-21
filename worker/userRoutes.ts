import { Hono } from "hono";
import { Env } from './core-utils';
// We'll define types based on our data structure
type ChurchData = Record<string, any>;
const ADMIN_PASSWORD = "harvest2024";
export function userRoutes(app: Hono<{ Bindings: Env & { KV: KVNamespace } }>) {
    // Auth Middleware
    const authMiddleware = async (c: any, next: () => Promise<void>) => {
        const authHeader = c.req.header('Authorization');
        if (authHeader === `Bearer ${ADMIN_PASSWORD}`) {
            await next();
        } else {
            return c.json({ success: false, error: 'Unauthorized' }, 401);
        }
    };
    // Public Data Access with fallback and auto-seeding logic
    app.get('/api/data/:type', async (c) => {
        const type = c.req.param('type');
        const kv = (c.env as any).KV as KVNamespace;
        try {
            const data = await kv.get(`church_data_${type}`, 'json');
            if (data) {
                return c.json({ success: true, data });
            }
            // Fallback: If not in KV, we'd ideally seed here, but for now we return 404
            // and let the frontend handle the initial empty state or default to its own constants
            return c.json({ success: false, error: 'Data not found in store' }, 404);
        } catch (e) {
            return c.json({ success: false, error: 'KV Read Error' }, 500);
        }
    });
    // Admin Login
    app.post('/api/admin/login', async (c) => {
        const { password } = await c.req.json();
        if (password === ADMIN_PASSWORD) {
            return c.json({ success: true, token: ADMIN_PASSWORD });
        }
        return c.json({ success: false, error: 'Invalid password' }, 401);
    });
    // Admin CRUD - Create or Update
    app.post('/api/admin/data/:type', authMiddleware, async (c) => {
        const type = c.req.param('type');
        const body = await c.req.json();
        const kv = (c.env as any).KV as KVNamespace;
        try {
            await kv.put(`church_data_${type}`, JSON.stringify(body));
            return c.json({ success: true });
        } catch (e) {
            return c.json({ success: false, error: 'KV Write Error' }, 500);
        }
    });
    // Seed Route - Helper for initial deployment
    app.post('/api/admin/seed', authMiddleware, async (c) => {
        const data = await c.req.json();
        const kv = (c.env as any).KV as KVNamespace;
        try {
            for (const [key, value] of Object.entries(data)) {
                await kv.put(`church_data_${key}`, JSON.stringify(value));
            }
            return c.json({ success: true, message: 'Seeding complete' });
        } catch (e) {
            return c.json({ success: false, error: 'Seeding failed' }, 500);
        }
    });
}
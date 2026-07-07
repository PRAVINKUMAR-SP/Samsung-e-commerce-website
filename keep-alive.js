/**
 * Keep-Alive Pinger for Render Free Tier
 * 
 * Pings the backend every 14 minutes to prevent the instance from
 * spinning down (Render free tier sleeps after 15 min of inactivity).
 * 
 * Usage:
 *   node keep-alive.js
 * 
 * You can run this on your local machine, or set up a free cron job
 * at https://cron-job.org or https://uptimerobot.com to hit the
 * health endpoint every 14 minutes.
 */

const BACKEND_URL = 'https://samsung-backend-xds3.onrender.com/api/health';
const PING_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

async function ping() {
    const timestamp = new Date().toLocaleTimeString();
    try {
        const response = await fetch(BACKEND_URL);
        const data = await response.json();
        console.log(`[${timestamp}] ✅ Backend alive — status: ${data.status}`);
    } catch (error) {
        console.log(`[${timestamp}] ❌ Ping failed — ${error.message}`);
    }
}

// Initial ping
ping();

// Keep pinging every 14 minutes
setInterval(ping, PING_INTERVAL_MS);

console.log(`🏓 Keep-alive started. Pinging ${BACKEND_URL} every 14 minutes.`);
console.log('   Press Ctrl+C to stop.\n');

# TableCall MVP

First working prototype for a QR waiter-call system.

## Stack
- Next.js 16.4 / React 19.3
- Supabase Postgres + Realtime
- Vercel-ready

## What works
1. Customer opens `/t/demo-table-24`.
2. Customer selects Call Waiter / Order / Bill / Other.
3. Server validates the table token and creates a service request.
4. `/staff` receives changes in real time through Supabase Realtime.
5. Staff can Accept and Complete requests.

## Setup
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Add your Supabase URL, publishable key, and server-only service role key.
5. Install dependencies: `npm install`
6. Run: `npm run dev`
7. Open `http://localhost:3000/t/demo-table-24` in one browser and `http://localhost:3000/staff` in another.

## Important security note
The current staff policies are intentionally DEMO policies so the realtime flow can be tested immediately. Before public production use, add Supabase Auth and RLS policies that restrict each waiter/manager to their restaurant. Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.

## Next build steps
- Staff login/authentication
- Restaurant/manager accounts
- Tables & QR generator
- Proper tenant isolation / RLS
- Push notifications + sound/vibration
- Request timeout/escalation
- Manager dashboard
- Branding per restaurant
- PWA installability
- Production monitoring and audit log

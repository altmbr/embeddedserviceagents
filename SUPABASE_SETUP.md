# Supabase Lead Collection Setup

This guide will help you set up Supabase to collect and store lead magnet email submissions.

---

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free tier)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `endless-reply` or whatever you prefer
   - **Database Password**: Generate a strong password (save it somewhere safe)
   - **Region**: Choose closest to your users (e.g., `US West`)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to provision

---

## Step 2: Create the Leads Table

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Paste this SQL and click **"Run"**:

```sql
-- Create leads table
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  user_agent TEXT,
  ip TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_leads_email ON leads(email);

-- Create index on created_at for sorting
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Add unique constraint to prevent duplicate emails
ALTER TABLE leads ADD CONSTRAINT unique_email UNIQUE (email);
```

4. You should see: **"Success. No rows returned"**

---

## Step 3: Enable Row Level Security (RLS)

By default, Supabase has RLS enabled. We need to add a policy to allow inserts from your API.

1. Still in **SQL Editor**, run this:

```sql
-- Allow inserts from service role (your API)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to insert
CREATE POLICY "Allow service role to insert leads"
  ON leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow service role to select
CREATE POLICY "Allow service role to select leads"
  ON leads
  FOR SELECT
  TO service_role
  USING (true);
```

---

## Step 4: Get Your API Keys

1. Click **"Project Settings"** (gear icon in sidebar)
2. Click **"API"** in the left menu
3. You'll see two keys:

### Copy these values:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon/public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 5: Add Environment Variables Locally

1. Open your `.env.local` file
2. Add these two lines (replace with your actual values):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

---

## Step 6: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these two variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxxxxxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

4. Check **Production**, **Preview**, **Development** for both
5. Click **Save**

---

## Step 7: Test Locally

1. Restart your dev server:
```bash
npm run dev
```

2. Go to `http://localhost:3000`
3. Scroll to footer and submit an email
4. Check your Supabase dashboard:
   - Click **"Table Editor"** (left sidebar)
   - Click **"leads"** table
   - You should see your test email!

---

## Step 8: Deploy to Vercel

After adding the environment variables in Vercel:

1. Push your code to GitHub (already done)
2. Vercel will auto-deploy with the new Supabase integration
3. Test on your live site by submitting the footer form

---

## Viewing Your Leads

### Option 1: Supabase Dashboard
- Go to **Table Editor** → **leads**
- See all submissions with UTM parameters

### Option 2: API Endpoint
- Visit: `https://endlessreply.com/api/leads`
- Returns JSON with all leads

### Option 3: PostHog (Primary)
- PostHog still tracks `lead_magnet_submitted` events
- Includes full user session data + UTM attribution

---

## What Gets Stored

Each lead submission saves:
- `email` - User's email
- `source` - `"footer-guide"`
- `timestamp` - When submitted
- `user_agent` - Browser info
- `ip` - User's IP address
- `utm_source` - Ad source (google, facebook, etc.)
- `utm_medium` - Medium (cpc, social, etc.)
- `utm_campaign` - Campaign name
- `utm_content` - Ad variation
- `utm_term` - Search keywords
- `created_at` - Database timestamp

---

## Backup Strategy

You now have **triple redundancy**:

1. **PostHog** - Primary tracking with full analytics (working now)
2. **Supabase** - Database backup with UTM params (after setup)
3. **Vercel Logs** - Console logs as last resort

---

## Troubleshooting

### Leads not appearing in Supabase?
- Check Vercel logs for errors
- Verify environment variables are set correctly
- Make sure RLS policies are enabled (Step 3)

### RLS Policy Error?
- Double-check you ran the policy SQL from Step 3
- Verify the table name is exactly `leads`

### Can't connect to Supabase?
- Verify the URL and key are correct
- Make sure you copied the `anon` key, not the `service_role` key

---

*Setup time: ~10 minutes*

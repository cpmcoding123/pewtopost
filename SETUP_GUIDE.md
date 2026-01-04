# PewToPost Platform Setup Guide

Complete step-by-step instructions to get your platform running with authentication, database, file storage, and payments.

## 📋 Table of Contents
1. [Supabase Setup](#supabase-setup)
2. [Stripe Setup](#stripe-setup)
3. [Configuration](#configuration)
4. [Database Schema](#database-schema)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Email Setup](#email-setup)

---

## 🔧 Supabase Setup

Supabase will handle: Authentication, Database, File Storage

### Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or Email
4. Create a new project:
   - **Project Name**: PewToPost
   - **Database Password**: (Save this securely!)
   - **Region**: Choose closest to your location
   - Click "Create new project"
   - Wait 2-3 minutes for setup

### Step 2: Get API Keys
1. In your project dashboard, click "Settings" (gear icon)
2. Click "API" in the left menu
3. Copy these values (you'll need them later):
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** key (starts with eyJh...)

### Step 3: Enable Email Authentication
1. Go to "Authentication" → "Providers"
2. Find "Email" and make sure it's enabled
3. Configure email templates (optional but recommended):
   - Go to "Authentication" → "Email Templates"
   - Customize confirmation and password reset emails with your branding

### Step 4: Create Database Tables

Go to "SQL Editor" in your Supabase dashboard and run these commands one by one:

```sql
-- Create profiles table
CREATE TABLE profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    church_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subscription_plan TEXT DEFAULT 'free',
    subscription_status TEXT DEFAULT 'inactive',
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submissions table
CREATE TABLE submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    video_method TEXT NOT NULL,
    video_path TEXT NOT NULL,
    scripture_references TEXT,
    notes TEXT,
    target_platforms TEXT[] NOT NULL,
    deliverables TEXT[] NOT NULL,
    voice_style TEXT NOT NULL,
    rush_order BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clips table (for storing generated clips)
CREATE TABLE clips (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_id UUID REFERENCES submissions NOT NULL,
    clip_number INTEGER NOT NULL,
    clip_url TEXT NOT NULL,
    platform TEXT NOT NULL,
    caption TEXT,
    hashtags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE clips ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Create policies for submissions
CREATE POLICY "Users can view own submissions"
    ON submissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
    ON submissions FOR INSERT
    WITH CHECK (true);

-- Create policies for clips
CREATE POLICY "Users can view own clips"
    ON clips FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM submissions
            WHERE submissions.id = clips.submission_id
            AND submissions.user_id = auth.uid()
        )
    );
```

### Step 5: Create Storage Bucket
1. Go to "Storage" in your Supabase dashboard
2. Click "Create a new bucket"
3. Name: `sermon-videos`
4. **Public bucket**: NO (keep it private)
5. Click "Create bucket"
6. Click on the bucket name
7. Click "Policies" tab
8. Click "New Policy"
9. Add this policy:

```sql
-- Allow authenticated uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'sermon-videos');

-- Allow users to read their own files
CREATE POLICY "Users can read own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'sermon-videos' AND (storage.foldername(name))[1] = auth.uid()::text);
```

---

## 💳 Stripe Setup

Stripe will handle: Payments, Subscriptions, Customer Portal

### Step 1: Create Stripe Account
1. Go to https://stripe.com
2. Click "Start now" → Sign up
3. Complete business information
4. Verify your email

### Step 2: Create Products
1. In Stripe Dashboard, go to "Products" → "Add product"

**Create 3 products:**

**Product 1: Basic Plan**
- Name: Basic Plan
- Price: $299/month
- Billing period: Monthly
- Click "Save product"
- Copy the **Price ID** (starts with price_...)

**Product 2: Pro Plan**
- Name: Pro Plan
- Price: $449/month
- Billing period: Monthly
- Click "Save product"
- Copy the **Price ID**

**Product 3: Plus Plan**
- Name: Plus Plan
- Price: $649/month
- Billing period: Monthly
- Click "Save product"
- Copy the **Price ID**

### Step 3: Get API Keys
1. Go to "Developers" → "API keys"
2. You'll see:
   - **Publishable key** (starts with pk_test_...)
   - **Secret key** (starts with sk_test_...)
3. Copy the **Publishable key** (you'll need it)
4. **Keep Secret key secure** - you'll use this in your backend

### Step 4: Enable Customer Portal
1. Go to "Settings" → "Billing"
2. Click "Customer portal"
3. Enable these features:
   - ✅ Customer can update payment method
   - ✅ Customer can update billing information
   - ✅ Customer can view invoices
   - ✅ Customer can cancel subscription
4. Click "Save"

---

## ⚙️ Configuration

### Update config.js file

Open the `config.js` file and replace the placeholder values:

```javascript
// Supabase Configuration
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';  // From Supabase
const SUPABASE_ANON_KEY = 'eyJhbGc...';  // From Supabase

// Stripe Configuration
const STRIPE_PUBLISHABLE_KEY = 'pk_test_...';  // From Stripe

// Stripe Price IDs
const STRIPE_PRICES = {
    basic: 'price_...', // Basic Plan Price ID
    pro: 'price_...',   // Pro Plan Price ID
    plus: 'price_...'   // Plus Plan Price ID
};
```

---

## 🗄️ Database Schema Summary

Your database now has these tables:

### profiles
- Stores user account information
- Links to Stripe customer ID
- Tracks subscription status

### submissions
- Stores all sermon submissions
- Links to user accounts
- Tracks processing status

### clips
- Stores generated clips
- Links to submissions
- Includes captions and hashtags

---

## 🧪 Testing

### Test Authentication
1. Go to your website
2. Click "Sign Up"
3. Create a test account
4. Check your email for verification
5. Click the verification link
6. Login with your credentials
7. You should see the dashboard

### Test Submission
1. Login to your account
2. Go to "Submit" page
3. Fill out the form
4. Upload a small video (or use a link)
5. Submit the form
6. Check Supabase Dashboard → "Table Editor" → "submissions"
7. You should see your submission

### Test Storage
1. After submitting a video file
2. Go to Supabase → "Storage" → "sermon-videos"
3. You should see the uploaded file in your user folder

---

## 🚀 Deployment

### Option 1: Netlify (Recommended - Free)
1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import existing project"
4. Connect your GitHub repo (or drag/drop your files)
5. Build settings: Leave empty (it's just HTML/CSS/JS)
6. Click "Deploy"
7. Your site will be live at: https://your-site.netlify.app

### Option 2: Vercel (Also Free)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Click "Deploy"
6. Your site will be live at: https://your-site.vercel.app

### Option 3: Traditional Web Hosting
1. Upload all files via FTP
2. Make sure `config.js` has your real API keys
3. Your site should work immediately

---

## 📧 Email Setup (Optional but Recommended)

For transactional emails (submission confirmations, status updates):

### Option 1: Supabase Email (Default)
- Already set up! Supabase sends auth emails automatically
- Limited to 2 emails/hour on free tier
- Upgrade to Pro for more

### Option 2: SendGrid
1. Go to https://sendgrid.com
2. Sign up (free tier: 100 emails/day)
3. Get API key
4. Configure in your backend

### Option 3: Resend
1. Go to https://resend.com
2. Sign up (free tier: 100 emails/day)
3. Better deliverability than SendGrid
4. Easier to set up

---

## 🔐 Security Checklist

Before going live:

- [ ] Never expose your Stripe **Secret Key** in frontend code
- [ ] Add `config.js` to `.gitignore` if using version control
- [ ] Enable Row Level Security on all tables ✅ (already done)
- [ ] Use environment variables for production
- [ ] Enable 2FA on your Supabase and Stripe accounts
- [ ] Set up custom domain with HTTPS
- [ ] Review and customize email templates
- [ ] Test payment flow in Stripe Test Mode
- [ ] Switch to Stripe Live Mode only when ready

---

## 🆘 Troubleshooting

### "Authentication failed"
- Check that SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Make sure email auth is enabled in Supabase

### "Cannot upload file"
- Check storage bucket exists and is named exactly `sermon-videos`
- Verify storage policies are set correctly
- Check file size is under 200MB

### "Submission not showing in dashboard"
- Check browser console for errors
- Verify Row Level Security policies are set
- Make sure user is logged in

### "Payment not working"
- Verify you're using the correct Stripe Publishable Key
- Check that Price IDs match your Stripe products
- Make sure you're in Test Mode during development

---

## 📞 Support

If you need help:
1. Check browser console for errors (F12)
2. Check Supabase logs (Dashboard → Logs)
3. Check Stripe logs (Dashboard → Developers → Logs)
4. Review this documentation again

---

## 🎉 Next Steps

Once everything is working:

1. **Test the complete flow:**
   - Sign up → Login → Submit sermon → View dashboard

2. **Customize branding:**
   - Update colors in CSS files
   - Add your logo
   - Customize email templates

3. **Go live:**
   - Switch Stripe from Test Mode to Live Mode
   - Update config.js with production keys
   - Deploy to your custom domain

4. **Set up processing:**
   - Configure your video processing pipeline
   - Set up webhooks for status updates
   - Automate clip delivery

**Congratulations! Your PewToPost platform is now ready! 🚀**

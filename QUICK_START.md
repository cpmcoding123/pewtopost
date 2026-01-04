# 🚀 PewToPost - Quick Start Guide

## What You Have Now

A complete, production-ready church sermon platform with:

✅ **User Authentication** - Sign up, login, password reset
✅ **User Dashboard** - View submissions, track stats
✅ **Sermon Submission** - Upload videos or share links
✅ **Database Integration** - Store users, submissions, clips
✅ **File Storage** - Upload and store video files
✅ **Payment Ready** - Stripe integration for subscriptions
✅ **Professional Design** - Faith-centered branding
✅ **Mobile Responsive** - Works on all devices

## 🎯 Three Steps to Launch

### STEP 1: Set Up Supabase (10 minutes)
1. Go to https://supabase.com → Sign up
2. Create new project → Wait 2-3 minutes
3. Go to Settings → API → Copy your URL and anon key
4. Go to SQL Editor → Run the database setup commands (in SETUP_GUIDE.md)
5. Go to Storage → Create bucket named `sermon-videos`

### STEP 2: Set Up Stripe (10 minutes)
1. Go to https://stripe.com → Sign up
2. Create 3 products:
   - Basic Plan: $299/month
   - Pro Plan: $449/month
   - Plus Plan: $649/month
3. Copy each Price ID (starts with `price_...`)
4. Go to Developers → API keys → Copy publishable key

### STEP 3: Configure & Deploy (5 minutes)
1. Open `config.js`
2. Replace YOUR_SUPABASE_URL_HERE with your Supabase URL
3. Replace YOUR_SUPABASE_ANON_KEY_HERE with your anon key
4. Replace YOUR_STRIPE_PUBLISHABLE_KEY_HERE with Stripe key
5. Upload all files to Netlify/Vercel or your web host

## 📁 Files You're Getting

```
✓ index.html           - Homepage with pricing
✓ login.html           - User login page
✓ signup.html          - User registration
✓ dashboard.html       - User dashboard
✓ submit.html          - Sermon submission form
✓ forgot-password.html - Password reset
✓ config.js            - API keys (UPDATE THIS!)
✓ SETUP_GUIDE.md       - Detailed setup instructions
✓ README.md            - File structure & checklist
```

## 💡 How It Works

### For Church Users:
1. Visit website → Sign up for account
2. Choose a plan (or use free trial)
3. Submit sermon video
4. Receive 12 clips within 48 hours
5. Download and post to social media

### For You (Admin):
1. Users submit sermons → Stored in database
2. Videos saved to Supabase Storage
3. You process videos (manually or automated)
4. Upload clips back to user's account
5. Stripe handles recurring payments

## 🔑 Important First Steps

**BEFORE YOU DO ANYTHING ELSE:**

1. ⚠️ **Update config.js** - Replace ALL placeholder values
2. ⚠️ **Run SQL commands** - Set up your database tables
3. ⚠️ **Create storage bucket** - Named exactly `sermon-videos`
4. ⚠️ **Test everything** - Sign up, login, submit (use test data)

## 🧪 Testing Checklist

Test these in order:

1. [ ] Can access homepage (index.html)
2. [ ] Can click "Sign Up" and see signup form
3. [ ] Can create account (use real email)
4. [ ] Receive verification email
5. [ ] Click link and verify account
6. [ ] Can log in with credentials
7. [ ] See dashboard with your name
8. [ ] Can navigate to Submit page
9. [ ] Can submit a sermon (try both upload and link)
10. [ ] See submission in dashboard
11. [ ] Can log out
12. [ ] Can't access dashboard when logged out

If ALL tests pass → You're ready! 🎉

## 📊 What Happens Next?

### Immediate (Week 1):
- Test with friends/family
- Submit test sermons
- Verify everything works
- Fix any bugs

### Short-term (Month 1):
- Launch to first churches
- Process sermons manually
- Get feedback
- Refine workflow

### Long-term (Month 2+):
- Automate video processing
- Add more features
- Scale to more churches
- Optimize conversions

## 💰 Revenue Model

### Free Trial:
- 3 free clips per month
- No credit card required
- Converts to paid after seeing value

### Paid Plans:
- Basic: $299/mo → 48 clips/month → $6.23 per clip
- Pro: $449/mo → All features + automation
- Plus: $649/mo → Premium service + same-day

### Your Costs:
- Supabase: Free up to 500MB, then $25/mo
- Stripe: 2.9% + $0.30 per transaction
- Hosting: $0 (Netlify/Vercel free tier)
- **Total startup cost: ~$0-50/month**

## 🚫 Common Mistakes to Avoid

1. ❌ **Don't skip the SQL commands** - Your database won't work
2. ❌ **Don't forget to create storage bucket** - Uploads will fail
3. ❌ **Don't use placeholder values** - Update config.js!
4. ❌ **Don't test payments in Live Mode** - Use Test Mode first
5. ❌ **Don't share your secret keys** - Keep them private

## ✅ Success Indicators

You'll know it's working when:

- ✅ You can sign up and receive verification email
- ✅ You can log in and see dashboard
- ✅ You can submit a sermon and see it in dashboard
- ✅ Video uploads appear in Supabase Storage
- ✅ No console errors in browser (press F12)

## 🆘 Need Help?

1. **Read SETUP_GUIDE.md** - Has detailed instructions
2. **Check README.md** - Has troubleshooting section
3. **Browser Console** - Press F12 to see errors
4. **Supabase Logs** - Dashboard → Logs
5. **Stripe Logs** - Dashboard → Developers → Logs

## 🎯 Your Launch Path

```
Day 1: Set up Supabase & Stripe
Day 2: Configure & test
Day 3: Soft launch to friends
Week 1: Get feedback & iterate
Week 2: Launch to first customers
Month 1: Process sermons, get testimonials
Month 2: Scale & automate
```

## 🎉 You're Ready to Launch!

Everything is built and ready to go. Just follow these 3 steps:

1. Set up Supabase (10 min)
2. Set up Stripe (10 min)
3. Update config.js & deploy (5 min)

**Total time to launch: 25 minutes**

Let's transform sermons into social impact! 🚀⛪

---

**Questions?** Refer to SETUP_GUIDE.md for detailed walkthroughs.
**Issues?** Check the troubleshooting section in README.md.

# PewToPost - File Structure & Deployment Checklist

## 📁 Complete File Structure

```
pewtopost/
│
├── index.html              # Homepage (mission, values, pricing)
├── submit.html             # Sermon submission form (with auth)
├── login.html              # User login page
├── signup.html             # User registration page
├── dashboard.html          # User dashboard (view submissions)
├── config.js               # ⚠️ API keys configuration (UPDATE THIS!)
│
├── SETUP_GUIDE.md          # Complete setup instructions
└── README.md               # This file
```

## 📋 Pre-Launch Checklist

### ✅ Configuration (CRITICAL)
- [ ] Updated `config.js` with real Supabase URL
- [ ] Updated `config.js` with real Supabase Anon Key
- [ ] Updated `config.js` with real Stripe Publishable Key
- [ ] Created all 3 Stripe products (Basic, Pro, Plus)
- [ ] Updated Stripe Price IDs in config.js

### ✅ Supabase Setup
- [ ] Created Supabase project
- [ ] Ran all SQL commands to create tables
- [ ] Set up Row Level Security policies
- [ ] Created `sermon-videos` storage bucket
- [ ] Set up storage policies
- [ ] Enabled email authentication
- [ ] Customized email templates (optional)

### ✅ Stripe Setup
- [ ] Created Stripe account
- [ ] Created all 3 products (Basic $299, Pro $449, Plus $649)
- [ ] Enabled Customer Portal
- [ ] Copied Price IDs
- [ ] Tested in Test Mode

### ✅ Testing
- [ ] Can sign up for new account
- [ ] Received verification email
- [ ] Can log in successfully
- [ ] Dashboard loads properly
- [ ] Can submit a sermon (file upload)
- [ ] Can submit a sermon (video link)
- [ ] Submission appears in dashboard
- [ ] Can log out
- [ ] Can't access dashboard when logged out

### ✅ Deployment
- [ ] Chose hosting platform (Netlify/Vercel/etc)
- [ ] Uploaded all files
- [ ] Site is accessible via URL
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Tested on mobile device
- [ ] Tested on different browsers

### ✅ Security
- [ ] config.js has real keys (not placeholders)
- [ ] Added config.js to .gitignore (if using Git)
- [ ] Never committed secrets to public repository
- [ ] Enabled 2FA on Supabase account
- [ ] Enabled 2FA on Stripe account
- [ ] Reviewed all RLS policies

### ✅ Going Live
- [ ] Tested complete user flow end-to-end
- [ ] Switched Stripe from Test Mode to Live Mode
- [ ] Updated Stripe keys in config.js (Live keys)
- [ ] Set up custom domain (optional)
- [ ] Enabled HTTPS (automatic on Netlify/Vercel)
- [ ] Tested payment flow with small amount

## 🚀 Quick Start Commands

### For Netlify Deployment:
```bash
# If using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

### For Vercel Deployment:
```bash
# If using Vercel CLI
npm install -g vercel
vercel --prod
```

### For Traditional Hosting:
1. Upload all files via FTP
2. Ensure config.js is present and configured
3. Site should work immediately

## 🔑 Important Files to Secure

**Never share publicly:**
- `config.js` (contains API keys)
- Supabase Anon Key (read access to database)
- Stripe Secret Key (full access to payments)

**Safe to share:**
- All HTML files
- CSS styles
- SETUP_GUIDE.md
- This README

## 📊 What Each Page Does

### index.html
- Marketing homepage
- Shows mission, values, pricing
- Links to sign up and submit pages
- No authentication required

### login.html
- User login form
- Validates credentials with Supabase
- Redirects to dashboard on success
- Redirects if already logged in

### signup.html
- New user registration
- Creates Supabase auth account
- Creates profile in database
- Sends verification email

### dashboard.html
- Protected page (requires login)
- Shows user stats
- Lists all submissions
- Links to submit new sermon

### submit.html
- Sermon submission form
- Works for guest or logged-in users
- Auto-fills info for logged-in users
- Uploads video to Supabase Storage
- Creates submission record in database

## 💡 How Authentication Works

1. **Sign Up Flow:**
   ```
   User fills signup form
   → Supabase creates auth account
   → Profile record created in database
   → Verification email sent
   → User clicks link in email
   → Account verified
   → User can log in
   ```

2. **Login Flow:**
   ```
   User enters credentials
   → Supabase validates
   → Session token created
   → User redirected to dashboard
   → Session persists across pages
   ```

3. **Submission Flow:**
   ```
   User fills submission form
   → Video uploaded to Storage (if file)
   → Submission record created in DB
   → User ID linked to submission
   → Appears in user's dashboard
   ```

## 🔄 User Flow Diagram

```
Homepage (index.html)
    ↓
Sign Up (signup.html)
    ↓
Email Verification
    ↓
Login (login.html)
    ↓
Dashboard (dashboard.html)
    ↓
Submit Sermon (submit.html)
    ↓
Processing... (admin handles)
    ↓
View Results (dashboard.html)
```

## 📈 Pricing Integration

When you're ready to add Stripe payments:

1. Update index.html pricing buttons to trigger Stripe Checkout
2. Add Stripe checkout.js script
3. Create checkout session with Price IDs
4. Handle successful payment webhook
5. Update user's subscription_status in profiles table

Example code for pricing button:
```javascript
async function checkout(priceId) {
    const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
    const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: window.location.origin + '/dashboard.html?success=true',
        cancelUrl: window.location.origin + '/index.html#pricing',
        customerEmail: user.email,
    });
    if (error) console.error(error);
}
```

## 🐛 Common Issues & Solutions

### Issue: "User not authenticated"
**Solution:** User needs to log in first. Check session with:
```javascript
const { data: { session } } = await supabase.auth.getSession();
```

### Issue: "Cannot upload file"
**Solution:** 
- Check storage bucket name is exactly `sermon-videos`
- Verify storage policies are set correctly
- Ensure file is under 200MB

### Issue: "Submission not in dashboard"
**Solution:**
- Check RLS policies are set
- Verify user_id is being saved correctly
- Check browser console for errors

### Issue: "Config is not defined"
**Solution:**
- Ensure config.js is loaded before other scripts
- Check that config.js exists and has real values
- Verify file path is correct

## 📞 Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **Stripe Docs:** https://stripe.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vercel Docs:** https://vercel.com/docs

## 🎯 Next Steps After Launch

1. **Monitor Usage:**
   - Check Supabase dashboard daily
   - Review submissions in database
   - Monitor storage usage

2. **Set Up Processing Pipeline:**
   - Configure video processing service
   - Set up webhook endpoints
   - Automate status updates

3. **Improve User Experience:**
   - Add email notifications for completed clips
   - Create download page for clips
   - Add usage analytics

4. **Scale Business:**
   - Monitor conversion rates
   - A/B test pricing
   - Add testimonials from users
   - Create case studies

## ✨ You're Ready!

All files are prepared and ready to deploy. Follow the SETUP_GUIDE.md for detailed instructions on configuring Supabase and Stripe.

**Remember:** Start with Test Mode, validate everything works, then switch to Live Mode for real payments.

Good luck with PewToPost! 🚀

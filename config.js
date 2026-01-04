// Configuration file for PewToPost
// IMPORTANT: Replace these values with your actual API keys

// Supabase Configuration
// Get these from: https://app.supabase.com/project/_/settings/api
const SUPABASE_URL = 'https://buoutlmtgajwlvmplbdb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1b3V0bG10Z2Fqd2x2bXBsYmRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0OTg2MDgsImV4cCI6MjA4MzA3NDYwOH0.zWKGsPFkDifxOFn4DhSbsn9rt6RLbD4FBdJgMGl_1tk';

// Stripe Configuration
// Get these from: https://dashboard.stripe.com/apikeys
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51SlsKvFIhF6kUxAQGwEai7DjnCsJgmacHpt3GjGUBekhS8XUp1qaKGAuXINwoDxK8O81QIX0uEl156Jf1VfjkvTU000buauQeR';

// Stripe Price IDs
const STRIPE_PRICE_IDS = {
    basic: 'price_1SlsNKFIhF6kUxAQgLYnhUlw', // Basic Plan Price ID
    pro: 'price_1SlsPBFIhF6kUxAQMYNHrCCB',   // Pro Plan Price ID
    plus: 'price_1SlsPyFIhF6kUxAQLFZH1SMe'   // Plus Plan Price ID
};

// IMPORTANT SECURITY NOTE:
// Never commit this file with real API keys to a public repository
// Add this file to .gitignore if using version control

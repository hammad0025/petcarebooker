# Google Search Console Setup & Monitoring Guide

## 🎯 What is Google Search Console?

Google Search Console (GSC) is a **free tool** that shows you how Google sees your website. It's essential for SEO success.

**Without GSC:**
- You don't know if Google even sees your pages
- No idea what keywords drive traffic
- Can't see indexing errors
- Flying blind on SEO performance

**With GSC:**
- Track rankings for target keywords
- See impressions, clicks, CTR
- Submit sitemaps so Google finds all pages
- Get alerts about technical issues
- Measure ROI from your SEO content

---

## 📝 Step-by-Step Setup

### Step 1: Add Your Property

1. Go to: https://search.google.com/search-console
2. Click **"Add Property"**
3. Choose **"Domain"** (covers all subdomains and protocols)
4. Enter: `petcarebooker.com`

---

### Step 2: Verify Ownership (Cloudflare Method)

Since you use **Cloudflare**, DNS verification is the easiest:

1. **Google will provide a TXT record** like:
   ```
   google-site-verification=abc123xyz789...
   ```

2. **Add it to Cloudflare DNS:**
   - Log into Cloudflare
   - Go to petcarebooker.com → DNS → Records
   - Click **"Add record"**
   - Type: `TXT`
   - Name: `@` (or leave blank)
   - Content: `google-site-verification=abc123xyz789...`
   - TTL: Auto
   - Proxy status: DNS only (gray cloud)
   - Click **"Save"**

3. **Wait 5-10 minutes** for DNS propagation

4. **Back in GSC, click "Verify"**

✅ **Done!** You now have access to Search Console.

---

### Step 3: Submit Your Sitemap

Your site now has an **auto-generated sitemap** at:
```
https://petcarebooker.com/sitemap.xml
```

**To submit it:**

1. In GSC, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **"Submit"**

Google will start crawling all your pages within 24-48 hours.

---

## 📊 What Metrics to Track

### **1. Performance Report** (Most Important)

**Location:** Search Console → Performance

**What to monitor:**

#### **Overall Metrics**
- **Total Clicks** - How many people clicked from Google
- **Total Impressions** - How many times your pages appeared in search
- **Average CTR** - Click-through rate (aim for 3-5%+)
- **Average Position** - Where you rank (aim for top 10 = positions 1-10)

#### **Top Queries** (Keywords)
See what keywords drive traffic:
- "dog grooming west palm beach"
- "pet groomers near me"
- "tampa cat grooming"

**Goals:**
- Month 1-2: Start seeing impressions for target keywords
- Month 3-4: Rank in positions 11-20 (page 2)
- Month 6+: Rank in positions 1-10 (page 1)

#### **Top Pages**
See which pages perform best:
- `/cities/west-palm-beach` - Local traffic
- `/blog/best-pet-groomers-west-palm-beach` - Informational traffic
- `/browse` - Discovery traffic

**Action:** Double-down on what works. If Tampa ranks well, write more Tampa content.

---

### **2. Coverage Report**

**Location:** Search Console → Coverage (or "Pages")

Shows indexing status:
- ✅ **Valid** - Pages Google indexed successfully
- ⚠️ **Valid with warnings** - Indexed but has issues
- ❌ **Error** - Not indexed
- 🔄 **Excluded** - Intentionally not indexed (e.g., admin pages)

**Goal:** All public pages (cities, blog posts) should be "Valid"

**If you see errors:**
- Check the page loads correctly
- Ensure it's in sitemap.xml
- Submit for re-indexing

---

### **3. Enhancements**

- **Mobile Usability** - Ensure no mobile errors
- **Core Web Vitals** - Page speed metrics
- **Breadcrumbs** - Structured data validation

**Goal:** All green, no errors.

---

### **4. URL Inspection Tool**

**Location:** Top search bar in GSC

**Use it to:**
- Check if a specific page is indexed
- Request indexing for new pages
- See how Google sees your page
- Troubleshoot indexing issues

**Example:**
1. Enter: `https://petcarebooker.com/cities/west-palm-beach`
2. Click **"Test Live URL"**
3. If not indexed, click **"Request Indexing"**

---

## 📈 Expected Timeline & Results

### **Week 1-2: Initial Setup**
- Google discovers your sitemap
- Starts crawling pages
- **Check:** Coverage report shows pages being indexed
- **Metrics:** 0-10 impressions/day (normal)

### **Month 1: Early Indexing**
- Most pages indexed
- Start appearing in search results (positions 20-50)
- **Check:** Performance report shows impressions
- **Metrics:** 10-50 impressions/day, 0-2 clicks/day

### **Month 2-3: Building Momentum**
- Rankings improve to positions 11-20 (page 2)
- Impressions increase
- **Check:** Top queries show your target keywords
- **Metrics:** 100-500 impressions/day, 5-20 clicks/day

### **Month 4-6: Breaking Through**
- Start ranking on page 1 (positions 1-10) for some keywords
- Traffic accelerates
- **Check:** Pages ranking in top 10
- **Metrics:** 500-2,000 impressions/day, 50-150 clicks/day

### **Month 6-12: Domination**
- Multiple keywords ranking #1-3
- Organic traffic becomes primary channel
- **Check:** Consistent page 1 rankings
- **Metrics:** 2,000-10,000 impressions/day, 200-500+ clicks/day

---

## 🎯 Target Keywords to Track

### **High Priority (Local Service)**
- "pet groomers in [city]"
- "dog grooming [city]"
- "[city] cat grooming"
- "mobile pet grooming [city]"

### **Medium Priority (Long-Tail Local)**
- "best dog groomers [city]"
- "[neighborhood] pet grooming"
- "affordable cat grooming [city]"
- "[city] pet grooming near me"

### **Low Priority (Informational)**
- "how much does dog grooming cost"
- "how often groom dog"
- "what is mobile pet grooming"

**Track in GSC:**
1. Go to Performance
2. Click **"+ New"** → **"Query"**
3. Add your target keywords
4. Compare over time

---

## 🔔 Set Up Email Alerts

**Location:** GSC → Settings → Email notifications

**Enable alerts for:**
- ✅ Coverage issues (indexing errors)
- ✅ Manual actions (Google penalties - unlikely)
- ✅ Security issues (hacking attempts)

You'll get emails if something breaks.

---

## 🚀 Pro Tips

### **1. Request Indexing for New Pages**

When you add a new city or blog post:
1. Copy the URL
2. Paste into GSC URL Inspection tool
3. Click **"Request Indexing"**

Google will crawl it within hours instead of days/weeks.

---

### **2. Monitor Competitor Keywords**

If you see traffic for unexpected keywords:
1. Check Performance → Queries
2. Look for new opportunities
3. Write content targeting those keywords

Example: If you rank for "doodle grooming orlando," write a dedicated doodle article!

---

### **3. Find Low-Hanging Fruit**

Look for keywords where you rank **positions 11-20** (page 2):
1. Performance → Queries
2. Filter by position: 11-20
3. Improve those pages (add content, better title, more links)
4. Push them to page 1

**Why?** Moving from page 2 to page 1 = **10x more traffic**

---

### **4. Track Seasonal Trends**

Pet grooming has seasonality:
- **Spring/Summer** - Peak grooming season
- **Holidays** - Pet grooming for photos/visits

Use GSC's date filters to track seasonal patterns.

---

### **5. Compare Period Over Period**

**Location:** Performance → Date range → Compare

See month-over-month growth:
- This month vs. last month
- This quarter vs. last quarter

**Aim for:** +20-30% monthly growth in clicks and impressions

---

## 🛠️ Troubleshooting Common Issues

### **"Page Not Indexed"**

**Causes:**
- Not in sitemap
- Blocked by robots.txt
- Too new (wait 1-2 weeks)
- Technical error (broken links, server error)

**Fix:**
1. Check page loads: `https://petcarebooker.com/cities/[city]`
2. Check sitemap includes it: `https://petcarebooker.com/sitemap.xml`
3. Request indexing via URL Inspection tool

---

### **"Crawled - Currently Not Indexed"**

**Meaning:** Google crawled it but chose not to index (low quality/duplicate content)

**Fix:**
1. Add more unique content (aim for 1,500+ words)
2. Add internal links from other pages
3. Build external backlinks
4. Wait 2-4 weeks, request re-indexing

---

### **"Discovered - Currently Not Indexed"**

**Meaning:** Google found it but hasn't crawled yet

**Fix:**
1. Wait 1-2 weeks (normal)
2. Request indexing
3. Ensure sitemap is submitted

---

## 📊 Weekly Checklist

**Every Monday:**

1. ✅ Check **Coverage** - Any new errors?
2. ✅ Review **Performance** - Clicks/impressions up or down?
3. ✅ Check **Top Queries** - Any new keywords ranking?
4. ✅ Find pages on **page 2** (positions 11-20) - Can you improve them?
5. ✅ Request indexing for any **new content** from last week

**Time:** 15-20 minutes/week

---

## 🎓 Learning Resources

- **Google's Official Guide:** https://developers.google.com/search/docs
- **Beginner Tutorial:** https://support.google.com/webmasters/answer/9128668
- **Community:** https://support.google.com/webmasters/community

---

## 📞 Next Steps

1. **Set up GSC** (verify domain with Cloudflare DNS)
2. **Submit sitemap** (`sitemap.xml`)
3. **Enable email alerts**
4. **Request indexing** for all city pages & blog posts
5. **Check back weekly** to track progress

---

## 💰 ROI Tracking

**How to measure success:**

1. **GSC Performance Report:**
   - Track monthly clicks from organic search
   - Example: 500 clicks/month

2. **Google Analytics** (if you set it up):
   - Track conversions: clicks to `/browse` or `/shop/[slug]`
   - Calculate: Organic clicks → Groomer views → Bookings

3. **Revenue Attribution:**
   - 500 organic clicks/month
   - 5% view a groomer (25 views)
   - 10% book (2.5 bookings)
   - $80 avg booking × 10% commission = $20
   - **Monthly SEO revenue estimate**

As traffic scales, so does revenue. **At 10,000 clicks/month = $400+/month in organic bookings.**

---

**Questions?** Review this guide after setting up GSC and start tracking your SEO progress!

*Last updated: January 2025*


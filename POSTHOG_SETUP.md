# PostHog Analytics Setup Guide

## Overview

PostHog is integrated to track your full ad-to-booking conversion funnel. This guide covers what's being tracked and how to configure your PostHog dashboard.

---

## Events Being Tracked

| Funnel Step | Event Name | When Fired | Key Properties |
|-------------|------------|------------|----------------|
| 1 | `$pageview` | Every page load | `utm_source`, `utm_campaign`, `page_path` |
| 2 | `cta_clicked` | Any CTA button click | `cta_location`, `cta_text` |
| 3 | `booking_page_viewed` | /book page loads | `funnel_step: 3` |
| 4 | `calendar_date_selected` | User clicks a date | `selected_date` |
| 5 | `time_slot_selected` | User selects a time | `selected_date`, `selected_time` |
| 6 | `booking_form_started` | User starts filling form | `funnel_step: 6` |
| 7 | `booking_completed` | Booking confirmed | `date`, `time`, `email`, `conversion: true` |

### CTA Locations Tracked
- `hero` - Main hero section CTA
- `header` - Navigation header CTA
- `pricing` - Pricing tier CTAs (includes tier name)
- `final_cta` - Bottom of page CTA
- `mobile_footer` - Mobile sticky footer CTA

---

## UTM Parameters & Ad Attribution

The following parameters are automatically captured and attached to all events:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `utm_source` | Traffic source | `google`, `facebook`, `linkedin` |
| `utm_medium` | Marketing medium | `cpc`, `social`, `email` |
| `utm_campaign` | Campaign name | `jan_2026_launch` |
| `utm_content` | Ad variation | `headline_a`, `image_b` |
| `utm_term` | Search keywords | `ai+answering+service` |
| `gclid` | Google Ads click ID | Auto-captured |
| `fbclid` | Facebook click ID | Auto-captured |

### Example Ad URLs

**Google Ads:**
```
https://endlessreply.com?utm_source=google&utm_medium=cpc&utm_campaign=jan_launch&utm_content=headline_a
```

**Facebook Ads:**
```
https://endlessreply.com?utm_source=facebook&utm_medium=paid_social&utm_campaign=jan_launch&utm_content=video_ad
```

**LinkedIn Ads:**
```
https://endlessreply.com?utm_source=linkedin&utm_medium=sponsored&utm_campaign=b2b_services
```

---

## PostHog Dashboard Setup

### Step 1: Create the Conversion Funnel

1. Go to **PostHog Dashboard** → **Products** → **Funnels**
2. Click **"New Funnel"**
3. Add these steps in order:

| Step | Event | Filter (optional) |
|------|-------|-------------------|
| 1 | `$pageview` | `page_path` = `/` |
| 2 | `cta_clicked` | - |
| 3 | `booking_page_viewed` | - |
| 4 | `booking_completed` | - |

4. Name it: **"Ad to Booking Conversion"**
5. Set conversion window: **7 days**
6. Save

### Step 2: Create Key Insights

#### A. Traffic by Source
1. **Insights** → **New Insight** → **Trends**
2. Event: `$pageview`
3. Break down by: `utm_source`
4. Date range: Last 30 days
5. Save as: **"Traffic by Ad Source"**

#### B. CTA Performance
1. **Insights** → **New Insight** → **Trends**
2. Event: `cta_clicked`
3. Break down by: `cta_location`
4. Save as: **"CTA Click Performance"**

#### C. Conversions by Source
1. **Insights** → **New Insight** → **Trends**
2. Event: `booking_completed`
3. Break down by: `utm_source`
4. Save as: **"Bookings by Ad Source"**

#### D. Funnel Drop-off Analysis
1. **Insights** → **New Insight** → **Funnels**
2. Use your "Ad to Booking Conversion" funnel
3. Break down by: `utm_source`
4. Save as: **"Funnel by Ad Source"**

### Step 3: Create a Dashboard

1. **Dashboards** → **New Dashboard**
2. Name: **"Endless Reply - Ad Performance"**
3. Add these tiles:
   - Funnel: Ad to Booking Conversion
   - Trend: Traffic by Ad Source
   - Trend: CTA Click Performance
   - Trend: Bookings by Ad Source
   - Trend: Bookings over time (daily)

### Step 4: Set Up Cohorts (for Retargeting)

#### High Intent Visitors
1. **People** → **Cohorts** → **New Cohort**
2. Name: **"High Intent - Visited Booking Page"**
3. Criteria: `booking_page_viewed` in last 30 days
4. AND NOT `booking_completed`

#### Converters
1. **People** → **Cohorts** → **New Cohort**
2. Name: **"Converted - Booked Call"**
3. Criteria: `booking_completed` in last 90 days

---

## Environment Variables

Make sure these are set in your Vercel dashboard:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_MsN3H11QPCu9Qp9YHcC2edLpzVV0Spq5jsXqKGvfQE1
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

**To add in Vercel:**
1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add both variables for Production, Preview, and Development

---

## Testing Your Setup

### Local Testing
1. Run `npm run dev`
2. Open http://localhost:3000
3. Go to PostHog → Activity → Live Events
4. You should see events appearing as you browse

### Test UTM Tracking
Visit with UTM params:
```
http://localhost:3000?utm_source=test&utm_medium=test&utm_campaign=test_campaign
```

Check that `utm_source`, `utm_medium`, and `utm_campaign` appear in the event properties.

### Verify Funnel
1. Visit landing page
2. Click a CTA
3. View booking page
4. Check PostHog - you should see all 3 events

---

## Troubleshooting

### Events not appearing
- Check browser console for errors
- Verify NEXT_PUBLIC_POSTHOG_KEY is set
- Ensure PostHogProvider wraps your app in layout.tsx

### UTM params not captured
- Make sure URL has proper format: `?utm_source=value`
- Check that PostHogProvider is loading before page content

### Cal.com events not firing
- Cal.com embed events may have limited support
- The `booking_completed` event relies on Cal.com's callback API

---

## Key Metrics to Monitor

### For Ad Optimization
1. **Cost per Booking** = Ad Spend ÷ Bookings (by utm_source)
2. **Landing → CTA Rate** = CTA clicks ÷ Page views
3. **CTA → Booking Rate** = Bookings ÷ CTA clicks
4. **Overall Conversion** = Bookings ÷ Page views

### Weekly Review Checklist
- [ ] Which utm_source has best conversion rate?
- [ ] Which CTA location drives most bookings?
- [ ] Where is the biggest funnel drop-off?
- [ ] Any campaigns to pause/scale?

---

## Files Reference

| File | Purpose |
|------|---------|
| `components/PostHogProvider.tsx` | PostHog initialization & page view tracking |
| `lib/analytics.ts` | Event tracking functions |
| `.env.local` | PostHog API keys (local only) |

---

*Last updated: January 2026*

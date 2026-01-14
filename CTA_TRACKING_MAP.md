# CTA & Conversion Tracking Map

## Overview
This document maps every call-to-action (CTA) on the Endless Reply site and how they're tracked through the conversion funnel.

---

## Complete User Journey Flow

```
Ad Click (Google/Facebook/LinkedIn)
    ↓
Landing Page (/) - Track: $pageview + UTM params
    ↓
┌───────────────────────────────────────────────┐
│ User sees one of 5-6 CTAs                     │
│ (Hero, Header, Pricing x3, Final, Mobile)     │
└───────────────────────────────────────────────┘
    ↓
CTA Clicked - Track: cta_clicked (funnel_step: 2)
    ↓
Booking Page (/book) - Track: booking_page_viewed (funnel_step: 3)
    ↓
Cal.com Calendar Loads
    ↓
User Clicks Date - Track: calendar_date_selected (funnel_step: 4)
    ↓
User Selects Time - Track: time_slot_selected (funnel_step: 5)
    ↓
User Starts Form - Track: booking_form_started (funnel_step: 6)
    ↓
User Completes Booking - Track: booking_completed + $conversion (funnel_step: 7)
    ↓
CONVERSION ✓
```

---

## All CTAs on Site

### 1. Hero Section CTA
- **Location**: Hero component (top of homepage)
- **Button Text**: "Book Your Free Strategy Call"
- **Tracking**:
  - Event: `cta_clicked`
  - Properties:
    - `cta_location`: `"hero"`
    - `cta_text`: `"Book Your Free Strategy Call"`
    - `funnel_step`: `2`
- **Component**: `/components/Hero.tsx:106-111`
- **Destination**: `/book`

### 2. Header CTA
- **Location**: Header (sticky navigation, visible on scroll)
- **Button Text**: "Book a Call"
- **Visibility**: Hidden on mobile, shown on `sm` breakpoint and up
- **Tracking**:
  - Event: `cta_clicked`
  - Properties:
    - `cta_location`: `"header"`
    - `cta_text`: `"Book a Call"`
    - `funnel_step`: `2`
- **Component**: `/components/Header.tsx:68-74`
- **Destination**: `/book`

### 3. Pricing Section CTAs (3x)
- **Location**: Pricing component (mid-page)
- **Button Text**: "Book a Call"
- **Tiers**:
  1. **Starter** - $299/month
  2. **Professional** - $699/month (Most Popular)
  3. **Enterprise** - Custom pricing
- **Tracking** (for each tier):
  - Event: `cta_clicked`
  - Properties:
    - `cta_location`: `"pricing"`
    - `cta_text`: `"{tier.name} - Book a Call"` (e.g., "Starter - Book a Call")
    - `funnel_step`: `2`
- **Component**: `/components/Pricing.tsx:168-178`
- **Destination**: `/book`

### 4. Final CTA Section
- **Location**: Bottom of homepage (before footer)
- **Button Text**: "Book Your Free Strategy Call"
- **Context**: Blue gradient section with "2026 Kickoff Special" badge
- **Tracking**:
  - Event: `cta_clicked`
  - Properties:
    - `cta_location`: `"final_cta"`
    - `cta_text`: `"Book Your Free Strategy Call"`
    - `funnel_step`: `2`
- **Component**: `/components/FinalCTA.tsx:91-100`
- **Destination**: `/book`

### 5. Mobile Footer CTA
- **Location**: Fixed sticky footer (mobile only)
- **Button Text**: "Book a Free AI Strategy Call"
- **Visibility**: Only shown on mobile (`sm:hidden`)
- **Behavior**: Animated on load, stays fixed at bottom
- **Tracking**:
  - Event: `cta_clicked`
  - Properties:
    - `cta_location`: `"mobile_footer"`
    - `cta_text`: `"Book a Free AI Strategy Call"`
    - `funnel_step`: `2`
- **Component**: `/components/MobileFooterCTA.tsx:18-24`
- **Destination**: `/book`

### 6. Hero Secondary CTA
- **Location**: Hero section (next to primary CTA)
- **Button Text**: "See How It Works"
- **Tracking**: NOT tracked (anchor link only)
- **Component**: `/components/Hero.tsx:112-114`
- **Destination**: `#how-it-works` (anchor link on same page)

---

## CTA Summary Table

| CTA Location | Button Text | Visibility | Tracking Location | Destination |
|--------------|-------------|------------|-------------------|-------------|
| Hero | Book Your Free Strategy Call | All devices | `hero` | `/book` |
| Header | Book a Call | Desktop only (sm+) | `header` | `/book` |
| Pricing - Starter | Book a Call | All devices | `pricing` + tier name | `/book` |
| Pricing - Professional | Book a Call | All devices | `pricing` + tier name | `/book` |
| Pricing - Enterprise | Book a Call | All devices | `pricing` + tier name | `/book` |
| Final CTA | Book Your Free Strategy Call | All devices | `final_cta` | `/book` |
| Mobile Footer | Book a Free AI Strategy Call | Mobile only | `mobile_footer` | `/book` |
| Hero Secondary | See How It Works | All devices | Not tracked | `#how-it-works` |

**Total Conversion-Driving CTAs**: 7 (all lead to `/book`)

---

## Conversion Funnel Events

### Funnel Step 1: Landing Page View
- **Event**: `$pageview`
- **Triggered**: Automatically by PostHogProvider on every page load
- **Properties Captured**:
  - `page_path`: Current page URL
  - `utm_source`: Ad source (google, facebook, linkedin)
  - `utm_medium`: Marketing medium (cpc, social, email)
  - `utm_campaign`: Campaign name
  - `utm_content`: Ad variation
  - `utm_term`: Search keywords
  - `gclid`: Google Ads click ID
  - `fbclid`: Facebook click ID
- **Component**: `/components/PostHogProvider.tsx:25-46`

### Funnel Step 2: CTA Clicked
- **Event**: `cta_clicked`
- **Triggered**: When user clicks any CTA button
- **Properties**:
  - `cta_location`: Where the CTA was clicked (hero, header, pricing, final_cta, mobile_footer)
  - `cta_text`: Text of the button clicked
  - `funnel_step`: `2`
- **Components**: All CTA components listed above

### Funnel Step 3: Booking Page Viewed
- **Event**: `booking_page_viewed`
- **Triggered**: When `/book` page loads
- **Properties**:
  - `funnel_step`: `3`
- **Component**: `/app/book/page.tsx:10`

### Funnel Step 4: Calendar Date Selected
- **Event**: `calendar_date_selected`
- **Triggered**: When user clicks a date in Cal.com calendar
- **Properties**:
  - `selected_date`: Date user clicked
  - `funnel_step`: `4`
- **Component**: `/lib/analytics.ts:164-169` (Cal.com listener)

### Funnel Step 5: Time Slot Selected
- **Event**: `time_slot_selected`
- **Triggered**: When user selects a time slot
- **Properties**:
  - `selected_date`: Date of booking
  - `selected_time`: Time slot selected
  - `funnel_step`: `5`
- **Component**: `/lib/analytics.ts:171-176` (Cal.com listener)

### Funnel Step 6: Booking Form Started
- **Event**: `booking_form_started`
- **Triggered**: When user starts filling out Cal.com booking form
- **Properties**:
  - `funnel_step`: `6`
- **Component**: `/lib/analytics.ts:157-162` (Cal.com listener)

### Funnel Step 7: Booking Completed ✓
- **Event**: `booking_completed` + `$conversion`
- **Triggered**: When user successfully completes booking
- **Properties**:
  - `date`: Booking date
  - `time`: Booking start time
  - `email`: User's email
  - `funnel_step`: `7`
  - `conversion`: `true`
- **Component**: `/lib/analytics.ts:138-155` (Cal.com listener)
- **Additional**: User is identified by email via `posthog.identify()`

---

## UTM Parameter Flow

All UTM parameters captured on initial page view persist through the user's session:

1. **User clicks ad**: `endlessreply.com?utm_source=google&utm_medium=cpc&utm_campaign=jan_launch`
2. **Landing page loads**: PostHog captures all UTM params
3. **User clicks CTA**: `cta_clicked` event inherits UTM params from session
4. **User navigates to /book**: `booking_page_viewed` event inherits UTM params
5. **User completes booking**: `booking_completed` event inherits UTM params

**Result**: Every event in the funnel is tied back to the original ad source.

---

## Additional Tracking Available (Not Currently Used)

These analytics functions exist but aren't currently implemented on the site:

- `sectionViewed(sectionName)` - Track when sections come into view
- `faqExpanded(question)` - Track which FAQ questions users open
- `pricingViewed(tier)` - Track when pricing tiers come into viewport
- `externalLinkClicked(url, context)` - Track clicks to external sites
- `scrollDepthReached(depth)` - Track how far users scroll (25%, 50%, 75%, 100%)
- `timeOnPage(seconds, pagePath)` - Track time spent on pages

These can be added in the future for deeper engagement insights.

---

## Key Metrics to Track in PostHog

### Primary Conversion Metrics
1. **Landing to CTA Rate** = (`cta_clicked` / `$pageview`) × 100
2. **CTA to Booking Page Rate** = (`booking_page_viewed` / `cta_clicked`) × 100
3. **Booking Page to Conversion** = (`booking_completed` / `booking_page_viewed`) × 100
4. **Overall Conversion Rate** = (`booking_completed` / `$pageview`) × 100

### CTA Performance
- **Best Performing CTA**: Break down `cta_clicked` by `cta_location`
- **Best Pricing Tier**: Break down pricing CTA clicks by tier name

### Ad Attribution
- **Best Traffic Source**: Break down conversions by `utm_source`
- **Best Campaign**: Break down conversions by `utm_campaign`
- **Best Ad Variation**: Break down conversions by `utm_content`

### Drop-off Points
- Step 1 → 2: Users who land but don't click CTA
- Step 2 → 3: Users who click CTA but don't reach booking page
- Step 3 → 4: Users who see calendar but don't click a date
- Step 4 → 5: Users who click date but don't select time
- Step 5 → 6: Users who select time but don't start form
- Step 6 → 7: Users who start form but don't complete booking

---

## File Reference

| File | Purpose |
|------|---------|
| `/components/PostHogProvider.tsx` | PostHog initialization, page view tracking, UTM capture |
| `/lib/analytics.ts` | All tracking event functions, Cal.com event listeners |
| `/components/Hero.tsx` | Hero CTA tracking |
| `/components/Header.tsx` | Header CTA tracking |
| `/components/Pricing.tsx` | Pricing tier CTA tracking |
| `/components/FinalCTA.tsx` | Final CTA tracking |
| `/components/MobileFooterCTA.tsx` | Mobile footer CTA tracking |
| `/app/book/page.tsx` | Booking page view tracking, Cal.com embed |
| `/POSTHOG_SETUP.md` | PostHog dashboard configuration guide |

---

## Environment Variables

```
NEXT_PUBLIC_POSTHOG_KEY=phc_MsN3H11QPCu9Qp9YHcC2edLpzVV0Spq5jsXqKGvfQE1
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

*Last updated: January 2026*

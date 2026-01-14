# CTA & Conversion Tracking Map

## Overview
This document maps every call-to-action (CTA) and conversion point on the Endless Reply site and how they're tracked through PostHog.

---

## Two Conversion Paths

### Path A: Booking Conversion (Primary)
Users who book a call - either from landing page CTAs or direct ad traffic to /book.

### Path B: Lead Magnet Conversion (Secondary)
Users who download the free guide via footer email form.

---

## Path A: Booking Flow

### Flow 1: Organic/Landing Page → Book
```
Landing Page (/) - Track: $pageview + UTM params
    ↓
User sees one of 6 CTAs
    ↓
CTA Clicked - Track: cta_clicked
    ├─ cta_location: "hero" | "header" | "pricing" | "final_cta" | "mobile_footer"
    └─ cta_text: exact button text
    ↓
Booking Page (/book) - Track: booking_page_viewed
    ↓
[Cal.com Calendar Funnel - see below]
```

### Flow 2: Direct Ad Traffic → Book
```
Ad Click (Google/Facebook/LinkedIn)
    ↓
Booking Page (/book) - Track: $pageview + UTM params
    ↓
[Cal.com Calendar Funnel - see below]
```

### Cal.com Calendar Funnel (Both Flows)
```
Calendar Loads
    ↓
User Clicks Date - Track: calendar_date_selected
    ├─ selected_date: "2026-01-15"
    └─ funnel_step: 4
    ↓
User Selects Time - Track: time_slot_selected
    ├─ selected_date, selected_time
    └─ funnel_step: 5
    ↓
User Starts Form - Track: booking_form_started
    └─ funnel_step: 6
    ↓
User Completes Booking - Track: booking_completed + $conversion
    ├─ date, time, email
    ├─ funnel_step: 7
    ├─ conversion: true
    └─ User identified by email
    ↓
BOOKING CONVERSION ✓
```

---

## Path B: Lead Magnet Flow

```
Landing Page (/) - Track: $pageview + UTM params
    ↓
User scrolls to Footer
    ↓
User starts typing email - Track: lead_magnet_form_started
    └─ magnet_name: "footer-guide"
    ↓
User submits email - Track: lead_magnet_submitted
    ├─ magnet_name: "footer-guide"
    ├─ email: user's email
    ├─ conversion: true
    ├─ conversion_type: "lead_magnet"
    └─ User identified by email
    ↓
LEAD MAGNET CONVERSION ✓
```

---

## All CTAs with Full Tracking Detail

### Hero CTA
| Property | Value |
|----------|-------|
| Location | Hero section (above fold) |
| Button Text | "Book Your Free Strategy Call" |
| Event | `cta_clicked` |
| `cta_location` | `"hero"` |
| `cta_text` | `"Book Your Free Strategy Call"` |
| Destination | `/book` |
| Component | `/components/Hero.tsx:106-111` |

### Header CTA
| Property | Value |
|----------|-------|
| Location | Sticky header (desktop only) |
| Button Text | "Book a Call" |
| Event | `cta_clicked` |
| `cta_location` | `"header"` |
| `cta_text` | `"Book a Call"` |
| Destination | `/book` |
| Visibility | Hidden on mobile |
| Component | `/components/Header.tsx:68-74` |

### Pricing CTAs (3 tiers)

**Starter Tier**
| Property | Value |
|----------|-------|
| `cta_location` | `"pricing"` |
| `cta_text` | `"Starter - Book a Call"` |

**Professional Tier**
| Property | Value |
|----------|-------|
| `cta_location` | `"pricing"` |
| `cta_text` | `"Professional - Book a Call"` |

**Enterprise Tier**
| Property | Value |
|----------|-------|
| `cta_location` | `"pricing"` |
| `cta_text` | `"Enterprise - Book a Call"` |

Component: `/components/Pricing.tsx:168-178`

### Final CTA
| Property | Value |
|----------|-------|
| Location | Bottom of page (blue gradient section) |
| Button Text | "Book Your Free Strategy Call" |
| Event | `cta_clicked` |
| `cta_location` | `"final_cta"` |
| `cta_text` | `"Book Your Free Strategy Call"` |
| Destination | `/book` |
| Component | `/components/FinalCTA.tsx:91-100` |

### Mobile Footer CTA
| Property | Value |
|----------|-------|
| Location | Fixed sticky footer |
| Button Text | "Book a Free AI Strategy Call" |
| Event | `cta_clicked` |
| `cta_location` | `"mobile_footer"` |
| `cta_text` | `"Book a Free AI Strategy Call"` |
| Destination | `/book` |
| Visibility | Mobile only (`sm:hidden`) |
| Component | `/components/MobileFooterCTA.tsx:18-24` |

### Footer Lead Magnet (NOT a CTA - separate conversion)
| Property | Value |
|----------|-------|
| Location | Footer section |
| Form Type | Email submission |
| Lead Magnet | "7 Response Time Mistakes" guide |
| Events | `lead_magnet_form_started`, `lead_magnet_submitted` |
| `magnet_name` | `"footer-guide"` |
| Component | `/components/Footer.tsx` |

---

## CTA Summary Table

| CTA Location | Button Text | `cta_location` | `cta_text` | Visibility |
|--------------|-------------|----------------|------------|------------|
| Hero | Book Your Free Strategy Call | `hero` | `Book Your Free Strategy Call` | All |
| Header | Book a Call | `header` | `Book a Call` | Desktop |
| Pricing - Starter | Book a Call | `pricing` | `Starter - Book a Call` | All |
| Pricing - Professional | Book a Call | `pricing` | `Professional - Book a Call` | All |
| Pricing - Enterprise | Book a Call | `pricing` | `Enterprise - Book a Call` | All |
| Final CTA | Book Your Free Strategy Call | `final_cta` | `Book Your Free Strategy Call` | All |
| Mobile Footer | Book a Free AI Strategy Call | `mobile_footer` | `Book a Free AI Strategy Call` | Mobile |

**In PostHog**: Filter `cta_clicked` events by `cta_location` or `cta_text` to see exactly which CTAs perform best.

---

## All Events Reference

### Page View Events
| Event | When | Key Properties |
|-------|------|----------------|
| `$pageview` | Every page load | `page_path`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid` |

### Booking Funnel Events
| Event | Funnel Step | When | Key Properties |
|-------|-------------|------|----------------|
| `cta_clicked` | 2 | CTA button clicked | `cta_location`, `cta_text` |
| `booking_page_viewed` | 3 | /book page loads | - |
| `calendar_date_selected` | 4 | Date clicked in Cal.com | `selected_date` |
| `time_slot_selected` | 5 | Time slot chosen | `selected_date`, `selected_time` |
| `booking_form_started` | 6 | Form interaction begins | - |
| `booking_completed` | 7 | Booking confirmed | `date`, `time`, `email`, `conversion: true` |
| `$conversion` | 7 | (Also fired) | `conversion_type: "booking"` |

### Lead Magnet Events
| Event | When | Key Properties |
|-------|------|----------------|
| `lead_magnet_form_started` | First keystroke in email field | `magnet_name` |
| `lead_magnet_submitted` | Email form submitted | `magnet_name`, `email`, `conversion: true`, `conversion_type: "lead_magnet"` |

---

## UTM Parameter Flow

UTM params are captured on the FIRST page view and persist across the session:

**Landing on /** (organic):
- UTMs captured on landing page
- Persist through CTA click → /book → booking complete

**Landing on /book** (direct ad traffic):
- UTMs captured directly on booking page
- Persist through calendar → booking complete

All events inherit the session's UTM attribution via `posthog.register()`.

---

## Ad Campaign URL Examples

### Landing Page Traffic
```
https://endlessreply.com?utm_source=google&utm_medium=cpc&utm_campaign=jan_launch&utm_content=headline_a
```

### Direct to Booking Page (Recommended for Ads)
```
https://endlessreply.com/book?utm_source=google&utm_medium=cpc&utm_campaign=jan_launch&utm_content=book_direct
```

---

## PostHog Queries

### Which CTAs drive the most bookings?
1. Create Funnel: `cta_clicked` → `booking_completed`
2. Break down by: `cta_location`

### Which pricing tier gets the most clicks?
1. Event: `cta_clicked`
2. Filter: `cta_location` = `pricing`
3. Break down by: `cta_text`

### Direct ad traffic vs landing page traffic?
1. Event: `booking_completed`
2. Break down by first `page_path` (landing page vs /book)

### Lead magnet conversion rate?
1. Funnel: `$pageview` → `lead_magnet_submitted`

---

## File Reference

| File | Purpose |
|------|---------|
| `/components/PostHogProvider.tsx` | PostHog init, page views, UTM capture, session attribution |
| `/lib/analytics.ts` | All tracking functions, Cal.com listeners |
| `/components/Hero.tsx` | Hero CTA tracking |
| `/components/Header.tsx` | Header CTA tracking |
| `/components/Pricing.tsx` | Pricing tier CTA tracking |
| `/components/FinalCTA.tsx` | Final CTA tracking |
| `/components/MobileFooterCTA.tsx` | Mobile footer CTA tracking |
| `/components/Footer.tsx` | Lead magnet form tracking |
| `/app/book/page.tsx` | Booking page view, Cal.com embed setup |

---

## Environment Variables

```
NEXT_PUBLIC_POSTHOG_KEY=phc_MsN3H11QPCu9Qp9YHcC2edLpzVV0Spq5jsXqKGvfQE1
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

*Last updated: January 2026*

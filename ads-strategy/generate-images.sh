#!/bin/bash

# Endless Reply Ad Image Generator
# Uses Google Imagen API to generate all 10 ad creative concepts

# IMPORTANT: Replace with your API key or set as environment variable
API_KEY="${GEMINI_API_KEY:-AIzaSyBGFmuUMymjYyqDAEOPFpbrn35qu4TCT2Y}"

# Output directory
OUTPUT_DIR="./generated-images"
mkdir -p "$OUTPUT_DIR"

# API endpoint
ENDPOINT="https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict"

# Function to generate image
generate_image() {
    local concept_name="$1"
    local prompt="$2"
    local output_file="$3"

    echo "🎨 Generating: $concept_name..."

    # Make API call
    response=$(curl -s -X POST \
        "$ENDPOINT" \
        -H "x-goog-api-key: $API_KEY" \
        -H "Content-Type: application/json" \
        -d "{
            \"instances\": [{
                \"prompt\": $(echo "$prompt" | jq -Rs .)
            }],
            \"parameters\": {
                \"sampleCount\": 1,
                \"aspectRatio\": \"1:1\"
            }
        }")

    # Check for errors
    if echo "$response" | jq -e '.error' > /dev/null 2>&1; then
        echo "❌ Error generating $concept_name:"
        echo "$response" | jq '.error'
        return 1
    fi

    # Extract and save image (base64 encoded)
    echo "$response" | jq -r '.predictions[0].bytesBase64Encoded' | base64 -d > "$OUTPUT_DIR/$output_file"

    if [ -f "$OUTPUT_DIR/$output_file" ]; then
        echo "✅ Saved: $OUTPUT_DIR/$output_file"
    else
        echo "❌ Failed to save $concept_name"
        return 1
    fi
}

# ===================================
# CONCEPT 1: The 70% Stat
# ===================================
generate_image \
    "Concept 1: 70% Stat" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: White (#ffffff) with subtle gradient mesh of very light blue (#dbeafe at 10% opacity) in top right corner. Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent/highlight color: Coral orange (#f97316). LAYOUT: Large bold text at top: '70%' in electric blue (#2563eb), massive size, bold weight. Below it, smaller text: 'of leads book with whoever responds first' in dark gray (#475569). Visual separator line. Bottom section: Small amber/orange (#f59e0b) warning icon followed by text 'You have 3 minutes.' in dark text. Bottom corner: Small 'Endless Reply' wordmark with lightning bolt icon in blue. STYLE: Minimalist, clean, high contrast. Lo-fi/native feed aesthetic (not overly polished). Should look like it could be a screenshot from a presentation or data card. No stock photos, no people. Modern SaaS aesthetic." \
    "01-70-percent-stat.png"

# ===================================
# CONCEPT 2: The Missed Call
# ===================================
generate_image \
    "Concept 2: Missed Call" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: Light gray (#f5f5f5). Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent color: Coral orange (#f97316). LAYOUT: Center of image: A simple iPhone notification mockup showing: 'Missed Call' notification, '9:47 PM', Phone icon with red badge. Below the phone mockup: Bold text 'Who answered?' in dark slate (#0f172a). Bottom: Endless Reply logo (small lightning bolt + 'Endless Reply' text in blue). STYLE: Clean, minimalist. The phone notification should look realistic but simplified. Light drop shadow on the notification card. Lo-fi aesthetic, native to social feeds. No actual photos, just UI mockup style." \
    "02-missed-call.png"

# ===================================
# CONCEPT 3: Industry Targeting
# ===================================
generate_image \
    "Concept 3: Industry Targeting" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: White (#ffffff). Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent color: Coral orange (#f97316). LAYOUT: Top: Question text 'Do you run one of these businesses?' in dark gray (#475569). Middle: Grid of 4-6 simple flat icons representing: HVAC (snowflake + sun icon), Plumbing (wrench icon), Dental (tooth icon), Med Spa (spa/leaf icon), Veterinary (paw icon), Roofing (house with roof icon). Each icon in a small rounded square with light blue (#dbeafe) background. Icons themselves in electric blue (#2563eb). Below icons: Bold text 'Never miss another lead.' in dark slate. Bottom corner: Endless Reply logo. STYLE: Clean, organized grid layout. Simple flat iconography. Friendly, professional. Similar to MEGA AI's 'Do you run one of the following businesses?' ad style." \
    "03-industry-targeting.png"

# ===================================
# CONCEPT 4: Revenue Promise
# ===================================
generate_image \
    "Concept 4: Revenue Promise" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: White (#ffffff) with subtle blue gradient blob in corner (very soft, 5-10% opacity). Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent color: Coral orange (#f97316) and green (#10b981). LAYOUT: Large bold headline at top: '80-230%' in electric blue, very large. Below: 'more revenue' in dark gray (#475569), medium size. Visual element: Simple upward trending line graph or arrow, in green (#10b981). Below graph: Small text 'for service businesses using Endless Reply'. Bottom: Endless Reply logo. STYLE: Data-card aesthetic. Clean and minimal. The percentage should be the hero element. Looks like a stat pulled from a report. Lo-fi, native to feed." \
    "04-revenue-promise.png"

# ===================================
# CONCEPT 5: Competitor Speed
# ===================================
generate_image \
    "Concept 5: Competitor Speed" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: Dark slate (#0f172a) - dark mode aesthetic for variety. Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent color: Coral orange (#f97316). LAYOUT: Top half: Two response time comparisons stacked: 'Your competitor: 45 seconds ✓' in green (#10b981), 'You: 4 hours ✗' in coral/red (#f97316). Visual: Simple timer/stopwatch icon in blue. Bottom half: Bold text 'Speed wins.' in white. Subtext: 'Respond instantly. 24/7.' in gray (#94a3b8). Bottom corner: Endless Reply logo in white/blue. STYLE: Dark mode aesthetic for contrast and scroll-stopping. High contrast typography. Minimal, punchy. Comparison/versus layout." \
    "05-competitor-speed.png"

# ===================================
# CONCEPT 6: All-in-One
# ===================================
generate_image \
    "Concept 6: All-in-One" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: White (#ffffff). Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent color: Coral orange (#f97316). LAYOUT: Top: 'Your 24/7 AI Receptionist' in bold dark text. Middle: Three simple icons in a row with labels beneath: Phone icon (📞) - 'Calls', Email icon (✉️) - 'Emails', Chat icon (💬) - 'Chats'. Icons in rounded squares with light blue (#dbeafe) backgrounds. Below icons: 'All answered instantly.' in medium gray text. Bottom: Endless Reply logo with tagline 'Never miss another lead'. STYLE: Clean product showcase. Simple iconography. Professional SaaS aesthetic. Clear hierarchy. Lo-fi but polished." \
    "06-all-in-one.png"

# ===================================
# CONCEPT 7: Night Shift
# ===================================
generate_image \
    "Concept 7: Night Shift" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: Dark navy/slate (#1e293b) - night mode aesthetic. Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent color: Amber/yellow (#f59e0b) for 'glow' effect. LAYOUT: Top: '2:47 AM' in large, glowing amber/yellow text (#f59e0b) - like a digital clock. Below: Simple phone icon with incoming call indicator (pulsing rings). Middle: 'Your AI answers.' in white bold text. Subtext: 'Every call. Every lead. 24/7.' in light gray (#94a3b8). Bottom corner: Endless Reply logo in white/blue. STYLE: Night mode / dark aesthetic. The time should look like a digital clock display. Subtle glow effects on the time and phone icon. Calming but urgent. Scroll-stopping dark background." \
    "07-night-shift.png"

# ===================================
# CONCEPT 8: Simple Math
# ===================================
generate_image \
    "Concept 8: Simple Math" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: White (#ffffff). Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent colors: Green (#10b981) and coral/red (#f97316). LAYOUT: Simple equation style layout: Line 1: 'Missed Call' (in red/coral) → 'Lost Lead' → 'Lost Revenue' with X icon in red circle at end. Line 2: 'Every Call Answered' (in green) → 'Lead Captured' → 'More Revenue' with checkmark icon in green circle at end. Bottom: Bold text 'Make the math work.' in dark slate. Bottom corner: Endless Reply logo. STYLE: Clean, logical layout. Equation/formula aesthetic. Simple arrows connecting the concepts. High contrast between the two scenarios (red vs green). Looks like a whiteboard or presentation slide." \
    "08-simple-math.png"

# ===================================
# CONCEPT 9: Social Proof
# ===================================
generate_image \
    "Concept 9: Social Proof" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: Light cream/off-white (#fafafa). Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent color: Coral orange (#f97316). LAYOUT: Top: Small badge/pill that says 'From the founders' in blue. Center: Large quote-style text: 'Built by a team that scaled their own service business to \$12M/year'. Quote marks in light blue as design element. Bottom: Endless Reply logo with 'We've been in your shoes.' tagline. STYLE: Testimonial/quote card aesthetic. Clean and trustworthy. Minimal design elements. Feels authentic and personal. Could be a LinkedIn post screenshot style." \
    "09-social-proof.png"

# ===================================
# CONCEPT 10: Question Hook
# ===================================
generate_image \
    "Concept 10: Question Hook" \
    "Create a clean, modern social media ad graphic (1080x1080px square format). BRAND STYLE: Background: White (#ffffff). Font: Inter or similar clean sans-serif. Primary color: Electric blue (#2563eb). Accent color: Coral orange (#f97316). LAYOUT: Large question at top: 'How many calls did you miss last month?' in bold dark text (#0f172a). Below: Simple calculator or notepad illustration showing: '__ missed calls', '× \$____ average job', '= \$____ lost revenue', Lines are blank/fillable style. Bottom: 'Stop the guessing. Start capturing.' in blue. Bottom corner: Endless Reply logo. STYLE: Interactive/fill-in-the-blank aesthetic. Engages the viewer to do mental math. Clean, worksheet style. Simple line illustrations. Thought-provoking." \
    "10-question-hook.png"

echo ""
echo "=========================================="
echo "✅ Image generation complete!"
echo "=========================================="
echo "Images saved to: $OUTPUT_DIR"
echo ""
echo "⚠️  SECURITY REMINDER:"
echo "Please revoke the API key used in this script and generate a new one."
echo "Visit: https://aistudio.google.com/app/apikey"
echo ""

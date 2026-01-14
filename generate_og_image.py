#!/usr/bin/env python3
"""
Generate OG image for Endless Reply using Google Gemini (Nano Banana Pro).
"""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

def generate_og_image():
    """Generate OG image using Gemini."""
    try:
        from google import genai
    except ImportError:
        print("Installing google-genai...")
        import subprocess
        subprocess.run(["pip", "install", "-q", "google-genai"], check=True)
        from google import genai

    google_api_key = os.environ.get("GOOGLE_API_KEY")
    if not google_api_key:
        print("Error: GOOGLE_API_KEY not set in .env")
        return None

    # Prompt for Endless Reply OG image
    prompt = """Create a modern, professional social media preview image for "Endless Reply" - an AI-powered 24/7 response system for service businesses.

LAYOUT: Landscape format (1200x630 pixels, wider than tall).

STYLE: Clean, modern, professional tech startup aesthetic. Think Stripe, Linear, or Intercom - sophisticated gradients, smooth shapes, professional typography.

VISUAL ELEMENTS:
- Gradient background: Deep navy/charcoal transitioning to vibrant teal or electric blue
- Subtle geometric shapes or flowing curves suggesting continuous motion/endless activity
- Visual metaphors: lightning bolt (speed), infinity symbol, or waves (endless/continuous)
- Modern, clean design - NOT vintage or comic style

TEXT LAYOUT:
- "Endless Reply" as the main heading in bold, modern sans-serif (like Inter or Geist)
- Lightning bolt icon or infinity symbol integrated near the logo
- Tagline below: "Always responding, always ready"
- Subtitle: "AI-powered 24/7 phone, email & chat agents for service businesses"

COLOR PALETTE:
- Primary: Deep navy (#1e293b) or charcoal (#1f2937)
- Accent: Vibrant teal (#14b8a6) or electric blue (#2563eb)
- Highlights: Warm amber (#f59e0b) for call-to-action elements
- Text: White with subtle shadows for depth

REQUIREMENTS:
- Landscape orientation (1200x630 pixels)
- Professional, trustworthy appearance suitable for B2B service businesses
- High contrast for readability
- All text clearly legible
- Modern tech startup aesthetic
- No people/faces - focus on clean abstract design"""

    try:
        print("Generating OG image with Gemini (Nano Banana Pro)...")
        client = genai.Client(api_key=google_api_key)

        response = client.models.generate_content(
            model="gemini-3-pro-image-preview",
            contents=[prompt],
        )

        # Save to landing/app directory
        output_path = Path(__file__).parent / "landing" / "app" / "opengraph-image.png"
        twitter_path = Path(__file__).parent / "landing" / "app" / "twitter-image.png"

        from PIL import Image as PILImage

        for part in response.parts:
            if part.inline_data is not None:
                img = part.as_image()

                # Save both OG and Twitter images
                img.save(str(output_path))
                img.save(str(twitter_path))
                print(f"OG images generated:")
                print(f"  - {output_path}")
                print(f"  - {twitter_path}")
                print(f"Image size: {img.size}")
                return output_path

        print("Warning: No image data in response")
        return None
    except Exception as e:
        print(f"Error generating OG image: {e}")
        print(f"\nMake sure you have:")
        print(f"  1. GOOGLE_API_KEY in your .env file")
        print(f"  2. pip install google-genai")
        return None


if __name__ == "__main__":
    result = generate_og_image()
    if result:
        print("\n✅ Success! OG images updated.")
        print("Next steps:")
        print("  1. cd landing && npm run dev")
        print("  2. Check http://localhost:3000")
        print("  3. git add landing/app/opengraph-image.png landing/app/twitter-image.png")
        print("  4. git commit -m 'Update OG images with Endless Reply branding'")
        print("  5. git push")

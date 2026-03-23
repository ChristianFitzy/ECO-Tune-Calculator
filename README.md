# ECO-Tune Calculator

**Fuel Savings Calculator for Evolve Technik**

A premium web app that calculates annual fuel savings from ECU tuning, with a 5-year ROI forecast visualization.

## Features

- **Real-time calculations** - Updates as you type
- **10% fuel efficiency improvement** - Based on Evolve Technik's average ECU tuning results
- **5-year ROI forecast** - Visual bar chart showing payback period and cumulative savings
- **Premium design** - Dark glassmorphic UI with Evolve Technik branding
- **Mobile-first responsive** - Works perfectly on all devices
- **Single HTML file** - Easy deployment, no build process

## Quick Start

Simply open `index.html` in any modern browser. No installation or dependencies required.

**Or serve it locally:**

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## How It Works

**User Inputs:**
- Annual kilometers driven (default: 20,000 km)
- Current fuel consumption (L/100km)
- Current fuel price (AUD/L)

**Calculations:**
- Improved consumption = Current × 0.90 (10% efficiency gain)
- Annual savings = Cost difference between current and improved consumption
- ROI forecast = Cumulative savings - $1,650 tune cost (Years 1-5)
- Payback period = When cumulative savings exceed tune cost

**Example:**
- Vehicle: 14 L/100km consumption
- Driving: 20,000 km/year
- Fuel price: $2.10/L
- **Result:** $588/year savings, 2.8 year payback period

## Design

**Brand Colors:**
- Primary: Evolve Technik Red (#ed1c24)
- Background: Carbon black (#0a0a0a, #1a1a1a, #2a2a2a)
- Accents: White with opacity variants

**Typography:** Space Grotesk (modern, premium)

**Style:** Glassmorphism with dark theme, automotive performance aesthetic

## Tech Stack

- **HTML5** - Single file structure
- **Tailwind CSS** - Via CDN for rapid styling
- **Vanilla JavaScript** - No frameworks, pure JS
- **Google Fonts** - Space Grotesk typography

## Use Cases

- Landing page for fuel economy ECU tuning campaigns
- Lead generation tool for eco-conscious drivers
- Value proposition demonstration
- Marketing material for dealer network

## Deployment

**Static hosting options:**
- Vercel / Netlify (drag & drop)
- GitHub Pages
- Any web server (Apache, Nginx)
- Tailscale Serve (internal preview)

**Integration:**
- Embed via iframe in existing website
- Standalone microsite (e.g., fuelsavings.evolve-technik.com.au)
- Direct link from Google Ads campaigns

## Customization

**To adjust tune cost:**
Find line ~180: `const TUNE_COST = 1650;`

**To change improvement percentage:**
Find line ~120: `const IMPROVEMENT_PERCENTAGE = 0.10;`

**To modify colors:**
Update Tailwind config (lines 13-22) with new color values

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Android)

**Minimum requirements:** ES6 JavaScript support

## Performance

- **Load time:** <2 seconds on 3G
- **File size:** 13KB (minified HTML)
- **No external dependencies** - All resources loaded via CDN

## License

Proprietary - Evolve Technik Pty Ltd

## Contact

**Evolve Technik**  
28/513-515 Maroondah Hwy  
Ringwood VIC 3134  
Australia

Phone: 1300 980 898  
Website: evolve-technik.com.au

---

Built with ❤️ by Evolve Technik  
**Performance. Precision. Evolution.**

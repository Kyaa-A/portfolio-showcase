# Portfolio Showcase

A modern, high-performance portfolio website built with Next.js 15, showcasing professional web development work, skills, certifications, and achievements. Features smooth animations, an interactive contact form, and a dynamic project showcase.

## Features

### Pages & Sections

- **Home** - Animated hero section with scroll progress and featured projects
- **About** - Personal introduction with core values and professional philosophy
- **Projects** - Portfolio showcase with detailed case studies
- **Skills** - Interactive technical skills grid and certifications gallery with expandable certificate previews
- **Awards** - Timeline of competition achievements and honors
- **Contact** - Conversational form with advanced animations and email integration

### Key Features

- Custom animated cursor with hover effects
- Smooth scroll progress indicators
- Framer Motion animations throughout
- Responsive design (mobile-first approach)
- Contact form with Resend API integration
- Certificate preview modal
- Interactive skill proficiency indicators
- Dark theme with professional color palette

## Tech Stack

### Core
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling

### UI & Animation
- **Framer Motion 12.23.12** - Advanced animations
- **Radix UI** - Accessible components (Dialog, Slot)
- **Lucide React** - Icon library
- **class-variance-authority** - Component variants

### Backend
- **Resend API** - Email service for contact form
- Next.js API routes for serverless functions

### Fonts
- Montserrat (via @fontsource)
- Geist & Geist Mono (Next.js optimized)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-showcase.git
cd portfolio-showcase
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
RESEND_API_KEY=your_resend_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
/src
  /app                    # Next.js App Router pages
    - page.tsx           # Home page
    - layout.tsx         # Root layout
    /about              # About page
    /contact            # Contact form
    /skills             # Skills & certifications
    /projects           # Projects showcase
      /[slug]           # Dynamic project detail pages
    /awards             # Competition achievements
    /api
      /contact          # Email API route
  /components
    /layout             # Header, Navigation, CustomCursor
    /sections           # Reusable page sections
    /ui                 # Base UI components
  /contexts             # React context providers
  /hooks                # Custom React hooks
  /lib                  # Utilities

/public
  /assets               # Images and logos
  /certificates         # Certificate images
  /awards              # Award photos
  /mockups             # Project mockups
  /skills_logo         # Technology logos
```

## Features in Detail

### Contact Form
- Captures: name, company, project type, budget, contact details
- Email integration via Resend API
- Smart validation with error handling
- Advanced button animation with cursor-attraction physics (desktop)
- Success/error notifications

### Skills Page
- Two-tab interface: Technical Skills & Certifications
- Organized by categories: Languages, Frontend, Backend, Databases, Tools
- Skill proficiency indicators (50-95%)
- Certificate cards with expandable preview modal
- Badge and skill association display

### Project Showcase
- Grid layout with hover effects
- Individual detail pages for each project
- Technology stack badges
- High-quality mockup images
- Call-to-action for collaboration

### Awards Timeline
- Chronological achievement display
- Detailed descriptions with team credits
- Photo galleries for each award
- Alternating left/right layout design

## Customization

### Adding a New Project
1. Create a new folder in `/src/app/projects/[your-project-slug]/`
2. Add a `page.tsx` file with project details
3. Add project mockups to `/public/mockups/`
4. Update the projects list in `/src/app/projects/page.tsx`

### Adding a New Skill
1. Add the skill logo to `/public/skills_logo/`
2. Update the skills array in `/src/app/skills/page.tsx`
3. Specify category and proficiency level

### Adding a Certificate
1. Add certificate image to `/public/certificates/`
2. Add badge image (if available)
3. Update the certifications array in `/src/app/skills/page.tsx`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | API key for Resend email service |

## Performance Optimizations

- Next.js Image optimization for all images
- Turbopack for fast development builds
- Server-side rendering for initial page loads
- Code splitting and lazy loading
- Optimized font loading with `next/font`
- **Mobile-optimized animations**:
  - Reduced animation intensity on mobile devices (50% smaller scale/rotation values)
  - Fewer floating elements on smaller screens (3 desktop elements hidden on mobile)
  - Slower animation speeds to conserve battery (50% longer duration)
  - Respects `prefers-reduced-motion` system preference for accessibility
  - Cursor-based interactions automatically disabled on touch devices
  - Custom `useMediaQuery` hook for centralized device detection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For inquiries about this project or collaboration opportunities:
- Email: asnaripacalna@gmail.com
- Website: [Your Portfolio URL]

---

Built with Next.js 15 and deployed on Vercel

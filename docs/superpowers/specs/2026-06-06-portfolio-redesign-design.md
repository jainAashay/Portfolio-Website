# Portfolio Website Redesign — Design Spec
**Date:** 2026-06-06  
**Status:** Approved

## Scope
Pure UI revamp. No backend API changes. All endpoints, auth flow, cookie handling, and SchemaManager functionality remain untouched.

## Global Theme
- Background: `#F8F9FA` (off-white)
- Text: `#1A1A2E` (dark navy)
- Accent: `#4F46E5` (indigo)
- Cards: `#FFFFFF` with `box-shadow: 0 2px 16px rgba(0,0,0,0.08)`, `border-radius: 12px`
- Font: Inter (Google Font)
- Remove: hotpink, coral, orchid, blueviolet backgrounds

## Mobile
All sections must be responsive. Mobile-first breakpoints via Bootstrap grid + custom media queries.

## Sections

### Navbar
- Sticky white bar with shadow on scroll
- Brand "Aashay Jain" left, nav links right
- Auth button preserved (hidden visually behind existing logic)
- Active link: indigo underline

### Hero
- Two-column: left = name + title + tagline (skills-forward) + CTA buttons; right = skill tag cluster
- Title: "Software Development Engineer 2 @ Flipkart"
- Tagline: skills/expertise forward, not past-achievements
- CTAs: "View Projects" (→ /projects) + "Download Resume"
- No GIF

### About
- Two-column card: photo left, bio + facts right
- Facts: Location (Bengaluru), Email (jainaashay123@gmail.com)
- No typewriter animation

### Experience
- Vertical timeline, card per role, full bullet points from resume
- Roles: SDE-2 (Apr 2026–Present), SDE-1 (Jul 2024–Apr 2026), Intern Flipkart (Jan–Jun 2024), Intern Deutsche Bank (May–Jul 2023)

### Achievements
- Grid of cards: Flipkart Mission Impossible Award, Ace Alliance Award, LeetCode Knight (2061), Codeforces Specialist (1430), Codechef 4-Star (1892), Mettl CodeSmash (Rank 49)

### Skills
- Two groups: "Core" (Java, Python, C++, Dropwizard, Spring Boot, REST APIs, Kafka, Elasticsearch) and "Tools & Concepts" (Docker, Kubernetes, GCP, Git, System Design, Microservices, Design Patterns, DSA, DBMS)
- Tag-pill style, no carousel

### Education
- Single compact card: NIT Bhopal, B.Tech CSE, 2020–2024, GPA 8.26

### Projects (main page + dedicated route)
- Main page: 3 featured cards + "See All Projects" button → /projects
- /projects page: all 7 projects in responsive grid (6 existing + TradePulse)

### Contact
- Same API endpoint, same toast logic — only visual update

### Footer
- Updated bio (no "final-year MANIT student")
- Links: LinkedIn, GitHub, LeetCode

## Backward Compatibility
- All API calls preserved exactly as coded
- Auth/cookie logic unchanged
- SchemaManager routes and components untouched
- Only CSS, JSX structure, and hardcoded content updated

# DevPrep — Interview Preparation Platform

DevPrep is a sleek, minimalist, and highly responsive web application tailored for software engineers preparing for technical interviews. Built using **Next.js (App Router)** and **Tailwind CSS**, it features a modern, high-contrast, black-and-white neo-brutalist UI.

This platform serves as a centralized hub to revise core concepts in Backend Development, Frontend Frameworks, Systems Architecture, and DevOps.

---

## Features

- ** Specialized Framework Tracking:** Dedicated sections for Laravel/PHP, React/Next.js, Databases (MySQL/PostgreSQL), and DevOps (Docker, CI/CD).
- ** Neo-Brutalist Design:** Minimalist black-and-white aesthetic, avoiding unnecessary bloat to keep the focus purely on content.
- ** Fully Responsive:** Optimized seamlessly for desktops, tablets, and mobile devices.
- ** Modern Tech Stack:** Built using Next.js App Router for optimal routing and performance.
- ** Static Pagination:** Pre-configured pagination design ready for dynamic data integration.

---

##  Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons & Fonts:** Next.js Google Fonts (Inter)

---

##  Directory Structure

```text
src/
├── app/
│   ├── categories/
│   │   ├── backend/
│   │   │   └── page.js      # Single category view with posts & pagination
│   │   └── page.js          # Categories list directory
│   ├── login/
│   │   └── page.js          # Minimalist login layout
│   ├── globals.css          # Tailwind setup
│   ├── layout.js            # Global Layout (Navbar & Footer)
│   └── page.js              # Hero / Home page
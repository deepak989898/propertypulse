# PropertyPulse

Modern full-stack real estate platform for buying, selling, and renting in Orai, Uttar Pradesh.

## Stack

- Next.js App Router + Tailwind CSS
- Framer Motion + React Three Fiber + Drei
- Firebase (Auth, Firestore, Storage) + Firebase Admin SDK
- Razorpay-ready API hooks
- Vercel deployment ready

## Local setup

- `npm install`
- copy `.env.example` to `.env.local`
- `npm run dev`

## Routes

- `/` Homepage + 3D hero section
- `/properties` Listing page
- `/properties/[id]` Property detail + lead form
- `/post-property` Post property
- `/blog` Blog + SEO content pages
- `/dashboard` User panel
- `/admin` Admin panel

## API routes

- `POST /api/leads`
- `POST /api/subscriptions`
- `POST /api/properties/post`
- `POST /api/admin/approve-property`
- `POST /api/blog/post`

## Security and SEO

- Admin route protection scaffold via `src/proxy.ts`
- Firebase rules files included (`firestore.rules`, `storage.rules`)
- SEO-ready metadata, sitemap, robots, and schema markup

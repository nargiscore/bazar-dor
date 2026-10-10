#  বাজার দর (BazarDor)

নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা। কোন পণ্যের দাম গতকালের চেয়ে বেড়েছে বা কমেছে, আর কোন বাজারে কত দাম, সবই এক জায়গায়।

**Live:** [https://bazar-dor-drab-six.vercel.app](https://bazar-dor-drab-six.vercel.app) &nbsp;|&nbsp; **Repo:** [https://github.com/nargiscore/bazar-dor](https://github.com/nargiscore/bazar-dor)

##  Key Features

1. **Live price ticker** — navbar-এর নিচে অনন্ত স্ক্রলিং স্ট্রিপে প্রতিটি পণ্যের দাম ও ▲/▼ পরিবর্তন।
2. **দাম বেড়েছে / কমেছে** — হোম পেজে সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য আলাদা সেকশনে।
3. **বিভাগ অনুযায়ী ব্রাউজ + সর্টিং** — ৮টি ক্যাটাগরি পেজ; দাম অনুযায়ী কম→বেশি / বেশি→কম সাজানো (সংখ্যা ধরে, বাংলা স্ট্রিং ধরে নয়)।
4. **বাজারভিত্তিক দাম** — প্রতিটি পণ্যের পেজে বিভাগ ও বাজার ধরে সর্বনিম্ন–সর্বোচ্চ দাম, সঙ্গে সর্বনিম্ন / সর্বোচ্চ / গড় দামের সারাংশ।
5. **Authentication (Better Auth)** — Email/Password + Google + GitHub লগইন, toast নোটিফিকেশন, প্রোটেক্টেড রুট।
6. **প্রোফাইল আপডেট** — নাম পরিবর্তন করার আলাদা পেজ।
7. **Responsive & polished states** — মোবাইল/ট্যাবলেট/ডেস্কটপ, skeleton loader, ৪০৪ পেজ, error ও empty state।

##  Technologies

Next.js (App Router) · TypeScript · Tailwind CSS v4 · daisyUI · Better Auth · MongoDB · react-hot-toast

##  Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

### Environment variables

| Name | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string (stores users & sessions) |
| `BETTER_AUTH_SECRET` | random string — `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://localhost:3000` locally, your Vercel URL in production |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth |

OAuth redirect (callback) URLs:

- Google: `<BETTER_AUTH_URL>/api/auth/callback/google`
- GitHub: `<BETTER_AUTH_URL>/api/auth/callback/github`

##  Deploy (Vercel)

Import the repo, add the same environment variables (with `BETTER_AUTH_URL` set to the Vercel domain), deploy. Dynamic routes (`/category/[slug]`, `/product/[slug]`) work on refresh. In MongoDB Atlas, allow network access from `0.0.0.0/0` so Vercel can connect.

##  Structure

```
app/            routes (home, category/[slug], product/[slug], signin, signup, profile, 404)
components/     Navbar, Ticker, ProductCard, forms, skeletons
lib/            auth (server/client), API fetchers, Bengali number/date helpers
```

Data comes from `https://api.api-store.workers.dev/api/bazardor` (falls back to the alternative base URL).

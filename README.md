# Ratan Kala Art & Craft Academy

Premium, responsive portfolio website built with React 19 + Vite. Includes course information, a creative gallery, and an admission enquiry form backed by Supabase.

## 1. Run locally on Chromebook (Linux)

Open the Chromebook **Linux Terminal**. Install Node.js 20 or newer and Git if needed:

```bash
sudo apt update
sudo apt install -y git curl
```

If Node.js is not installed, install Node.js 20 using NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

Extract this ZIP, then enter the project folder. Example:

```bash
cd ~/Downloads
unzip ratan-kala-art-craft-academy.zip
cd ratan-kala-art-craft-academy
npm install
npm run dev -- --host 0.0.0.0
```

Open the local URL shown by Vite (usually `http://localhost:5173`) in Chrome. Stop the server with `Ctrl+C`.

## 2. Configure online admission enquiries (Supabase)

GitHub Pages hosts static frontend files; it does not run a server or save form submissions by itself. This project uses Supabase as the hosted database for admissions.

1. Create a project at https://supabase.com/.
2. In Supabase, open **SQL Editor**, paste and run `supabase/schema.sql`.
3. Open **Project Settings → API** and copy the Project URL and `anon` / publishable key.
4. In your project root, create `.env` from the example:

```bash
cp .env.example .env
```

5. Edit `.env` and add the values:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

The anon key is designed for public frontend use when Row Level Security is correctly configured. **Never use the Supabase `service_role` key in this website.** The included policy permits anonymous inserts only; it does not permit public reads. View enquiries in Supabase Dashboard → Table Editor → `admission_enquiries`.

For local testing, restart `npm run dev` after changing `.env`.

## 3. Publish on GitHub Pages

Create a new empty GitHub repository named exactly:

`ratan-kala-art-craft-academy`

Then, in the project folder:

```bash
git init
git add .
git commit -m "Initial Ratan Kala academy website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/ratan-kala-art-craft-academy.git
git push -u origin main
```

On GitHub:
1. Open the repository → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open **Settings → Secrets and variables → Actions → New repository secret**.
4. Add `VITE_SUPABASE_URL` with your Supabase Project URL.
5. Add `VITE_SUPABASE_ANON_KEY` with your Supabase anon/publishable key.
6. Open **Actions** and wait for “Deploy Ratan Kala to GitHub Pages” to finish.

Your website URL will be:

`https://YOUR-GITHUB-USERNAME.github.io/ratan-kala-art-craft-academy/`

The GitHub Actions workflow builds the site on every push to `main`.

## 4. Personalise before launch

Update the contact details in `src/App.jsx`:
- Academy phone number
- Academy email address
- Full academy address
- Instagram and Facebook profile URLs

Replace the illustrative images in the `gallery` array and hero image with approved Ratan Kala photographs. Add the academy logo in `public/` if you have one. Review course names, age ranges, class timings and fees before publishing.

## 5. Common commands

```bash
npm run dev       # local development
npm run build     # production build
npm run preview   # preview production build
git status        # see changed files
git add .
git commit -m "Update academy website"
git push
```

## Important

- Do not commit `.env`; it is ignored by `.gitignore`.
- GitHub Actions receives the Supabase values from repository secrets at build time.
- The public form only inserts enquiries. There is no public enquiry listing or admin login in this starter.
- Add spam protection/rate limiting and a privacy notice before collecting real student/parent information at scale.

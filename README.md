# Optimistic UI & Skeleton Loading (React)

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-UI-38B2AC?logo=tailwindcss&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-Data-000000?logo=json&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-success)

A React project demonstrating **Optimistic UI updates**, **skeleton loading**, and **error rollback handling** using a realistic social media post interaction system.

### 🚀 Features

- ⚡ Optimistic UI updates (instant likes & bookmarks)
- 🔄 Rollback on API failure
- 🧱 Skeleton loading while fetching data
- 💥 Simulated server delay & random failures
- 🔔 Error notification handling
- #️⃣ Clickable hashtag search links

### 🧠 Concepts Covered

This project demonstrates how modern apps achieve smooth UX:

- Updating UI before server confirmation
- Managing temporary state with `useRef`
- Handling API failures gracefully
- Loading placeholders instead of empty screens

### 🛠️ Tech Stack

- React (Hooks: `useState`, `useEffect`, `useRef`)
- Fetch API (mocked backend)
- JSON Server
- Tailwind CSS
- React Icons

### 📸 Demo

> Add screenshots or GIFs here (recommended)

### 📂 Project Structure

```
src/
 ├── components/
 │    ├── PostOptimistic.jsx
 │    ├── Skeleton.jsx
 │    ├── ErrorNotification.jsx
 ├── server/
 │    ├── postsApi.js
```

### ▶️ Getting Started

```bash
# Clone repo
git clone https://github.com/your-username/optimistic-ui-demo.git

# Install dependencies
npm install

# Run project
npm run dev
```

### 💡 What You Learn

- How apps like Instagram/Twitter feel instant
- Why optimistic updates improve UX
- How to recover gracefully from failed requests

### 📌 Note

This project uses simulated API calls with random failures to mimic real-world network conditions.

If you want, I can also:

- Add **GitHub Actions badge (CI/CD)**
- Add **live demo deployment section (Vercel/Netlify)**
- Or turn this into a **portfolio-level README with screenshots + animations**

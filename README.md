# COVER_GENERATOR

A modern web application for generating cover letters, managing user profiles, and uploading resumes. Built with React, Zustand for state management, Firebase for authentication, and Axios for API communication.

## Features

- **Authentication**
  - Google and phone number login using Firebase
  - OTP verification for phone authentication
  - User session management with Zustand

- **Profile Management**
  - Fetch and update user profile via secure API endpoints
  - Upload resume files (PDF, DOC, DOCX) to the backend

- **Cover Letter Generator**
  - Generate personalized cover letters based on user profile and input

- **Notifications**
  - Success and error toasts using Sonner or Toaster

## Tech Stack

- React & TypeScript
- Zustand (global state management)
- Firebase (auth)
- Axios (API calls)
- React Query (data fetching/caching)
- Sonner/Toaster (notifications)
- Tailwind CSS (styling)

## Folder Structure

```
src/
  api/                # API calls (auth, user, profile, resume upload)
  components/         # UI components (AuthModal, Header, etc.)
  constants/          # App-wide constants (API base URL)
  firebase.ts         # Firebase initialization
  pages/              # Main pages (Index, Profile, CoverLetterGenerator)
  store/              # Zustand stores (userStore)
```

## Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Set up environment variables**
   - Add your Firebase config and API base URL in `.env.local`:
     ```
     VITE_PUBLIC_FIREBASE_CONFIG=...
     VITE_PUBLIC_BASE_URL=...
     ```

3. **Run the app**
   ```sh
   npm run dev
   ```

## API Endpoints

- `POST /api/user/register` — Register/login user
- `GET /api/user/profile` — Fetch user profile
- `PUT /api/user/profile` — Update user profile
- `POST /api/user/upload-resume` — Upload resume file

## Customization

- Update Firebase config in `src/firebase.ts`
- Change API base URL in `src/constants/api.ts`
- Add more profile fields or cover letter templates as needed

## License
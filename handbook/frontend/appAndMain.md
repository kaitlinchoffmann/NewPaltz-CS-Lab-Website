# Application Routing Structure (App.jsx and main.jsx)

This section explains how the application handles routing, page structure, and global authentication using React Router and the AuthProvider context.

---

## File: `App.jsx`

The `App` component defines all front-end routes for the website. It wraps the entire application in a `<BrowserRouter>` and sets up every page path, including admin panel routes, student features, blog pages, resources, faculty pages, authentication pages, and more.

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import EventCalendar from './pages/EventCalendar';

import StudentHighlights from './pages/StudentHighlights/StudentHighlights';
import HighlightDetails from './pages/StudentHighlights/StudentHighlightDetails';
import StudentHighlightsAddPage from './pages/AdminPanel/StudentHighlights/StudentHighlightAddPage';
import StudentHighlightsEditPage from './pages/AdminPanel/StudentHighlights/StudentHighlightsEditPage';
import ProjectForm from './pages/StudentHighlights/SubmitProject';

import TechBlogDisplay from './pages/TechBlog/TechBlogDisplay';
import TechBlogEditPage from './pages/AdminPanel/TechBlog/TechBlogEditPage';
import TechBlogAddPage from './pages/AdminPanel/TechBlog/TechBlogAddPage';
import ArticleForm from './pages/TechBlog/SubmitArticle';

import StudentResources from './pages/StudentResources';
import StudentResourcesAddPage from './pages/AdminPanel/StudentResources/ResourceAddPage';
import StudentResourcesEditPage from './pages/AdminPanel/StudentResources/ResourceEditPage';

import StudentForms from './pages/StudentForms';
import SubmitSDRequest from './pages/StudentRequests/SubmitSDRequest';

import FacultyDirectory from './pages/FacultyDirectory';
import FacultyAddPage from './pages/AdminPanel/Faculty/FacultyAddPage';
import FacultyEditPage from './pages/AdminPanel/Faculty/FacultyEditPage';

import FAQ from './pages/FAQ';
import CreateFAQPage from './pages/AdminPanel/FAQ/FAQAddPage';
import FAQEditPage from './pages/AdminPanel/FAQ/FAQEditPage';

import AdminPanel from './pages/AdminPanel/AdminPanel';
import UsersAddPage from './pages/AdminPanel/Users/UsersAddPage';
import UsersEditPage from './pages/AdminPanel/Users/UsersEditPage';

import ProfilePage from './pages/ProfilePage';

import Contributions from './pages/Contributions';

import Login from './pages/Login';

import Footer from './components/Footer';

import Event from './pages/Events/EventPage';
import EventAddPage from './pages/Events/EventAddPage';
import EventEditPage from './pages/Events/EventEditPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-50">
        <NavBar />
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/calendar" element={<EventCalendar />} />

            <Route path="/student-highlights" element={<StudentHighlights />} />
            <Route path="/student-highlights/:id" element={<HighlightDetails />} />
            <Route path="admin-panel/student-highlights/edit/:id" element={<StudentHighlightsEditPage />} />
            <Route path="/create-student-highlight" element={<StudentHighlightsAddPage />} />
            <Route path="/submit-project" element={<ProjectForm />} />

            <Route path="/tech-blog" element={<TechBlogDisplay />} />
            <Route path="/admin-panel/tech-blog/edit/:id" element={<TechBlogEditPage />} />
            <Route path="/create-tech-blog" element={<TechBlogAddPage />} />
            <Route path="/submit-article" element={<ArticleForm />} />

            <Route path="/student-resources" element={<StudentResources />} />
            <Route path="/admin-panel/student-resources/edit/:id" element={<StudentResourcesEditPage />} />
            <Route path="/create-student-resource" element={<StudentResourcesAddPage />} />

            <Route path="/student-forms" element={<StudentForms />} />
            <Route path="/submit-sd-request" element={<SubmitSDRequest />} />

            <Route path="/faculty" element={<FacultyDirectory />} />
            <Route path="/admin-panel/faculty/edit/:id" element={<FacultyEditPage />} />
            <Route path="/create-faculty" element={<FacultyAddPage />} />

            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin-panel/faq/edit/:id" element={<FAQEditPage />} />
            <Route path="/create-faq" element={<CreateFAQPage />} />

            <Route path="/admin-login" element={<Login />} />
            <Route path="/admin-panel" element={<AdminPanel />} />

            <Route path="/admin-panel/users/create-user" element={<UsersAddPage />} />
            <Route path="/admin-panel/users/edit-admin/:id" element={<UsersEditPage />} />

            <Route path="/profile/:id" element={<ProfilePage />} />

            <Route path="/contributions" element={<Contributions />} />

            <Route path="/events" element={<Event />} />
            <Route path="/create-event" element={<EventAddPage />} />
            <Route path="/admin-panel/events/edit/:id" element={<EventEditPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
```

---

## How Routing Works

- `BrowserRouter` provides the navigation system for the application.
- `Routes` contains the full list of URL paths supported by the application.
- Each `<Route>` maps a URL path to a specific React page component.
- Admin routes follow the pattern:
  ```
  /admin-panel/*
  ```
- Public-facing routes include:
  ```
  /
  /tech-blog
  /student-highlights
  /faculty
  /student-resources
  /calendar
  /events
  ```

This file is the main routing hub of the entire frontend.

---

## File: `main.jsx`

This file initializes the application and wraps the entire app in the `AuthProvider`, allowing all components to access authentication state and user information.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
```

---

## What `main.jsx` Does

- Loads the React app into the DOM.
- Wraps the application with `StrictMode` for improved debugging.
- Wraps the entire application with `AuthProvider`, giving all components access to authentication functionality.
- Ensures the `user`, `setUser`, `loading`, and `logout` values are available throughout the app.

---

## Summary

- `App.jsx` defines all routes and page paths in the application.
- `main.jsx` initializes the app and sets up the global authentication provider.
- Together, these files define the structure and navigation of the entire frontend.


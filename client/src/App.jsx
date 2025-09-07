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

import StudentRequest from './pages/StudentRequest';

import FacultyDirectory from './pages/FacultyDirectory';
import FacultyAddPage from './pages/AdminPanel/Faculty/FacultyAddPage';
import FacultyEditPage from './pages/AdminPanel/Faculty/FacultyEditPage';

import FAQ from './pages/FAQ';
import CreateFAQPage from './pages/AdminPanel/FAQ/FAQAddPage';
import FAQEditPage from './pages/AdminPanel/FAQ/FAQEditPage';

import AdminPanel from './pages/AdminPanel/AdminPanel';
import UsersAddPage from './pages/AdminPanel/Users/UsersAddPage';
import UsersEditPage from './pages/AdminPanel/Users/UsersEditPage';

import Contributions from './pages/Contributions';

import Login from './pages/Login';

import Footer from './components/Footer';


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

            <Route path="/student-request" element={<StudentRequest />} />

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

            <Route path="/contributions" element={<Contributions />} />


          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

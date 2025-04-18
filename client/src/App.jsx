import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import EventCalendar from './pages/EventCalendar';
import StudentHighlights from './pages/StudentHighlights/StudentHighlights';
import TechBlogDisplay from './pages/TechBlog/TechBlogDisplay';
import StudentResources from './pages/StudentResources';
import FacultyDirectory from './pages/FacultyDirectory';
import Contributions from './pages/Contributions';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import Footer from './components/Footer';
import ArticleForm from './pages/TechBlog/SubmitArticle';
import TechBlogAdminEdit from './pages/AdminPanel/TechBlogAdminEdit';
import ProjectForm from './pages/StudentHighlights/SubmitProject';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import HighlightDetails from './pages/StudentHighlights/StudentHighlightDetails';
import StudentHighlightsAdminEdit from './pages/AdminPanel/StudentHighlightsAdminEdit';
import CreateFAQPage from './pages/AdminPanel/FAQ/FAQAddPage';
import FAQAdminEdit from './pages/AdminPanel/FAQ/FAQEditPage';
import FAQEditPage from './pages/AdminPanel/FAQ/FAQEditPage';
import FacultyAddPage from './pages/AdminPanel/Faculty/FacultyAddPage';
import FacultyEditPage from './pages/AdminPanel/Faculty/FacultyEditPage';
import StudentResourcesAddPage from './pages/AdminPanel/StudentResources/ResourceAddPage';
import StudentResourcesEditPage from './pages/AdminPanel/StudentResources/ResourceEditPage';

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
            <Route path="/student-highlights/edit/:id" element={<StudentHighlightsAdminEdit />} />

            <Route path="/tech-blog" element={<TechBlogDisplay />} />
            <Route path="/tech-blog/edit/:id" element={<TechBlogAdminEdit />} />

            <Route path="/student-resources" element={<StudentResources />} />
            <Route path="/admin-panel/student-resources/edit/:id" element={<StudentResourcesEditPage />} />
            <Route path="/create-student-resource" element={<StudentResourcesAddPage />} />

            <Route path="/faculty" element={<FacultyDirectory />} />
            <Route path="/admin-panel/faculty/edit/:id" element={<FacultyEditPage />} />
            <Route path="/create-faculty" element={<FacultyAddPage />} />

            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin-panel/faq/edit/:id" element={<FAQEditPage />} />
            <Route path="/create-faq" element={<CreateFAQPage />} />

            <Route path="/admin-login" element={<Login />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/submit-article" element={<ArticleForm />} />
            <Route path="/submit-project" element={<ProjectForm />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home';
import EventCalendar from './pages/EventCalendar';
import StudentHighlights from './pages/StudentHighlights/StudentHighlights.jsx';
import TechBlogDisplay from './pages/TechBlog/TechBlogDisplay';
import StudentResources from './pages/StudentResources';
import FacultyDirectory from './pages/FacultyDirectory';
import Contributions from './pages/Contributions.jsx';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import Footer from './components/Footer.jsx';
import ArticleForm from './pages/TechBlog/SubmitArticle.jsx';
import TechBlogAdminEdit from './pages/TechBlog/TechBlogAdminEdit.jsx';
import ProjectForm from './pages/StudentHighlights/SubmitProject.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import HighlightDetails from './pages/StudentHighlights/StudentHighlightDetails.jsx';
import StudentHighlightsAdminEdit from './pages/StudentHighlights/StudentHighlightsAdminEdit.jsx';
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
            <Route path="/faculty" element={<FacultyDirectory />} />
            <Route path="/faq" element={<FAQ />} />
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

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home';
import EventCalendar from './pages/EventCalendar';
import StudentHighlights from './pages/StudentHighlights';
import TechBlogDisplay from './pages/TechBlogDisplay';
import StudentResources from './pages/StudentResources';
import FacultyDirectory from './pages/FacultyDirectory';
import Contributions from './pages/Contributions.jsx';
import Login from './pages/Login';
import FAQ from './pages/FAQ';
import Footer from './components/Footer.jsx';

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
            <Route path="/tech-blog" element={<TechBlogDisplay />} />
            <Route path="/student-resources" element={<StudentResources />} />
            <Route path="/faculty" element={<FacultyDirectory />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contributions" element={<Contributions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaBook, FaUser, FaGraduationCap, FaUsers } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import courseService from '../../services/courseService';
import staticCoursesData from '../../data/coursesData';

// Group courses by course code (e.g., all CPS 210 sections become one entry)
const groupCoursesByCode = (courses) => {
  const grouped = {};

  courses.forEach(course => {
    // Extract base code (e.g., "CPS 210" from "CPS 210")
    const baseCode = course.code.split('/')[0].trim();

    if (!grouped[baseCode]) {
      grouped[baseCode] = {
        code: baseCode,
        name: course.name,
        category: course.category,
        description: course.description,
        credits: course.credits,
        semester: course.semester,
        sections: []
      };
    }

    grouped[baseCode].sections.push({
      id: course.id,
      slug: course.slug || course.id,
      section: course.section,
      professor: course.professor,
      days: course.days,
      time: course.time,
      location: course.location,
      syllabusFile: course.syllabusFile,
      resources: course.resources
    });
  });

  return Object.values(grouped);
};

const CourseCard = ({ course, index }) => {
  const colors = [
    'from-violet-400 via-purple-400 to-indigo-400',
    'from-rose-400 via-pink-400 to-fuchsia-400',
    'from-cyan-400 via-teal-400 to-emerald-400',
    'from-amber-400 via-orange-400 to-red-400',
    'from-blue-400 via-indigo-400 to-violet-400',
    'from-emerald-400 via-green-400 to-teal-400',
    'from-pink-400 via-rose-400 to-red-400',
    'from-indigo-400 via-blue-400 to-cyan-400',
  ];

  const colorClass = colors[index % colors.length];
  const sectionCount = course.sections?.length || 1;
  const professors = [...new Set(course.sections?.map(s => s.professor) || [])];

  return (
    <Link
      to={`/courses/${course.code.toLowerCase().replace(/\s+/g, '')}`}
      className="flex-shrink-0 group"
    >
      <div className={`w-72 h-72 rounded-3xl bg-gradient-to-br ${colorClass} p-1
                      shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105
                      transition-all duration-500 ease-out cursor-pointer`}>
        <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-[22px] p-5 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <span className={`px-3 py-1.5 bg-gradient-to-r ${colorClass} rounded-full text-xs font-bold text-white shadow-md`}>
              {course.code}
            </span>
            {sectionCount > 1 && (
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 flex items-center gap-1">
                <FaUsers className="text-xs" />
                {sectionCount} sections
              </span>
            )}
          </div>

          {/* Course Name */}
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-gray-900 transition-colors leading-tight">
            {course.name}
          </h3>

          {/* Professors */}
          <div className="flex items-start gap-2 text-gray-600 mb-3">
            <FaUser className="text-xs opacity-60 mt-1" />
            <span className="text-sm line-clamp-2">
              {professors.length > 2
                ? `${professors.slice(0, 2).join(', ')} +${professors.length - 2} more`
                : professors.join(', ')}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaBook className="opacity-60" />
              <span>{course.credits || 3} Credits</span>
            </div>
            <span className="text-xs text-gray-400">{course.semester}</span>
          </div>

          {/* Hover CTA */}
          <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className={`text-sm font-semibold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
              View Syllabus →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CourseCarousel = ({ courses, title, icon, gradient }) => {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 300;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Handle mouse wheel scrolling
  const handleWheel = (e) => {
    if (!carouselRef.current) return;
    e.preventDefault();
    const scrollSpeed = 2;
    carouselRef.current.scrollLeft += e.deltaY * scrollSpeed;
  };

  // Auto-scroll based on mouse position near edges
  const handleMouseMoveContainer = (e) => {
    if (!containerRef.current || !carouselRef.current || isDragging) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;

    // Define edge zones (15% from each edge)
    const edgeZone = containerWidth * 0.15;
    const maxSpeed = 8;

    // Clear any existing auto-scroll
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    // Check if mouse is in left edge zone
    if (mouseX < edgeZone) {
      const intensity = 1 - (mouseX / edgeZone);
      const speed = -maxSpeed * intensity;
      startAutoScroll(speed);
    }
    // Check if mouse is in right edge zone
    else if (mouseX > containerWidth - edgeZone) {
      const intensity = (mouseX - (containerWidth - edgeZone)) / edgeZone;
      const speed = maxSpeed * intensity;
      startAutoScroll(speed);
    }
  };

  const startAutoScroll = (speed) => {
    const smoothScroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += speed;
        autoScrollRef.current = requestAnimationFrame(smoothScroll);
      }
    };
    autoScrollRef.current = requestAnimationFrame(smoothScroll);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const handleMouseDown = (e) => {
    stopAutoScroll();
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseLeave = () => {
    setIsDragging(false);
    stopAutoScroll();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAutoScroll();
  }, []);

  if (!courses || courses.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">{courses.length} courses available</p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative group/carousel px-8"
        onMouseMove={handleMouseMoveContainer}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12
                   bg-white/95 backdrop-blur-md rounded-full shadow-lg
                   flex items-center justify-center transition-all duration-300
                   hover:bg-white hover:scale-110 hover:shadow-xl
                   opacity-0 group-hover/carousel:opacity-100
                   border border-gray-200"
        >
          <FaChevronLeft className="text-gray-600 text-base" />
        </button>

        <div
          ref={carouselRef}
          className={`flex gap-6 overflow-x-auto pb-4 pt-2 px-2
                     scrollbar-hide cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: isDragging ? 'auto' : 'smooth' }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
        >
          {courses.map((course, index) => (
            <CourseCard key={course.code} course={course} index={index} />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12
                   bg-white/95 backdrop-blur-md rounded-full shadow-lg
                   flex items-center justify-center transition-all duration-300
                   hover:bg-white hover:scale-110 hover:shadow-xl
                   opacity-0 group-hover/carousel:opacity-100
                   border border-gray-200"
        >
          <FaChevronRight className="text-gray-600 text-base" />
        </button>

        {/* Edge fade indicators */}
        <div className="absolute left-8 top-0 bottom-4 w-16 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none" />
        <div className="absolute right-8 top-0 bottom-4 w-16 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const Courses = () => {
  // Start with static data immediately for fast load
  const [courses, setCourses] = useState(staticCoursesData);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Try to fetch from API in background, but don't block on it
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        if (data && data.length > 0) {
          setCourses(data);
        }
      } catch (err) {
        // Silently use static data - already loaded
        console.log('Using static course data');
      }
    };
    fetchCourses();
  }, []);

  // Group courses by code
  const groupedCourses = groupCoursesByCode(courses);

  // Filter by search
  const filteredCourses = groupedCourses.filter(course => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const professors = course.sections?.map(s => s.professor).join(' ').toLowerCase() || '';
    return (
      course.name.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query) ||
      professors.includes(query)
    );
  });

  // Split into undergraduate and graduate
  const undergradCourses = filteredCourses.filter(c => {
    const codeNum = parseInt(c.code.replace(/\D/g, ''));
    return c.category !== 'graduate' && codeNum < 500;
  });

  const graduateCourses = filteredCourses.filter(c => {
    const codeNum = parseInt(c.code.replace(/\D/g, ''));
    return c.category === 'graduate' || codeNum >= 500;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full border-4 border-violet-200 border-t-violet-500 animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 overflow-hidden">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-xl mb-6 transform hover:scale-110 transition-transform duration-300">
          <HiAcademicCap className="text-4xl text-white" />
        </div>
        <h1 className="text-5xl font-black text-gray-800 mb-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          CS Department Courses
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Explore our comprehensive computer science curriculum. Click any course to view syllabi and resources.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 px-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
          <input
            type="text"
            placeholder="Search by course name, code, or professor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative w-full px-6 py-4 rounded-2xl bg-white shadow-lg border-2 border-transparent
                     focus:border-violet-300 focus:outline-none transition-all duration-300
                     placeholder-gray-400 text-gray-700"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-6">🔍</div>
          <p className="text-gray-500 text-xl mb-4">No courses found matching "{searchQuery}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <>
          {/* All Courses Carousel */}
          <CourseCarousel
            courses={filteredCourses}
            title="All Courses"
            icon={<FaBook className="text-xl text-white" />}
            gradient="from-violet-500 to-purple-500"
          />

          {/* Undergraduate Carousel */}
          <CourseCarousel
            courses={undergradCourses}
            title="Undergraduate Courses"
            icon={<HiAcademicCap className="text-2xl text-white" />}
            gradient="from-blue-500 to-cyan-500"
          />

          {/* Graduate Carousel */}
          <CourseCarousel
            courses={graduateCourses}
            title="Graduate Courses"
            icon={<FaGraduationCap className="text-xl text-white" />}
            gradient="from-emerald-500 to-teal-500"
          />
        </>
      )}

      {/* Stats Footer */}
      <div className="mt-16 py-10 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-12">
          <div className="text-center group">
            <div className="text-4xl font-black bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              {groupedCourses.length}
            </div>
            <div className="text-gray-500 font-medium">Unique Courses</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              {undergradCourses.length}
            </div>
            <div className="text-gray-500 font-medium">Undergraduate</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              {graduateCourses.length}
            </div>
            <div className="text-gray-500 font-medium">Graduate</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-black bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
              {courses.length}
            </div>
            <div className="text-gray-500 font-medium">Total Sections</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

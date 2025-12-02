import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaExternalLinkAlt, FaBook, FaClock, FaMapMarkerAlt, FaUser, FaDownload, FaHashtag, FaChevronDown, FaUsers } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import courseService from '../../services/courseService';
import staticCoursesData from '../../data/coursesData';

// Group courses by code to find all sections
const findCoursesByCode = (courses, codeSlug) => {
  const normalizedSlug = codeSlug.toLowerCase().replace(/\s+/g, '');

  const matchingCourses = courses.filter(course => {
    const courseCode = course.code.toLowerCase().replace(/\s+/g, '');
    return courseCode === normalizedSlug ||
           course.id === codeSlug ||
           course.slug === codeSlug;
  });

  if (matchingCourses.length === 0) return null;

  // Return grouped course with all sections
  const firstCourse = matchingCourses[0];
  return {
    code: firstCourse.code.split('/')[0].trim(),
    name: firstCourse.name,
    category: firstCourse.category,
    description: firstCourse.description,
    credits: firstCourse.credits,
    semester: firstCourse.semester,
    color: firstCourse.color,
    sections: matchingCourses.map(c => ({
      id: c.id,
      section: c.section,
      professor: c.professor,
      days: c.days,
      time: c.time,
      location: c.location,
      crn: c.crn,
      syllabusFile: c.syllabusFile,
      resources: c.resources
    }))
  };
};

const CoursePage = () => {
  const { slug } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeError, setIframeError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Load static data immediately for fast render
    const groupedCourse = findCoursesByCode(staticCoursesData, slug);
    if (groupedCourse) {
      setCourseData(groupedCourse);
      setLoading(false);
    }

    // Try API in background
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseBySlug(slug);
        if (data) {
          setCourseData({
            ...data,
            sections: [data]
          });
        }
      } catch (err) {
        // Silently use static data - already loaded
        console.log('Using static course data for', slug);
        if (!groupedCourse) {
          setError('Course not found. Please check the URL and try again.');
          setLoading(false);
        }
      }
    };
    fetchCourse();
    setSelectedSectionIndex(0);
    setIframeError(false);
  }, [slug]);

  // Get the currently selected section
  const selectedSection = courseData?.sections?.[selectedSectionIndex] || courseData?.sections?.[0];

  // Get syllabus URL - handle both uploaded files and public folder files
  const getSyllabusUrl = () => {
    if (!selectedSection?.syllabusFile) return null;

    // If it starts with /uploads, use server URL
    if (selectedSection.syllabusFile.startsWith('/uploads')) {
      return `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}${selectedSection.syllabusFile}`;
    }
    // Otherwise assume it's in public folder
    return selectedSection.syllabusFile;
  };

  // Handle section change
  const handleSectionChange = (index) => {
    setSelectedSectionIndex(index);
    setIframeError(false);
    setDropdownOpen(false);
  };

  const colorClasses = {
    'bg-blue-200': 'from-blue-100 to-blue-200',
    'bg-green-200': 'from-green-100 to-green-200',
    'bg-purple-200': 'from-purple-100 to-purple-200',
    'bg-indigo-200': 'from-indigo-100 to-indigo-200',
    'bg-rose-200': 'from-rose-100 to-rose-200',
    'bg-amber-200': 'from-amber-100 to-amber-200',
    'bg-orange-200': 'from-orange-100 to-orange-200',
    'bg-teal-200': 'from-teal-100 to-teal-200',
    'bg-cyan-200': 'from-cyan-100 to-cyan-200',
    'bg-lime-200': 'from-lime-100 to-lime-200',
    'bg-fuchsia-200': 'from-fuchsia-100 to-fuchsia-200',
    'bg-yellow-200': 'from-yellow-100 to-yellow-200',
    'bg-red-200': 'from-red-100 to-red-200',
    'bg-violet-200': 'from-violet-100 to-violet-200',
    'bg-emerald-200': 'from-emerald-100 to-emerald-200',
    'bg-slate-200': 'from-slate-100 to-slate-200',
    'bg-sky-200': 'from-sky-100 to-sky-200',
    'bg-zinc-200': 'from-zinc-100 to-zinc-200',
    'bg-pink-200': 'from-pink-100 to-pink-200',
    'bg-stone-300': 'from-stone-200 to-stone-300',
    'bg-blue-300': 'from-blue-200 to-blue-300',
    'bg-gray-200': 'from-gray-100 to-gray-200',
    'bg-red-300': 'from-red-200 to-red-300',
    'bg-orange-300': 'from-orange-200 to-orange-300',
    'bg-neutral-200': 'from-neutral-100 to-neutral-200',
    'bg-violet-300': 'from-violet-200 to-violet-300'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-2xl max-w-md">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-red-600 font-medium mb-4">{error || 'Course not found'}</p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            <FaArrowLeft />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const gradientClass = colorClasses[courseData.color] || 'from-gray-100 to-gray-200';
  const syllabusUrl = getSyllabusUrl();
  const hasMultipleSections = courseData.sections && courseData.sections.length > 1;

  return (
    <div className="min-h-screen py-8">
      {/* Back Button */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors mb-6 group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to All Courses
      </Link>

      {/* Course Header */}
      <div className={`rounded-3xl bg-gradient-to-br ${gradientClass} p-8 mb-8 shadow-lg`}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            {/* Course Code Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-lg font-bold text-gray-700 shadow-sm">
                {courseData.code}
              </span>
              {hasMultipleSections && (
                <span className="px-3 py-1 bg-violet-100 rounded-full text-sm text-violet-700 flex items-center gap-1">
                  <FaUsers className="text-xs" />
                  {courseData.sections.length} Sections
                </span>
              )}
              {selectedSection?.section && (
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm text-gray-600">
                  Section {selectedSection.section}
                </span>
              )}
              {selectedSection?.crn && (
                <span className="px-3 py-1 bg-white/50 rounded-full text-sm text-gray-600 flex items-center gap-1">
                  <FaHashtag className="text-xs" />
                  CRN: {selectedSection.crn}
                </span>
              )}
            </div>

            {/* Course Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {courseData.name}
            </h1>

            {/* Course Description */}
            {courseData.description && (
              <p className="text-gray-700 text-lg mb-6 max-w-2xl">
                {courseData.description}
              </p>
            )}

            {/* Section Selector - Only show if multiple sections */}
            {hasMultipleSections && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2 font-medium">Select Section / Professor:</p>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full sm:w-auto min-w-[320px] flex items-center justify-between gap-3 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-white/50 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-800">{selectedSection?.professor}</p>
                        <p className="text-xs text-gray-500">
                          {selectedSection?.days} {selectedSection?.time} • {selectedSection?.location}
                        </p>
                      </div>
                    </div>
                    <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full sm:w-auto min-w-[320px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn">
                      {courseData.sections.map((section, index) => (
                        <button
                          key={section.id || index}
                          onClick={() => handleSectionChange(index)}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-violet-50 transition-colors ${
                            index === selectedSectionIndex ? 'bg-violet-50 border-l-4 border-violet-500' : ''
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === selectedSectionIndex
                              ? 'bg-gradient-to-br from-violet-400 to-purple-500'
                              : 'bg-gray-200'
                          }`}>
                            <FaUser className={`text-xs ${index === selectedSectionIndex ? 'text-white' : 'text-gray-500'}`} />
                          </div>
                          <div className="text-left flex-1">
                            <p className={`font-medium ${index === selectedSectionIndex ? 'text-violet-700' : 'text-gray-700'}`}>
                              {section.professor}
                            </p>
                            <p className="text-xs text-gray-500">
                              {section.section && `Section ${section.section} • `}
                              {section.days} {section.time}
                            </p>
                          </div>
                          {index === selectedSectionIndex && (
                            <span className="text-violet-500 text-xs font-medium">Selected</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Course Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-white/50 rounded-xl p-4">
                <FaUser className="text-gray-500 text-xl" />
                <div>
                  <p className="text-xs text-gray-500">Professor</p>
                  <p className="font-semibold text-gray-800">{selectedSection?.professor}</p>
                </div>
              </div>

              {selectedSection?.days && selectedSection?.time && (
                <div className="flex items-center gap-3 bg-white/50 rounded-xl p-4">
                  <FaClock className="text-gray-500 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Schedule</p>
                    <p className="font-semibold text-gray-800">{selectedSection.days} {selectedSection.time}</p>
                  </div>
                </div>
              )}

              {selectedSection?.location && (
                <div className="flex items-center gap-3 bg-white/50 rounded-xl p-4">
                  <FaMapMarkerAlt className="text-gray-500 text-xl" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-gray-800">{selectedSection.location}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 bg-white/50 rounded-xl p-4">
                <FaBook className="text-gray-500 text-xl" />
                <div>
                  <p className="text-xs text-gray-500">Credits</p>
                  <p className="font-semibold text-gray-800">{courseData.credits} Credits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Semester Badge */}
          <div className="flex items-center gap-2 bg-white/70 rounded-xl px-6 py-4 shadow-sm">
            <HiAcademicCap className="text-2xl text-rose-400" />
            <span className="font-bold text-gray-700">{courseData.semester}</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Syllabus Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaBook className="text-rose-400" />
                Course Syllabus
              </h2>
              {syllabusUrl && (
                <a
                  href={syllabusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors"
                >
                  <FaDownload />
                  Download PDF
                </a>
              )}
            </div>

            {syllabusUrl && !iframeError ? (
              <div className="relative" style={{ height: '800px' }}>
                <iframe
                  key={syllabusUrl}
                  src={`${syllabusUrl}#toolbar=1&navpanes=0`}
                  className="w-full h-full border-0"
                  title={`${courseData.code} Syllabus - ${selectedSection?.professor}`}
                  onError={() => setIframeError(true)}
                />
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-gray-500 mb-4">
                  {iframeError
                    ? 'Unable to display PDF in browser. Please download to view.'
                    : 'No syllabus uploaded yet.'}
                </p>
                {syllabusUrl && (
                  <a
                    href={syllabusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    <FaExternalLinkAlt />
                    Open in New Tab
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Resources Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🔗</span>
              Helpful Resources
            </h2>

            {selectedSection?.resources && selectedSection.resources.length > 0 ? (
              <div className="space-y-4">
                {selectedSection.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100
                             hover:from-rose-50 hover:to-rose-100 transition-all duration-300
                             border border-gray-200 hover:border-rose-200 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                          {resource.name}
                        </h3>
                        {resource.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {resource.description}
                          </p>
                        )}
                      </div>
                      <FaExternalLinkAlt className="text-gray-400 group-hover:text-rose-400 flex-shrink-0 mt-1 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📚</div>
                <p className="text-gray-500">
                  No additional resources available yet.
                </p>
              </div>
            )}

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="https://my.newpaltz.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  myNewPaltz Portal
                </a>
                <a
                  href="https://mylearning.suny.edu/d2l/home/7451"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Brightspace
                </a>
                <a
                  href="https://www.newpaltz.edu/registrar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Registrar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

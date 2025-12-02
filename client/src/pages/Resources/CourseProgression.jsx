import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaLock, FaGraduationCap, FaRedo, FaInfoCircle, FaPlus, FaTimes, FaEdit } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';

// Course data with prerequisites (based on official SUNY New Paltz catalog)
// Source: https://catalog.newpaltz.edu/undergraduate/course-descriptions/cps/
const courseData = {
  // Core sequence
  cs1: { id: 'cs1', code: 'CPS 210', name: 'CS1 Foundations', credits: 4, prereqs: [], category: 'core', note: 'Prereq: Math Placement ≥4 OR MAT152 C–' },
  cs2: { id: 'cs2', code: 'CPS 310', name: 'CS2 Data Structures', credits: 4, prereqs: ['cs1'], category: 'core', note: 'Prereq: CPS210 B– or better' },

  // Foundational Knowledge (must take ALL)
  assembly: { id: 'assembly', code: 'CPS 330', name: 'Assembly & Architecture', credits: 4, prereqs: ['cs2'], category: 'foundational', note: 'Prereq: CPS310 C–' },
  cs3: { id: 'cs3', code: 'CPS 315', name: 'CS3', credits: 4, prereqs: ['cs2'], category: 'foundational', note: 'Prereq: CPS310 C–' },
  oop: { id: 'oop', code: 'CPS 352', name: 'Object Oriented Programming', credits: 4, prereqs: ['cs2'], category: 'foundational', note: 'Prereq: CPS310 C–' },
  discreteMath: { id: 'discreteMath', code: 'MAT 245', name: 'Discrete Math', credits: 3, prereqs: [], category: 'foundational', note: 'Math requirement' },
  os: { id: 'os', code: 'CPS 340', name: 'Operating Systems', credits: 4, prereqs: ['assembly'], category: 'foundational', note: 'Prereq: CPS330 C–' },
  langProc: { id: 'langProc', code: 'CPS 425', name: 'Language Processing', credits: 4, prereqs: ['cs2', 'assembly'], category: 'foundational', note: 'Prereq: CPS310 C– AND CPS330 C–' },
  softwareEng: { id: 'softwareEng', code: 'CPS 353', name: 'Software Engineering', credits: 3, prereqs: ['cs2'], category: 'foundational', note: 'Prereq: CPS310 C–' },
  algorithms: { id: 'algorithms', code: 'CPS 415', name: 'Discrete & Continuous Algorithms', credits: 3, prereqs: ['discreteMath'], category: 'foundational', note: 'Prereq: MAT320 C–' },

  // Skills (must take at least ONE) - These are 300/400 level electives
  embeddedLinux: { id: 'embeddedLinux', code: 'CPS 342', name: 'Embedded Linux', credits: 3, prereqs: ['cs2'], category: 'skills', note: 'Prereq: CPS310 C–' },
  database: { id: 'database', code: 'CPS 440', name: 'Database Principles', credits: 3, prereqs: ['cs2'], category: 'skills', note: 'Prereq: CPS310 C–' },
  networks: { id: 'networks', code: 'CPS 470', name: 'Computer Networks', credits: 3, prereqs: ['cs2'], category: 'skills', note: 'No freshmen' },
  webProg: { id: 'webProg', code: 'CPS 393', name: 'Web Programming', credits: 3, prereqs: ['cs2'], category: 'skills', note: 'Selected Topic' },
  ml: { id: 'ml', code: 'CPS 493', name: 'Machine Learning', credits: 3, prereqs: ['cs2'], category: 'skills', note: 'Selected Topic' },
  ai: { id: 'ai', code: 'CPS 493', name: 'Artificial Intelligence', credits: 3, prereqs: ['cs2'], category: 'skills', note: 'Selected Topic' },
  cyber: { id: 'cyber', code: 'CPS 493', name: 'Cybersecurity', credits: 3, prereqs: ['cs2'], category: 'skills', note: 'Selected Topic' },
  dataScience: { id: 'dataScience', code: 'CPS 493', name: 'Data Science', credits: 3, prereqs: ['cs2'], category: 'skills', note: 'Selected Topic' },

  // MSE Requirements
  calc1: { id: 'calc1', code: 'MAT 171', name: 'Calculus 1', credits: 4, prereqs: [], category: 'mse' },
  calc2: { id: 'calc2', code: 'MAT 172', name: 'Calculus 2', credits: 4, prereqs: ['calc1'], category: 'mse' },
  science1: { id: 'science1', code: 'SCI 1XX', name: 'Science 1', credits: 4, prereqs: [], category: 'mse', note: 'Physics or Chemistry' },
  science2: { id: 'science2', code: 'SCI 2XX', name: 'Science 2', credits: 4, prereqs: ['science1'], category: 'mse', note: 'Physics or Chemistry' },
  digitalLogic: { id: 'digitalLogic', code: 'EGC 202', name: 'Digital Logic', credits: 3, prereqs: [], category: 'mse' },
  digitalLogicLab: { id: 'digitalLogicLab', code: 'EGC 203', name: 'Digital Logic Lab', credits: 1, prereqs: ['digitalLogic'], category: 'mse' },

  // Capstone
  projects: { id: 'projects', code: 'CPS 485', name: 'Projects/Internships', credits: 4, prereqs: ['cs2'], category: 'capstone', note: 'Prereq: CPS493/470/440 C–. Junior/Senior only.' },
};

const CourseBox = ({ course, isCompleted, isUnlocked, onToggle, colorClass, borderColor }) => {
  const canToggle = isUnlocked || isCompleted;

  return (
    <button
      onClick={() => canToggle && onToggle(course.id)}
      className={`relative group w-full min-h-[70px] rounded-xl p-3 transition-all duration-300 border-2
        ${isCompleted
          ? `${colorClass} border-green-400 shadow-lg shadow-green-200/50`
          : isUnlocked
            ? `${colorClass} ${borderColor} hover:shadow-lg hover:scale-105 cursor-pointer`
            : 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
        }`}
      disabled={!canToggle}
    >
      {/* Completion checkmark */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
          <FaCheck className="text-white text-xs" />
        </div>
      )}

      {/* Lock icon for locked courses */}
      {!isUnlocked && !isCompleted && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
          <FaLock className="text-white text-xs" />
        </div>
      )}

      <div className="text-center">
        <p className={`font-bold text-sm ${isCompleted ? 'text-green-800' : isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>
          {course.name}
        </p>
        <p className={`text-xs mt-1 ${isCompleted ? 'text-green-600' : isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
          ({course.credits})
        </p>
      </div>
    </button>
  );
};

const SectionHeader = ({ title, description, colorClass }) => (
  <div className={`rounded-t-2xl ${colorClass} px-4 py-2 border-b-2 border-white/30`}>
    <h3 className="font-bold text-gray-800">{title}</h3>
    {description && <p className="text-xs text-gray-600">{description}</p>}
  </div>
);

// Custom "Other" Course Box Component
const OtherCourseBox = ({ customCourses, onAddCourse, onRemoveCourse, isUnlocked, colorClass, borderColor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [credits, setCredits] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (courseName.trim()) {
      onAddCourse({
        id: `custom-${Date.now()}`,
        name: courseName.trim(),
        code: courseCode.trim() || 'OTHER',
        credits: parseInt(credits) || 3
      });
      setCourseName('');
      setCourseCode('');
      setCredits(3);
      setIsEditing(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="relative w-full min-h-[70px] rounded-xl p-3 bg-gray-100 border-2 border-gray-300 opacity-60">
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
          <FaLock className="text-white text-xs" />
        </div>
        <div className="text-center">
          <p className="font-bold text-sm text-gray-500">Other Elective</p>
          <p className="text-xs mt-1 text-gray-400">(3)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Display custom courses */}
      {customCourses.map((course) => (
        <div
          key={course.id}
          className={`relative w-full min-h-[70px] rounded-xl p-3 mb-2 border-2 ${colorClass} border-green-400 shadow-lg shadow-green-200/50`}
        >
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
            <FaCheck className="text-white text-xs" />
          </div>
          <button
            onClick={() => onRemoveCourse(course.id)}
            className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
          >
            <FaTimes className="text-white text-xs" />
          </button>
          <div className="text-center">
            <p className="font-bold text-sm text-green-800">{course.name}</p>
            <p className="text-xs text-green-600">{course.code} ({course.credits})</p>
          </div>
        </div>
      ))}

      {/* Add new course button/form */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className={`w-full rounded-xl p-3 border-2 ${colorClass} ${borderColor}`}>
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full px-2 py-1 text-sm rounded border border-gray-300 mb-2 focus:outline-none focus:border-cyan-400"
            autoFocus
          />
          <input
            type="text"
            placeholder="Code (e.g., CPS 499)"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="w-full px-2 py-1 text-sm rounded border border-gray-300 mb-2 focus:outline-none focus:border-cyan-400"
          />
          <div className="flex items-center gap-2 mb-2">
            <label className="text-xs text-gray-600">Credits:</label>
            <input
              type="number"
              min="1"
              max="6"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-16 px-2 py-1 text-sm rounded border border-gray-300 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className={`w-full min-h-[70px] rounded-xl p-3 border-2 border-dashed ${borderColor} hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer bg-white/50`}
        >
          <div className="text-center">
            <FaPlus className="mx-auto text-cyan-500 mb-1" />
            <p className="font-bold text-sm text-gray-600">Add Other</p>
            <p className="text-xs text-gray-400">Custom Elective</p>
          </div>
        </button>
      )}
    </div>
  );
};

const CourseProgression = () => {
  const [completedCourses, setCompletedCourses] = useState(() => {
    const saved = localStorage.getItem('completedCourses');
    return saved ? JSON.parse(saved) : [];
  });

  const [customCourses, setCustomCourses] = useState(() => {
    const saved = localStorage.getItem('customCourses');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever completedCourses changes
  useEffect(() => {
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
  }, [completedCourses]);

  // Save custom courses to localStorage
  useEffect(() => {
    localStorage.setItem('customCourses', JSON.stringify(customCourses));
  }, [customCourses]);

  // Check if prerequisites are met
  const isUnlocked = (courseId) => {
    const course = courseData[courseId];
    if (!course) return true; // Custom courses are always unlocked if CS2 done
    if (!course.prereqs || course.prereqs.length === 0) return true;
    return course.prereqs.every(prereq => completedCourses.includes(prereq));
  };

  // Toggle course completion
  const toggleCourse = (courseId) => {
    setCompletedCourses(prev => {
      if (prev.includes(courseId)) {
        // When unchecking, also uncheck dependent courses
        const dependents = Object.keys(courseData).filter(id =>
          courseData[id].prereqs?.includes(courseId)
        );
        return prev.filter(id => id !== courseId && !dependents.includes(id));
      } else {
        return [...prev, courseId];
      }
    });
  };

  // Add custom course
  const addCustomCourse = (course) => {
    setCustomCourses(prev => [...prev, course]);
  };

  // Remove custom course
  const removeCustomCourse = (courseId) => {
    setCustomCourses(prev => prev.filter(c => c.id !== courseId));
  };

  // Calculate progress
  const coreCredits = ['cs1', 'cs2', 'assembly', 'cs3', 'oop', 'discreteMath', 'os', 'langProc', 'softwareEng', 'algorithms']
    .filter(id => completedCourses.includes(id))
    .reduce((sum, id) => sum + courseData[id].credits, 0);

  const mseCredits = ['calc1', 'calc2', 'science1', 'science2', 'digitalLogic', 'digitalLogicLab']
    .filter(id => completedCourses.includes(id))
    .reduce((sum, id) => sum + courseData[id].credits, 0);

  const skillsCompleted = ['webProg', 'ml', 'embeddedLinux', 'database', 'networks', 'ai', 'cyber', 'dataScience']
    .filter(id => completedCourses.includes(id)).length + customCourses.length;

  const customCredits = customCourses.reduce((sum, c) => sum + c.credits, 0);
  const totalCredits = completedCourses.reduce((sum, id) => sum + (courseData[id]?.credits || 0), 0) + customCredits;

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      setCompletedCourses([]);
      setCustomCourses([]);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-xl mb-4">
          <HiAcademicCap className="text-3xl text-white" />
        </div>
        <h1 className="text-4xl font-black text-gray-800 mb-2">
          SUNY New Paltz Computer Science Major
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Track your progress through the CS curriculum. Click courses to mark them complete.
        </p>
      </div>

      {/* Credit Summary */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-600">MAJOR:</span>
                <span className="text-orange-600 font-semibold">CORE</span>
                <span className="text-gray-600">({coreCredits}/43 credits)</span>
                <span className="text-gray-400">+</span>
                <span className="text-blue-600 font-semibold">MSE</span>
                <span className="text-gray-600">({mseCredits}/20 credits)</span>
                <span className="text-gray-400">=</span>
                <span className="text-green-600 font-bold">{totalCredits} credits</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-bold">MINOR:</span> 4 CS + 1 Math courses
            </div>
          </div>

          {/* Progress bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-orange-600">Core Progress</span>
                <span className="text-gray-500">{coreCredits}/43</span>
              </div>
              <div className="h-3 bg-orange-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((coreCredits / 43) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-blue-600">MSE Progress</span>
                <span className="text-gray-500">{mseCredits}/20</span>
              </div>
              <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((mseCredits / 20) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-cyan-600">Skills Electives</span>
                <span className="text-gray-500">{skillsCompleted}/1+ required</span>
              </div>
              <div className="h-3 bg-cyan-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${skillsCompleted >= 1 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-cyan-400 to-teal-500'}`}
                  style={{ width: `${Math.min(skillsCompleted * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaRedo className="text-xs" />
              Reset Progress
            </button>
          </div>
        </div>
      </div>

      {/* Flowchart */}
      <div className="max-w-6xl mx-auto">
        {/* CS1 & CS2 - Core Sequence */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-48">
            <CourseBox
              course={courseData.cs1}
              isCompleted={completedCourses.includes('cs1')}
              isUnlocked={isUnlocked('cs1')}
              onToggle={toggleCourse}
              colorClass="bg-gradient-to-br from-orange-200 to-orange-300"
              borderColor="border-orange-400"
            />
          </div>

          {/* Arrow down */}
          <div className="w-0.5 h-8 bg-gray-400 my-2" />
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-400 -mt-1" />

          <div className="w-48 mt-2">
            <CourseBox
              course={courseData.cs2}
              isCompleted={completedCourses.includes('cs2')}
              isUnlocked={isUnlocked('cs2')}
              onToggle={toggleCourse}
              colorClass="bg-gradient-to-br from-orange-300 to-orange-400"
              borderColor="border-orange-500"
            />
          </div>

          {/* Branching arrows */}
          <div className="relative w-full h-16 mt-4">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path d="M 50% 0 L 50% 30 L 25% 30 L 25% 100" stroke="#9CA3AF" strokeWidth="2" fill="none" className="hidden lg:block" />
              <path d="M 50% 0 L 50% 30 L 75% 30 L 75% 100" stroke="#9CA3AF" strokeWidth="2" fill="none" className="hidden lg:block" />
            </svg>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Foundational Knowledge */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <SectionHeader
              title="FOUNDATIONAL KNOWLEDGE (must take ALL):"
              colorClass="bg-gradient-to-r from-orange-200 to-amber-200"
            />
            <div className="p-4">
              {/* First row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <CourseBox
                  course={courseData.assembly}
                  isCompleted={completedCourses.includes('assembly')}
                  isUnlocked={isUnlocked('assembly')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-orange-200 to-orange-300"
                  borderColor="border-orange-400"
                />
                <CourseBox
                  course={courseData.cs3}
                  isCompleted={completedCourses.includes('cs3')}
                  isUnlocked={isUnlocked('cs3')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-orange-200 to-orange-300"
                  borderColor="border-orange-400"
                />
                <CourseBox
                  course={courseData.oop}
                  isCompleted={completedCourses.includes('oop')}
                  isUnlocked={isUnlocked('oop')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-orange-200 to-orange-300"
                  borderColor="border-orange-400"
                />
                <CourseBox
                  course={courseData.discreteMath}
                  isCompleted={completedCourses.includes('discreteMath')}
                  isUnlocked={isUnlocked('discreteMath')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-orange-100 to-orange-200"
                  borderColor="border-orange-300"
                />
              </div>

              {/* Arrow indicators */}
              <div className="flex justify-around mb-3 px-4">
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-gray-300" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-gray-300" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-gray-300" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-gray-300" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300" />
                </div>
              </div>

              {/* Second row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <CourseBox
                  course={courseData.os}
                  isCompleted={completedCourses.includes('os')}
                  isUnlocked={isUnlocked('os')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-orange-300 to-orange-400"
                  borderColor="border-orange-500"
                />
                <CourseBox
                  course={courseData.langProc}
                  isCompleted={completedCourses.includes('langProc')}
                  isUnlocked={isUnlocked('langProc')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-orange-300 to-orange-400"
                  borderColor="border-orange-500"
                />
                <CourseBox
                  course={courseData.softwareEng}
                  isCompleted={completedCourses.includes('softwareEng')}
                  isUnlocked={isUnlocked('softwareEng')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-orange-300 to-orange-400"
                  borderColor="border-orange-500"
                />
                <CourseBox
                  course={courseData.algorithms}
                  isCompleted={completedCourses.includes('algorithms')}
                  isUnlocked={isUnlocked('algorithms')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-orange-300 to-orange-400"
                  borderColor="border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Skills Electives */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <SectionHeader
              title="SKILLS (must take at least ONE):"
              colorClass="bg-gradient-to-r from-cyan-200 to-blue-200"
            />
            <div className="p-4">
              {/* First row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <CourseBox
                  course={courseData.webProg}
                  isCompleted={completedCourses.includes('webProg')}
                  isUnlocked={isUnlocked('webProg')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
                <CourseBox
                  course={courseData.ml}
                  isCompleted={completedCourses.includes('ml')}
                  isUnlocked={isUnlocked('ml')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
                <CourseBox
                  course={courseData.embeddedLinux}
                  isCompleted={completedCourses.includes('embeddedLinux')}
                  isUnlocked={isUnlocked('embeddedLinux')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
                <CourseBox
                  course={courseData.database}
                  isCompleted={completedCourses.includes('database')}
                  isUnlocked={isUnlocked('database')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
              </div>

              {/* Second row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <CourseBox
                  course={courseData.ai}
                  isCompleted={completedCourses.includes('ai')}
                  isUnlocked={isUnlocked('ai')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
                <CourseBox
                  course={courseData.networks}
                  isCompleted={completedCourses.includes('networks')}
                  isUnlocked={isUnlocked('networks')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
                <CourseBox
                  course={courseData.cyber}
                  isCompleted={completedCourses.includes('cyber')}
                  isUnlocked={isUnlocked('cyber')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
                <CourseBox
                  course={courseData.dataScience}
                  isCompleted={completedCourses.includes('dataScience')}
                  isUnlocked={isUnlocked('dataScience')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
              </div>

              {/* Other/Custom Electives */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <OtherCourseBox
                  customCourses={customCourses}
                  onAddCourse={addCustomCourse}
                  onRemoveCourse={removeCustomCourse}
                  isUnlocked={isUnlocked('webProg')}
                  colorClass="bg-gradient-to-br from-cyan-200 to-cyan-300"
                  borderColor="border-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - MSE and Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* MSE Requirements */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden">
            <SectionHeader
              title="Math, Science & Engineering (MSE), must take ALL:"
              colorClass="bg-gradient-to-r from-orange-200 to-amber-200"
            />
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Calculus sequence */}
                <div className="flex flex-col items-center gap-2">
                  <CourseBox
                    course={courseData.calc1}
                    isCompleted={completedCourses.includes('calc1')}
                    isUnlocked={isUnlocked('calc1')}
                    onToggle={toggleCourse}
                    colorClass="bg-gradient-to-br from-orange-200 to-orange-300"
                    borderColor="border-orange-400"
                  />
                  <div className="w-0.5 h-4 bg-gray-300" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300" />
                  <CourseBox
                    course={courseData.calc2}
                    isCompleted={completedCourses.includes('calc2')}
                    isUnlocked={isUnlocked('calc2')}
                    onToggle={toggleCourse}
                    colorClass="bg-gradient-to-br from-orange-300 to-orange-400"
                    borderColor="border-orange-500"
                  />
                </div>

                {/* Science sequence */}
                <div className="flex flex-col items-center gap-2">
                  <CourseBox
                    course={courseData.science1}
                    isCompleted={completedCourses.includes('science1')}
                    isUnlocked={isUnlocked('science1')}
                    onToggle={toggleCourse}
                    colorClass="bg-gradient-to-br from-orange-200 to-orange-300"
                    borderColor="border-orange-400"
                  />
                  <div className="w-0.5 h-4 bg-gray-300" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300" />
                  <CourseBox
                    course={courseData.science2}
                    isCompleted={completedCourses.includes('science2')}
                    isUnlocked={isUnlocked('science2')}
                    onToggle={toggleCourse}
                    colorClass="bg-gradient-to-br from-orange-300 to-orange-400"
                    borderColor="border-orange-500"
                  />
                </div>

                {/* Digital Logic sequence */}
                <div className="flex flex-col items-center gap-2">
                  <CourseBox
                    course={courseData.digitalLogic}
                    isCompleted={completedCourses.includes('digitalLogic')}
                    isUnlocked={isUnlocked('digitalLogic')}
                    onToggle={toggleCourse}
                    colorClass="bg-gradient-to-br from-orange-200 to-orange-300"
                    borderColor="border-orange-400"
                  />
                  <div className="w-0.5 h-4 bg-gray-300" />
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-300" />
                  <CourseBox
                    course={courseData.digitalLogicLab}
                    isCompleted={completedCourses.includes('digitalLogicLab')}
                    isUnlocked={isUnlocked('digitalLogicLab')}
                    onToggle={toggleCourse}
                    colorClass="bg-gradient-to-br from-orange-300 to-orange-400"
                    borderColor="border-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Projects/Internships */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden">
            <SectionHeader
              title="Capstone"
              colorClass="bg-gradient-to-r from-red-200 to-rose-200"
            />
            <div className="p-4 flex items-center justify-center h-[calc(100%-48px)]">
              <div className="w-full">
                <CourseBox
                  course={courseData.projects}
                  isCompleted={completedCourses.includes('projects')}
                  isUnlocked={isUnlocked('projects')}
                  onToggle={toggleCourse}
                  colorClass="bg-gradient-to-br from-red-200 to-rose-300"
                  borderColor="border-red-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            How to Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-orange-400" />
              <span className="text-gray-600">Click to mark as complete</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-green-400 relative">
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <FaCheck className="text-white text-[8px]" />
                </div>
              </div>
              <span className="text-gray-600">Completed course</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 border-2 border-gray-300 opacity-60 relative">
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                  <FaLock className="text-white text-[8px]" />
                </div>
              </div>
              <span className="text-gray-600">Locked (complete prerequisites first)</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Your progress is automatically saved to your browser. Prerequisites must be completed before dependent courses unlock.
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <FaGraduationCap />
            View Current Course Offerings
          </Link>
          <a
            href="https://hydra.newpaltz.edu/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <HiAcademicCap />
            Hydra Dashboard
          </a>
          <a
            href="https://mylearning.suny.edu/d2l/home/7451"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <FaGraduationCap />
            Brightspace
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseProgression;

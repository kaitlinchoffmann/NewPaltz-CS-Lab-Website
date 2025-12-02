import { useState, useEffect } from 'react';
import { FaDownload, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaBook, FaDatabase, FaCode, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { BiData } from 'react-icons/bi';
import compExamService from '../../services/compExamService';

const CompExam = () => {
  const [examSettings, setExamSettings] = useState({
    exam_date: 'May 8th, 2025',
    exam_time: '9 AM - 12 PM',
    location: 'Science Hall 259'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await compExamService.getSettings();
        setExamSettings({
          exam_date: data.exam_date || 'May 8th, 2025',
          exam_time: data.exam_time || '9 AM - 12 PM',
          location: data.location || 'Science Hall 259'
        });
      } catch (err) {
        // Silently use defaults - already loaded
        console.log('Using default comp exam settings');
      }
    };
    fetchSettings();
  }, []);
  const webDbTopics = [
    'How to create an E-R Diagram with the proper notation and following components: entities, attributes, relationships, relationship cardinalities',
    'Know how to create a relation from an ERD',
    'Know the basics of MySQL and how to create queries to perform CRUD operations (create, read, update, delete)',
    'Know how to create a MySQL table based on a relation, such as a user relation, customer relation'
  ];

  const dataStructuresTopics = [
    'Arrays, Lists',
    'Stack, Queue, LinkedList',
    'Binary tree',
    'Heap, priority queue'
  ];

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl shadow-lg mb-4">
          <HiAcademicCap className="text-4xl text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          CS Graduate Comprehensive Exam
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Prepare for your comprehensive examination with these guidelines and study materials.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Exam Details Card - Large */}
        <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FaCalendarAlt />
            Exam Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
              <FaCalendarAlt className="text-2xl mb-2" />
              <p className="text-sm opacity-80">Date</p>
              <p className="text-xl font-bold">{examSettings.exam_date}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
              <FaClock className="text-2xl mb-2" />
              <p className="text-sm opacity-80">Time</p>
              <p className="text-xl font-bold">{examSettings.exam_time}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
              <FaMapMarkerAlt className="text-2xl mb-2" />
              <p className="text-sm opacity-80">Location</p>
              <p className="text-xl font-bold">{examSettings.location}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-xl">
            <p className="text-sm">
              If you have not registered for the exam but want to take it, you may. Please see the attached guidelines.
            </p>
          </div>
        </div>

        {/* Format Card */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaBook />
            Exam Format
          </h2>

          <div className="space-y-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-3xl font-bold">8</p>
              <p className="text-sm opacity-80">Total Questions</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-3xl font-bold">6</p>
              <p className="text-sm opacity-80">Questions to Answer</p>
            </div>

            <div className="flex items-center gap-2 text-sm mt-4">
              <FaCheckCircle />
              <span>Pass/Fail grading</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FaExclamationTriangle />
              <span>Maximum 2 attempts</span>
            </div>
          </div>
        </div>

        {/* Web & Database Card */}
        <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaDatabase />
              Web & Database
            </h2>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              2 Questions
            </span>
          </div>

          <ul className="space-y-3">
            {webDbTopics.map((topic, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="mt-1 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                <span className="opacity-90">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Data Structures Card */}
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BiData />
              Programming & Data Structures
            </h2>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              2 Questions
            </span>
          </div>

          <ul className="space-y-3">
            {dataStructuresTopics.map((topic, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="mt-1 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                <span className="opacity-90">{topic}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 p-3 bg-white/20 rounded-xl">
            <p className="text-xs opacity-80">
              Plus 4 additional questions from other core CS areas
            </p>
          </div>
        </div>

        {/* Download Card */}
        <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaCode />
              Study Materials
            </h2>
            <p className="text-sm opacity-90 mb-6">
              Download the complete study package including guidelines, sample questions, and topic breakdowns.
            </p>
          </div>

          <a
            href="/resources/Comp_Exam_Materials.zip"
            download
            className="flex items-center justify-center gap-3 w-full py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl font-bold transition-all duration-300 hover:scale-105 group"
          >
            <FaDownload className="text-xl group-hover:animate-bounce" />
            Download Materials (.zip)
          </a>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <HiAcademicCap className="text-indigo-500" />
          Important Guidelines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Before the Exam</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Review all course materials from CPS 551 and CPS 553</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Practice creating E-R diagrams and writing SQL queries</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Review data structure implementations and time complexities</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Arrive at least 15 minutes early</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">During the Exam</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Read all questions before starting</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Choose 6 questions you feel most confident about</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Allocate time evenly (approximately 30 minutes per question)</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Show your work and explain your reasoning</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-4">Helpful Resources</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://visualgo.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              Visualgo - Data Structures
            </a>
            <a
              href="https://www.sqltutorial.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              SQL Tutorial
            </a>
            <a
              href="https://www.geeksforgeeks.org/data-structures/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              GeeksforGeeks - DS
            </a>
            <a
              href="https://www.lucidchart.com/pages/er-diagrams"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors"
            >
              E-R Diagram Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompExam;

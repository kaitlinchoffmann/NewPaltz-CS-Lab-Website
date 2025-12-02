import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import courseService from '../../../services/courseService';

const categories = [
  { id: 'introductory', name: 'Introductory' },
  { id: 'core', name: 'Core CS' },
  { id: 'systems', name: 'Systems' },
  { id: 'software', name: 'Software Engineering' },
  { id: 'theory', name: 'Theory' },
  { id: 'ai', name: 'AI & Data Science' },
  { id: 'security', name: 'Security' },
  { id: 'capstone', name: 'Capstone' },
  { id: 'graduate', name: 'Graduate' }
];

const colors = [
  { id: 'bg-blue-200', name: 'Blue' },
  { id: 'bg-green-200', name: 'Green' },
  { id: 'bg-purple-200', name: 'Purple' },
  { id: 'bg-indigo-200', name: 'Indigo' },
  { id: 'bg-rose-200', name: 'Rose' },
  { id: 'bg-amber-200', name: 'Amber' },
  { id: 'bg-orange-200', name: 'Orange' },
  { id: 'bg-teal-200', name: 'Teal' },
  { id: 'bg-cyan-200', name: 'Cyan' },
  { id: 'bg-lime-200', name: 'Lime' },
  { id: 'bg-fuchsia-200', name: 'Fuchsia' },
  { id: 'bg-yellow-200', name: 'Yellow' },
  { id: 'bg-red-200', name: 'Red' },
  { id: 'bg-violet-200', name: 'Violet' },
  { id: 'bg-emerald-200', name: 'Emerald' },
  { id: 'bg-slate-200', name: 'Slate' },
  { id: 'bg-sky-200', name: 'Sky' },
  { id: 'bg-pink-200', name: 'Pink' }
];

const CourseForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [syllabusFile, setSyllabusFile] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    section: '01',
    professor: '',
    semester: 'Fall 2025',
    description: '',
    syllabusFile: '',
    category: 'core',
    color: 'bg-blue-200',
    crn: '',
    credits: 3,
    days: '',
    time: '',
    location: '',
    resources: []
  });

  useEffect(() => {
    if (isEdit && id) {
      fetchCourse();
    }
  }, [isEdit, id]);

  const fetchCourse = async () => {
    try {
      const data = await courseService.getCourseByID(id);
      setFormData({
        ...data,
        resources: data.resources || []
      });
    } catch (err) {
      console.error('Error fetching course:', err);
      alert('Failed to load course data');
      navigate('/admin-panel');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSyllabusFile(e.target.files[0]);
    }
  };

  const handleResourceChange = (index, field, value) => {
    const newResources = [...formData.resources];
    newResources[index] = { ...newResources[index], [field]: value };
    setFormData(prev => ({ ...prev, resources: newResources }));
  };

  const addResource = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, { name: '', url: '', description: '' }]
    }));
  };

  const removeResource = (index) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = new FormData();

      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'resources') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });

      // Add syllabus file if selected
      if (syllabusFile) {
        submitData.append('syllabusFile', syllabusFile);
      }

      if (isEdit) {
        await courseService.editCourse(id, submitData);
      } else {
        await courseService.addCourse(submitData);
      }

      navigate('/admin-panel');
    } catch (err) {
      console.error('Error saving course:', err);
      alert('Failed to save course. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin-panel')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Edit Course' : 'Add New Course'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Code *
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., CPS 210"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section
              </label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="e.g., 01"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Computer Science I: Foundations"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professor *
              </label>
              <input
                type="text"
                name="professor"
                value={formData.professor}
                onChange={handleChange}
                placeholder="e.g., Katherine Brainard"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester *
              </label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="e.g., Fall 2025"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief description of the course..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Schedule & Location</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CRN
              </label>
              <input
                type="text"
                name="crn"
                value={formData.crn}
                onChange={handleChange}
                placeholder="e.g., 724"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credits
              </label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                min="1"
                max="6"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Days
              </label>
              <input
                type="text"
                name="days"
                value={formData.days}
                onChange={handleChange}
                placeholder="e.g., MR"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="e.g., 9:30 AM-10:45 AM"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., SH 181"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Appearance & Category</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Color
              </label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none"
              >
                {colors.map(color => (
                  <option key={color.id} value={color.id}>{color.name}</option>
                ))}
              </select>
            </div>

            {/* Color Preview */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview
              </label>
              <div className={`${formData.color} p-4 rounded-lg`}>
                <span className="font-medium">{formData.code || 'CPS XXX'}</span> - {formData.name || 'Course Name'}
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Syllabus</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Syllabus (PDF or Word)
            </label>

            {formData.syllabusFile && !syllabusFile && (
              <div className="mb-3 p-3 bg-green-50 rounded-lg text-green-700 text-sm">
                Current file: {formData.syllabusFile.split('/').pop()}
              </div>
            )}

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                <FaUpload />
                {syllabusFile ? 'Change File' : 'Choose File'}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {syllabusFile && (
                <span className="text-sm text-gray-600">{syllabusFile.name}</span>
              )}
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Or enter a path to an existing file in the public folder:
            </p>
            <input
              type="text"
              name="syllabusFile"
              value={formData.syllabusFile}
              onChange={handleChange}
              placeholder="/syllabi/filename.pdf"
              className="w-full mt-2 px-4 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Helpful Resources</h2>
            <button
              type="button"
              onClick={addResource}
              className="flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors text-sm"
            >
              <FaPlus />
              Add Resource
            </button>
          </div>

          {formData.resources.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No resources added yet. Click "Add Resource" to add helpful links.
            </p>
          ) : (
            <div className="space-y-4">
              {formData.resources.map((resource, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={resource.name}
                        onChange={(e) => handleResourceChange(index, 'name', e.target.value)}
                        placeholder="Resource Name"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none text-sm"
                      />
                      <input
                        type="url"
                        value={resource.url}
                        onChange={(e) => handleResourceChange(index, 'url', e.target.value)}
                        placeholder="https://..."
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none text-sm"
                      />
                      <input
                        type="text"
                        value={resource.description}
                        onChange={(e) => handleResourceChange(index, 'description', e.target.value)}
                        placeholder="Brief description"
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeResource(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin-panel')}
            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                {isEdit ? 'Update Course' : 'Create Course'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;

import { useState, useEffect } from 'react';
import { FaSave, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import compExamService from '../../services/compExamService';

const CompExamSection = () => {
  const [settings, setSettings] = useState({
    exam_date: '',
    exam_time: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await compExamService.getSettings();
      setSettings({
        exam_date: data.exam_date || '',
        exam_time: data.exam_time || '',
        location: data.location || ''
      });
    } catch (err) {
      console.error('Error fetching comp exam settings:', err);
      // Use defaults if API fails
      setSettings({
        exam_date: 'May 8th, 2025',
        exam_time: '9 AM - 12 PM',
        location: 'Science Hall 259'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await compExamService.updateSettings(settings);
      setMessage({ type: 'success', text: 'Settings updated successfully!' });
    } catch (err) {
      console.error('Error saving settings:', err);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaCalendarAlt className="text-rose-400" />
        Comp Exam Settings
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FaCalendarAlt className="text-indigo-500" />
              Exam Date
            </label>
            <input
              type="text"
              name="exam_date"
              value={settings.exam_date}
              onChange={handleChange}
              placeholder="e.g., May 8th, 2025"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none text-lg"
            />
            <p className="mt-1 text-xs text-gray-500">Enter the date as you want it displayed (e.g., "May 8th, 2025")</p>
          </div>

          {/* Time */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FaClock className="text-indigo-500" />
              Exam Time
            </label>
            <input
              type="text"
              name="exam_time"
              value={settings.exam_time}
              onChange={handleChange}
              placeholder="e.g., 9 AM - 12 PM"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none text-lg"
            />
            <p className="mt-1 text-xs text-gray-500">Enter the time range (e.g., "9 AM - 12 PM")</p>
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FaMapMarkerAlt className="text-indigo-500" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={settings.location}
              onChange={handleChange}
              placeholder="e.g., Science Hall 259"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-rose-300 focus:outline-none text-lg"
            />
            <p className="mt-1 text-xs text-gray-500">Enter the room/building location</p>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            <h3 className="text-sm font-medium opacity-80 mb-3">Preview</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="text-xs opacity-80">Date</p>
                <p className="font-bold">{settings.exam_date || 'Not set'}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="text-xs opacity-80">Time</p>
                <p className="font-bold">{settings.exam_time || 'Not set'}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="text-xs opacity-80">Location</p>
                <p className="font-bold">{settings.location || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 w-full py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 font-medium"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompExamSection;

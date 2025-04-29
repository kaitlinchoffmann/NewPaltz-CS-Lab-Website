import { useState } from "react";
import techBlogService from "../../services/techBlogService";

export default function ArticleForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    summary: "",
    link: "",
    image: "",
  });

  const maxSummaryLength = 300;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await techBlogService.createArticle(formData);
      alert("Thank you! Your Article has been submitted and is awaiting admin review.");
      setFormData({
        title: "",
        author: "",
        description: "",
        summary: "",
        websiteLink: "",
        githubLink: "",
        headshotURL: "",
      });
    } catch (error) {
      console.error("Error submitting Article:", error);
      alert("Failed to submit Article. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-stone-800 mb-2">Submit an Article</h2>
      <p className="text-stone-600 p-2">
        Tell us about an article you'd like to feature — our admins will take a look!
      </p>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-stone-700 mb-1">
            Article Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col">
          <label htmlFor="author" className="text-sm font-medium text-stone-700 mb-1">
            Author Name
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Summary */}
        <div className="flex flex-col">
          <label htmlFor="summary" className="text-sm font-medium text-stone-700 mb-1">
            Article Summary <span className="text-stone-500">(max 300 characters)</span>
          </label>
          <textarea
            name="summary"
            id="summary"
            rows={4}
            maxLength={maxSummaryLength}
            value={formData.summary}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 resize-none"
          />
          <div className="text-right text-xs text-stone-500 mt-1">
            {formData.summary.length}/{maxSummaryLength}
          </div>
        </div>

        {/* Link */}
        <div className="flex flex-col">
          <label htmlFor="link" className="text-sm font-medium text-stone-700 mb-1">
            Link to Article
          </label>
          <input
            type="url"
            name="link"
            id="link"
            value={formData.link}
            onChange={handleChange}
            required
            placeholder="https://example.com/article"
            className="px-4 py-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium text-stone-700 mb-1">
            Article Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {formData.image && (
            <p className="text-xs text-stone-600 mt-1">
              Selected: {formData.image.name}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-300 text-white rounded-md hover:bg-blue-400 transition font-medium"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
}

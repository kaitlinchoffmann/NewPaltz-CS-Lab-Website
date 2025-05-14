import React from 'react';

// Array of background colors to style cards based on index
const bgColors = [
  'bg-sky-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-rose-300',
  'bg-indigo-200',
];

// StudentCard component displays information about a student's project
export default function StudentCard({ post, index }) {
  // If no post data is provided, display a placeholder message
  if (!post) {
    return (
      <div className="bg-gray-200 rounded-2xl shadow-sm border border-stone-200 p-4 flex w-1/2 items-center gap-3">
        <p className="text-sm text-stone-500">No student data available.</p>
      </div>
    );
  }

  // Determine background color based on the index of the card
  const color = bgColors[index % bgColors.length];
  // Placeholder image for student headshot
  const headshot = "../assets/student_pictures/placeholder.png";
  // Fallback values for project title, student name, and summary
  const projectTitle = post.project_title || 'Untitled Project';
  const studentName = post.student_name || 'Unknown Student';
  const summary = post.summary || 'No description available.';

  return (
    // Card container with dynamic background color and hover effects
    <div className={`${color} h-full rounded-2xl shadow-sm border border-stone-200 p-4 transition-all ease-in-out duration-300 hover:shadow-md hover:-translate-y-3 flex w-1/2 items-center gap-3`}>
      {/* Student headshot */}
      <img
        src={headshot}
        alt={`${studentName} headshot`}
        className="w-28 rounded-full object-cover"
      />
      {/* Card content: project title, student name, summary, and GitHub link */}
      <div className="">
        <h3 className="text-lg font-semibold text-stone-700">{projectTitle}</h3>
        <p className="text-sm text-stone-500 mt-1">by {studentName}</p>
        <p className="text-sm text-stone-600 mt-2 line-clamp-3">{summary}</p>
        {/* Display GitHub link if available */}
        {post.github_link && (
          <a
            href={post.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-blue-600 mt-3 hover:underline"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  );
};


import React from 'react';

const bgColors = [
  'bg-sky-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-rose-300',
  'bg-indigo-200',
];

export default function StudentCard({ post, index }) {
  if (!post) {
    return (
      <div className="bg-gray-200 rounded-2xl shadow-sm border border-stone-200 p-4 flex w-1/2 items-center gap-3">
        <p className="text-sm text-stone-500">No student data available.</p>
      </div>
    );
  }

  const color = bgColors[index % bgColors.length];
  const headshot = post.headshot_url || './src/assets/student_pictures/placeholder.png';
  const projectTitle = post.project_title || 'Untitled Project';
  const studentName = post.student_name || 'Unknown Student';
  const summary = post.summary || 'No description available.';

  return (
    <div className={`${color} h-full rounded-2xl shadow-sm border border-stone-200 p-4 transition-all ease-in-out duration-300 hover:shadow-md hover:-translate-y-3 flex w-1/2 items-center gap-3`}>
      <img
        src={"../assets/student_pictures/placeholder.png"}
        alt={`${studentName} headshot`}
        className="w-28 rounded-full object-cover"
      />
      <div className="">
        <h3 className="text-lg font-semibold text-stone-700">{projectTitle}</h3>
        <p className="text-sm text-stone-500 mt-1">by {studentName}</p>
        <p className="text-sm text-stone-600 mt-2 line-clamp-3">{summary}</p>
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


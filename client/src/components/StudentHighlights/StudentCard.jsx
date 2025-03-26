import React from 'react';

const bgColors = [
  'bg-sky-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-rose-300',
  'bg-indigo-200',
]

export default function StudentCard({ post, index }) {

  const color = bgColors[index % bgColors.length];
  return (
    <div className={`${color} rounded-2xl shadow-sm border border-stone-200 p-4 transition-all ease-in-out duration-300 hover:shadow-md hover:-translate-y-3 flex w-1/2 items-center gap-3`}>
        <img
          src="./src/assets/student_pictures/placeholder.png"
          alt={`${post.student_name} headshot`}
          className="w-28 rounded-full object-cover"
        />

      <div className="">
          <h3 className="text-lg font-semibold text-stone-700">{post.project_title}</h3>
          <p className="text-sm text-stone-500 mt-1">by {post.student_name}</p>
          <p className="text-sm text-stone-600 mt-2 line-clamp-3">{post.summary}</p>
          
          {/* 
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div> */}

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


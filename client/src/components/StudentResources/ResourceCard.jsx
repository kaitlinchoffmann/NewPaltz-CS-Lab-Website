import React from "react";

// Array of background colors to cycle through
const bgColors = [
  'bg-sky-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-rose-200',
  'bg-indigo-200',
];

export default function ResourceCard({ studentResource, index }) {
  const color = bgColors[index % bgColors.length];

  return (
    <div
      className={`rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-2 ${color}`}
    >
      <div className="flex flex-col justify-between h-60 p-6 text-center">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-stone-800">
            {studentResource.name}
          </h2>
          <p className="text-sm text-stone-700">
            {studentResource.description}
          </p>
        </div>

        {studentResource.link && (
          <a
            href={studentResource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm font-medium text-blue-600 px-4 py-2 rounded-md hover:underline transition"
          >
            More Info →
          </a>
        )}
      </div>
    </div>
  );
}

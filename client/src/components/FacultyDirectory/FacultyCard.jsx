import React from 'react';

// Background color palette
const bgColors = [
  'bg-sky-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-rose-200',
  'bg-indigo-200',
];

export default function FacultyCard({ faculty, index }) {
  const color = bgColors[index % bgColors.length];

  return (
    <div
      className={`flex h-64 rounded-2xl border w-full shadow-sm p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-2 ${color}`}
    >
      {/* Left: Image + Role */}
      <div className="w-1/3 flex flex-col justify-center items-center gap-3">
        <img
          src={faculty.img || "./src/assets/faculty_pictures/placeholder.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover shadow-sm"
        />
        <p className="text-sm text-stone-700 text-center font-medium">
          {faculty.role}
        </p>
      </div>

      {/* Right: Info */}
      <div className="w-2/3 flex flex-col justify-center pl-4 space-y-1 text-sm text-stone-700">
        <h2 className="text-lg font-semibold text-stone-800 mb-1">
          {faculty.name}
        </h2>

        <p>
          <strong>Office:</strong> {faculty.office_location}
        </p>
        <p>
          <strong>Office Hours:</strong> {faculty.office_hours}
        </p>
        <p>
          <strong>Phone:</strong> {faculty.phone_number}
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a
            href={`mailto:${faculty.email}`}
            className="underline hover:text-blue-700"
          >
            {faculty.email}
          </a>
        </p>

        {faculty.website && (
          <p>
            <strong>Website:</strong>{' '}
            <a
              href={faculty.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-700 transition"
            >
              {faculty.website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

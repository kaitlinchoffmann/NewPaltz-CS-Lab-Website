import React from 'react';

// Array of background colors to cycle through
const bgColors = [
  'bg-sky-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-rose-200',
  'bg-indigo-200',
];

export default function FacultyCard({ faculty, index }) {
  // Determine the background color based on the index
  const color = bgColors[index % bgColors.length];

  return (
    // Apply the background color and other styles to the card container
    <div className={`border flex  h-72 p-3 rounded-2xl shadow-md ${color}
      hover:shadow-lg hover:-translate-y-3 transition-all duration-300`}>

      {/* Profile picture and role */}
      <div className="flex flex-col w-2/3 gap-2 justify-center h-full">
        <img src={faculty.img} alt={`profile img`} className="h-1/2 rounded-full mx-auto" />
        <p className="text-stone-800 text-center">{faculty.role}</p>
      </div>

      {/* Faculty details */}
      <div className="flex flex-col h-full w-5/6 justify-center ">
        <h2 className="text-xl  text-stone-800 font-semibold ">{faculty.name}</h2>
        <div className="text-left">
          <p className="flex text-sm text-stone-600 gap-1"><strong>Office:</strong> {faculty.office_location}</p>
          <p className="flex text-sm text-stone-600 gap-1"><strong>Office Hours:</strong> {faculty.office_hours}</p>
          <p className="flex text-sm text-stone-600 gap-1"><strong>Phone:</strong> {faculty.phone_number}</p>
          <p className="flex text-sm text-stone-600 gap-1"><strong>Email:</strong>
            <a href={`mailto:${faculty.email}`} className="underline">{faculty.email}</a>
          </p>

          {/* Conditional rendering for website link */}
          {faculty.website && (
            <p className="text-sm text-stone-600"><strong>Website: </strong>
              <a href={faculty.website} target="_blank" className="hover:underline transition-all-ease duration-300">{faculty.website}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

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
      <div className={`border flex flex-col h-72  p-3 rounded-2xl shadow-md ${color}
        hover:shadow-lg hover:-translate-y-3 transition-all duration-300`}>
        <div className='flex flex-col gap-4 py-2 justify-center h-full text-center'>
            <div className="flex flex-col gap-4 justify-center h-full text-center">
              <h2 className="text-xl px-2  text-stone-800 font-semibold">{studentResource.name}</h2>
              <p className="text-lg max-w-90 px-8 text-stone-600"> {studentResource.description}</p>
            </div>

            {/*if studentResource has a link, then show "More Info" */}
            {studentResource.link && (
              <div >
                <a href={studentResource.link} target="_blank" className="md:text-lg cursor-pointer text-stone-800  p-2 rounded-lg hover:underline  hover:shadow-lg  transition-all duration-300 bg-neutral-50">More Info</a>
              </div>
            )}
        </div>
      </div>
    );
  }
  
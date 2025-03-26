import React from "react";

const bgColors = [
  "bg-sky-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-rose-300",
  "bg-indigo-200",
];

export default function FaqCard({ faq, index }) {
  const color = bgColors[index % bgColors.length];

  return (
    <div
      className={`rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-2 p-6 ${color} h-60 w-full`}
    >
      <div className="flex flex-col justify-between h-full text-center">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-800">
            Q: {faq.question}
          </h2>
          <p className="text-sm text-stone-700 line-clamp-4 px-2">{faq.answer}</p>
        </div>

        {faq.link && (
          <a
            href={faq.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium text-blue-600 px-4 py-2 rounded-md  hover:underline transition mt-4"
          >
            More Info →
          </a>
        )}
      </div>
    </div>
  );
}

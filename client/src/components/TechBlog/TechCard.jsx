import React from 'react';
import placeholderImg from '../../assets/article_pictures/tech_placeholder.png';

const bgColors = [
  'bg-sky-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-rose-300',
  'bg-indigo-200',
]
export default function TechCard({ post, index }) {

    const color = bgColors[index % bgColors.length];
    return (
      <div className={`${color} rounded-2xl shadow-sm border border-stone-200 transition-all ease-in-out duration-300 hover:shadow-md hover:-translate-y-3 `}>

        <img src={placeholderImg} alt="Tech placeholder" />
  
        <div className="flex flex-col p-4 ">
            <h3 className="text-lg font-semibold text-stone-700">{post.title}</h3>
            <p className="text-sm text-stone-500 mt-1">by {post.author_name}</p>
            <p className="text-sm text-stone-600 mt-2 line-clamp-3">{post.summary}</p>
            
            {/* 
 hi!
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
  

              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs text-blue-600 mt-3 hover:underline"
              >
                Article Link →
              </a>
        </div>
      </div>
    );
  };
  
  
  

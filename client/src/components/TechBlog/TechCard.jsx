export default function TechCard({ post }) {
    return (
      <div>
        <a href={post.external_link} target="_blank" rel="noopener noreferrer">
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <h3 className = "text-lg italic">{post.author_name}</h3>
            <p>{post.summary}</p>
          </div>
        </a>
      </div>
    );
  }
  
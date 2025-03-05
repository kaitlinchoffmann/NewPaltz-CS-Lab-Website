

export default function StudentCard({ post }) {
    return (
      <div>
          <div className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{post.project_title}</h2>
            <h3 className = "text-lg italic">{post.student_name}</h3>
            <p>{post.summary}</p>
          </div>
      </div>
    );
  }
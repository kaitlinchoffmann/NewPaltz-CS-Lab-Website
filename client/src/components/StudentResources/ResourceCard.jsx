export default function ResourceCard({ studentResource }) {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{studentResource.name}</h2>
        <p>{studentResource.description}</p>
        <a href={studentResource.link} target="_blank" rel="noopener noreferrer">
          {studentResource.link}
        </a>
      </div>
    );
  }
  
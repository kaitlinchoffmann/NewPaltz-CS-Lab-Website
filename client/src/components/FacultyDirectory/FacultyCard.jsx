

export default function FacultyCard({ faculty }) {
    console.log('Faculty data received:', faculty); // Add this line

    return (
        
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{faculty.name}</h2>
        <p className="text-gray-600">{faculty.role}</p>
        <p><strong>Office:</strong> {faculty.office}</p>
        <p><strong>Email:</strong> <a href={`mailto:${faculty.email}`} className="text-blue-500">{faculty.email}</a></p>
        {faculty.website && (
          <p><strong>Website:</strong> <a href={faculty.website} target="_blank" className="text-blue-500">{faculty.website}</a></p>
        )}
        <p><strong>Office Hours:</strong> {faculty.officeHours}</p>
      </div>
    );
  }
  
import { Link } from 'react-router-dom';

const bgColor = 'bg-sky-200'; // Pick a single color since it's only one card

export default function SDFormCard() {
  return (
    <div
      className={`rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-2 ${bgColor}`}
    >
      <div className="flex flex-col justify-between h-60 p-6 text-center">

        {/* Form Title and Description */}
        <div className="space-y-3 overflow-auto custom-scroll">
          <h2 className="text-xl font-semibold text-stone-800">
            Server and Database Access Form
          </h2>
          <p className="text-sm text-stone-700">
            This form is used to request access to the server and database for development and learning purposes.
            If accepted, you will be given an account for both the Hydra Server and the MariaDB database.
            You will just need to fill out the correct information below and submit the form, then wait for a Teacher
            to approve your request. Remember to check your email for further instructions to see if you were accepted or denied.
            If accepted, go to the Student Resource Page and follow the steps.
          </p>
        </div>

        {/* Placeholder link for form submission */}
        <Link
          to="/submit-sd-request"
        >
          Submit Form
        </Link>
      </div>
    </div>
  );
}



export default function faqCard({ faq }) {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">{faq.question}</h2>
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    );
  }
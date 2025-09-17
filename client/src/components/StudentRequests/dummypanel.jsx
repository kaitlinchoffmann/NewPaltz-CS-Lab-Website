import { useState, useEffect } from "react";
import sdFormService from "../../services/sdFormService";

export default function AdminPanel() {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const data = await sdFormService.getAllForms();
                setForms(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load forms");
                setLoading(false);
            }
        };

        fetchForms();
    }, []);

    if (loading) return <p className="p-4">Loading forms...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">Admin Panel - All SD Forms</h2>

            {forms.length === 0 ? (
                <p>No forms submitted yet.</p>
            ) : (
                <table className="min-w-full bg-white border rounded-md shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Full Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Student ID</th>
                            <th className="py-2 px-4 border-b">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map((form) => (
                            <tr key={form.id} className="text-center">
                                <td className="py-2 px-4 border-b">{form.full_name}</td>
                                <td className="py-2 px-4 border-b">{form.email}</td>
                                <td className="py-2 px-4 border-b">{form.student_id}</td>
                                <td className="py-2 px-4 border-b">{new Date(form.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
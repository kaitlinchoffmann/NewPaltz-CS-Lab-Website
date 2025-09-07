import { useState, useEffect } from 'react';
import SDFormCard from '../components/StudentForms/SDFormCard';

const StudentForms = () => {
    return (
        <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">Student Forms</h1>
            <p className="mb-8 text-lg text-gray-600">Access various forms for student requests and submissions.</p>
            <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SDFormCard />
            </div>
        </div>
    )
}

export default StudentForms;
import React, { useState, useEffect } from "react";
import { studentService } from "../../services/studentAccountService";

export default function PendingAccounts() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pendingAccounts, setPendingAccounts] = useState([]);

    // Fetch all pending accounts on mount
    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const data = await studentService.getPendingAccounts();
                setPendingAccounts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadAccounts();
    }, []);

    return (
        <div className="w-full flex-col gap-4 flex items-center justify-center">
            {/* Show accounts */}
            {pendingAccounts.map((account) => (
                <div
                    key={account.id}
                    className="w-full max-w-2xl flex flex-col items-center justify-center border p-4 rounded-lg bg-white shadow-sm"
                >
                    <h3 className="text-lg font-semibold text-stone-800">
                        {account.username}
                    </h3>
                    <p className="text-sm text-stone-600">{account.email}</p>
                    <p className="text-sm text-stone-500">Role: {account.role}</p>
                </div>
            ))}

            {/* Loading/Error/Empty states */}
            {isLoading && <p>Loading pending accounts...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {pendingAccounts.length === 0 && !isLoading && (
                <p className="text-blue-400 text-lg">No Pending Account Requests</p>
            )}
        </div>
    );
}

import React, { useState } from "react";

export default function MonitoringPanelPage() {
    const [pm2Logs, setPm2Logs] = useState("");
    const [journalLogs, setJournalLogs] = useState("");
    const [loadingPm2, setLoadingPm2] = useState(false);
    const [loadingJournal, setLoadingJournal] = useState(false);

    const fetchPm2Logs = async () => {
        setLoadingPm2(true);
        try {
            const response = await fetch("/api/scripts/admin/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "getPm2Logs" }),
            });

            const data = await response.json();
            setPm2Logs(data.stdout || JSON.stringify(data, null, 2));
        } catch (err) {
            setPm2Logs("Error fetching PM2 logs.");
        } finally {
            setLoadingPm2(false);
        }
    };

    const fetchJournalLogs = async () => {
        setLoadingJournal(true);
        try {
            const response = await fetch("/api/scripts/admin/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "getJournalLogs" }),
            });

            const data = await response.json();
            setJournalLogs(data.stdout || JSON.stringify(data, null, 2));
        } catch (err) {
            setJournalLogs("Error fetching journalctl logs.");
        } finally {
            setLoadingJournal(false);
        }
    };

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">Monitoring Panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* PM2 Logs Panel */}
                <div className="p-4 border rounded-xl shadow bg-white">
                    <h2 className="text-xl font-semibold mb-3">PM2 Logs</h2>
                    <button
                        onClick={fetchPm2Logs}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {loadingPm2 ? "Loading..." : "Fetch PM2 Logs"}
                    </button>

                    <div className="mt-4 h-80 overflow-auto bg-gray-900 text-green-400 p-3 rounded-lg text-sm whitespace-pre-wrap">
                        {pm2Logs || "No logs loaded yet."}
                    </div>
                </div>

                {/* Journalctl Logs Panel */}
                <div className="p-4 border rounded-xl shadow bg-white">
                    <h2 className="text-xl font-semibold mb-3">Journalctl Logs</h2>
                    <button
                        onClick={fetchJournalLogs}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {loadingJournal ? "Loading..." : "Fetch Journal Logs"}
                    </button>

                    <div className="mt-4 h-80 overflow-auto bg-gray-900 text-yellow-300 p-3 rounded-lg text-sm whitespace-pre-wrap">
                        {journalLogs || "No logs loaded yet."}
                    </div>
                </div>

            </div>
        </div>
    );
}

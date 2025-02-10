import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./components/NavBar.jsx"; 


const App = () => {
  return (
    <div className="bg-neutral-100 min-h-screen">
      {/* Include the Navigation Bar */}
      <NavBar/>

      {/* Example content for the rest of the page */}
      <main className="p-6">
        <h1 className="text-2xl font-bold">Welcome to the Computer Science Lab Website</h1>
        <p className="mt-4 text-gray-700">This is the main content area of your website.</p>
      </main>
    </div>
  );
};
export default App;

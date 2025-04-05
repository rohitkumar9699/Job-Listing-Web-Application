import React, { useState, useEffect } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (location = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs?location=${location}`);
      const data = await res.json();
      setJobs(data);
      setSelectedJob(null); // clear selection when search changes
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchJobs(val);
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left panel - Job list */}
      <div className="w-1/3 border-r overflow-y-auto p-4 bg-gray-50">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Search by location"
        />
        {loading ? (
          <p className="text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="p-3 border-b hover:bg-blue-100 cursor-pointer rounded"
              onClick={() => setSelectedJob(job)}
            >
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.location}</p>
              {job.salary && <p className="text-sm text-gray-700">₹ {job.salary}</p>}
            </div>
          ))
        )}
      </div>

      {/* Right panel - Job details */}
      <div className="w-2/3 p-6 overflow-y-auto">
        {selectedJob ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Type:</strong> {selectedJob.employmentType}</p>
            <p><strong>Posted:</strong> {selectedJob.postedDate}</p>
            <p><strong>Source:</strong> {selectedJob.source}</p>
            <p><strong>Experience:</strong> {selectedJob.experienceRange}</p>
            <p className="mt-4 whitespace-pre-line">{selectedJob.description}</p>
          </>
        ) : (
          <p className="text-gray-600">Select a job to view details</p>
        )}
      </div>
    </div>
  );
};

export default Home;



// // Add this to useEffect in Home.js or main App.js if needed
// useEffect(() => {
//   const timeout = setTimeout(() => {
//     sessionStorage.clear();
//     window.location.href = "/";
//   }, 60 * 60 * 1000); // 60 minutes

//   return () => clearTimeout(timeout);
// }, []);

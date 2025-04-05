import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Helper to convert postedDateTime to "X days ago"
const getDaysAgo = (dateString) => {
  const postedDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - postedDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? "Today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { username } = useParams(); // Get username from URL

  // Protect route: redirect to login if not authenticated
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Initial fetch
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch jobs from backend, filtered by location
  const fetchJobs = async (location = "") => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs?location=${location}`);
      const data = await res.json();
      setJobs(data);
      setSelectedJob(null); // Clear selection on new search
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

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true }); // Prevent back nav
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h1 className="text-xl font-semibold">
          Welcome, <span className="text-blue-600">{username}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex h-[calc(100vh-60px)] font-sans">
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
                {job.min_exp !== undefined && job.max_exp !== undefined && (
                  <p className="text-sm text-gray-700">
                    Experience: {job.min_exp} - {job.max_exp} yrs
                  </p>
                )}
                <p className="text-xs text-gray-500">{getDaysAgo(job.postedDateTime)}</p>
              </div>
            ))
          )}
        </div>

        {/* Right panel - Job details */}
        <div className="w-2/3 p-6 overflow-y-auto">
          {selectedJob ? (
            <>
              <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Country:</strong> {selectedJob.country}</p>
              <p><strong>Type:</strong> {selectedJob.employment_type}</p>
              <p><strong>Posted:</strong> {getDaysAgo(selectedJob.postedDateTime)}</p>
              <p><strong>Source:</strong> {selectedJob.source}</p>
              <p><strong>Experience:</strong> {selectedJob.experience}</p>
              <p>
                <strong>Job Link:</strong>{" "}
                <a
                  href={selectedJob.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Job
                </a>
              </p>
              {selectedJob.companyImageUrl && (
                <img
                  src={selectedJob.companyImageUrl}
                  alt="Company Logo"
                  className="mt-4 w-32"
                />
              )}
              <p className="mt-4 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </p>
              <button className="mt-5 w-80 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Apply
              </button>
            </>
          ) : (
            <p className="text-gray-600">Select a job to view details</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

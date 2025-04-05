import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPinIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOffice2Icon,
  ClockIcon ,
} from "@heroicons/react/24/outline";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

// Helper
const getDaysAgo = (dateString) => {
  const postedDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - postedDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? "Today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

const Home = () => 
  {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/", { replace: true });
  }, [navigate]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (location = "") => {
    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/jobs?location=${location}`);
      const data = await res.json();
      setJobs(data);
      setSelectedJob(null);
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
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white sticky top-0 z-10">
        <h1 className="text-lg sm:text-xl font-semibold">
          Welcome, <span className="font-bold">{username}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Job List Panel */}
        <div className="md:w-1/3 bg-gray-100 p-4 overflow-y-auto border-r">
          <div className="mb-4 sticky top-1 bg-gray-100 z-10">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search by location..."
            />
          </div>

          {loading ? (
            <p className="text-gray-500 text-center mt-6">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                className={`bg-white p-4 mb-3 rounded shadow-md cursor-pointer border-l-4 transition-all ${
                  selectedJob?._id === job._id ? "border-blue-500 bg-blue-50" : "border-transparent"
                }`}
              >
                <h3 className="text-blue-700 font-semibold text-base sm:text-lg md:text-xl mb-1">
                  {job.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <BuildingOffice2Icon className="h-4 w-4 mr-1" />
                  {job.company}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getDaysAgo(job.postedDateTime)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Job Details Panel */}
        <div className="md:w-2/3 p-4 px-3 sm:px-6 overflow-y-auto">
          {selectedJob ? (
            <div className="bg-white p-6 rounded shadow-md">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">
                    {selectedJob.title}
                  </h2>

                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    {selectedJob.companyImageUrl && (
                      <img
                        src={selectedJob.companyImageUrl}
                        alt="Company Logo"
                        className="w-10 h-10 rounded object-cover"
                      />
                    )}
                    <p className="text-gray-800 font-medium text-base">{selectedJob.company}</p>
                  </div>

                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {selectedJob.location}
                  </p>
                </div>

                <a
                  href={selectedJob.job_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-500 text-white flex items-center gap-1 px-4 py-2 rounded hover:bg-pink-600 text-sm"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  Quick Apply
                </a>
              </div>

              <hr className="my-4 border-t border-gray-300" />

              {/* Job Meta Info */}
              <div className="mt-4 text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-gray-700">
                <p className="flex items-center">
                  <BriefcaseIcon className="h-4 w-4 mr-1 text-gray-600" />
                  <strong className="mr-1">Type:</strong> {selectedJob.employment_type}
                </p>
                <p className="flex items-center">
                  <CalendarDaysIcon className="h-4 w-4 mr-1 text-gray-600" />
                  <strong className="mr-1">Posted:</strong> {getDaysAgo(selectedJob.postedDateTime)}
                </p>
                <p className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1 text-gray-600" />
                  <strong className="mr-1">Experience:</strong> {selectedJob.experience}
                </p>
                <p className="flex items-center text-gray-600">
                  <strong className="mr-1">Source:</strong> {selectedJob.source}
                </p>
                <p className="flex items-center text-gray-600">
                  <strong className="mr-1">Country:</strong> {selectedJob.country}
                </p>
                <p className="flex items-center text-gray-600">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1 text-gray-600" />
                  <strong className="mr-1">Salary:</strong> 15 LPA
                </p>
              </div>

              {/* Qualifications */}
              {selectedJob.qualifications?.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-md font-semibold mb-2">Qualifications</h3>
                  <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                    {selectedJob.qualifications.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <h3 className="mt-6 text-lg font-semibold text-gray-800">Job Description</h3>
              <div className="mt-2 text-sm text-gray-600 leading-relaxed max-h-[300px] overflow-y-auto pr-2">
                {selectedJob.description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam cumque corrupti adipisci quos id. Optio in, impedit voluptates nihil praesentium ipsa doloribus molestiae nesciunt eius perferendis sit quidem repellendus porro quisquam quod sint, consequuntur deserunt perspiciatis similique autem veritatis? Impedit at eum voluptatum unde, iure a incidunt voluptate ducimus accusamus numquam amet aperiam veritatis fugiat repellendus repudiandae minus modi perferendis tempora exercitationem cupiditate vitae! Eveniet voluptatum reprehenderit, ipsam maxime, dolorum dolorem necessitatibus temporibus rem nemo veritatis vero. Fugit aliquid itaque a doloremque numquam sit sapiente, dolorum quia quaerat inventore quibusdam illo doloribus, delectus explicabo amet voluptates animi culpa et mollitia accusamus similique officiis ullam velit omnis. Sint possimus iusto culpa molestias ducimus? Aperiam est laboriosam error laudantium voluptas sequi numquam molestias dolorum eligendi omnis culpa animi porro exercitationem, a itaque veritatis impedit ab rerum fugit temporibus soluta aliquam facere. Similique tempora maiores totam accusantium ex laborum enim vitae? Quibusdam laudantium minus qui labore perspiciatis reprehenderit, facilis id quia magni ab veniam laborum. Corrupti minus sequi laboriosam itaque, nihil nostrum facere obcaecati veniam similique nam blanditiis iste, ducimus est quam impedit. Voluptatibus quia expedita quae quos cupiditate. Totam, assumenda. Adipisci molestiae minima nostrum eos vel doloribus earum cum maiores in quia quod dicta fugiat molestias, voluptas, repellat officia ratione sint blanditiis architecto eaque fuga ipsam numquam. Voluptas dolorum doloremque labore expedita possimus magni voluptates, quia ullam, fugiat maxime ut, rem aspernatur? Veniam ex nobis id nisi optio qui itaque modi nulla explicabo nesciunt aut illum pariatur impedit, magnam eaque. Earum."}
              </div>

              {/* Sticky Apply Button */}
              <div className="sticky bottom-0 bg-white pt-6 pb-4 px-3">
                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base">
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-20 text-lg">
              Select a job to view details.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

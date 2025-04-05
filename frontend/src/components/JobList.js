const JobList = ({ jobs, onSelect }) => (
  <ul>
    {jobs.map((job) => (
      <li
        key={job._id}
        className="p-4 hover:bg-gray-100 border-b cursor-pointer"
        onClick={() => onSelect(job)}
      >
        <h3 className="font-semibold">{job.title}</h3>
        <p>{job.location}</p>
        <p className="text-sm text-gray-600">{job.employmentType}</p>
      </li>
    ))}
  </ul>
);

export default JobList;
import { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredJobs(filtered);
  }, [search, jobs]);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");
      setJobs(response.data.jobs);
      setFilteredJobs(response.data.jobs);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold text-center mb-8">
        All Jobs
      </h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <div className="col-span-3 text-center">
            <h2 className="text-2xl font-bold">No Jobs Found</h2>
          </div>
        )}
      </div>

    </div>
  );
}

export default Jobs;
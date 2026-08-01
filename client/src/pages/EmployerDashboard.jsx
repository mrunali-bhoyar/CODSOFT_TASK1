import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/jobs/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job Deleted Successfully");

      fetchMyJobs();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to delete job"
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Employer Dashboard</h1>

        <div className="bg-white shadow rounded-lg p-8 text-center">
          Loading jobs...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Employer Dashboard</h1>

        <Link
          to="/create-job"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Job
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6">My Posted Jobs</h2>

      {jobs.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold">
            No Jobs Posted Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Click "Create Job" to post your first job.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold">{job.title}</h3>

              <p className="text-blue-600 font-semibold">
                {job.company}
              </p>

              <p>📍 {job.location}</p>

              <p className="text-green-600 font-semibold">
                💰 {job.salary}
              </p>

              <p className="mt-3 text-gray-600">
                {job.description}
              </p>

              <div className="mt-5 flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate(`/edit-job/${job._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => navigate(`/applicants/${job._id}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
                >
                  View Applicants
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;
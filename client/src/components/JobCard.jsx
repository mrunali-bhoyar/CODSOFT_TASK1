import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

function JobCard({ job }) {
  const [loading, setLoading] = useState(false);

  const applyForJob = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first.");
        return;
      }

      setLoading(true);

      const response = await API.post(
        `/applications/${job._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Application failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

      <h2 className="text-2xl font-bold">
        {job.title}
      </h2>

      <p className="text-blue-600 mt-2">
        {job.company}
      </p>

      <p className="text-gray-500 mt-2">
        📍 {job.location}
      </p>

      <p className="text-green-600 font-bold mt-2">
        {job.salary}
      </p>

      <div className="flex gap-3 mt-5">

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          View Details
        </button>

        <button
          onClick={applyForJob}
          disabled={loading}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? "Applying..." : "Apply Now"}
        </button>

      </div>

    </div>
  );
}

export default JobCard;
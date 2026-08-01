import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

function CandidateDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/applications/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(response.data.applications);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Candidate Dashboard
        </h1>

        <div className="bg-white shadow rounded-lg p-8 text-center">
          Loading applications...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Candidate Dashboard
      </h1>

      <h2 className="text-2xl font-bold mb-6">
        My Applications
      </h2>

      {applications.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold">
            No Applications Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Start applying for jobs to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold">
                {application.job?.title}
              </h3>

              <p className="text-blue-600 font-semibold mt-2">
                {application.job?.company}
              </p>

              <p className="text-gray-600 mt-2">
                📍 {application.job?.location}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                💰 {application.job?.salary}
              </p>

              <p className="mt-4">
                <span className="font-semibold">Status: </span>

                <span
                  className={
                    application.status === "Accepted"
                      ? "text-green-600 font-semibold"
                      : application.status === "Rejected"
                      ? "text-red-600 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {application.status}
                </span>
              </p>

              <p className="text-gray-500 mt-2">
                Applied On:{" "}
                {new Date(application.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateDashboard;
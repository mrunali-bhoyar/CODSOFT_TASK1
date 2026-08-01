import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(`/applications/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(response.data.applications);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);

      const token = localStorage.getItem("token");

      await API.put(
        `/applications/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Application ${status}`);

      fetchApplicants();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Applicants</h1>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          Loading applicants...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Applicants
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">

          <h2 className="text-2xl font-bold">
            No Applicants Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Candidates who apply for this job will appear here.
          </p>

        </div>
      ) : (
        <div className="space-y-6">

          {applications.map((application) => (

            <div
              key={application._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >

              <h2 className="text-2xl font-bold">
                {application.candidate?.name}
              </h2>

              <p className="text-gray-600 mt-1">
                📧 {application.candidate?.email}
              </p>

              <p className="mt-4">
                <span className="font-semibold">
                  Status:
                </span>{" "}

                <span
                  className={
                    application.status === "Accepted"
                      ? "text-green-600 font-bold"
                      : application.status === "Rejected"
                      ? "text-red-600 font-bold"
                      : "text-yellow-600 font-bold"
                  }
                >
                  {application.status}
                </span>
              </p>

              <div className="flex flex-wrap gap-3 mt-6">

                <button
                  onClick={() =>
                    updateStatus(application._id, "Accepted")
                  }
                  disabled={updatingId === application._id}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
                >
                  {updatingId === application._id
                    ? "Updating..."
                    : "Accept"}
                </button>

                <button
                  onClick={() =>
                    updateStatus(application._id, "Rejected")
                  }
                  disabled={updatingId === application._id}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
                >
                  {updatingId === application._id
                    ? "Updating..."
                    : "Reject"}
                </button>

                {application.candidate?.resume ? (
                  <a
                    href={`http://localhost:5000${application.candidate.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    View Resume
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-5 py-2 rounded-lg cursor-not-allowed"
                  >
                    No Resume
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Applicants;
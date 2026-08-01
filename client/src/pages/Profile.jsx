import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  };

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto p-10">
        <h2 className="text-3xl font-bold">Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Profile</h1>

          <Link
            to="/edit-profile"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Edit Profile
          </Link>
        </div>

        <div className="space-y-4">

          <p><strong>Name:</strong> {user.name}</p>

          <p><strong>Email:</strong> {user.email}</p>

          <p><strong>Role:</strong> {user.role}</p>

          <p><strong>Phone:</strong> {user.phone || "Not Added"}</p>

          <p><strong>Address:</strong> {user.address || "Not Added"}</p>

          <p><strong>Bio:</strong> {user.bio || "Not Added"}</p>

          <p><strong>Education:</strong> {user.education || "Not Added"}</p>

          <p><strong>Experience:</strong> {user.experience || "Not Added"}</p>

          <p>
            <strong>Skills:</strong>{" "}
            {user.skills?.length > 0
              ? user.skills.join(", ")
              : "Not Added"}
          </p>

          <p>
            <strong>GitHub:</strong>{" "}
            {user.github || "Not Added"}
          </p>

          <p>
            <strong>LinkedIn:</strong>{" "}
            {user.linkedin || "Not Added"}
          </p>

          <p>
            <strong>Portfolio:</strong>{" "}
            {user.portfolio || "Not Added"}
          </p>

        </div>

      </div>
    </div>
  );
}

export default Profile;
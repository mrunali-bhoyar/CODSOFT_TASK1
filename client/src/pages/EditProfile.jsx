import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
    education: "",
    experience: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const [resume, setResume] = useState(null);
  const fileInputRef = useRef(null);

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

      const user = response.data.user;

      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
        education: user.education || "",
        experience: user.experience || "",
        skills: user.skills ? user.skills.join(", ") : "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        portfolio: user.portfolio || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
      };

      const response = await API.put("/profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Profile Updated Successfully");

      navigate("/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  };

  const uploadResume = async () => {
    if (!resume) {
      toast.error("Please select a PDF file");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("resume", resume);

      const response = await API.post(
        "/profile/upload-resume",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);

      setResume(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      fetchProfile();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Upload failed"
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Bio</label>
            <textarea
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">GitHub</label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">Portfolio</label>
            <input
              type="text"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          {/* Resume Upload */}

          <div className="border rounded-xl p-6 bg-gray-50">

            <h2 className="text-2xl font-bold mb-4">
              📄 Upload Resume
            </h2>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border rounded-lg p-3"
            />

            {resume && (
              <p className="text-green-600 mt-3">
                Selected: {resume.name}
              </p>
            )}

            <button
              type="button"
              onClick={uploadResume}
              className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Upload Resume
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditProfile;
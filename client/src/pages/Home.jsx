import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import Stats from "../components/Stats";
import TopCompanies from "../components/TopCompanies";
import Categories from "../components/Categories";

import API from "../services/api";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(title.toLowerCase()) &&
        job.company.toLowerCase().includes(company.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    });

    setFilteredJobs(filtered);
  }, [title, company, location, jobs]);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");

      setJobs(response.data.jobs);
      setFilteredJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch jobs");
    }
  };

  const clearFilters = () => {
    setTitle("");
    setCompany("");
    setLocation("");
  };

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-4xl font-bold text-center mb-8">
          Featured Jobs
        </h2>

        {/* Filter Bar */}

        <div className="bg-white shadow-lg rounded-xl p-6 mb-10">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="🔍 Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="🏢 Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="📍 Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={clearFilters}
              className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-3 transition"
            >
              Clear Filters
            </button>

          </div>

        </div>

        <p className="text-gray-600 mb-6">
          {filteredJobs.length} Job(s) Found
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          ) : (
            <div className="col-span-3 bg-white shadow-lg rounded-xl p-10 text-center">
              <h2 className="text-2xl font-bold">
                No Jobs Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try changing your filters.
              </p>
            </div>
          )}
        </div>

      </section>

      <Stats />
      <TopCompanies />
      <Categories />
    </>
  );
}

export default Home;
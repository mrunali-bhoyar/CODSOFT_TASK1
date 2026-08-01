function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-6xl font-bold leading-tight">
          Find Your
          <span className="text-yellow-300"> Dream Job</span>
        </h1>

        <p className="mt-6 text-xl text-gray-200">
          Discover thousands of opportunities from top companies.
        </p>

        <div className="mt-10 flex justify-center">
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-96 px-5 py-3 rounded-l-lg text-black outline-none"
          />

          <button className="bg-yellow-400 text-black px-6 rounded-r-lg font-semibold hover:bg-yellow-300">
            Search
          </button>
        </div>

      </div>
    </section>
  );
}

export default Hero;
function TopCompanies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Infosys",
    "TCS",
    "Accenture",
    "IBM",
    "Adobe",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Top Hiring Companies
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {company}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TopCompanies;
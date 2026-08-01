function Stats() {
  const stats = [
    { number: "1000+", label: "Active Jobs" },
    { number: "500+", label: "Companies" },
    { number: "10K+", label: "Candidates" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, index) => (
            <div key={index}>
              <h2 className="text-4xl font-bold">{item.number}</h2>
              <p className="mt-2 text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
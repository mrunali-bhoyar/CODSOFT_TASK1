function Categories() {
  const categories = [
    "💻 Web Development",
    "🤖 AI / Machine Learning",
    "📊 Data Science",
    "☁️ Cloud Computing",
    "🔒 Cyber Security",
    "📱 Mobile Development",
    "🎨 UI / UX Design",
    "🛠 DevOps",
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-6 text-center shadow hover:shadow-lg hover:bg-blue-50 transition duration-300 cursor-pointer"
            >
              <h3 className="font-semibold text-lg">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
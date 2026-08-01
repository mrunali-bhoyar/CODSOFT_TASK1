function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold">JobBoard</h2>
            <p className="mt-4 text-gray-400">
              Find your dream job and connect with top companies around the world.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Jobs</li>
              <li>Login</li>
              <li>Register</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>

            <p className="text-gray-400">
              📧 support@jobboard.com
            </p>

            <p className="text-gray-400 mt-2">
              📞 +91 9876543210
            </p>
          </div>

        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-center text-gray-500">
          © 2026 JobBoard. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
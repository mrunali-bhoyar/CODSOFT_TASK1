import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          JobBoard
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-white hover:text-gray-200"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-white hover:text-gray-200"
          >
            Jobs
          </Link>

          {user ? (
            <>
              {/* Dashboard */}
              <Link
                to={user.role === "employer" ? "/employer" : "/candidate"}
                className="text-white hover:text-gray-200"
              >
                Dashboard
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className="text-white hover:text-gray-200"
              >
                Profile
              </Link>

              {/* Welcome */}
              <span className="text-white">
                👋 Welcome, <b>{user.name}</b>
              </span>

              {/* Logout */}
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
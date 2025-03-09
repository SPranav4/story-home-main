import React, { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { checkIsAdmin, adminLogout } from "../../Utils/adminUtils";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check which page is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check admin status on component mount
  useEffect(() => {
    if (!checkIsAdmin()) {
      // Redirect to login if not admin
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  // Show nothing until we've checked admin status
  if (!checkIsAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Admin Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow h-[calc(100vh-64px)] fixed">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              <Link
                to="/admin/create-blog"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive("/admin/create-blog")
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Create Blog Post
              </Link>

              <Link
                to="/admin/leads"
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${isActive("/admin/leads")
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                Design Leads
              </Link>

              {/* Add more admin navigation links here */}

            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import About from "../pages/AboutPage/About";
import Home from "../pages/HomePage/Home";
import Pricing from "../pages/PricingPage/Pricing";
import Contact from "../pages/ContactPage/Contact";
import Projects from "../pages/ProjectsPage/Projects";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import ServiceDetails from "../pages/ServiceDetailsPage/ServiceDetails";
import ProjectDetails from "../pages/ProjectDetailsPage/ProjectDetails";
import Blog from "../pages/BlogPages/Blog";
import AdminLogin from "../pages/AdminPages/AdminLogin";
import CreateBlog from "../pages/AdminPages/CreateBlog";
import AdminLayout from "../components/Layouts/AdminLayout";
import AdminLeadsView from "../pages/AdminPages/AdminLeadsView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  // Admin routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "leads",
        element: <AdminLeadsView />,
      },
      // Add more admin routes as needed
    ],
  },
]);

export default router;
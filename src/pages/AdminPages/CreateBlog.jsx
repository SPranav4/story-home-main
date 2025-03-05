// CreateBlog.jsx - Admin-only blog creation component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonBanner from "../../components/common/CommonBanner";
// Change to use the existing blogbanner image instead of adminBanner
import blogbanner from "../../assets/blogImage.png"; 

const CreateBlog = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Check if user is admin on component mount
  useEffect(() => {
    // This is a simplified check. In a real app, you would:
    // 1. Use a proper authentication system
    // 2. Check with your backend if the current user has admin privileges
    
    const checkAdminStatus = () => {
      // For demo purposes, we'll check localStorage
      // In production, you should use a proper auth system
      const isUserAdmin = localStorage.getItem("isAdmin") === "true";
      setIsAdmin(isUserAdmin);
      
      // Redirect non-admin users away from this page
      if (!isUserAdmin) {
        setMessage({ 
          text: "You don't have permission to access this page.", 
          type: "error" 
        });
        // Optionally redirect after a delay
        setTimeout(() => navigate("/blog"), 3000);
      }
    };
    
    checkAdminStatus();
  }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !image) {
      setMessage({ 
        text: "Please fill all fields and upload an image", 
        type: "error" 
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real application, you would:
      // 1. Upload the image to your server/cloud storage
      // 2. Submit the form data to your backend API
      
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll add to localStorage
      const newArticle = {
        id: Date.now(), // Generate a unique ID
        title: formData.title,
        content: formData.content,
        date: formData.date,
        img: imagePreview, // In a real app, this would be the uploaded image URL
      };
      
      // Get existing articles or initialize empty array
      const existingArticles = JSON.parse(localStorage.getItem("articles") || "[]");
      
      // Add new article and save back to localStorage
      existingArticles.push(newArticle);
      localStorage.setItem("articles", JSON.stringify(existingArticles));
      
      setMessage({ 
        text: "Blog post created successfully!", 
        type: "success" 
      });
      
      // Reset form
      setFormData({
        title: "",
        content: "",
        date: new Date().toISOString().split('T')[0],
      });
      setImage(null);
      setImagePreview(null);
      
    } catch (error) {
      console.error("Error creating blog post:", error);
      setMessage({ 
        text: "Failed to create blog post. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  // Render access denied message for non-admins
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{message.text || "Access Denied. Redirecting..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CommonBanner
        title={"Create New Blog Post"}
        bannerImage={blogbanner} // Using the blog banner instead
        bread1={"Admin"}
        bread2={"Create Blog"}
      />
      
      <div className="my-[60px] lg:my-[95px] mx-auto max-w-[360px] md:max-w-[720px] lg:max-w-[1150px]">
        <div className="bg-white shadow-md rounded-lg p-8">
          {message.text && (
            <div className={`mb-6 p-4 rounded ${
              message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
              />
            </div>
            
            {/* Date Input */}
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                Publish Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                Blog Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div className="flex flex-col items-center justify-center pt-7">
                    {!imagePreview ? (
                      <>
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400">
                          Select a photo
                        </p>
                      </>
                    ) : (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-full w-auto object-contain"
                      />
                    )}
                  </div>
                  <input 
                    type="file" 
                    id="image"
                    className="opacity-0" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            
            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                Blog Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog content here..."
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Create Blog Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
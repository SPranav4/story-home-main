import React, { useState, useEffect } from "react";
import CommonBanner from "../../components/common/CommonBanner";
import { articleData } from "../../components/common/data";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import blogbanner from "../../assets/blogImage.png";
import { checkIsAdmin } from "../../Utils/adminUtils";
import { Link } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const isAdmin = checkIsAdmin();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    // Combine default articles with any from localStorage
    const loadArticles = () => {
      try {
        // Get articles from localStorage if available
        const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
        
        // Combine with default articles from articleData
        // In a real app, you would likely just use one source
        const combinedArticles = [...articleData, ...storedArticles];
        
        // Remove any duplicates by ID
        const uniqueArticles = Array.from(
          new Map(combinedArticles.map(item => [item.id, item])).values()
        );
        
        setArticles(uniqueArticles);
      } catch (error) {
        console.error("Error loading articles:", error);
        setArticles(articleData); // Fallback to default articles
      }
    };
    
    loadArticles();
  }, []);

  useEffect(() => {
    // If articles are loaded and we have an ID
    if (articles.length > 0) {
      if (id) {
        // Find the article with matching ID
        const article = articles.find(
          article => article.id === parseInt(id) || article.id === id
        );
        
        if (article) {
          setSelectedArticle(article);
        } else {
          // If ID doesn't exist, default to first article
          setSelectedArticle(articles[0]);
          // Update URL to reflect the first article
          navigate(`/blog/${articles[0].id}`);
        }
      } else {
        // Default to first article if no ID in URL
        setSelectedArticle(articles[0]);
        // Update URL to reflect the default article
        navigate(`/blog/${articles[0].id}`);
      }
    }
  }, [id, articles, navigate]);

  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
    navigate(`/blog/${article.id}`);
  };

  // Handle showing the delete confirmation modal
  const handleDeleteClick = (e, article) => {
    e.stopPropagation(); // Prevent triggering the parent onClick (article selection)
    setArticleToDelete(article);
    setShowDeleteModal(true);
  };

  // Handle actual article deletion
  const handleDeleteConfirm = () => {
    if (!articleToDelete) return;

    try {
      // Get current articles from localStorage
      const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
      
      // Filter out the article to delete
      const updatedArticles = storedArticles.filter(
        article => article.id !== articleToDelete.id
      );
      
      // Save updated articles back to localStorage
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
      
      // Update state to reflect the deletion
      const newArticles = articles.filter(
        article => article.id !== articleToDelete.id
      );
      
      setArticles(newArticles);
      
      // If we deleted the currently selected article, select a different one
      if (selectedArticle.id === articleToDelete.id && newArticles.length > 0) {
        setSelectedArticle(newArticles[0]);
        navigate(`/blog/${newArticles[0].id}`);
      }
      
      // Close the modal
      setShowDeleteModal(false);
      setArticleToDelete(null);
      
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  if (!selectedArticle) return <div>Loading...</div>;

  return (
    <div>
      <CommonBanner
        title={"Blog & FAQ'S"}
        bannerImage={blogbanner}
        bread1={<Link to = '/' className = 'hover:text-[#d6763e] transition-colors' >Home</Link>}
        bread2={"Blogs"}
      />
      
      <div className="my-[60px] lg:my-[95px] mx-auto max-w-[360px] md:max-w-[720px] lg:max-w-[1150px]">
        {/* Admin Create Blog Button - Only visible to admin */}
        {isAdmin && (
          <div className="mb-8 flex justify-end">
            <button 
              onClick={() => navigate('/admin/create-blog')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create New Blog Post
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content - Takes 2/3 of the grid on large screens */}
          <div className="lg:col-span-2">
            <div className="border rounded-[20px] p-6">
              <div className="h-[400px] w-full rounded-[16px] overflow-hidden mb-6">
                <img
                  src={selectedArticle.img}
                  alt={selectedArticle.title}
                  className="h-full w-full object-cover rounded-[16px]"
                />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold mb-4">{selectedArticle.title}</h1>
                <p className="text-gray-500 mb-6">{selectedArticle.date}</p>
                
                {/* Article content */}
                <div className="prose max-w-none">
                  <p className="mb-4 whitespace-pre-line">
                    {selectedArticle.content || 
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Article Tabs - Right side 1/3 column */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6 text-left">More Articles</h2>
            <div className="space-y-4">
              {articles.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => handleArticleSelect(article)}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedArticle.id === article.id 
                      ? "border-blue-500 bg-blue-50" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden mr-4">
                    <img 
                      src={article.img} 
                      alt={article.title}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="flex-grow text-left">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{article.title}</h3>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </div>
                  {/* Only show delete button for admin */}
                  {isAdmin ? (
                    <button
                      onClick={(e) => handleDeleteClick(e, article)}
                      className="text-red-500 hover:text-red-700 p-2 transition-colors"
                      aria-label="Delete article"
                    >
                      <FaTrash />
                    </button>
                  ) : (
                    <IoIosArrowForward className="text-xl text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete "{articleToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
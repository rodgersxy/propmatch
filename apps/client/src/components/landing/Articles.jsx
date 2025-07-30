// src/components/landing/Articles.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar, User, ArrowLeft } from 'lucide-react';
import api from '../../services/api'; 

const Articles = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const articlesPerPage = 3;

  useEffect(() => {
    const fetchPublicArticles = async () => {
      try {
        // Call the public '/api/articles' endpoint
        const response = await api.get('/api/articles');
        setAllPosts(response.data); 
      } catch (error) {
        console.error("Failed to fetch public articles:", error);
        // Don't show an error on the public page, just an empty section
      } finally {
        setLoading(false);
      }
    };
    fetchPublicArticles();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(allPosts.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // If still loading or no posts, you might not want to render anything
  if (loading || allPosts.length === 0) {
    // Or you can return a loading skeleton UI
    return null; 
  }

  return (
    <section id="articles" className="bg-white py-16 md:py-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral tracking-tight">Latest Articles & Insights</h2>
          <p className="text-neutral/70 mt-3 text-lg">Your expert guide to the Kenyan real estate market.</p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
              onClick={() => handleArticleClick(post)}
            >
              <div className="overflow-hidden h-56">
                {/* Use a placeholder if no image_url is provided */}
                <img 
                  src={post.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-6">
                <p className="text-2xl font-semibold text-cyan-800 mb-2">{post.category}</p>
                <h3 className="text-xl font-bold text-neutral mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutral/80 text-sm">{post.excerpt}</p>
                <div className="mt-4 text-primary text-sm font-medium group-hover:underline">
                  Read more →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination - Only show if there are more than 3 articles */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Page Info */}
            <div className="text-sm text-neutral/70">
              Showing {startIndex + 1}-{Math.min(endIndex, allPosts.length)} of {allPosts.length} articles
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'text-neutral/40 cursor-not-allowed'
                    : 'text-neutral hover:bg-neutral/10'
                }`}
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-primary text-white'
                        : 'text-neutral hover:bg-neutral/10'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'text-neutral/40 cursor-not-allowed'
                    : 'text-neutral hover:bg-neutral/10'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Article Modal */}
        {isModalOpen && selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleCloseModal}
            ></div>
            
            {/* Modal Content */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors shadow-lg"
                >
                  <X size={20} className="text-neutral" />
                </button>

                {/* Modal Body */}
                <div className="overflow-y-auto max-h-[90vh]">
                  {/* Hero Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img 
                      src={selectedArticle.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'} 
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6 md:p-8">
                    {/* Category */}
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      {selectedArticle.category}
                    </span>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-neutral mb-4 leading-tight">
                      {selectedArticle.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-neutral/70 mb-6 pb-6 border-b border-neutral/10">
                      {selectedArticle.author && (
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          <span>By {selectedArticle.author.name}</span>
                        </div>
                      )}
                      {selectedArticle.published_at && (
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{new Date(selectedArticle.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div className="text-lg text-neutral/80 font-medium mb-6 leading-relaxed">
                      {selectedArticle.excerpt}
                    </div>

                    {/* Content */}
                    <div 
                      className="prose prose-lg max-w-none text-neutral leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                    />

                    {/* Back Button */}
                    <div className="mt-8 pt-6 border-t border-neutral/10">
                      <button
                        onClick={handleCloseModal}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        <ArrowLeft size={16} />
                        Back to Articles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;
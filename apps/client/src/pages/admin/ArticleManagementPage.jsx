// src/pages/admin/ArticleManagementPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from 'react-modal';
import ArticleForm from '../../components/admin/ArticleForm';

// Set the app element for react-modal for accessibility
Modal.setAppElement('#root');

const ArticleManagementPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // --- Data Fetching ---
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/articles');
      setArticles(response.data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      setError('Failed to load articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // --- Modal and Form Handling ---
  const openCreateModal = () => {
    setCurrentArticle({
      title: '', category: '', excerpt: '', content: '',
      is_published: false, image_file: null
    });
    setIsModalOpen(true);
  };

  const openEditModal = (article) => {
    setCurrentArticle({ ...article, image_file: null }); // Start with no new file
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentArticle(null);
  };

  // --- API LOGIC ---

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    // This FormData object is required to send files
    const formData = new FormData();
    formData.append('title', currentArticle.title);
    formData.append('category', currentArticle.category);
    formData.append('excerpt', currentArticle.excerpt);
    formData.append('content', currentArticle.content);
    formData.append('is_published', currentArticle.is_published ? 1 : 0);

    // Only add the image file if a new one was selected
    if (currentArticle.image_file) {
      formData.append('image_file', currentArticle.image_file);
    }

    const isEditing = currentArticle && currentArticle.id;
    // Use POST for both create and update to support FormData
    const url = isEditing ? `/api/admin/articles/${currentArticle.id}` : '/api/admin/articles';
    if (isEditing) {
      formData.append('_method', 'PUT'); // Laravel "spoofs" the method
    }

    try {
      await api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      closeModal();
      await fetchArticles(); // Refresh the list
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to save article. Check console.';
      setError(message);
      console.error('Failed to save article:', err.response?.data);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    // A simple confirmation before deleting
    if (!window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return;
    }

    try {
      setError('');
      await api.delete(`/api/admin/articles/${articleId}`);
      await fetchArticles(); // Refresh the list after deleting
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete article.';
      setError(message);
      console.error('Failed to delete article:', err);
    }
  };

  // --- RENDER LOGIC ---

  if (loading) return <p className="text-center p-8">Loading articles...</p>;
  if (error && articles.length === 0) return <p className="text-red-500 p-8 text-center">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Article Management</h1>
        <button 
          onClick={openCreateModal}
          className="bg-accent text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-primary-focus transition-colors"
        >
          <FiPlus /> Create New Article
        </button>
      </div>

      {error && <p className="text-red-500 mb-4 bg-red-100 p-3 rounded-md">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3 hidden md:table-cell">Author</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? articles.map((article) => (
              <tr key={article.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{article.title}</td>
                <td className="p-3 text-gray-600">{article.category}</td>
                <td className="p-3 text-gray-600 hidden md:table-cell">{article.author.name}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${article.is_published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {article.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3 flex items-center justify-end gap-3">
                  <button onClick={() => openEditModal(article)} className="text-blue-600 hover:text-blue-800" title="Edit">
                    <FiEdit size={18} />
                  </button>
                  <button onClick={() => handleDeleteArticle(article.id)} className="text-red-600 hover:text-red-800" title="Delete">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No articles found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Article Form"
        className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-lg md:max-w-3xl max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      >
        <h2 className="text-2xl font-bold mb-6">
          {currentArticle?.id ? 'Edit Article' : 'Create New Article'}
        </h2>
        {/* Pass the currentArticle state to the form */}
        {currentArticle && (
          <ArticleForm 
            article={currentArticle}
            setArticle={setCurrentArticle}
            handleSubmit={handleFormSubmit}
            loading={formLoading}
          />
        )}
      </Modal>
    </div>
  );
};

export default ArticleManagementPage;
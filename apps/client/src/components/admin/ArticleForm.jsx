// src/components/admin/ArticleForm.jsx
import React from 'react';

const ArticleForm = ({ article, setArticle, handleSubmit, loading }) => {
  // General handler for text inputs, textareas, and checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Specific handler for the file input
  const handleFileChange = (e) => {
    setArticle(prev => ({
      ...prev,
      image_file: e.target.files[0] // Store the actual file object
    }));
  };

  // Determine what to show as the image preview
  const imagePreviewUrl = article.image_file 
    ? URL.createObjectURL(article.image_file) 
    : article.image_url;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text" name="title" id="title"
          value={article.title || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text" name="category" id="category"
          value={article.category || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* --- NEW IMAGE UPLOAD SECTION --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Image</label>
        <div className="mt-2 flex items-center gap-4">
          {imagePreviewUrl && (
            <img src={imagePreviewUrl} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
          )}
          <div className="flex-grow">
            <input
              type="file"
              name="image_file"
              id="image_file"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-teal-50 file:text-teal-700
                hover:file:bg-teal-100"
            />
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, or WEBP. Max 2MB.</p>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
        <textarea
          name="excerpt" id="excerpt" rows="3"
          value={article.excerpt || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Full Content</label>
        <textarea
          name="content" id="content" rows="8"
          value={article.content || ''}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          required
        ></textarea>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox" name="is_published" id="is_published"
          checked={article.is_published || false}
          onChange={handleChange}
          className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">Publish Immediately</label>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit" disabled={loading}
          className="bg-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-focus transition-colors disabled:bg-teal-300"
        >
          {loading ? 'Saving...' : 'Save Article'}
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
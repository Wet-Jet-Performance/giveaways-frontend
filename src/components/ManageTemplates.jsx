import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTemplates = () => {
  const api = process.env.REACT_APP_BACKEND_API;
  const [templateContent, setTemplateContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      const response = await axios.get(`${api}/templates`);
      setTemplateContent(response.data.content);
    } catch (error) {
      console.error('Error fetching template:', error);
      setMessage('Error fetching template');
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${api}/templates`, {
        content: templateContent,
      });

      if (response.status === 200) {
        setMessage('Successfully updated template');
      }
    } catch (error) {
      setMessage('Error updating template');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-white">Manage Email Template</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="templateContent" className="block text-sm font-medium text-white mb-2">Template Content</label>
          <textarea
            id="templateContent"
            value={templateContent}
            onChange={(e) => setTemplateContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
            rows="15"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Template
        </button>
      </form>
      {message && (
        <div className="mt-4 p-2 bg-yellow-500 text-center rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default ManageTemplates;
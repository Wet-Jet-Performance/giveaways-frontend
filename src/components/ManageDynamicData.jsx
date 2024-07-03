import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDynamicData = () => {
  // State for the form fields
  const api = process.env.REACT_APP_BACKEND_API;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  // State for managing existing data
  const [dataList, setDataList] = useState([]);

  // Fetch existing data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/dynamicdata`);
        setDataList(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data');
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${api}/dynamicdata`, {
        title,
        description,
        image_url: imageUrl,
      });

      if (response.status === 201) {
        setMessage('Successfully added new Data');
        setTitle('');
        setDescription('');
        setImageUrl('');

        // Refresh data list
        const { data } = await axios.get(`${api}/dynamicdata`);
        setDataList(data);
      }
    } catch (error) {
      setMessage('Error creating new Giveaway');
      console.error(error);
    }
  };

  // Handle deletion of a record
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/dynamicdata/${id}`);
      
      // Remove the deleted item from the dataList
      setDataList(dataList.filter(item => item.id !== id));
      setMessage('Successfully deleted Giveaway');
    } catch (error) {
      setMessage('Error deleting Giveaway');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      {/* Form for creating new data */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Create New Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-white mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image_url" className="block text-sm font-medium text-white mb-2">Image URL</label>
            <input
              type="text"
              id="image_url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Data
          </button>
        </form>
      </div>

      {/* Display existing data */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Existing Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataList.map((item) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-700 mb-4">{item.description}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageDynamicData;

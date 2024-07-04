import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageGiveawaySteps = () => {
  const api = process.env.REACT_APP_BACKEND_API;
  const [stepNumber, setStepNumber] = useState('');
  const [stepTitle, setStepTitle] = useState('');
  const [stepDescription, setStepDescription] = useState('');
  const [message, setMessage] = useState('');
  const [stepsList, setStepsList] = useState([]);

  // Fetch existing giveaway steps from the API
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axios.get(`${api}/giveawaysteps`);
        setStepsList(response.data);
      } catch (error) {
        console.error('Error fetching giveaway steps:', error);
        setMessage('Error fetching giveaway steps');
      }
    };

    fetchSteps();
  }, [api]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${api}/giveawaysteps`, {
        step_number: stepNumber,
        step_title: stepTitle,
        step_description: stepDescription,
      });

      if (response.status === 201) {
        setMessage('Successfully added new giveaway step');
        setStepNumber('');
        setStepTitle('');
        setStepDescription('');

        // Refresh steps list
        const { data } = await axios.get(`${api}/giveawaysteps`);
        setStepsList(data);
      }
    } catch (error) {
      setMessage('Error creating new giveaway step');
      console.error(error);
    }
  };

  // Handle deletion of a giveaway step
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/giveawaysteps/${id}`);
      
      // Remove the deleted step from the stepsList
      setStepsList(stepsList.filter(step => step.id !== id));
      setMessage('Successfully deleted giveaway step');
    } catch (error) {
      setMessage('Error deleting giveaway step');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
      {/* Form for creating new giveaway step */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Create New Giveaway Step</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="stepNumber" className="block text-sm font-medium text-white mb-2">Step Number</label>
            <input
              type="number"
              id="stepNumber"
              value={stepNumber}
              onChange={(e) => setStepNumber(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stepTitle" className="block text-sm font-medium text-white mb-2">Step Title</label>
            <input
              type="text"
              id="stepTitle"
              value={stepTitle}
              onChange={(e) => setStepTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stepDescription" className="block text-sm font-medium text-white mb-2">Step Description</label>
            <textarea
              id="stepDescription"
              value={stepDescription}
              onChange={(e) => setStepDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Step
          </button>
        </form>
      </div>

      {/* Display existing giveaway steps */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Existing Giveaway Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stepsList.map((step) => (
            <div key={step.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="text-yellow-500 text-4xl mb-4">{step.step_number}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.step_title}</h3>
              <p className="text-sm text-gray-700 mb-4">{step.step_description}</p>
              <button
                onClick={() => handleDelete(step.id)}
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

export default ManageGiveawaySteps;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton = ({ className = '', ...props }) => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <button 
      onClick={goBack}
      className={`flex items-center text-gray-700 hover:text-indigo-600 transition-colors ${className}`}
      aria-label="Go back"
      {...props}
    >
      <FiArrowLeft className="mr-1" />
      Back
    </button>
  );
};

export default BackButton;

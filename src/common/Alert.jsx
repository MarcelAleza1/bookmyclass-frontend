// src/components/Alert.js
import React, { useEffect } from 'react';

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 5000); 

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="bg-red-500 text-white text-center p-4">
      <span className="font-bold">{message}</span>
      <button className="ml-4 text-white" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Alert;

import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your TODO App</h1>
      <p className="text-lg text-gray-700 mb-4">
        This is a simple TODO app where you can manage your tasks efficiently.
      </p>
      <p className="text-lg text-gray-700 mb-8">
        Get started by signing up or logging in to your account.
      </p>
      <div className="flex space-x-4">
        <a href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </a>
        <a href="/login" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Log In
        </a>
      </div>
    </div>
  );
};

export default Home;

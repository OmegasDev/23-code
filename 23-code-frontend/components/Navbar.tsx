"use client"
import React from 'react';
import Image from 'next/image';


interface MainNavbarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const MainNavbar: React.FC<MainNavbarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedLanguage,
  setSelectedLanguage,
}) => (
  <nav>
    <div className="bg-dark-blue pr-1 flex items-center h-full">
    <Image
  src="/yt-profile.png"
  alt="YouTube Profile Logo"
  className="h-20 w-auto md:h-40"
  width={80} // Adjust width based on the image dimensions you need
  height={80} // Adjust height based on the image dimensions you need
  />

      <div className="hidden md:flex items-center mr-10 ml-20">
        <span className="mr-2 text-gray-500">Menu</span>
        <span className="text-gray-500">▼</span>
      </div>
      <div className="md:hidden text-gray-500">
        <span>▼</span>
      </div>

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search snippets..."
          className="h-8 md:h-10 px-4 md:ml-8 ml-2 rounded-full border border-gray-400 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-500 w-full md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="mt-1 mb-2 px-2  py-1 bg-gray-400 rounded"
        >
          <option value="">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          {/* Add other language options as necessary */}
        </select>
      </div>
    </div>
    <div className="border-b-2 border-gray-600 mx-2 md:mx-4"></div>
  </nav>
);

export default MainNavbar;



// Snippets.tsx
"use client";
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchSnippets, CodeSnippet } from '../lib/fetchSnippets';
import MainNavbar from './Navbar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Spinner from './Spinner'; 
import Image from 'next/image';


const Snippets: React.FC = () => {
  const router = useRouter();
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const snippetsPerPage = 5;

  useEffect(() => {
    const loadSnippets = async () => {
      setLoading(true); // Start loading
      const data = await fetchSnippets();
      setSnippets(data);
      setLoading(false); // Stop loading once data is fetched
    };
    loadSnippets();
  }, []);

  // Filter snippets based on search term and selected language
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage ? snippet.language === selectedLanguage : true;
    return matchesSearch && matchesLanguage;
  });

  const indexOfLastSnippet = currentPage * snippetsPerPage;
  const indexOfFirstSnippet = indexOfLastSnippet - snippetsPerPage;
  const currentSnippets = filteredSnippets.slice(indexOfFirstSnippet, indexOfLastSnippet);

  // If loading, display the Spinner
  if (loading) {
    return <Spinner />;
  }

  <Head>
  <title>Code Snippets Collection | Your Site Name</title>
  <meta name="description" content="Browse a variety of code snippets across different programming languages." />
  <meta name="keywords" content="code snippets, programming, JavaScript, Python, code examples" />

  {/* Open Graph tags */}
  <meta property="og:title" content="Code Snippets Collection | Your Site Name" />
  <meta property="og:description" content="Browse a variety of code snippets across different programming languages." />
  <meta property="og:image" content="/default-image.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourwebsite.com/snippets" />

  {/* Twitter Card tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Code Snippets Collection | Your Site Name" />
  <meta name="twitter:description" content="Browse a variety of code snippets across different programming languages." />
  <meta name="twitter:image" content="/default-image.jpg" />
</Head>


  return (
    <>
      <MainNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <div className="md:mt-8 mt-4 container mx-auto p-4">
        {snippets.length === 0 ? (
          <p>No snippets available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentSnippets.map((snippet) => (
              <div key={snippet._id} className="p-4 bg-dark-blue-card rounded-lg shadow-lg">
                {snippet.imageUrl && (
                  <Image
                  src={snippet.imageUrl}
                  alt="Screenshot"
                  className="mb-2 rounded"
                  width={400} // Adjust width as appropriate
                  height={300} // Adjust height as appropriate
                />
                
                )}
                <h2 className="text-xl text-gray-400 font-semibold mb-2">{snippet.title}</h2>
                <p className="text-gray-300 mb-4">{snippet.description}</p>
                <button
                  className="mt-1 mb-4 px-2 py-1 bg-button-bg text-white rounded hover:bg-blue-700 transition duration-200"
                  onClick={() => router.push(`/snippet/${snippet._id}`)}
                >
                  View Details
                </button>
                {snippet.code && (
                  <div className="p-2 bg-gray-500 rounded-lg">
                    <SyntaxHighlighter
                      language={snippet.language}
                      style={solarizedlight}
                      wrapLongLines={true}
                      PreTag="div"
                      CodeTag="code"
                      codeTagProps={{
                        className: 'pr-2 block overflow-y-auto whitespace-pre-wrap max-w-full',
                      }}
                    >
                      {snippet.code}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastSnippet >= filteredSnippets.length}
            className="p-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Snippets;

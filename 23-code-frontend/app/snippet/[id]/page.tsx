"use client";
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeSnippet, fetchSnippetById } from '../../../lib/fetchSnippets';
import { useRouter } from 'next/navigation';
import Spinner from '../../../components/Spinner';
import MainNavbar from '@/components/Navbar';
import Image from 'next/image';


interface SnippetDetailProps {
  params: Promise<{ id: string }>;
}

const SnippetDetail: React.FC<SnippetDetailProps> = ({ params }) => {
  const router = useRouter(); 
  const [snippet, setSnippet] = useState<CodeSnippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const loadSnippet = useCallback(async () => {
    try {
      const { id } = await params; // Ensure `params` is available
      if (id) {
        setLoading(true); // Start loading
        const data = await fetchSnippetById(id);
        console.log("Fetched snippet data:", data);
        setSnippet(data);
        setLoading(false); // Stop loading once data is fetched
      }
    } catch (error) {
      console.error("Error fetching snippet:", error);
      setLoading(false);
    }
  }, [params]); 
  

  useEffect(() => {
    loadSnippet();
  }, [params,loadSnippet]);

  const copyToClipboard = () => {
    if (snippet?.code) {
      navigator.clipboard.writeText(snippet.code)
        .then(() => {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 2000); // Popup will disappear after 2 seconds
        })
        .catch(err => {
          console.error("Failed to copy code: ", err);
        });
    }
  };

  // Display spinner while loading
  if (loading) {
    return <Spinner />;
  }

  if (!snippet) {
    return <p>No snippet details found.</p>;
  }

  return (
    <>
      <Head>
        <title>{snippet ? `${snippet.title} | Code Snippet` : "Code Snippet"}</title>
        <meta name="description" content={snippet?.description || "Explore detailed code snippets."} />
        <meta name="keywords" content={`${snippet?.language}, code, snippets, programming`} />

        {/* Open Graph tags */}
        <meta property="og:title" content={snippet?.title || "Code Snippet"} />
        <meta property="og:description" content={snippet?.description || "Explore code snippets in various languages."} />
        <meta property="og:image" content={snippet?.imageUrl || "/default-image.jpg"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yourwebsite.com/snippet/${snippet?._id}`} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={snippet?.title || "Code Snippet"} />
        <meta name="twitter:description" content={snippet?.description || "Explore code snippets in various languages."} />
        <meta name="twitter:image" content={snippet?.imageUrl || "/default-image.jpg"} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": snippet?.title,
              "description": snippet?.description,
              "url": `https://yourwebsite.com/snippet/${snippet?._id}`,
              "image": snippet?.imageUrl || "/default-image.jpg",
              "programmingLanguage": snippet?.language,
            }),
          }}
        ></script>
      </Head>

      <MainNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      
      <div className="container mx-auto p-6 bg-dark-blue text-gray-300 lg:h-screen">
        <h1 className="text-3xl font-bold mb-4">{snippet.title}</h1>

        <div className="lg:flex lg:items-start lg:gap-6">
          {/* Image Section */}
          {snippet.imageUrl && (
           <div className="lg:w-1/2 mb-4 lg:mb-0">
           <Image
             src={snippet.imageUrl}
             alt="Screenshot"
             className="rounded-lg object-cover md:my-10 w-full h-auto max-h-60"
             width={500} 
             height={300} 
           />
         </div>
         
          )}

          {/* Content Section */}
          <div className="lg:w-1/2">
            <p className="text-lg mb-4">{snippet.description}</p>

            {snippet.usageInstructions && (
              <div className="bg-gray-600 p-4 rounded-lg mb-4">
                <h2 className="text-xl py-2 font-semibold">Usage Instructions</h2>
                <p className="text-gray-200">{snippet.usageInstructions}</p>
              </div>
            )}

            <div className="bg-gray-800 p-2 rounded-lg relative">
              <button
                onClick={copyToClipboard}
                className="top-2 right-2 text-white px-1 py-1 text-sm"
              >
                Copy code
              </button>
              <SyntaxHighlighter
                language={snippet.language}
                style={solarizedlight}
                wrapLongLines={true}
                codeTagProps={{ className: 'block whitespace-pre-wrap p-2' }}
              >
                {snippet.code}
              </SyntaxHighlighter>
            </div>

            {/* Popup Notification */}
            {showPopup && (
              <div className="fixed top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ease-in-out">
                Code copied to clipboard!
              </div>
            )}
            <button
              className="mt-4 mb-4 px-2 py-1 bg-button-bg text-white rounded hover:bg-blue-700 transition duration-200"
              onClick={() => router.push(`/`)} // Navigate to home page
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnippetDetail;







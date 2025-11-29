import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaBuilding, FaBriefcase, FaFileUpload, FaLinkedin } from "react-icons/fa";
import { MdDescription, MdAutoAwesome } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import MyDropzone from "../../component/MyDropzone";
import useAnalyse from "../../hooks/useAnalyse";

const Upload = () => {
  const [activeTab, setActiveTab] = useState<"manual" | "linkedin">("manual");
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [input, setInput] = useState({
    company: "",
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scrapingLoading, setScrapingLoading] = useState<boolean>(false);
  
  const { loading, analyse } = useAnalyse();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };
 
  const location = useLocation();
useEffect(() => {
  const value = location.state?.myValue;
  if (value) {
    setLinkedinUrl(value);
  }
}, [location.state?.myValue]);
  // Function to fetch job details from LinkedIn URL
  const handleFetchLinkedInJob = async () => {
    if (!linkedinUrl.trim()) {
      alert("Please enter a LinkedIn job URL");
      return;
    }

    setScrapingLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/scrap/getDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: linkedinUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch job details");
      }

      const data = await response.json();
      
      // Update the input state with fetched data
      setInput({
        company: data.organization || "",
        title: data.title || "",
        description: data.description || "",
      });

      // Switch to manual tab to show the fetched details
      setActiveTab("manual");
      
      alert("Job details fetched successfully! Review and submit when ready.");
    } catch (error) {
      console.error("Error fetching job details:", error);
      alert("Failed to fetch job details. Please check the URL and try again.");
    } finally {
      setScrapingLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert("Please select a resume file");
      return;
    }

    if (activeTab === "manual") {
      // Validation for manual entry
      if (!input.company.trim() || !input.title.trim() || !input.description.trim()) {
        alert("Please fill in all job details");
        return;
      }
    } else {
      if (!linkedinUrl.trim()) {
        alert("Please enter a LinkedIn job URL");
        return;
      }
    }
    
    const formData = new FormData();
    
    if (activeTab === "manual") {
      formData.append('company', input.company);
      formData.append('title', input.title);
      formData.append('description', input.description);
    } else {
      formData.append('linkedinUrl', linkedinUrl);
    }
    
    formData.append('file', selectedFile);
    formData.append('analysisType', activeTab);
    
    await analyse(formData);
  };

  return (
    <div className="min-h-screen py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg text-white font-medium transition-all duration-300"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-4">
          <HiSparkles className="text-lg" />
          <span>AI-Powered Analysis</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Upload Your Resume
        </h1>
        <p className="text-xl text-gray-400">
          Get instant ATS score and personalized improvement recommendations
        </p>
      </div>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          
          {/* Tab Selection */}
          <div className="flex gap-4 mb-8 p-1 bg-gray-800/50 rounded-xl">
            <button
              onClick={() => setActiveTab("manual")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "manual"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <MdDescription className="text-xl" />
              Manual Entry
            </button>
            <button
              onClick={() => setActiveTab("linkedin")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "linkedin"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <FaLinkedin className="text-xl" />
              LinkedIn URL
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Resume Upload Section - Always Visible */}
            <div className="bg-gray-800/30 border-2 border-dashed border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FaFileUpload className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Upload Resume</h3>
                  <p className="text-sm text-gray-400">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>
              </div>
              <MyDropzone onFileSelect={handleFileSelect} selectedFile={selectedFile} />
            </div>

            {/* Conditional Content Based on Tab */}
            {activeTab === "manual" ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                      <FaBuilding className="text-blue-400" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={input.company}
                      onChange={handleChange}
                      placeholder="e.g., Google, Microsoft"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Job Title */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                      <FaBriefcase className="text-blue-400" />
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={handleChange}
                      placeholder="e.g., Senior Software Engineer"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                    <MdDescription className="text-blue-400" />
                    Job Description
                  </label>
                  <textarea
                    name="description"
                    value={input.description}
                    onChange={handleChange}
                    rows={8}
                    placeholder="Paste the complete job description here..."
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500">
                    Include required skills, qualifications, and responsibilities
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* LinkedIn URL Section */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <FaLinkedin className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Quick LinkedIn Analysis</h3>
                      <p className="text-sm text-gray-400">
                        We'll automatically extract job details from the URL
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                      LinkedIn Job URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://www.linkedin.com/jobs/view/..."
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={handleFetchLinkedInJob}
                        disabled={scrapingLoading || !linkedinUrl.trim()}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-all duration-300 whitespace-nowrap"
                      >
                        {scrapingLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Fetching...
                          </div>
                        ) : (
                          "Fetch Details"
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Copy the job posting URL from LinkedIn
                    </p>
                  </div>

                  {/* Info Box */}
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-300">
                      <strong>💡 Tip:</strong> Click "Fetch Details" to automatically extract job information, then review and submit
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Analyzing Your Resume...
                  </>
                ) : (
                  <>
                    <MdAutoAwesome className="text-xl" />
                    Analyze Resume with AI
                  </>
                )}
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-500">
                Your resume will be analyzed against {activeTab === "manual" ? "the job requirements" : "the LinkedIn job posting"}
              </p>
            </div>
          </form>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-gray-900/30 border border-gray-800 rounded-xl">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-semibold text-white mb-2">Instant Analysis</h4>
            <p className="text-sm text-gray-400">Get results in under 60 seconds</p>
          </div>
          <div className="text-center p-6 bg-gray-900/30 border border-gray-800 rounded-xl">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-semibold text-white mb-2">ATS Score</h4>
            <p className="text-sm text-gray-400">See how recruiters will view your resume</p>
          </div>
          <div className="text-center p-6 bg-gray-900/30 border border-gray-800 rounded-xl">
            <div className="text-3xl mb-3">💡</div>
            <h4 className="font-semibold text-white mb-2">Smart Tips</h4>
            <p className="text-sm text-gray-400">AI-powered improvement suggestions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
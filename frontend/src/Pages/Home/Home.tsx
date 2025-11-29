import { useEffect, useState } from "react";
import { FaCheckCircle, FaLinkedin, FaRocket, FaBrain, FaChartLine } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { MdInsights, MdAutoAwesome } from "react-icons/md";
import { HiSparkles, HiDocumentText } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import useFeedback from "@/hooks/useFeedback";
import { useAuthContext } from "@/context/AuthContext";

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Feedback {
  resumePath: string;
  _id?: string;
}

interface HomeProps {
  feedbacks?: Feedback[];
  loading?: boolean;
}


const Home: React.FC<HomeProps> = () => {

  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
   const{loading,feedbacks,getAllFeedback} = useFeedback();
   const { user,loading: userLoading } = useAuthContext()
   const navigate = useNavigate()

  const handleLinkedInAnalyze = (): void => {
    linkedinUrl.trim()
      setIsAnalyzing(true);
    
        navigate("/upload", {
     state: { myValue: linkedinUrl }
   });
  };
 

  useEffect(() => {

  
  if (!userLoading && user && (user._id || user.id)) {
    const userId = user._id || user.id;
    console.log("Making API call with userId:", userId);
    getAllFeedback(userId);
  }
}, [user, userLoading])



if (userLoading) {
  return (
    <div className="flex justify-center items-center py-8 h-[100vh]">
     <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}


  const features: Feature[] = [
    {
      icon: <MdInsights />,
      title: "AI-Powered Feedback",
      desc: "Get intelligent insights on resume content, structure, and keyword optimization.",
      color: "blue"
    },
    {
      icon: <FaCheckCircle />,
      title: "ATS Compatibility Score",
      desc: "Ensure your resume passes Applicant Tracking Systems used by top companies.",
      color: "green"
    },
    {
      icon: <IoMdGitCompare />,
      title: "Job Match Analysis",
      desc: "Compare your resume against specific job requirements and get match scores.",
      color: "purple"
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn Job Scraping",
      desc: "Simply paste a LinkedIn job URL and get instant AI-powered feedback.",
      color: "indigo"
    },
    {
      icon: <FaBrain />,
      title: "Smart Recommendations",
      desc: "Receive personalized suggestions to improve your resume's impact.",
      color: "pink"
    },
    {
      icon: <FaChartLine />,
      title: "Performance Tracking",
      desc: "Track improvements over time and see your resume evolution.",
      color: "cyan"
    }
  ];

  const steps: Step[] = [
    {
      number: "01",
      title: "Paste LinkedIn Job URL",
      description: "Copy any LinkedIn job posting link you're interested in applying to."
    },
    {
      number: "02",
      title: "Upload Your Resume",
      description: "Upload your resume in PDF format for comprehensive analysis."
    },
    {
      number: "03",
      title: "Get AI Feedback",
      description: "Receive detailed insights on how well your resume matches the job requirements."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center h-[100vh]">
        <div className="text-blue-400 text-xl">Loading feedbacks...</div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <section className="min-h-[calc(100vh-82px)] flex items-center py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
              <HiSparkles className="text-lg" />
              <span>AI-Powered Resume Analysis</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Land Your Dream Job with
              <span className="text-blue-400"> AI-Optimized</span> Resumes
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed">
              Upload your resume or paste a LinkedIn job URL. Our AI analyzes compatibility, 
              suggests improvements, and helps you stand out to recruiters.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/upload" className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50">
                <FaRocket className="group-hover:translate-x-1 transition-transform" />
                Upload Resume
              </Link>
              
              <button className="px-8 py-4 border-2 border-blue-500/30 hover:border-blue-500 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-blue-500/10">
                View Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold text-blue-400">98%</div>
                <div className="text-sm text-gray-500">ATS Pass Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">10k+</div>
                <div className="text-sm text-gray-500">Resumes Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">5 Min</div>
                <div className="text-sm text-gray-500">Average Analysis</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <FaLinkedin className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Quick Analysis</h3>
                  <p className="text-sm text-gray-400">Paste LinkedIn job URL</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    LinkedIn Job URL
                  </label>
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/jobs/view/..."
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <button
                  onClick={handleLinkedInAnalyze}
                  disabled={isAnalyzing}

                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <MdAutoAwesome />
                      Analyze with AI
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-500 text-center">
                  Or <Link to="/upload" className="text-blue-400 hover:underline cursor-pointer">upload your resume</Link> directly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-400">Get AI-powered feedback in three simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 h-full hover:border-blue-500/50 transition-all duration-300">
                <div className="text-6xl font-bold text-blue-500/20 mb-4">{step.number}</div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-800"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-400">Everything you need to create a winning resume</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 border-t border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Resume History</h2>
          <p className="text-gray-400">Review and compare your previous resume analyses</p>
        </div>

        {feedbacks && feedbacks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback, idx) => (
              <div key={feedback._id || idx} className="group relative overflow-hidden w-fit p-2 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <img
                  src={feedback.resumePath}
                  alt="Resume"
                  className="w-80 h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <button className="w-full py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700">
                    View Analysis
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-900/30 border border-gray-800 rounded-2xl">
            <HiDocumentText className="text-6xl text-gray-700 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-6">No resume analyses yet</p>
            <Link to="/upload" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300">
              <FaRocket />
              Upload Your First Resume
            </Link>
          </div>
        )}
      </section>

      <section className="py-20 border-t border-gray-800">
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Stand Out?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their resumes with our AI-powered platform
          </p>
          <Link to="/upload" className="inline-flex items-center gap-2 px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-600/30">
            <FaRocket />
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
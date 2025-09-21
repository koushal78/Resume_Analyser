import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ResumeContextType = {
  feedback: any;
  setFeedback: (feedback: any) => void;
};

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [feedback, setFeedback] = useState<any>(()=>{
    try {
    const stored = localStorage.getItem("resume-feedback");
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Failed to parse feedback from localStorage", err);
    return null; 
  }
  });

   useEffect(() => {
    if (feedback !== null) {
      localStorage.setItem("resume-feedback", JSON.stringify(feedback));
    }
  }, [feedback]);

  return (
    <ResumeContext.Provider value={{ feedback, setFeedback }}>
      {children}
    </ResumeContext.Provider>
  );
};

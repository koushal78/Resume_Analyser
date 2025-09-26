import axios from "axios";
import { useState } from "react";

const useSaveFeedback = () => {
  const [loading, setLoading] = useState(false);


  const save = async ({
    userId,
    feedback,
    resumePath,
}: {
    userId: string;
    feedback: string;
    resumePath: string;
  }) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `/api/resume/savefeedback`,
        { userId, feedback, resumePath },
       {
    headers: { "Content-Type": "application/json" }, 
    withCredentials: true,
  }
      );

      const data = res.data;

      if (!data) {
        throw new Error("Error in the savefeedback hook: No data returned");
      }

      console.log("Feedback saved from :", data);
      return data;
    } catch (error: any) {
      console.error("Error in saving feedback:", error.message);
      throw error; 
    } finally {
      setLoading(false);
    }
  };



  return { loading, save };
};

export default useSaveFeedback;

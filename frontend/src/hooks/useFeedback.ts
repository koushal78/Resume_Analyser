import axios from "axios";
import { useState } from "react";

interface Feedback {
  _id: string;
  userId: string;
  feedback: string;
  resumePath: string;
  createdAt: string;
  __v: number;
}

const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [oneFeedback, setOneFeedback] = useState<Feedback | null>(null);

  const getAllFeedback = async (userId: string) => {
    setLoading(true);
    try {
      const res = await axios.get<Feedback[]>(
        `/api/resume/feedbacks/${userId}`,
        { withCredentials: true }
      );
      setFeedbacks(res.data);
      console.log(res.data)
      return res.data;
    } catch (error: any) {
      console.error("Error fetching feedbacks", error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getFeedback = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get<Feedback>(
        `/api/resume/feedback/${id}`,
        { withCredentials: true }
      );
      setOneFeedback(res.data);
      return res.data;
    } catch (error: any) {
      console.error("Error fetching one feedback", error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    feedbacks,
    oneFeedback,
    loading,
    getAllFeedback,
    getFeedback, 
  };
};

export default useFeedback;

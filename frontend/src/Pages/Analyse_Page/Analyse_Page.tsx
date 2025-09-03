import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useResumeContext } from "@/context/resumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  ArrowLeft,
  FileText,
  Star
} from "lucide-react";

const Analyse_Page = () => {
  const location = useLocation();
  const { image } = location.state || {};
  const { feedback } = useResumeContext();

  console.log("feedback of the resume ->", feedback?.overallScore);

  const getScoreColor = (marks: number) => {
    if (marks >= 80) return "text-blue-400";
    if (marks >= 60 && marks <= 80) return "text-sky-400";
    return "text-slate-400";
  };

  const getScoreGradient = (marks: number) => {
    if (marks >= 80) return "from-blue-400 to-blue-600";
    if (marks >= 60 && marks <= 80) return "from-sky-400 to-blue-500";
    return "from-slate-400 to-slate-600";
  };

  const getTipDesign = (tip: string) => {
    if (tip === "good")
      return {
        bg: "bg-gradient-to-r from-blue-950/40 to-blue-900/40 border-blue-500/30 backdrop-blur-sm",
        text: "text-blue-100",
        icon: CheckCircle,
        iconColor: "text-blue-400"
      };
    if (tip === "improve")
      return {
        bg: "bg-gradient-to-r from-sky-950/40 to-sky-900/40 border-sky-500/30 backdrop-blur-sm",
        text: "text-sky-100",
        icon: AlertCircle,
        iconColor: "text-sky-400"
      };
    if (tip === "bad")
      return {
        bg: "bg-gradient-to-r from-slate-950/40 to-slate-900/40 border-slate-500/30 backdrop-blur-sm",
        text: "text-slate-100",
        icon: XCircle,
        iconColor: "text-slate-400"
      };
    return {
      bg: "bg-gray-950/40 border-gray-500/30 backdrop-blur-sm",
      text: "text-gray-100",
      icon: FileText,
      iconColor: "text-gray-400"
    };
  };

  const getScoreIcon = (marks: number) => {
    if (marks >= 80) return <TrendingUp className="w-5 h-5 text-blue-400" />;
    if (marks >= 60) return <Star className="w-5 h-5 text-sky-400" />;
    return <TrendingDown className="w-5 h-5 text-slate-400" />;
  };

  const handleClick = () => {
    localStorage.setItem('resume-feedback', '');
  }

  if (!feedback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-slate-950 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-lg border-blue-500/20">
          <CardContent className="text-center py-8">
            <FileText className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-blue-100 mb-2">No Feedback Available</h2>
            <p className="text-blue-200/70 mb-6">Please upload a resume to get detailed analysis.</p>
            <Link to="/upload">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-0">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Upload
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-slate-950 px-4 py-6 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-300 via-blue-400 to-sky-400 bg-clip-text text-transparent mb-4">
            Resume Analysis Report
          </h1>
          <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">
            Comprehensive feedback to help you land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Resume Image Section */}
          <div className="xl:col-span-4">
            <Card className="bg-black/40 backdrop-blur-lg border-blue-500/20 sticky top-6">
              <CardHeader>
                <CardTitle className="text-blue-100 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Your Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                {image ? (
                  <div className="relative group">
                    <img
                      src={image}
                      alt="Resume Preview"
                      className="w-full rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105 border border-blue-500/20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="h-64 bg-blue-950/30 rounded-lg flex items-center justify-center border border-blue-500/20">
                    <p className="text-blue-300">No preview available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Feedback Section */}
          <div className="xl:col-span-8 space-y-6">
            {/* Overall Score Card */}
            <Card className="bg-black/40 backdrop-blur-lg border-blue-500/20">
              <CardContent className="p-6 lg:p-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className={`text-6xl lg:text-7xl font-bold bg-gradient-to-r ${getScoreGradient(feedback.overallScore)} bg-clip-text text-transparent`}>
                      {feedback.overallScore}
                    </div>
                    <div className="text-right">
                      {getScoreIcon(feedback.overallScore)}
                      <p className="text-2xl font-semibold text-blue-100">/ 100</p>
                    </div>
                  </div>
                  <Progress 
                    value={feedback.overallScore} 
                    className="h-3 mb-4 bg-blue-950/50"
                  />
                  <Badge 
                    variant="secondary" 
                    className={`${getScoreColor(feedback.overallScore)} bg-black/30 text-lg px-4 py-2 border border-blue-500/30`}
                  >
                    Overall Score
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            <Card className="bg-black/40 backdrop-blur-lg border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-100 text-xl lg:text-2xl">Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="space-y-4">
                  {Object.entries(feedback)
                    .filter(([key]) => key !== "overallScore")
                    .map(([key, value]: [string, any], idx) => (
                      <AccordionItem 
                        key={idx} 
                        value={`item-${idx}`}
                        className="bg-black/20 rounded-lg border-blue-500/20 overflow-hidden backdrop-blur-sm"
                      >
                        <AccordionTrigger className="px-4 lg:px-6 py-4 hover:bg-blue-950/20 transition-colors">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-3">
                              {getScoreIcon(value.score)}
                              <h3 className="text-lg lg:text-xl font-semibold text-blue-100 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={value.score} 
                                className="w-16 lg:w-24 h-2 bg-blue-950/50"
                              />
                              <Badge 
                                variant="secondary"
                                className={`${getScoreColor(value.score)} bg-black/30 min-w-12 justify-center border border-blue-500/30`}
                              >
                                {value.score}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 lg:px-6 pb-4">
                          <div className="space-y-3">
                            {value?.tips?.map(
                              (
                                tip: { tip: string; explanation: string; type: string },
                                tIdx: number
                              ) => {
                                const tipDesign = getTipDesign(tip.type);
                                const IconComponent = tipDesign.icon;
                                
                                return (
                                  <div
                                    key={tIdx}
                                    className={`${tipDesign.bg} ${tipDesign.text} p-4 lg:p-5 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <IconComponent className={`w-5 h-5 ${tipDesign.iconColor} mt-0.5 flex-shrink-0`} />
                                      <div className="flex-1">
                                        <h4 className="font-bold text-base lg:text-lg mb-2">
                                          {tip.tip}
                                        </h4>
                                        <p className="text-sm lg:text-base opacity-90 leading-relaxed">
                                          {tip.explanation}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload" className="flex-1 sm:flex-none">
                <Button 
                  onClick={handleClick}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Upload New Resume
                </Button>
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyse_Page;
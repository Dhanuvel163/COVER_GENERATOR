import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Sparkles, Copy, Download, Link, Linkedin, Globe } from "lucide-react";
import GlassBackground from "@/components/GlassBackground";
import Header from '@/components/Header';
import { generateCover, generateCustomAnswers, parseJD } from "@/api/profile";
import { toast } from "sonner";
import { useUserStore } from '@/store/userStore';
import { errorStyle, successStyle } from '@/lib/toastStyles';
import { useNavigate } from 'react-router-dom';

const CoverLetterGenerator = () => {
  const [activeTab, setActiveTab] = useState('cover-letter');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  
  // Custom Questions tab - same fields as cover letter
  const [customJobDescription, setCustomJobDescription] = useState('');
  const [customCompanyName, setCustomCompanyName] = useState('');
  const [customJobTitle, setCustomJobTitle] = useState('');
  const [customJobUrl, setCustomJobUrl] = useState('');
  const [customMaxCharacters, setCustomMaxCharacters] = useState(1500);
  const [customQuestions, setCustomQuestions] = useState('');
  
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [generatedAnswers, setGeneratedAnswers] = useState('');
  const [maxCharacters, setMaxCharacters] = useState(1500);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isParsingCustom, setIsParsingCustom] = useState(false);
  const token = useUserStore((state) => state?.token);
  const sectionRef = useRef(null);
  const removeIsLoggedIn = useUserStore((state) => state.removeIsLoggedIn);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const logout = () => {
    removeIsLoggedIn();
    clearUser()
    navigate("/");
  };

  const supportedSites = [
    { name: 'LinkedIn', icon: Linkedin, domain: 'linkedin.com' },
    { name: 'Naukri', icon: Globe, domain: 'naukri.com' },
    { name: 'Indeed', icon: Globe, domain: 'indeed.com' },
    { name: 'Glassdoor', icon: Globe, domain: 'glassdoor.com' }
  ];

  const parseJobUrl = async (isCustomTab = false) => {
    const url = isCustomTab ? customJobUrl : jobUrl;
    if (!url.trim()) {
      toast.error("Please enter a job URL.", errorStyle);
      return;
    }
    if(!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(url)){
      toast.error("Please enter a valid job URL.", errorStyle);
      return;
    }
    
    if (isCustomTab) {
      setIsParsingCustom(true);
    } else {
      setIsParsing(true);
    }
    
    try {
      const parsedUrl = new URL(url);
      let response = await parseJD(token, {url: parsedUrl});
      
      if (isCustomTab) {
        if(response?.data?.response?.company) setCustomCompanyName(response?.data?.response?.company)
        if(response?.data?.response?.title) setCustomJobTitle(response?.data?.response?.title)
        if(response?.data?.response?.jobDescription) setCustomJobDescription(response?.data?.response?.jobDescription)
      } else {
        if(response?.data?.response?.company) setCompanyName(response?.data?.response?.company)
        if(response?.data?.response?.title) setJobTitle(response?.data?.response?.title)
        if(response?.data?.response?.jobDescription) setJobDescription(response?.data?.response?.jobDescription)
      }
      toast.success("Job details parsed successfully!", successStyle);
    } catch (error) {
      if(error?.response?.data?.message?.toLowerCase()=="invalid token"){
        toast.error("Session Expired",errorStyle);
        logout()
      }else if(error?.response?.data?.show_message){
        toast.error(error?.response?.data?.message,errorStyle);
      } else toast.error("Failed to parse job URL. Please check the URL format.",errorStyle);
    } finally {
      if (isCustomTab) {
        setIsParsingCustom(false);
      } else {
        setIsParsing(false);
      }
    }
  };

  const handleGenerate = async () => {
    if (activeTab === 'cover-letter') {
      if (!jobDescription.trim()) {
        toast.error("Job Description is mandatory.", errorStyle);
        return;
      } else if (!companyName.trim()) {
        toast.error("Company Name is mandatory.", errorStyle);
        return;
      } else if (!jobTitle.trim()) {
        toast.error("Job Title is mandatory.", errorStyle);
        return;
      }
      setIsGenerating(true);
      try {
        const response = await generateCover(token, {
          jobDescription,
          companyName,
          jobTitle,
          maxCharacters
        });
        setGeneratedLetter(response.data?.coverLetter);
      } catch (error) {
        if(error?.response?.data?.message?.toLowerCase()=="invalid token"){
          toast.error("Session Expired",errorStyle);
          logout()
        }else if(error?.response?.data?.show_message){
          toast.error(error?.response?.data?.message,errorStyle);
        } else toast.error("Failed to parse job URL. Please check the URL format.",errorStyle);
      } finally {
        setIsGenerating(false);
      }
    } else {
      if (!customJobDescription.trim()) {
        toast.error("Job Description is mandatory.", errorStyle);
        return;
      } else if (!customCompanyName.trim()) {
        toast.error("Company Name is mandatory.", errorStyle);
        return;
      } else if (!customJobTitle.trim()) {
        toast.error("Job Title is mandatory.", errorStyle);
        return;
      } else if (!customQuestions.trim()) {
        toast.error("Custom Questions are mandatory.", errorStyle);
        return;
      }
      
      if (!customQuestions.trim()) {
        toast.error("Custom Questions are mandatory.", errorStyle);
        return;
      }
      setIsGenerating(true);
      try {
        const response = await generateCustomAnswers(token, {
          jobDescription: customJobDescription,
          companyName: customCompanyName,
          jobTitle: customJobTitle,
          customQuestions,
          maxCharacters: customMaxCharacters
        });
        setGeneratedAnswers(response.data?.answers || "Generated answers will appear here...");
      } catch (error) {
        if(error?.response?.data?.message?.toLowerCase()=="invalid token"){
          toast.error("Session Expired",errorStyle);
          logout()
        }else if(error?.response?.data?.show_message){
          toast.error(error?.response?.data?.message,errorStyle);
        } else {
          toast.error("Failed to generate answers.", errorStyle);
        }
      } finally {
        setIsGenerating(false);
      }
    }
    sectionRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const handleCopy = () => {
    const content = activeTab === 'cover-letter' ? generatedLetter : generatedAnswers;
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!", successStyle);
  };

  const handleDownload = () => {
    const content = activeTab === 'cover-letter' ? generatedLetter : generatedAnswers;
    const filename = activeTab === 'cover-letter' 
      ? `cover-letter-${companyName || 'job'}.docx`
      : `custom-answers-${companyName || 'job'}.docx`;
    
    const blob = new Blob([content], { type: 'application/docx' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GlassBackground />
      <Header/>
      <div className="relative z-10 px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              AI Content Generator
            </h1>
            <p className="text-muted-foreground">
              Generate personalized cover letters and custom question answers using AI
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 glass-card">
              <TabsTrigger 
                value="cover-letter" 
                className="transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
              >
                Cover Letter
              </TabsTrigger>
              <TabsTrigger 
                value="custom-questions"
                className="transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
              >
                Custom Questions
              </TabsTrigger>
            </TabsList>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card p-4 md:p-6 transition-all duration-500 ease-in-out">
                <TabsContent value="cover-letter" className="mt-0 animate-fade-in">
                  <div className="flex items-center mb-6">
                    <FileText className="w-6 h-6 text-red-500 mr-2" />
                    <h2 className="text-md md:text-2xl font-semibold">Job Details</h2>
                  </div>
                  
                  {/* Auto Parse Section */}
                  <div className="mb-6 p-4 glass-red rounded-lg transform transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center mb-3">
                      <Link className="w-5 h-5 text-red-500 mr-2" />
                      <h3 className="font-medium">Auto Parse Job Details</h3>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        className="glass-input flex-1"
                        placeholder="Paste job URL here..."
                      />
                      <Button
                        onClick={() => parseJobUrl(false)}
                        disabled={isParsing}
                        className="glass-button hover:glass-red"
                      >
                        {isParsing ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Parse'
                        )}
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>Supported sites:</span>
                      {supportedSites.map((site, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <site.icon className="w-4 h-4" />
                          <span>{site.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName" 
                          value={companyName} 
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="glass-input mt-1" 
                          placeholder="Google, Microsoft, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle" 
                          value={jobTitle} 
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="glass-input mt-1" 
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="maxCharacters">Max Characters</Label>
                      <Input 
                        type='number'
                        id="maxCharacters" 
                        value={maxCharacters} 
                        onChange={(e) => setMaxCharacters(parseInt(e.target.value))}
                        className="glass-input mt-1" 
                        placeholder="1500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobDescription">Job Description</Label>
                      <Textarea
                        id="jobDescription" 
                        value={jobDescription} 
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="glass-input mt-1 min-h-[300px]" 
                        placeholder="Paste the complete job description here..."
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="custom-questions" className="mt-0 animate-fade-in">
                  <div className="flex items-center mb-6">
                    <Sparkles className="w-6 h-6 text-red-500 mr-2" />
                    <h2 className="text-md md:text-2xl font-semibold">Custom Questions</h2>
                  </div>
                  
                  {/* Auto Parse Section for Custom Questions */}
                  <div className="mb-6 p-4 glass-red rounded-lg transform transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center mb-3">
                      <Link className="w-5 h-5 text-red-500 mr-2" />
                      <h3 className="font-medium">Auto Parse Job Details</h3>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Input
                        value={customJobUrl}
                        onChange={(e) => setCustomJobUrl(e.target.value)}
                        className="glass-input flex-1"
                        placeholder="Paste job URL here..."
                      />
                      <Button
                        onClick={() => parseJobUrl(true)}
                        disabled={isParsingCustom}
                        className="glass-button hover:glass-red"
                      >
                        {isParsingCustom ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          'Parse'
                        )}
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>Supported sites:</span>
                      {supportedSites.map((site, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <site.icon className="w-4 h-4" />
                          <span>{site.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="customCompanyName">Company Name</Label>
                        <Input
                          id="customCompanyName" 
                          value={customCompanyName} 
                          onChange={(e) => setCustomCompanyName(e.target.value)}
                          className="glass-input mt-1" 
                          placeholder="Google, Microsoft, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="customJobTitle">Job Title</Label>
                        <Input
                          id="customJobTitle" 
                          value={customJobTitle} 
                          onChange={(e) => setCustomJobTitle(e.target.value)}
                          className="glass-input mt-1" 
                          placeholder="Software Engineer"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="customMaxCharacters">Max Characters</Label>
                      <Input 
                        type='number'
                        id="customMaxCharacters" 
                        value={customMaxCharacters} 
                        onChange={(e) => setCustomMaxCharacters(parseInt(e.target.value))}
                        className="glass-input mt-1" 
                        placeholder="1500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customJobDescription">Job Description</Label>
                      <Textarea
                        id="customJobDescription" 
                        value={customJobDescription} 
                        onChange={(e) => setCustomJobDescription(e.target.value)}
                        className="glass-input mt-1 min-h-[200px]" 
                        placeholder="Paste the complete job description here..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="customQuestions">Questions</Label>
                      <Textarea
                        id="customQuestions" 
                        value={customQuestions} 
                        onChange={(e) => setCustomQuestions(e.target.value)}
                        className="glass-input mt-1 min-h-[200px]" 
                        placeholder="Enter your custom questions here, one per line:&#10;&#10;1. Why do you want to work for this company?&#10;2. What are your greatest strengths?&#10;3. Describe a challenging project you worked on..."
                      />
                    </div>
                  </div>
                </TabsContent>

                <Button
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button py-3 mt-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" /> 
                      Generate {activeTab === 'cover-letter' ? 'Cover Letter' : 'Answers'}
                    </>
                  )}
                </Button>
              </Card>

              <Card className="glass-card p-4 md:p-6 transition-all duration-500 ease-in-out transform" ref={sectionRef}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Sparkles className="w-6 h-6 text-red-500 mr-2" />
                    <h2 className="text-md md:text-2xl font-semibold">
                      Generated {activeTab === 'cover-letter' ? 'Cover Letter' : 'Answers'}
                    </h2>
                  </div>
                  {((activeTab === 'cover-letter' && generatedLetter) || 
                    (activeTab === 'custom-questions' && generatedAnswers)) && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleCopy} 
                        variant="outline" 
                        size="sm" 
                        className="glass-button hover:glass-red transition-all duration-300 hover:scale-105"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={handleDownload} 
                        variant="outline" 
                        size="sm" 
                        className="glass-button hover:glass-red transition-all duration-300 hover:scale-105"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="min-h-[400px]">
                  {((activeTab === 'cover-letter' && generatedLetter) || 
                    (activeTab === 'custom-questions' && generatedAnswers)) ? (
                    <div className="glass-input p-4 whitespace-pre-wrap text-sm leading-relaxed">
                      {activeTab === 'cover-letter' ? generatedLetter : generatedAnswers}
                    </div>
                  ) : (
                    <div className="glass-red rounded-lg p-8 text-center text-muted-foreground animate-pulse">
                      <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>
                        Your AI-generated {activeTab === 'cover-letter' ? 'cover letter' : 'answers'} will appear here
                      </p>
                      <p className="text-sm mt-2">
                        Fill in the {activeTab === 'cover-letter' ? 'job details' : 'questions'} and click generate
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
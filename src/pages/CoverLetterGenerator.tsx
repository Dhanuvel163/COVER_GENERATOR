
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Sparkles, Copy, Download } from "lucide-react";
import GlassBackground from "@/components/GlassBackground";
import Header from '@/components/Header';
import { generateCover } from "@/api/profile";
import { toast } from "sonner";
import { useUserStore } from '@/store/userStore';
import { errorStyle } from '@/lib/toastStyles'

const CoverLetterGenerator = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [maxCharacters, setMaxCharacters] = useState(1500);
  const [isGenerating, setIsGenerating] = useState(false);
  const token = useUserStore((state) => state?.token);
  const sectionRef = useRef(null);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error("Job Description is mandatory.",errorStyle);
      return;
    }else if (!companyName.trim()) {
      toast.error("Company Name is mandatory.",errorStyle);
      return;
    }else if (!jobTitle.trim()) {
      toast.error("Job Title is mandatory.",errorStyle);
      return;
    }
    setIsGenerating(true);
    const response = await generateCover(token,{jobDescription,companyName,jobTitle,maxCharacters})
    setGeneratedLetter(response.data?.coverLetter);
    setIsGenerating(false);
    sectionRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'application/docx' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${companyName || 'job'}.docx`;
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
              AI Cover Letter Generator
            </h1>
            <p className="text-muted-foreground">
              Generate personalized cover letters using AI based on job descriptions
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="glass-card p-4 md:p-6">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-red-500 mr-2" />
                <h2 className="text-md md:text-2xl font-semibold">Job Details</h2>
              </div>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                      className="glass-input mt-1" placeholder="Google, Microsoft, etc."/>
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
                      className="glass-input mt-1" placeholder="Software Engineer"/>
                  </div>
                </div>
                <div className="grid md:grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="maxCharacters">Max Characters</Label>
                    <Input type='number'
                      id="maxCharacters" value={maxCharacters} onChange={(e) => setMaxCharacters(parseInt(e.target.value))}
                      className="glass-input mt-1" placeholder="1500"/>
                  </div>
                </div>
                <div>
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                    className="glass-input mt-1 min-h-[300px]" placeholder="Paste the complete job description here..."/>
                </div>

                <Button
                  onClick={handleGenerate} disabled={!jobDescription.trim() || isGenerating}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button py-3">
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    <><Sparkles className="w-4 h-4 mr-2" /> Generate Cover Letter</>
                  )}
                </Button>
              </div>
            </Card>
            <Card className="glass-card p-4 md:p-6" ref={sectionRef}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Sparkles className="w-6 h-6 text-red-500 mr-2" />
                  <h2 className="text-md md:text-2xl font-semibold">Generated Cover Letter</h2>
                </div>
                {generatedLetter && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleCopy} variant="outline" size="sm" className="glass-button hover:glass-red">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleDownload} variant="outline" size="sm" className="glass-button hover:glass-red">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="min-h-[400px]">
                {generatedLetter ? (
                  <div className="glass-input p-4 whitespace-pre-wrap text-sm leading-relaxed">
                    {generatedLetter}
                  </div>
                ) : (
                  <div className="glass-red rounded-lg p-8 text-center text-muted-foreground">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Your AI-generated cover letter will appear here</p>
                    <p className="text-sm mt-2">Fill in the job details and click generate</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;

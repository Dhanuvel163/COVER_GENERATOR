
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Sparkles, Copy, Download } from "lucide-react";
import GlassBackground from "@/components/GlassBackground";
import Header from '@/components/Header';

const CoverLetterGenerator = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation - this will be replaced with actual AI call to Supabase Edge Function
    setTimeout(() => {
      const mockLetter = `Dear Hiring Manager,
I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With my background in software engineering and passion for innovative technology solutions, I am excited about the opportunity to contribute to your team.

Based on the job description you provided, I believe my skills in React, Node.js, and modern web development align perfectly with your requirements. My experience in building scalable applications and working with cross-functional teams has prepared me to make an immediate impact at ${companyName}.

I am particularly drawn to ${companyName}'s commitment to innovation and would welcome the opportunity to discuss how my technical expertise and collaborative approach can contribute to your continued success.

Thank you for considering my application. I look forward to hearing from you.

Sincerely,
[Your Name]`;
      
      setGeneratedLetter(mockLetter);
      setIsGenerating(false);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${companyName || 'job'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GlassBackground />
      <Header/>
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              AI Cover Letter Generator
            </h1>
            <p className="text-muted-foreground">
              Generate personalized cover letters using AI based on job descriptions
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="glass-card p-6">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-red-500 mr-2" />
                <h2 className="text-2xl font-semibold">Job Details</h2>
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

            {/* Output Section */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Sparkles className="w-6 h-6 text-red-500 mr-2" />
                  <h2 className="text-2xl font-semibold">Generated Cover Letter</h2>
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

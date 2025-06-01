
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, User, Save, FileText } from "lucide-react";
import GlassBackground from "@/components/GlassBackground";

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    jobTitle: '',
    experience: '',
    skills: '',
    education: '',
    summary: ''
  });
  const [resume, setResume] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // This will be connected to Supabase later
    console.log('Profile data:', profile);
    console.log('Resume file:', resume);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GlassBackground />
      
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Professional Profile
            </h1>
            <p className="text-muted-foreground">
              Build your professional profile to generate better cover letters
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Personal Information */}
            <Card className="glass-card p-6 lg:col-span-2">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-red-500 mr-2" />
                <h2 className="text-2xl font-semibold">Personal Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="glass-input mt-1"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="glass-input mt-1"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="glass-input mt-1"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Current Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={profile.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      className="glass-input mt-1"
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={profile.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="glass-input mt-1"
                    placeholder="5 years"
                  />
                </div>

                <div>
                  <Label htmlFor="skills">Key Skills</Label>
                  <Textarea
                    id="skills"
                    value={profile.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    className="glass-input mt-1 min-h-[100px]"
                    placeholder="React, Node.js, Python, MongoDB..."
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education</Label>
                  <Textarea
                    id="education"
                    value={profile.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="glass-input mt-1 min-h-[80px]"
                    placeholder="Bachelor's in Computer Science, XYZ University"
                  />
                </div>

                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={profile.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    className="glass-input mt-1 min-h-[120px]"
                    placeholder="Brief summary of your professional background and achievements..."
                  />
                </div>
              </div>
            </Card>

            {/* Resume Upload */}
            <Card className="glass-card p-6">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-red-500 mr-2" />
                <h2 className="text-xl font-semibold">Resume</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-red-200 rounded-lg p-6 text-center glass-red">
                  <Upload className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your resume (PDF, DOC, DOCX)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Label htmlFor="resume-upload" className="cursor-pointer">
                    <Button type="button" className="glass-button hover:glass-red">
                      Choose File
                    </Button>
                  </Label>
                  {resume && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {resume.name}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

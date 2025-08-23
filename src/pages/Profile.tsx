import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, User, Save, FileText } from "lucide-react";
import GlassBackground from "@/components/GlassBackground";
import { fetchUserProfile } from "@/api/profile";
import { updateUserProfile } from "@/api/profile";
import { uploadUserResume } from "@/api/profile";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import Header from '@/components/Header';
import { errorStyle, successStyle } from '@/lib/toastStyles';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '', email: '', phone: '', jobTitle: '', 
    experience: '', skills: '', education: '', summary: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const token = useUserStore((state) => state?.token);

  const getProfile = async () => {
    if (!token) return;
    try {
      const { data } = await fetchUserProfile(token);
      const user = data.user || {};
      setProfile({
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        jobTitle: user.currentJobTitle || '',
        experience: user.yearsOfExperience || '',
        skills: user.keySkills?.join(", ") || '',
        education: user.education?.join(", ") || '',
        summary: user.summary || ''
      });
      setResumeUrl(user.resumeUrl)
      setUser(user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [token, setUser]);

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      if (!token) {
        toast.error("You must be logged in to upload a resume.",errorStyle);
        return;
      }
      try {
        const formData = new FormData();
        formData.append("resume", file);
        await uploadUserResume(token, formData);
        toast.success("Resume uploaded successfully!",successStyle);
        await getProfile()
      } catch (error) {
        console.error("Resume upload error:", error);
        if(error?.response?.data?.show_message){
          toast.error(error?.response?.data?.message,errorStyle);
        }else{
          toast.error("Failed to upload resume.",errorStyle);
        }
      }
    }
  };

  const handleResumeButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!token) return;
    try {
      if (!profile.fullName?.trim()) {
        toast.error("Name is mandatory.",errorStyle);
        return;
      }else if (!profile.jobTitle?.trim()) {
        toast.error("Job title is mandatory.",errorStyle);
        return;
      }else if (!profile.experience) {
        toast.error("Years of experience is mandatory.",errorStyle);
        return;
      }else if (!profile.skills?.trim()) {
        toast.error("Skills is mandatory.",errorStyle);
        return;
      }
      console.info("Saving profile with data:", profile);
      const payload = {
        name: profile.fullName,
        currentJobTitle: profile.jobTitle,
        yearsOfExperience: profile.experience,
        keySkills: profile.skills?.split(",").map((s) => s.trim()),
        education: profile.education?.split(",").map((s) => s.trim()),
        summary: profile.summary,
      };
      await updateUserProfile(token, payload);
      toast.success("Profile updated successfully!",successStyle);
    } catch (error) {
      console.error("Failed to update profile:", error);
      if(error?.response?.data?.show_message){
        toast.error(error?.response?.data?.message,errorStyle);
      }else{
        toast.error("Failed to update profile.",errorStyle);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GlassBackground />
      <Header/>
      <div className="relative z-10 px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Professional Profile
            </h1>
            <p className="text-muted-foreground">
              Build your professional profile to generate better cover letters
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="glass-card p-4 md:p-6 lg:col-span-2">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-red-500 mr-2" />
                <h2 className="text-md md:text-2xl font-semibold">Personal Information</h2>
              </div>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName" value={profile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="glass-input mt-1" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email" type="email" disabled
                      value={profile.email} onChange={(e) => handleInputChange('email', e.target.value)}
                      className="glass-input mt-1" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle">Current Job Title</Label>
                    <Input
                      id="jobTitle" value={profile.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      className="glass-input mt-1" placeholder="Software Engineer" />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience" type='number' value={profile.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="glass-input mt-1" placeholder="5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="skills">Key Skills</Label>
                  <Textarea
                    id="skills" value={profile.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    className="glass-input mt-1 min-h-[100px]"
                    placeholder="React, Node.js, Python, MongoDB..." />
                </div>
                <Button onClick={handleSave}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </Card>
            <Card className="glass-card p-4 md:p-6">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-red-500 mr-2" />
                <h2 className="text-md md:text-2xl font-semibold">Resume</h2>
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-red-200 rounded-lg p-6 text-center glass-red">
                  <Upload className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">Upload your resume (PDF, DOC, DOCX)</p>
                  <input
                    type="file" accept=".pdf,.doc,.docx" id="resume-upload" ref={fileInputRef}
                    onChange={handleResumeUpload} className="hidden"/>
                  <Button type="button" className="glass-button hover:glass-red"
                    onClick={handleResumeButtonClick}>
                    Choose File
                  </Button>
                  {resumeUrl && (
                    <div className='max-w-[200px] md:max-w-none mx-auto'>
                      <a href={resumeUrl} target='_blank'>
                        <p className="text-sm text-green-600 mt-2 break-words cursor-pointer underline">✓ {resumeUrl?.split("/").pop()}</p>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

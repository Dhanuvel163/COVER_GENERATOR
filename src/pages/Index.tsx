import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Eye, User, Sparkles, FileText, Upload, Zap, Link, MessageSquare, Download, Copy, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/AuthModal";
import GlassBackground from "@/components/GlassBackground";
import { useUserStore } from "@/store/userStore";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const mainFeatures = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Professional Profile",
      description: "Create and manage your professional profile with resume upload capabilities",
      catchyLine: "Your Career, Perfectly Profiled"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes job descriptions and creates tailored cover letters",
      catchyLine: "Smart AI, Smarter Applications"
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Instant Generation",
      description: "Get professional cover letters in seconds, perfectly matched to any job",
      catchyLine: "From Job Post to Perfect Letter"
    }
  ];

  const allFeatures = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "AI Cover Letters",
      description: "Generate personalized, professional cover letters tailored to any job description in seconds",
      catchyLine: "Your Perfect Introduction",
      color: "from-blue-500 to-blue-600",
      delay: "0s"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Custom Q&A Generator",
      description: "Get AI-powered answers to custom interview questions and application prompts",
      catchyLine: "Never Run Out of Words",
      color: "from-green-500 to-green-600",
      delay: "0.1s"
    },
    {
      icon: <Link className="w-8 h-8" />,
      title: "Smart URL Parser",
      description: "Auto-extract job details from LinkedIn, Naukri, and other job sites instantly",
      catchyLine: "One Click, All Details",
      color: "from-purple-500 to-purple-600",
      delay: "0.2s"
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Resume Upload",
      description: "Upload and manage your resume (PDF, DOC, DOCX) for better AI personalization",
      catchyLine: "Your Story, Our Intelligence",
      color: "from-orange-500 to-orange-600",
      delay: "0.3s"
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Profile Management",
      description: "Comprehensive profile with skills, experience, and education for perfect matching",
      catchyLine: "Build Once, Apply Everywhere",
      color: "from-red-500 to-red-600",
      delay: "0.4s"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Character Control",
      description: "Set custom character limits to match specific application requirements",
      catchyLine: "Perfect Length, Every Time",
      color: "from-yellow-500 to-yellow-600",
      delay: "0.5s"
    },
    {
      icon: <Copy className="w-8 h-8" />,
      title: "Easy Copy & Share",
      description: "One-click copy to clipboard and seamless sharing across platforms",
      catchyLine: "Copy, Paste, Conquer",
      color: "from-teal-500 to-teal-600",
      delay: "0.6s"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Options",
      description: "Download your generated content as formatted documents ready for submission",
      catchyLine: "Professional Format, Always",
      color: "from-indigo-500 to-indigo-600",
      delay: "0.7s"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Platform Support",
      description: "Works seamlessly across all devices and integrates with major job platforms",
      catchyLine: "Anywhere, Anytime, Any Device",
      color: "from-pink-500 to-pink-600",
      delay: "0.8s"
    }
  ];

  const quickActions = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Build Profile",
      description: "Set up your professional profile",
      action: () => navigate('/profile'),
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Generate Cover Letter",
      description: "Create AI-powered cover letters",
      action: () => navigate('/generator'),
      color: "from-red-600 to-red-700"
    }
  ];

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <GlassBackground />
        <Header handleAuth={handleAuth}/>
        <main className="relative z-10 px-6 py-6 md:py-16">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="text-[9px] md:text-xs mb-6 glass-red text-red-500 border-red-500/30 animate-fade-in hover:text-white">
              ✨ AI-Powered Cover Letter Generator
            </Badge>
            <h1 className="text-3xl md:text-6xl font-bold mb-6 animate-fade-in">
              Craft Perfect
              <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Cover Letters
              </span>
              in Seconds
            </h1>
            <p className="text-sm md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-in">
              Transform your job applications with AI-generated cover letters tailored to any job description. 
              Upload your profile, paste the JD, and let our AI create compelling cover letters that get you noticed.
            </p>
            {isLoggedIn ? (
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
                {quickActions.map((action, index) => (
                  <Card  key={index} onClick={action.action}
                    className="glass-card p-6 cursor-pointer hover:scale-105 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${action.color} mx-auto mb-4 flex items-center justify-center text-white`}>
                      {action.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                    <p className="text-muted-foreground">{action.description}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in">
                <Button size="lg" onClick={() => handleAuth('signup')}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg glass-button">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
            <hr className='mb-16'/>
            
            {/* Main Features Section */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
              {mainFeatures.map((feature, index) => (
                <Card key={index} style={{ animationDelay: `${index * 0.2}s` }}
                  className="glass-card p-6 text-center hover:glass-red transition-all duration-500 animate-fade-in group hover:scale-105 hover:shadow-2xl">
                  <div className="w-12 h-12 rounded-xl glass-red mx-auto mb-4 flex items-center justify-center text-red-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm font-medium text-red-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {feature.catchyLine}
                  </p>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>

            {/* All Features Showcase */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Everything You Need to Land Your Dream Job
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover all the powerful features that make job applications effortless and effective
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {allFeatures.map((feature, index) => (
                  <Card 
                    key={index} 
                    className="glass-card p-6 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer feature-card"
                    style={{ animationDelay: feature.delay }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mx-auto mb-4 flex items-center justify-center text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-medium text-transparent bg-gradient-to-r from-red-500 to-red-600 bg-clip-text mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {feature.catchyLine}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full glass-red animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full glass animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full glass-red animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode={authMode}/>
      </div>
      <Footer/>
    </>
  );
};

export default Index;

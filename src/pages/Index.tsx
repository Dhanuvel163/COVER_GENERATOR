
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Eye, LogIn, User } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import GlassBackground from "@/components/GlassBackground";

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const features = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Professional Profile",
      description: "Create and manage your professional profile with resume upload capabilities"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes job descriptions and creates tailored cover letters"
    },
    {
      icon: <ArrowRight className="w-6 h-6" />,
      title: "Instant Generation",
      description: "Get professional cover letters in seconds, perfectly matched to any job"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GlassBackground />
      
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl glass-red flex items-center justify-center">
              <span className="text-red-500 font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              CoverCraft AI
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => handleAuth('login')}
              className="glass-button hover:glass-red"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button 
              onClick={() => handleAuth('signup')}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button"
            >
              <User className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 glass-red text-red-500 border-red-500/30 animate-fade-in">
            ✨ AI-Powered Cover Letter Generator
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Craft Perfect
            <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Cover Letters
            </span>
            in Seconds
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-in">
            Transform your job applications with AI-generated cover letters tailored to any job description. 
            Upload your profile, paste the JD, and let our AI create compelling cover letters that get you noticed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in">
            <Button 
              size="lg"
              onClick={() => handleAuth('signup')}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg glass-button"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="glass-button hover:glass-red px-8 py-4 text-lg"
            >
              <Eye className="mr-2 w-5 h-5" />
              See Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass-card p-6 text-center hover:glass-red transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-12 h-12 rounded-xl glass-red mx-auto mb-4 flex items-center justify-center text-red-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full glass-red animate-float opacity-60" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full glass animate-float opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full glass-red animate-float opacity-50" style={{ animationDelay: '2s' }} />

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </div>
  );
};

export default Index;

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Eye, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/AuthModal";
import GlassBackground from "@/components/GlassBackground";
import { useUserStore } from "@/store/userStore";
import Header from '@/components/Header';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

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
    <div className="min-h-screen relative overflow-hidden">
      <GlassBackground />
      <Header handleAuth={handleAuth}/>
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

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} style={{ animationDelay: `${index * 0.2}s` }}
                className="glass-card p-6 text-center hover:glass-red transition-all duration-300 animate-fade-in">
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
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full glass-red animate-float opacity-60" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full glass animate-float opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full glass-red animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode={authMode}/>
    </div>
  );
};

export default Index;

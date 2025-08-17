import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LogIn, User } from "lucide-react";
import { auth, GoogleAuthProvider, signInWithPopup } from "@/firebase";
import { googleAuthApi } from "@/api/auth";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { errorStyle, successStyle } from '@/lib/toastStyles';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, mode }: AuthModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
          auth, "recaptcha-container",
          {
            size: "invisible",
            callback: () => {},
          },
        );
      }
      const appVerifier = (window as any).recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setShowOtpInput(true);
      toast.success("OTP sent successfully!",successStyle);
    } catch (error: any) {
      toast.error(error?.message || "Failed to send OTP",errorStyle);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!confirmationResult) {
        toast.error("No OTP request found. Please try again.",errorStyle);
        setIsLoading(false);
        return;
      }
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      const tokenId = await user.getIdToken();
      const response = await googleAuthApi({
        idToken: tokenId,
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        phone_number: user.phoneNumber,
        photoURL: user.photoURL,
      });
      useUserStore.getState().setIsLoggedIn(response.data?.token);
      toast.success("Phone authentication successful!",successStyle);
      setShowOtpInput(false);
      onClose();
      navigate('/profile');
    } catch (error: any) {
      toast.error(error?.message || "Invalid OTP",errorStyle);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const tokenId = await user.getIdToken();
      const response = await googleAuthApi({
        idToken: tokenId,
        email: user.email,
        name: user.displayName,
        uid: user.uid,
        phone_number: user.phoneNumber,
        photoURL: user.photoURL,
      });
      useUserStore.getState().setIsLoggedIn(response.data?.token);
      toast.success("Google authentication successful!",successStyle);
      onClose();
      navigate('/profile');
    } catch (error: any) {
      console.error("Google authentication error:", error);
      toast.error(error?.message || "Google authentication failed.",errorStyle);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 max-w-md">
        <div id="recaptcha-container" /> {/* Recaptcha container */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Button onClick={handleGoogleAuth} variant="outline"
            className="w-full glass-button hover:glass-red py-3" disabled={isLoading}>
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </Button>

          {/* <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
              or
            </span>
          </div>

          {!showOtpInput ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone" type="tel"
                  placeholder="+917231234567" value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="glass-input mt-1" required
                />
                <div id='recaptcha-container'></div>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button"
                type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <LogIn className="w-4 h-4 mr-2" />
                )}
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp" type="text" placeholder="123456"
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                  className="glass-input mt-1 text-center text-lg tracking-widest"
                  maxLength={6} required />
                <p className="text-sm text-muted-foreground mt-1">
                  OTP sent to {phoneNumber}
                </p>
              </div>
              <Button 
                type="submit" disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button">
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <User className="w-4 h-4 mr-2" />
                  )}
                Verify & {mode === 'login' ? 'Login' : 'Sign Up'}
              </Button>
              <Button
                type="button" variant="ghost" onClick={() => setShowOtpInput(false)}
                className="w-full glass-button">
                Back to Phone Number
              </Button>
            </form>
          )} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

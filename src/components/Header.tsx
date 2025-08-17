import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { LogIn, User, FileText } from "lucide-react";
import { useNavigate,  } from "react-router-dom";
import { toast } from "sonner";
import { useLocation } from 'react-router-dom';
import { successStyle } from "@/lib/toastStyles";

const Header = ({handleAuth=(type)=>{}}) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const removeIsLoggedIn = useUserStore((state) => state.removeIsLoggedIn);
  const clearUser = useUserStore((state) => state.clearUser);
  const location = useLocation();
  const { pathname } = location;
  const logout = () => {
    removeIsLoggedIn();
    clearUser()
    toast.success("Logged out successfully!",successStyle);
    navigate("/");
  };
  const defaultButtonClass = "glass-button hover:glass-red hover:text-black"
  const activeButtonClass = "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button"
  return (
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl glass-red flex items-center justify-center">
              <span className="text-red-500 font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hidden md:block">
              Cover AI
            </span>
          </div>
          {!isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Button onClick={() => handleAuth('login')}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className={(pathname=="/profile")?activeButtonClass:defaultButtonClass}
                onClick={() => navigate('/profile')}>
                <User className="w-4 h-4 md:mr-2" />
                <span className="hidden md:block">
                  Profile
                </span>
              </Button>
              <Button variant="ghost" className={(pathname=="/generator")?activeButtonClass:defaultButtonClass}
                onClick={() => navigate('/generator')}>
                <FileText className="w-4 h-4 md:mr-2" />
                <span className="hidden md:block">
                  Generate
                </span>
              </Button>
              <Button variant="ghost" className="glass-button hover:glass-red hover:text-black" 
                onClick={() => logout()}>
                <LogIn className="w-4 h-4 md:mr-2" />
                <span className="hidden md:block">
                  Logout
                </span>
              </Button>
            </div>
          )}
        </nav>
      </header>
  );
};

export default Header;

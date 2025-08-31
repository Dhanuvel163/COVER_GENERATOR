import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative z-10 py-6 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Cover AI. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <Link to="/privacy-policy" className="hover:text-red-500 transition-colors duration-300 underline">Privacy Policy</Link>
          <Link to="/contact-us" className="hover:text-red-500 transition-colors duration-300 underline">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

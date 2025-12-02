import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#f499ba]/30 shadow-lg shadow-[#f7b3cb]/10">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-[#f180a9] rounded-full animate-pulse"></div>
            <span className="text-[#f180a9] font-mono text-sm tracking-wider">SYSTEM</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative text-gray-700 hover:text-[#f180a9] font-medium transition-all duration-300 group"
            >
              <span className="relative z-10">Inicio</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f180a9] via-[#f499ba] to-[#f7b3cb] group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to="/lista" 
              className="relative text-gray-700 hover:text-[#f180a9] font-medium transition-all duration-300 group"
            >
              <span className="relative z-10">Caninas de Lima</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f180a9] via-[#f499ba] to-[#f7b3cb] group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to="/marco-legal" 
              className="relative text-gray-700 hover:text-[#f180a9] font-medium transition-all duration-300 group"
            >
              <span className="relative z-10">Marco Legal</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f180a9] via-[#f499ba] to-[#f7b3cb] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


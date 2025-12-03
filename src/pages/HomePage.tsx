import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-[#f7b3cb]/20 border border-[#f499ba]/40 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-[#f180a9] rounded-full animate-pulse"></div>
              <span className="text-[#f180a9] font-mono text-xs tracking-wider">SISTEMA ACTIVO</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#f180a9] via-[#f499ba] to-[#f7b3cb] bg-clip-text text-transparent">
            Lista de Infieles de Lima
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Hombre precavido vale por dos
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          <Link
            to="/lista"
            className="group relative p-8 bg-gray-50 border border-gray-200 rounded-xl backdrop-blur-sm hover:border-[#f499ba]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#f7b3cb]/20 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f180a9]/0 to-[#f7b3cb]/0 group-hover:from-[#f180a9]/10 group-hover:to-[#f7b3cb]/10 rounded-xl transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-[#f180a9]/20 to-[#f7b3cb]/20 rounded-lg flex items-center justify-center border border-[#f499ba]/30">
                <svg className="w-6 h-6 text-[#f180a9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#f180a9] transition-colors">Lista de Infieles</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Visualiza y gestiona el registro completo de todas las infieles en el sistema
              </p>
            </div>
          </Link>

          <Link
            to="/lista?add=true"
            className="group relative p-8 bg-gray-50 border border-gray-200 rounded-xl backdrop-blur-sm hover:border-[#f499ba]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#f7b3cb]/20 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f180a9]/0 to-[#f7b3cb]/0 group-hover:from-[#f180a9]/10 group-hover:to-[#f7b3cb]/10 rounded-xl transition-all duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-[#f180a9]/20 to-[#f7b3cb]/20 rounded-lg flex items-center justify-center border border-[#f499ba]/30">
                <svg className="w-6 h-6 text-[#f180a9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-[#f180a9] transition-colors">Agregar Canina</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Solicita la incorporación de nuevos infieles al sistema
              </p>
            </div>
          </Link>
        </div>

        {/* Footer decorativo */}
        <div className="text-center pt-12 border-t border-gray-200">
          <p className="text-gray-500 text-sm font-mono">
            &gt; Sistema de Gestión de Infieles v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


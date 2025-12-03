interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  persona: {
    id: string;
    nombres: string;
    apellidos: string;
    historia: string;
    votosYala: number;
    votosNoYala: number;
  } | null;
  onVote: (id: string, vote: 'yala' | 'noyala') => void;
}


const Modal = ({ isOpen, onClose, persona, onVote }: ModalProps) => {
  if (!isOpen || !persona) return null;

  // Funciones para manejar localStorage de votos
  const getVotedPersonas = (): string[] => {
    try {
      const votes = localStorage.getItem('votes');
      return votes ? JSON.parse(votes) : [];
    } catch (error) {
      console.error('Error al leer votos de localStorage:', error);
      return [];
    }
  };

  const hasVoted = (personaId: string): boolean => {
    const votedPersonas = getVotedPersonas();
    return votedPersonas.includes(personaId);
  };

  const saveVote = (personaId: string) => {
    try {
      const votedPersonas = getVotedPersonas();
      if (!votedPersonas.includes(personaId)) {
        votedPersonas.push(personaId);
        localStorage.setItem('votes', JSON.stringify(votedPersonas));
      }
    } catch (error) {
      console.error('Error al guardar voto en localStorage:', error);
    }
  };

  const totalVotos = persona.votosYala + persona.votosNoYala;
  const porcentajeYala = totalVotos > 0 ? Math.round((persona.votosYala / totalVotos) * 100) : 0;
  const porcentajeNoYala = totalVotos > 0 ? Math.round((persona.votosNoYala / totalVotos) * 100) : 0;

  // Verificar si el usuario ya votó por esta persona
  const yaVoto = hasVoted(persona.id);

  const handleVote = (vote: 'yala' | 'noyala') => {
    // Verificar si ya votó
    if (yaVoto) {
      alert('Ya votaste por esta persona');
      return;
    }

    // Realizar el voto
    onVote(persona.id, vote);

    // Guardar en localStorage que ya votó
    saveVote(persona.id);
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden border border-[#f499ba]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal */}
        <div className="bg-gradient-to-r from-[#f180a9]/10 via-[#f499ba]/10 to-[#f7b3cb]/10 px-6 py-5 border-b border-[#f499ba]/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f180a9] to-[#f499ba] bg-clip-text text-transparent">
                {persona.nombres} {persona.apellidos}
              </h2>
              <p className="text-sm text-gray-500 mt-1">Historia</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#f180a9] transition-colors duration-200 p-2 hover:bg-[#f7b3cb]/10 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {persona.historia}
            </p>
          </div>
        </div>

        {/* Sección de Votación */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#f180a9]/5 via-[#f499ba]/5 to-[#f7b3cb]/5 border-t border-[#f499ba]/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Verdad o Mentira?</h3>

          {/* Mensaje si ya votó */}
          {yaVoto && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 text-center font-medium">
                ✓ Ya votaste por esta persona
              </p>
            </div>
          )}

          {/* Botones de Votación */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => handleVote('yala')}
              disabled={yaVoto}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-150 shadow-md focus:outline-none ${yaVoto
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 active:scale-95 active:shadow-sm hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Verdad</span>
            </button>

            <button
              onClick={() => handleVote('noyala')}
              disabled={yaVoto}
              className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-150 shadow-md focus:outline-none ${yaVoto
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 active:scale-95 active:shadow-sm hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Mentira</span>
            </button>
          </div>

          {/* Resultados de Votación */}
          {totalVotos > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Verdad</span>
                <span className="text-gray-800 font-semibold">{persona.votosYala} votos ({porcentajeYala}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${porcentajeYala}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Mentira</span>
                <span className="text-gray-800 font-semibold">{persona.votosNoYala} votos ({porcentajeNoYala}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${porcentajeNoYala}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-500 text-center mt-2">
                Total: {totalVotos} {totalVotos === 1 ? 'voto' : 'votos'}
              </p>
            </div>
          )}

          {totalVotos === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">
              Sé el primero en votar
            </p>
          )}
        </div>

        {/* Footer del Modal */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gradient-to-r from-[#f180a9] to-[#f499ba] text-white rounded-lg font-medium hover:from-[#f499ba] hover:to-[#f7b3cb] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


import { useState } from 'react';
import type { Persona } from '../types/Persona';
import { DISTRITOS_LIMA, UNIVERSIDADES_LIMA } from '../constants/data';

interface PersonaFormProps {
  persona?: Persona | null;
  onSubmit: (persona: Omit<Persona, 'id'>) => void;
  onCancel: () => void;
}

const PersonaForm = ({ persona, onSubmit, onCancel }: PersonaFormProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert('Debes aceptar el Marco Legal para continuar.');
      return;
    }

    const formData = new FormData(e.currentTarget);

    onSubmit({
      nombres: formData.get('nombres') as string,
      apellidos: formData.get('apellidos') as string,
      edad: parseInt(formData.get('edad') as string),
      distrito: formData.get('distrito') as string,
      instagram: formData.get('instagram') as string,
      universidad: formData.get('universidad') as string,
      historia: formData.get('historia') as string,
      votosYala: persona?.votosYala || 0,
      votosNoYala: persona?.votosNoYala || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Aviso de Parodia */}
      <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-6 mb-6">
        <div className="flex items-start space-x-3">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <h3 className="font-bold text-amber-900 text-lg mb-2">Aviso Importante</h3>
            <p className="text-amber-800 leading-relaxed">
              Todo el contenido publicado en este foro es <strong>ficción</strong>. Las historias pueden contener parodia, sátira o humor. El contenido no tiene relación con la realidad.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de tu Personaje Ficticio *
          </label>
          <input
            type="text"
            name="nombres"
            required
            defaultValue={persona?.nombres || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apellidos de tu Personaje Ficticio *
          </label>
          <input
            type="text"
            name="apellidos"
            required
            defaultValue={persona?.apellidos || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Edad de tu Personaje Ficticio *
          </label>
          <input
            type="number"
            name="edad"
            required
            min="1"
            defaultValue={persona?.edad || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distrito de tu Personaje Ficticio*
          </label>
          <select
            name="distrito"
            required
            defaultValue={persona?.distrito || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all bg-white"
          >
            <option value="">Selecciona un distrito</option>
            {DISTRITOS_LIMA.map((distrito) => (
              <option key={distrito} value={distrito}>
                {distrito}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instagram de tu Personaje Ficticio
          </label>
          <input
            type="text"
            name="instagram"
            defaultValue={persona?.instagram || ''}
            placeholder="@usuario"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Universidad de tu Personaje Ficticio
          </label>
          <select
            name="universidad"
            defaultValue={persona?.universidad || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all bg-white"
          >
            <option value="">Selecciona una universidad</option>
            {UNIVERSIDADES_LIMA.map((universidad) => (
              <option key={universidad} value={universidad}>
                {universidad}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Historia Ficticia *
        </label>
        <textarea
          name="historia"
          required
          rows={6}
          defaultValue={persona?.historia || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all resize-none"
          placeholder="Escribe la historia de esta persona..."
        />
      </div>

      {/* Casilla de Aceptación Obligatoria */}
      <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
        <label className="flex items-start space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-1 w-5 h-5 text-[#f180a9] border-gray-300 rounded focus:ring-2 focus:ring-[#f499ba] cursor-pointer"
          />
          <span className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
            He leído y acepto el{' '}
            <a
              href="/marco-legal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f180a9] font-semibold hover:text-[#f499ba] underline"
            >
              Marco Legal
            </a>
            {' '}y confirmo que la información que estoy proporcionando es <strong>ficticia</strong>, se publica bajo el propósito de parodia/sátira, y no usaré datos personales reales de ninguna persona.
          </span>
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-[#f180a9] to-[#f499ba] text-white rounded-lg font-medium hover:from-[#f499ba] hover:to-[#f7b3cb] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {persona ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default PersonaForm;


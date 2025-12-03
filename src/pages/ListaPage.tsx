import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Persona } from '../types/Persona';
import Modal from '../components/Modal';
import PersonaForm from '../components/PersonaForm';
import { DISTRITOS_LIMA, UNIVERSIDADES_LIMA } from '../constants/data';
import { normalizeText } from '../utils/textUtils';
import * as api from '../services/api';

const ListaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalPersona, setModalPersona] = useState<Persona | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrito, setFilterDistrito] = useState('');
  const [filterUniversidad, setFilterUniversidad] = useState('');

  // Cargar personas al montar el componente
  useEffect(() => {
    loadPersonas();
  }, []);

  // Detectar si viene con el parámetro add=true y abrir el formulario automáticamente
  useEffect(() => {
    const shouldAdd = searchParams.get('add');
    if (shouldAdd === 'true') {
      // Limpiar el parámetro de la URL
      setSearchParams({});
      // Abrir el formulario después de un pequeño delay para que la página cargue
      setTimeout(() => {
        setIsFormOpen(true);
        setEditingPersona(null);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const loadPersonas = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Cargando personas desde:', 'http://localhost:5002/api/personas');
      const data = await api.getPersonas();
      console.log('Personas cargadas:', data);
      setPersonas(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(`Error al cargar las personas: ${errorMessage}`);
      console.error('Error completo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (persona: Persona) => {
    setModalPersona(persona);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalPersona(null);
  };

  const handleOpenForm = (persona?: Persona) => {
    setEditingPersona(persona || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPersona(null);
    // Limpiar cualquier parámetro de URL al cerrar
    if (searchParams.get('add')) {
      setSearchParams({});
    }
  };

  const handleSubmit = async (data: Omit<Persona, 'id'>) => {
    try {
      if (editingPersona) {
        // Actualizar
        const updated = await api.updatePersona(editingPersona.id, data);
        setPersonas(personas.map(p => p.id === editingPersona.id ? updated : p));
        // Actualizar modal si está abierto
        if (modalPersona && modalPersona.id === editingPersona.id) {
          setModalPersona(updated);
        }
      } else {
        // Crear
        const newPersona = await api.createPersona(data);
        setPersonas([...personas, newPersona]);
      }
      handleCloseForm();
    } catch (err) {
      alert('Error al guardar la persona. Por favor, intenta de nuevo.');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      try {
        await api.deletePersona(id);
        setPersonas(personas.filter(p => p.id !== id));
        if (modalPersona && modalPersona.id === id) {
          handleCloseModal();
        }
      } catch (err) {
        alert('Error al eliminar la persona. Por favor, intenta de nuevo.');
        console.error(err);
      }
    }
  };

  const handleVote = async (id: string, vote: 'yala' | 'noyala') => {
    try {
      const updated = await api.votePersona(id, vote);

      // Actualizar la lista de personas
      setPersonas(personas.map(p => p.id === id ? updated : p));

      // Actualizar el modalPersona si está abierto para reflejar los cambios en tiempo real
      if (modalPersona && modalPersona.id === id) {
        setModalPersona(updated);
      }
    } catch (err) {
      alert('Error al votar. Por favor, intenta de nuevo.');
      console.error(err);
    }
  };

  // Filtrar personas
  const filteredPersonas = useMemo(() => {
    return personas.filter((persona) => {
      const normalizedSearch = normalizeText(searchTerm);
      const matchesSearch = searchTerm === '' ||
        normalizeText(persona.nombres).includes(normalizedSearch) ||
        normalizeText(persona.apellidos).includes(normalizedSearch);

      const matchesDistrito = filterDistrito === '' || persona.distrito === filterDistrito;
      const matchesUniversidad = filterUniversidad === '' || persona.universidad === filterUniversidad;

      return matchesSearch && matchesDistrito && matchesUniversidad;
    });
  }, [personas, searchTerm, filterDistrito, filterUniversidad]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#f180a9] via-[#f499ba] to-[#f7b3cb] bg-clip-text text-transparent mb-2">
                Caninas de Lima
              </h1>
              <p className="text-gray-600">Gestiona el registro completo de todas las caninas</p>
            </div>
            <button
              onClick={() => handleOpenForm()}
              className="px-6 py-3 bg-gradient-to-r from-[#f180a9] to-[#f499ba] text-white rounded-lg font-medium hover:from-[#f499ba] hover:to-[#f7b3cb] transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Agregar Canina</span>
            </button>
          </div>

          {/* Buscador y Filtros */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
            {/* Buscador */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por nombre o apellido
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o apellido..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por Distrito
                </label>
                <select
                  value={filterDistrito}
                  onChange={(e) => setFilterDistrito(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all bg-white"
                >
                  <option value="">Todos los distritos</option>
                  {DISTRITOS_LIMA.map((distrito) => (
                    <option key={distrito} value={distrito}>
                      {distrito}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por Universidad
                </label>
                <select
                  value={filterUniversidad}
                  onChange={(e) => setFilterUniversidad(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f499ba] focus:border-[#f499ba] outline-none transition-all bg-white"
                >
                  <option value="">Todas las universidades</option>
                  {UNIVERSIDADES_LIMA.map((universidad) => (
                    <option key={universidad} value={universidad}>
                      {universidad}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botón limpiar filtros */}
            {(searchTerm || filterDistrito || filterUniversidad) && (
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterDistrito('');
                    setFilterUniversidad('');
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-[#f180a9] transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            {/* Contador de resultados */}
            <div className="text-sm text-gray-500">
              Mostrando {filteredPersonas.length} de {personas.length} caninas
            </div>
          </div>
        </div>

        {/* Formulario Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#f499ba]/30">
              <div className="bg-gradient-to-r from-[#f180a9]/10 via-[#f499ba]/10 to-[#f7b3cb]/10 px-6 py-5 border-b border-[#f499ba]/20">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#f180a9] to-[#f499ba] bg-clip-text text-transparent">
                  {editingPersona ? 'Editar Canina' : 'Nueva Canina'}
                </h2>
              </div>
              <div className="p-6">
                <PersonaForm
                  persona={editingPersona}
                  onSubmit={handleSubmit}
                  onCancel={handleCloseForm}
                />
              </div>
            </div>
          </div>
        )}

        {/* Estado de carga y error */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f180a9] mb-4"></div>
            <p className="text-gray-500 text-lg">Cargando caninas...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadPersonas}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Lista de Personas */}
        {!loading && !error && filteredPersonas.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">
              {personas.length === 0
                ? 'No hay caninas registradas aún'
                : 'No se encontraron caninas con los filtros aplicados'}
            </p>
            {personas.length === 0 && (
              <button
                onClick={() => handleOpenForm()}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-[#f180a9] to-[#f499ba] text-white rounded-lg font-medium hover:from-[#f499ba] hover:to-[#f7b3cb] transition-all duration-300"
              >
                Agregar la primera canina
              </button>
            )}
          </div>
        )}

        {!loading && !error && filteredPersonas.length > 0 && (
          <div className="grid gap-6">
            {filteredPersonas.map((persona) => (
              <div
                key={persona.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-[#f499ba]/50 hover:shadow-lg hover:shadow-[#f7b3cb]/10 transition-all duration-300 cursor-pointer group"
                onClick={() => handleOpenModal(persona)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#f180a9]/20 to-[#f7b3cb]/20 rounded-full flex items-center justify-center border border-[#f499ba]/30">
                        <span className="text-[#f180a9] font-bold text-lg">
                          {persona.nombres[0]}{persona.apellidos[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#f180a9] transition-colors">
                          {persona.nombres} {persona.apellidos}
                        </h3>
                        <p className="text-sm text-gray-500">{persona.edad} años</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <svg className="w-5 h-5 text-[#f180a9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{persona.distrito}</span>
                      </div>

                      {persona.instagram && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <svg className="w-5 h-5 text-[#f180a9]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          <span className="text-sm">{persona.instagram}</span>
                        </div>
                      )}

                      {persona.universidad && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <svg className="w-5 h-5 text-[#f180a9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span className="text-sm">{persona.universidad}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 italic overflow-hidden text-ellipsis" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {persona.historia}
                    </p>
                  </div>

                  {/* BOTONES DE EDITAR Y ELIMINAR - TEMPORALMENTE OCULTOS */}
                  {/* Para restaurar, descomenta este bloque */}
                  {/*
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenForm(persona);
                      }}
                      className="p-2 text-gray-400 hover:text-[#f180a9] hover:bg-[#f7b3cb]/10 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(persona.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  */}

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Historia */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          persona={modalPersona ? {
            id: modalPersona.id,
            nombres: modalPersona.nombres,
            apellidos: modalPersona.apellidos,
            historia: modalPersona.historia,
            votosYala: modalPersona.votosYala,
            votosNoYala: modalPersona.votosNoYala
          } : null}
          onVote={handleVote}
        />
      </div>
    </div>
  );
};

export default ListaPage;


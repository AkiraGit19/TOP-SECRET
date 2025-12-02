import type { Persona } from '../types/Persona';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

// Tipos para las respuestas de la API
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Obtener todas las personas
export const getPersonas = async (): Promise<Persona[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/personas`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Error al obtener las personas: ${response.status} ${response.statusText}`);
    }
    const result: ApiResponse<Persona[]> = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error(result.message || 'Error desconocido');
  } catch (error) {
    console.error('Error en getPersonas:', error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:5002');
    }
    throw error;
  }
};

// Obtener una persona por ID
export const getPersonaById = async (id: string): Promise<Persona> => {
  try {
    const response = await fetch(`${API_BASE_URL}/personas/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener la persona');
    }
    const result: ApiResponse<Persona> = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error(result.message || 'Error desconocido');
  } catch (error) {
    console.error('Error en getPersonaById:', error);
    throw error;
  }
};

// Crear una nueva persona
export const createPersona = async (persona: Omit<Persona, 'id'>): Promise<Persona> => {
  try {
    const response = await fetch(`${API_BASE_URL}/personas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(persona),
    });
    if (!response.ok) {
      throw new Error('Error al crear la persona');
    }
    const result: ApiResponse<Persona> = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error(result.message || 'Error desconocido');
  } catch (error) {
    console.error('Error en createPersona:', error);
    throw error;
  }
};

// Actualizar una persona
export const updatePersona = async (id: string, persona: Omit<Persona, 'id'>): Promise<Persona> => {
  try {
    const response = await fetch(`${API_BASE_URL}/personas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(persona),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la persona');
    }
    const result: ApiResponse<Persona> = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error(result.message || 'Error desconocido');
  } catch (error) {
    console.error('Error en updatePersona:', error);
    throw error;
  }
};

// Eliminar una persona
export const deletePersona = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/personas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la persona');
    }
    const result: ApiResponse<void> = await response.json();
    if (!result.success) {
      throw new Error(result.message || 'Error desconocido');
    }
  } catch (error) {
    console.error('Error en deletePersona:', error);
    throw error;
  }
};

// Votar por una persona
export const votePersona = async (id: string, vote: 'yala' | 'noyala'): Promise<Persona> => {
  try {
    const response = await fetch(`${API_BASE_URL}/personas/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vote }),
    });
    if (!response.ok) {
      throw new Error('Error al votar');
    }
    const result: ApiResponse<Persona> = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error(result.message || 'Error desconocido');
  } catch (error) {
    console.error('Error en votePersona:', error);
    throw error;
  }
};

// Buscar personas (opcional, puede hacerse en el frontend)
export const searchPersonas = async (params: {
  search?: string;
  distrito?: string;
  universidad?: string;
}): Promise<Persona[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (params.search) queryParams.append('search', params.search);
    if (params.distrito) queryParams.append('distrito', params.distrito);
    if (params.universidad) queryParams.append('universidad', params.universidad);

    const response = await fetch(`${API_BASE_URL}/personas/search?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Error al buscar personas');
    }
    const result: ApiResponse<Persona[]> = await response.json();
    if (result.success && result.data) {
      return result.data;
    }
    throw new Error(result.message || 'Error desconocido');
  } catch (error) {
    console.error('Error en searchPersonas:', error);
    throw error;
  }
};


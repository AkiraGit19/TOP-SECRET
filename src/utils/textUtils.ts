/**
 * Normaliza un texto eliminando tildes y convirtiendo a minúsculas
 * para búsquedas sin distinción de acentos
 */
export const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};


# Prompt para Desarrollo del Backend

## Contexto del Proyecto

Necesito desarrollar un backend REST API para una aplicación web de gestión de "caninas" (personas). El frontend ya está desarrollado en React + TypeScript con Vite y está esperando conectarse a este backend.

## Especificaciones Técnicas

### Stack Tecnológico
- **Lenguaje**: TypeScript (preferido) o JavaScript
- **Framework**: Express.js o similar
- **Almacenamiento**: NO usar base de datos. Usar un archivo `data.ts` o `data.json` en el backend para persistencia
- **Puerto**: 3000 (o configurable)
- **CORS**: Habilitar CORS para permitir peticiones desde el frontend (puerto 5173 por defecto en Vite)

### Estructura de Datos

El backend debe manejar objetos `Persona` con la siguiente estructura:

```typescript
interface Persona {
  id: string;
  nombres: string;
  apellidos: string;
  edad: number;
  distrito: string;
  instagram: string;
  universidad: string;
  historia: string;
  votosYala: number;
  votosNoYala: number;
}
```

### Endpoints Requeridos

#### 1. GET /api/personas
- **Descripción**: Obtener todas las personas
- **Respuesta**: 
```json
{
  "success": true,
  "data": [/* array de Persona */]
}
```

#### 2. GET /api/personas/:id
- **Descripción**: Obtener una persona por ID
- **Parámetros**: `id` en la URL
- **Respuesta exitosa**:
```json
{
  "success": true,
  "data": {/* objeto Persona */}
}
```
- **Respuesta error (404)**:
```json
{
  "success": false,
  "message": "Persona no encontrada"
}
```

#### 3. POST /api/personas
- **Descripción**: Crear una nueva persona
- **Body** (JSON):
```json
{
  "nombres": "string",
  "apellidos": "string",
  "edad": number,
  "distrito": "string",
  "instagram": "string",
  "universidad": "string",
  "historia": "string",
  "votosYala": 0,
  "votosNoYala": 0
}
```
- **Validación**: Todos los campos excepto `instagram` y `universidad` son requeridos
- **Respuesta exitosa**:
```json
{
  "success": true,
  "data": {/* objeto Persona con id generado */}
}
```
- **Generar ID**: Usar UUID o timestamp + random para generar IDs únicos

#### 4. PUT /api/personas/:id
- **Descripción**: Actualizar una persona existente
- **Parámetros**: `id` en la URL
- **Body**: Mismo formato que POST (sin `id`)
- **Respuesta exitosa**:
```json
{
  "success": true,
  "data": {/* objeto Persona actualizado */}
}
```
- **Respuesta error (404)**:
```json
{
  "success": false,
  "message": "Persona no encontrada"
}
```

#### 5. DELETE /api/personas/:id
- **Descripción**: Eliminar una persona
- **Parámetros**: `id` en la URL
- **Respuesta exitosa**:
```json
{
  "success": true,
  "message": "Persona eliminada correctamente"
}
```
- **Respuesta error (404)**:
```json
{
  "success": false,
  "message": "Persona no encontrada"
}
```

#### 6. POST /api/personas/:id/vote
- **Descripción**: Votar por una persona (Yala o No Yala)
- **Parámetros**: `id` en la URL
- **Body** (JSON):
```json
{
  "vote": "yala" | "noyala"
}
```
- **Validación**: `vote` debe ser exactamente "yala" o "noyala"
- **Lógica**: Incrementar `votosYala` o `votosNoYala` según corresponda
- **Respuesta exitosa**:
```json
{
  "success": true,
  "data": {/* objeto Persona con votos actualizados */}
}
```
- **Respuesta error (404)**:
```json
{
  "success": false,
  "message": "Persona no encontrada"
}
```

#### 7. GET /api/personas/search (OPCIONAL)
- **Descripción**: Buscar personas con filtros
- **Query Parameters**:
  - `search`: string (buscar en nombres y apellidos)
  - `distrito`: string (filtrar por distrito exacto)
  - `universidad`: string (filtrar por universidad exacta)
- **Nota**: Este endpoint es opcional ya que el frontend puede hacer el filtrado, pero sería útil para optimización
- **Respuesta**:
```json
{
  "success": true,
  "data": [/* array de Persona filtradas */]
}
```

### Manejo de Errores

Todos los endpoints deben:
- Retornar código HTTP apropiado (200 para éxito, 400 para errores de validación, 404 para no encontrado, 500 para errores del servidor)
- Usar el formato de respuesta consistente:
```json
{
  "success": boolean,
  "data"?: any,
  "message"?: string
}
```

### Persistencia de Datos

- Crear un archivo `src/data.ts` o `data/data.ts` con un array inicial de personas
- Al iniciar el servidor, cargar los datos desde el archivo
- Cada vez que se modifique (crear, actualizar, eliminar, votar), actualizar el archivo
- Usar `fs` (Node.js) para leer/escribir el archivo
- Si usas TypeScript, exportar el array como constante
- Si usas JavaScript, usar un archivo JSON

### Datos Iniciales de Ejemplo

Incluir al menos 2 personas de ejemplo en el archivo de datos:

```typescript
export const personas: Persona[] = [
  {
    id: '1',
    nombres: 'María',
    apellidos: 'García',
    edad: 22,
    distrito: 'Miraflores',
    instagram: '@mariagarcia',
    universidad: 'PUCP - Pontificia Universidad Católica del Perú',
    historia: 'María es una estudiante apasionada por la tecnología y el diseño. Originaria de Miraflores, estudia Ingeniería de Sistemas en la PUCP. Le encanta compartir su conocimiento en redes sociales y siempre está buscando nuevas oportunidades de crecimiento personal y profesional.',
    votosYala: 0,
    votosNoYala: 0
  },
  {
    id: '2',
    nombres: 'Carlos',
    apellidos: 'Rodríguez',
    edad: 24,
    distrito: 'San Isidro',
    instagram: '@carlosrod',
    universidad: 'USMP - Universidad San Martín de Porres',
    historia: 'Carlos es un emprendedor joven con grandes ideas. Vive en San Isidro y estudia Administración en la USMP. Su pasión por los negocios lo ha llevado a crear varios proyectos innovadores. Siempre está dispuesto a ayudar a otros y compartir sus experiencias.',
    votosYala: 0,
    votosNoYala: 0
  }
];
```

### Configuración CORS

Asegúrate de configurar CORS para permitir peticiones desde:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:5174` (alternativo)
- Cualquier origen en desarrollo (o configurar según necesidad)

### Estructura de Carpetas Sugerida

```
backend/
├── src/
│   ├── data.ts (o data.json)
│   ├── routes/
│   │   └── personas.ts
│   ├── controllers/
│   │   └── personasController.ts
│   ├── types/
│   │   └── Persona.ts
│   └── index.ts (o app.ts)
├── package.json
└── tsconfig.json (si usas TypeScript)
```

### Validaciones Requeridas

- **POST /api/personas**: Validar que `nombres`, `apellidos`, `edad`, `distrito`, `historia` estén presentes
- **PUT /api/personas/:id**: Mismas validaciones que POST
- **POST /api/personas/:id/vote**: Validar que `vote` sea "yala" o "noyala"
- **GET /api/personas/:id**: Validar que el ID exista
- **PUT /api/personas/:id**: Validar que el ID exista
- **DELETE /api/personas/:id**: Validar que el ID exista

### Comandos de Desarrollo

El backend debe poder iniciarse con:
```bash
npm run dev  # Para desarrollo con hot reload
npm start    # Para producción
```

### Testing

Una vez implementado, el backend debe poder:
1. Responder a todas las peticiones del frontend
2. Mantener los datos persistentes entre reinicios del servidor
3. Manejar errores apropiadamente
4. Validar los datos de entrada

## Instrucciones Finales

1. Crea la estructura del proyecto
2. Configura Express.js (o framework elegido)
3. Implementa todos los endpoints mencionados
4. Configura CORS apropiadamente
5. Crea el archivo de datos inicial con las 2 personas de ejemplo
6. Implementa la lógica de lectura/escritura del archivo de datos
7. Agrega validaciones necesarias
8. Prueba que todos los endpoints funcionen correctamente
9. Asegúrate de que el servidor escuche en el puerto 3000 (o configurable)

El frontend ya está preparado para conectarse a `http://localhost:3000/api`, así que asegúrate de que esa sea la URL base de tu API.


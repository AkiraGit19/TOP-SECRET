const MarcoLegalPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#f180a9] via-[#f499ba] to-[#f7b3cb] bg-clip-text text-transparent mb-4">
            Marco Legal
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#f180a9] to-[#f7b3cb] mx-auto rounded-full"></div>
        </div>

        {/* Contenido */}
        <div className="space-y-8">
          {/* Preámbulo */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              Preámbulo: Naturaleza y Ficción del Contenido
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Esta plataforma es un espacio dedicado a la publicación de ficción de personajes (Fanfics), historias y características inventadas por sus autores. El propósito, la estructura y el carácter de las publicaciones están totalmente inspirados en los foros de fanfiction, donde todo el contenido es ficticio y, por su naturaleza, puede tener un carácter de parodia, sátira o comentario.
              </p>
            </div>
          </section>

          {/* 1. Naturaleza de la Plataforma y Principio de Anonimato */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              1. Naturaleza de la Plataforma y Principio de Anonimato
            </h2>
            <div className="prose prose-gray max-w-none space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Esta plataforma funciona bajo un estricto principio de ficción, anonimato y no autenticación.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Respecto al Autor:</strong> No solicitamos, verificamos, ni almacenamos ningún dato que permita identificar al autor.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Respecto al Contenido (Personajes):</strong> Los campos estructurados (como 'Nombre', 'Apellido', 'Universidad' y 'Distrito') están diseñados únicamente para ingresar datos del personaje de ficción y para fines de ambientación de la historia.
              </p>
            </div>
          </section>

          {/* 2. Política de Ficción y Prohibición de Datos Reales */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              2. Política de Ficción y Prohibición de Datos Reales
            </h2>
            <div className="prose prose-gray max-w-none space-y-4">
              <p className="text-gray-700 leading-relaxed">
                El contenido de las publicaciones, incluyendo los datos ingresados en los campos estructurados (Nombre Ficticio, Apellido Ficticio, etc.) y en el cuerpo de la historia, no tiene relación alguna con la realidad.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Queda estrictamente prohibido:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                <li>Presentar historias como hechos verídicos o reportajes.</li>
                <li>Presentar historias en las que se tenga la intención de presentar a una persona real.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                La plataforma no realiza ningún Tratamiento de Datos Personales de terceros bajo la Ley N° 29733 de Perú, pues el contenido debe ser, por norma de uso, ficticio. Cualquier dato real que el autor decida ingresar contraviene nuestras normas y será tratado como una violación directa.
              </p>
            </div>
          </section>

          {/* 3. Exoneración Total de Responsabilidad por Contenido Ficticio */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              3. Exoneración Total de Responsabilidad por Contenido Ficticio
            </h2>
            <div className="prose prose-gray max-w-none space-y-4">
              <p className="text-gray-700 leading-relaxed">
                La plataforma no garantiza, avala ni verifica la veracidad del contenido, por lo que se exime de toda responsabilidad por cualquier impacto o consecuencia que pueda derivarse de las publicaciones.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>El usuario y el tercero afectado reconocen y aceptan que:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                <li>Las publicaciones tienen un carácter de ficción y parodia/sátira, y no deben ser tomadas como hechos reales, consejos profesionales o información verídica.</li>
                <li>La plataforma no es responsable por perjuicios, implicaciones o consecuencias económicas, laborales, sociales, personales, emocionales, mentales o de cualquier otro aspecto del proyecto de vida o dignidad que un tercero o un usuario pueda alegar haber sufrido a causa del contenido publicado.</li>
                <li>Cualquier similitud de los personajes o situaciones con personas o hechos reales es pura coincidencia y no es responsabilidad de la plataforma. La interpretación del contenido como real, veraz o difamatorio recae exclusivamente en el lector.</li>
              </ul>
            </div>
          </section>

          {/* 4. Responsabilidad Exclusiva del Autor y Garantía de Indemnidad */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              4. Responsabilidad Exclusiva del Autor y Garantía de Indemnidad
            </h2>
            <div className="prose prose-gray max-w-none space-y-4">
              <p className="text-gray-700 leading-relaxed">
                La responsabilidad legal recae íntegramente en el autor anónimo de la publicación.
              </p>
              <p className="text-gray-700 leading-relaxed">
                El autor garantiza y se compromete a mantener indemne a la plataforma (liberarla de toda culpa y costo) ante cualquier demanda, querella o acción legal iniciada por un tercero que alegue difamación o perjuicio.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Toda acción legal debe dirigirse al autor del mensaje. La plataforma actúa únicamente como un prestador de servicios de alojamiento de datos (hosting) pasivo.
              </p>
            </div>
          </section>

          {/* 5. Procedimiento de Aviso y Retirada */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              5. Procedimiento de Aviso y Retirada (Deber de Diligencia)
            </h2>
            <div className="prose prose-gray max-w-none space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Para mantener la buena fe, si una publicación incumple las normas o utiliza datos sensibles, se puede notificar el enlace exacto.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Retirada Obligatoria:</strong> Se retirará inmediatamente cualquier publicación que haga alusión a la no ficción de los personajes de los que se pueda hablar en el foro como por ejemplo datos sensibles explícitos no públicos o públicos de terceros (direcciones, números de teléfono, DNI, datos financieros).
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Retirada por Orden Judicial:</strong> En casos de controversia por difamación o daño a la dignidad, la plataforma acatará sin objeción toda orden judicial o requerimiento oficial y vinculante de una autoridad competente de Perú. En ausencia de una orden, la plataforma aplicará su criterio interno, priorizando el principio de ficción y parodia.
              </p>
            </div>
          </section>
        </div>

        {/* Footer decorativo */}
        <div className="mt-16 text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm font-mono">
            &gt; Última actualización: {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarcoLegalPage;


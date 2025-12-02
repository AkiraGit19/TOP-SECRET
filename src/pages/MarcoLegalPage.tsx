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
          {/* Naturaleza de la Plataforma */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              Naturaleza de la Plataforma
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Esta plataforma funciona como un espacio para compartir anécdotas de manera completamente anónima. Tal como se detalla en la sección de Privacidad y Legalidad del sitio, no verificamos identidades, no pedimos documentos, no recopilamos información personal que permita identificar a alguien, ni realizamos ningún tipo de tratamiento de datos privados. El contenido es aportado únicamente por usuarios anónimos, similar a foros como 4chan u otros espacios donde cualquiera puede publicar historias u opiniones sin autentificación.
              </p>
            </div>
          </section>

          {/* Responsabilidad sobre el Contenido */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              Responsabilidad sobre el Contenido
            </h2>
            <div className="prose prose-gray max-w-none space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Si en alguna publicación se mencionan nombres, es importante aclarar que la responsabilidad recae exclusivamente en el usuario que decidió incluir y publicar esa información. Esto no se considera tratamiento de datos por parte de la plataforma, por lo que no genera responsabilidades bajo las leyes de Protección de Datos Personales, las cuales solo aplican cuando una entidad recopila, gestiona o procesa activamente información personal, cosa que aquí no sucede.
              </p>
              <p className="text-gray-700 leading-relaxed">
                La situación es comparable a lo que ocurre en redes como Facebook, X o Reddit: si alguien menciona o expone a otra persona, la responsabilidad es del autor del mensaje, no de la plataforma que simplemente aloja contenido generado por terceros. Al igual que en esos sitios, aquí no se verifica identidad ni se relacionan publicaciones con personas reales.
              </p>
            </div>
          </section>

          {/* Perfiles Públicos en Redes Sociales */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              Perfiles Públicos en Redes Sociales
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Cuando una cuenta en redes sociales es pública, su información puede ser vista, compartida o enlazada por cualquiera. La plataforma no tiene control sobre esto, ya que no accedemos ni extraemos datos de ningún perfil. Los usuarios solo comparten enlaces que ya están disponibles públicamente.
              </p>
            </div>
          </section>

          {/* Sobre la Difamación */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              Sobre la Difamación
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                En cuanto a las normas sobre difamación, estas se aplican entre personas: cualquier acción legal debe dirigirse al usuario que realizó la publicación, no a la plataforma, porque nosotros no generamos ni avalamos el contenido. Nuestro rol es únicamente ofrecer un espacio de publicación anónima, comparable a un tablón digital donde terceros pueden dejar mensajes.
              </p>
            </div>
          </section>

          {/* Revisión de Contenido */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-[#f499ba]/30 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#f180a9] rounded-full mr-3"></span>
              Revisión de Contenido
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Aun así, para actuar de buena fe, si nos facilitas el enlace exacto de la publicación que consideras dañina, podemos revisarla según nuestras reglas internas para determinar si contiene datos sensibles explícitos (como direcciones, teléfonos, documentos o información privada no pública). Si incumple las normas, retiraremos el contenido; si no es así, te explicaremos los motivos.
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


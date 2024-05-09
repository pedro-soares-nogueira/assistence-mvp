export default function Home() {
  return (
    <main className="">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-gray-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Assistence</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-3 sm:gap-6">
            <a className="hover:text-gray-900">Quem somos</a>
            <a className="hover:text-gray-900">Profissionais</a>
          </nav>
        </div>
      </header>

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-8 justify-center items-center">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Assistencia psicológica á sua disposição!
            </h1>
            <p className="mb-8 leading-relaxed text-sm">
              Nosso aplicativo é uma ferramenta inovadora que visa fornecer
              assistência psicológica acessível para pessoas LGBTQIAP+. Com uma
              seleção cuidadosamente curada de profissionais especializados e
              sensíveis às necessidades dessa comunidade, oferecemos serviços de
              suporte emocional a preços acessíveis. Reconhecemos a importância
              de um ambiente seguro e inclusivo para a saúde mental de todos, e
              estamos comprometidos em fornecer um espaço acolhedor onde os
              indivíduos possam encontrar apoio e compreensão sem se preocupar
              com custos proibitivos.
            </p>
            <div className="flex">
              <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                <span className="flex items-start flex-col leading-none">
                  <span className="text-xs text-gray-600 mb-1">
                    Baixo custo
                  </span>
                  <span className="title-font font-medium">
                    Asistencia Psicológica
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Time completo
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-sm">
              Priorizamos a segurança e a confidencialidade dos nossos usuários.
              Todos os profissionais listados em nossa plataforma passam por
              rigorosos processos de verificação e aderem a padrões éticos
              elevados, garantindo um ambiente seguro e acolhedor para o
              crescimento pessoal e emocional.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/80x80"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Holden Caulfield
                  </h2>
                  <p className="text-gray-500">UI Designer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/84x84"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Henry Letham
                  </h2>
                  <p className="text-gray-500">CTO</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/88x88"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Oskar Blinde
                  </h2>
                  <p className="text-gray-500">Founder</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/90x90"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    John Doe
                  </h2>
                  <p className="text-gray-500">DevOps</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/94x94"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Martin Eden
                  </h2>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/98x98"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Boris Kitua
                  </h2>
                  <p className="text-gray-500">UX Researcher</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/100x90"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Atticus Finch
                  </h2>
                  <p className="text-gray-500">QA Engineer</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/104x94"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Alper Kamu
                  </h2>
                  <p className="text-gray-500">System</p>
                </div>
              </div>
            </div>
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/108x98"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Rodrigo Monchi
                  </h2>
                  <p className="text-gray-500">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

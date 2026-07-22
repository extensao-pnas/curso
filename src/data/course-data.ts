export interface CourseData {
  title: string;
  subtitle: string;
  aboutText: string;
  period: { start: string; end: string; day: string };
  schedule: { time: string; format: string; workload: string };
  vacancies: { total: number; professional: number; student: number };
  registration: {
    announcementStart: string;
    announcementEnd: string;
    registrationStart: string;
    registrationEnd: string;
    resultDate: string;
    link: string;
  };
  modules: Module[];
  criteria: string[];
  partners: { name: string; logo: string }[];
}

export interface Module {
  id: number;
  title: string;
  color: "navy" | "gold" | "burgundy";
  lessons: Lesson[];
}

export interface Lesson {
  date: string;
  topic: string;
  professor: string;
  institution: string;
  lattes?: string;
  cienciaVitae?: string;
  linkedin?: string;
}

export const courseData: CourseData = {
  title: "CURSO DE EXTENSÃO 2026",
  subtitle:
    "O Trabalho de Assistentes Sociais no Âmbito do SUAS: Formação, prática e desafios profissionais",
  aboutText:
    "Curso de extensão voltado para assistentes sociais e estudantes de Serviço Social, " +
    "abordando a formação, a prática e os desafios profissionais no âmbito do Sistema Único " +
    "de Assistência Social (SUAS). Com carga horária total de 60 horas em formato remoto, " +
    "o curso é organizado em três módulos que cobrem desde os marcos normativos da política " +
    "de assistência social até a análise de dados sociais e a prática profissional, reunindo " +
    "docentes e pesquisadores de instituições de referência em todo o Brasil.",

  period: {
    start: "06/08/2026",
    end: "10/12/2026",
    day: "Quintas-feiras",
  },

  schedule: {
    time: "14h às 17h",
    format: "Remoto",
    workload: "60 horas",
  },

  vacancies: {
    total: 50,
    professional: 30,
    student: 20,
  },

  registration: {
    announcementStart: "22/07/2026",
    announcementEnd: "31/07/2026",
    registrationStart: "22/07/2026",
    registrationEnd: "31/07/2026",
    resultDate: "03/08/2026",
    link: "#inscricao",
  },

  modules: [
    {
      id: 1,
      title:
        "MÓDULO I – PROTEÇÃO SOCIAL, POLÍTICA SOCIAL E ASSISTÊNCIA SOCIAL",
      color: "navy" as const,
      lessons: [
        {
          date: "06/08/2026",
          topic: "Aula Introdutória",
          professor: "",
          institution: "",
        },
        {
          date: "13/08/2026",
          topic:
            "A Política de Assistência Social como direito social no Brasil – marcos normativos e legais",
          professor: "Sindely Chahim de Avellar Alchorne",
          institution: "PUC-Rio",
          lattes: "http://lattes.cnpq.br/7505898233930008",
        },
        {
          date: "20/08/2026",
          topic:
            "O desmonte do Sistema Único da Assistência Social: questões para o debate",
          professor: "Dra. Mônica Senna",
          institution: "PPG em Política Social da UFF",
          lattes: "http://lattes.cnpq.br/6254529022390636",
        },
        {
          date: "27/08/2026",
          topic:
            "Financiamento e orçamento público da Política de Assistência Social brasileira",
          professor: "",
          institution: "",
          lattes: "http://lattes.cnpq.br/9255679876512606",
        },
        {
          date: "03/09/2026",
          topic:
            "Uma análise comparada da Política de Assistência Social no Brasil e Ação Social em Portugal",
          professor: "Dra. Tatiana Lúcia Valduga",
          institution: "CARE/IPP em Portugal",
          cienciaVitae: "https://www.cienciavitae.pt/portal/0E17-AD3B-93BB",
        },
        {
          date: "10/09/2026",
          topic:
            "A reconfiguração do financiamento federal da assistência social a partir da crescente participação das emendas parlamentares",
          professor: "Ms. Patrícia Baptista Barreto",
          institution: "Fundação Leão XIII do Estado do RJ",
          lattes: "https://lattes.cnpq.br/5027043885590886",
        },
        {
          date: "17/09/2026",
          topic:
            "Caracterização da força de trabalho no SUAS: expansão e precarização",
          professor: "Dra. Adriana de Andrade Mesquita",
          institution: "UFOP",
          lattes: "http://lattes.cnpq.br/1322124989849187",
        },
      ],
    },
    {
      id: 2,
      title:
        "MÓDULO II – ASSISTÊNCIA SOCIAL E A IMPORTÂNCIA DA ANÁLISE DE DADOS SOCIAIS DO SUAS",
      color: "gold" as const,
      lessons: [
        {
          date: "24/09/2026",
          topic:
            "Território como ponto de partida para a Vigilância Socioassistencial",
          professor: "Dra. Viviane Pereira da Silva",
          institution: "Secretaria Municipal de Assistência Social do Rio de Janeiro – SMAS/RJ",
        },
        {
          date: "01/10/2026",
          topic: "Indicadores Sociais e interpretação de dados sociais",
          professor: "Ms. Stephanie de Azevedo Barreto",
          institution: "SEDSODH RJ",
          lattes: "http://lattes.cnpq.br/5610787369990437",
          linkedin: "https://www.linkedin.com/in/stephanie-barreto-85085a119/",
        },
        {
          date: "08/10/2026",
          topic:
            "O Cadastro Único como base de dados para análise social",
          professor: "Ms. Stephanie de Azevedo Barreto",
          institution: "SEDSODH RJ",
          lattes: "http://lattes.cnpq.br/5610787369990437",
          linkedin: "https://www.linkedin.com/in/stephanie-barreto-85085a119/",
        },
        {
          date: "15/10/2026",
          topic: "Laboratório de dados do Cadastro Único",
          professor: "Junier Goulart",
          institution: "Coordenação Estadual da Vigilância Socioassistencial do RJ",
          lattes: "http://lattes.cnpq.br/8140596402232024",
          linkedin: "https://www.linkedin.com/in/junier-goulart",
        },
      ],
    },
    {
      id: 3,
      title:
        "MÓDULO III – ASSISTÊNCIA SOCIAL, TRABALHO PROFISSIONAL E SERVIÇO SOCIAL",
      color: "burgundy" as const,
      lessons: [
        {
          date: "22/10/2026",
          topic:
            "A matricialidade sociofamiliar na Política de Assistência Social brasileira",
          professor: "Dra. Cassia Maria Carloto",
          institution: "UEL",
          lattes: "http://lattes.cnpq.br/6962057467940007",
        },
        {
          date: "29/10/2026",
          topic:
            "A importância dos Conselhos de Direitos no SUAS",
          professor: "Dra. Heloisa Helena Mesquita Maciel",
          institution: "",
          lattes: "http://lattes.cnpq.br/0136027334010332",
        },
        {
          date: "05/11/2026",
          topic:
            "Masculinidades negras e a Política Nacional de Assistência Social no Brasil",
          professor: "Dr. Daniel de Souza Campos",
          institution: "IFF/Fiocruz",
          lattes: "http://lattes.cnpq.br/4091130405456857",
        },
        {
          date: "12/11/2026",
          topic:
            "Liberdade Religiosa, Racismo Religioso e prática profissional da/o assistente social",
          professor: "Dra. Josélia Ferreira dos Reis",
          institution: "Analista Judiciária da Justiça Federal do Estado do Rio de Janeiro – JFRJ",
          lattes: "http://lattes.cnpq.br/8735695803403957",
        },
        {
          date: "19/11/2026",
          topic:
            "A responsabilidade técnica e a ética de Assistentes Sociais na elaboração de documentos",
          professor: "Denise Cunha",
          institution: "Assessora em S.S. do CRESS MG",
        },
        {
          date: "26/11/2026",
          topic:
            "O trabalho do assistente social na gestão do Programa Bolsa Família: integração entre benefícios, serviços e garantia de direitos",
          professor: "Nadia Nunes",
          institution: "Coordenadora do Cadastro Único e Bolsa Família – SEDSODH",
          lattes: "http://lattes.cnpq.br/1907019132505681",
        },
        {
          date: "03/12/2026",
          topic: "Aula de encerramento",
          professor: "Dra. Luziele Maria de Souza Tapajós",
          institution: "Professora aposentada da UFSC",
          lattes: "http://lattes.cnpq.br/5369814574689289",
        },
      ],
    },
  ],

  criteria: [
    "Formação em Serviço Social, com graduação em curso reconhecido pelo MEC",
    "Discentes de graduação em Serviço Social a partir do 5º período com inserção em campo de estágio em alguma unidade de atendimento do SUAS",
    "Estudantes de pós-graduação (stricto e lato sensu) com inserção em espaços sócio-ocupacionais",
    "Assistentes sociais vinculados a alguma unidade de atendimento do SUAS",
    "Interesse em construir ações e práticas em matéria do Serviço Social qualificadas e comprometidas com os direitos socioassistenciais",
  ],

  partners: [
    { name: "Logo 1", logo: "assets/image1.png" },
    { name: "Logo 2", logo: "assets/image2.png" },
    { name: "Logo 3", logo: "assets/image3.png" },
    { name: "Logo 4", logo: "assets/image4.png" },
  ],
};

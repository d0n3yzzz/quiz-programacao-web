class Personagem {
  constructor(nome, descricao, imagem) {
    this.nome = nome;
    this.descricao = descricao;
    this.imagem = imagem;
    this.pontos = 0;
  }

  adicionarPontos(valor) {
    this.pontos += valor;
  }

  resetar() {
    this.pontos = 0;
  }
}

const walter = new Personagem(
  "Walter White",
  "Um gênio da química extremamente estratégico e ambicioso.",
  "https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png"
);

const jesse = new Personagem(
  "Jesse Pinkman",
  "Impulsivo, emocional, mas com um bom coração.",
  "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png"
);

const gus = new Personagem(
  "Gus Fring",
  "Frio, calculista e extremamente organizado.",
  "https://static.wikia.nocookie.net/villains/images/7/75/Pollos2.png/revision/latest?cb=20230321121053"
);

const personagens = [walter, jesse, gus];

const perguntas = [
  {
    texto: "Como você resolve problemas?",
    opcoes: [
      { texto: "Com inteligência", pontos: [3, 1, 2] },
      { texto: "Na emoção", pontos: [1, 3, 2] },
      { texto: "Com estratégia", pontos: [2, 1, 3] }
    ]
  },
  {
    texto: "Seu maior objetivo é:",
    opcoes: [
      { texto: "Poder", pontos: [1, 1, 3] },
      { texto: "Dinheiro", pontos: [3, 1, 2] },
      { texto: "Liberdade", pontos: [1, 3, 1] }
    ]
  },
  {
    texto: "Em um conflito você:",
    opcoes: [
      { texto: "Manipula", pontos: [2, 1, 3] },
      { texto: "Enfrenta direto", pontos: [1, 3, 1] },
      { texto: "Planeja", pontos: [3, 1, 2] }
    ]
  },
  {
    texto: "Como você se vê?",
    opcoes: [
      { texto: "Gênio", pontos: [3, 1, 2] },
      { texto: "Rebelde", pontos: [1, 3, 1] },
      { texto: "Líder", pontos: [2, 1, 3] }
    ]
  },
  {
    texto: "Sob pressão você:",
    opcoes: [
      { texto: "Mantém controle", pontos: [2, 1, 3] },
      { texto: "Surta", pontos: [1, 3, 1] },
      { texto: "Calcula tudo", pontos: [3, 1, 2] }
    ]
  },
  {
    texto: "Você prefere:",
    opcoes: [
      { texto: "Trabalhar sozinho", pontos: [3, 1, 2] },
      { texto: "Com amigos", pontos: [1, 3, 1] },
      { texto: "Liderar equipe", pontos: [2, 1, 3] }
    ]
  },
  {
    texto: "Seu estilo é:",
    opcoes: [
      { texto: "Discreto", pontos: [2, 1, 3] },
      { texto: "Caótico", pontos: [1, 3, 1] },
      { texto: "Inteligente", pontos: [3, 1, 2] }
    ]
  },
  {
    texto: "Quando erra você:",
    opcoes: [
      { texto: "Aprende", pontos: [3, 1, 2] },
      { texto: "Se culpa", pontos: [1, 3, 1] },
      { texto: "Esconde", pontos: [2, 1, 3] }
    ]
  },
  {
    texto: "O que mais te define:",
    opcoes: [
      { texto: "Ambição", pontos: [3, 1, 2] },
      { texto: "Emoção", pontos: [1, 3, 1] },
      { texto: "Controle", pontos: [2, 1, 3] }
    ]
  },
  {
    texto: "Você seria:",
    opcoes: [
      { texto: "Cientista", pontos: [3, 1, 2] },
      { texto: "Sobrevivente", pontos: [1, 3, 1] },
      { texto: "Empresário", pontos: [2, 1, 3] }
    ]
  }
];

let perguntaAtual = 0;

const telaHome = document.getElementById("home");
const telaQuiz = document.getElementById("quiz");
const telaResultado = document.getElementById("resultado");

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");

const nomeEl = document.getElementById("nomePersonagem");
const descEl = document.getElementById("descPersonagem");
const imgEl = document.getElementById("imgPersonagem");
const pontuacaoEl = document.getElementById("pontuacao");

function mostrarTela(tela) {
  telaHome.classList.remove("ativa");
  telaQuiz.classList.remove("ativa");
  telaResultado.classList.remove("ativa");

  tela.classList.add("ativa");
}

function iniciarQuiz() {
  perguntaAtual = 0;

  personagens.forEach(p => p.resetar());

  mostrarTela(telaQuiz);
  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];

  perguntaEl.innerText = pergunta.texto;
  opcoesEl.innerHTML = "";

  pergunta.opcoes.forEach((opcao, index) => {
    const btn = document.createElement("div");
    btn.classList.add("opcao");
    btn.innerText = opcao.texto;

    btn.addEventListener("click", () => {
      selecionarOpcao(index);
    });

    opcoesEl.appendChild(btn);
  });
}

function selecionarOpcao(index) {
  const pontos = perguntas[perguntaAtual].opcoes[index].pontos;

  personagens.forEach((p, i) => {
    p.adicionarPontos(pontos[i]);
  });

  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  let vencedor = personagens[0];

  personagens.forEach(p => {
    if (p.pontos > vencedor.pontos) {
      vencedor = p;
    }
  });

  nomeEl.innerText = vencedor.nome;
  descEl.innerText = vencedor.descricao;
  imgEl.src = vencedor.imagem;
  pontuacaoEl.innerText = "Pontuação: " + vencedor.pontos;

  mostrarTela(telaResultado);
}

function reiniciar() {
  mostrarTela(telaHome);
}
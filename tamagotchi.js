const readline = require("readline");

// Estado inicial do bichinho
let pet = {
  nome: "Tamagotchi",
  felicidade: 50,
  fome: 50,
  emoji: "😃",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function imprimirEstado() {
  console.clear();
  console.log(`Nome: ${pet.nome}`);
  console.log(`Felicidade: ${pet.felicidade}`);
  console.log(`Fome: ${pet.fome}`);
  console.log(`Emoji: ${pet.emoji}`);
  console.log("\nEscolha uma ação:");
  console.log("1 - Alimentar");
  console.log("2 - Dar carinho");
  console.log("3 - Levar para passear");
  console.log("4 - Trocar de roupa");
}

function verificarEstado() {
  if (pet.felicidade <= 0 || pet.fome <= 0) {
    console.log("Seu bichinho morreu! :(");
    rl.close();
    process.exit();
  }
}

function diminuirFelicidadeEFome() {
  pet.felicidade -= 5;
  pet.fome -= 5;
  verificarEstado();
}

function alimentar() {
  pet.fome += 20;
  pet.felicidade += 10;
  if (pet.fome > 100) {
    pet.fome = 100;
  }
  if (pet.felicidade > 100) {
    pet.felicidade = 100;
  }
  verificarEstado();
}

function darCarinho() {
  pet.felicidade += 15;
  pet.fome -= 5;
  if (pet.felicidade > 100) {
    pet.felicidade = 100;
  }
  verificarEstado();
}

function levarPassear() {
  pet.felicidade += 20;
  pet.fome -= 10;
  if (pet.fome > 100) {
    pet.fome = 100;
  }
  if (pet.felicidade > 100) {
    pet.felicidade = 100;
  }
  verificarEstado();
}

function trocarRoupa(novoEmoji) {
  pet.emoji = novoEmoji; 
  pet.felicidade += 5;
  if (pet.felicidade > 100) {
    pet.felicidade = 100;
  }
  verificarEstado();
}

setInterval(diminuirFelicidadeEFome, 10000);

function receberAcao(acao) {
  switch (acao) {
    case "1":
      alimentar();
      break;
    case "2":
      darCarinho();
      break;
    case "3":
      levarPassear();
      break;
    case "4":
        rl.question(
            "Novo emoji: ",
            function outraRoupa(novoEmoji){
                trocarRoupa(novoEmoji)
                receberAcao()
            }
        )
      break;
    default:
      console.log("Opção inválida.");
  }

  imprimirEstado();
  perguntarAcao();
}

function perguntarAcao() {
  rl.question("Escolha uma ação (1-4): ", receberAcao);
}

imprimirEstado();
perguntarAcao();

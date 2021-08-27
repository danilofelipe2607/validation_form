export function valida(input) {
  const tipoInput = input.dataset.tipo;
  if (validadores[tipoInput]) validadores[tipoInput](input);

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalido");
    input.parentElement.querySelector(".input-mensagem-erro").innerHTML =
      mostraMsgError(tipoInput, input);
  }
}

const msgError = {
  nome: {
    valueMissing: "O Campo nome pode estar vazio",
  },
  email: {
    valueMissing: "O Campo nome pode estar vazio",
    typeMismatch: "O email digita é inválido",
  },
  senha: {
    valueMissing: "O Campo nome pode estar vazio",
    patternMismatch: "Senha fora do padrão",
  },
  dataNascimento: {
    valueMissing: "O Campo nome pode estar vazio",
    customError: "Você deve ser maior que 18 anos para se cadastrar",
  },
};
const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
};

const typeErros = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

function mostraMsgError(tipoInput, input) {
  let msg = "";

  typeErros.forEach((error) => {
    if (input.validity[error]) {
      msg = msgError[tipoInput][error];
    }
  });
  return msg;
}
function validaDataNascimento(input) {
  let msg = "";
  const dataRecebida = new Date(input.value);
  if (!maiorQue18(dataRecebida))
    msg = "Você deve ser maior que 18 anos para se cadastrar";

  input.setCustomValidity(msg);
}

function maiorQue18(data) {
  const dataAtual = new Date();
  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate()
  );
  return dataMais18 <= dataAtual;
}

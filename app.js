// Array para armazenar os amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    console.log("Botão Adicionar foi clicado!");

    let input = document.getElementById("amigo"); // Obtém o input
    let nome = input.value.trim(); // Remove espaços extras

    if (nome) {
        if (!amigos.includes(nome)) { // Evita duplicatas
            amigos.push(nome); // Adiciona ao array
            console.log(`Amigo "${nome}" adicionado! Lista atual:`, amigos);

            input.value = ""; // Limpa o campo de input
            
            atualizarListaAmigos(); // Atualiza a lista na tela
        } else {
            alert("Esse nome já foi adicionado!");
        }
    } else {
        console.log("Nenhum nome foi digitado!");
        alert("Digite um nome antes de adicionar!");
    }
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
    let lista = document.getElementById("listaAmigos"); // Obtém a <ul> da lista
    lista.innerHTML = ""; // Limpa a lista antes de atualizar

    amigos.forEach((amigo, index) => {
        let item = document.createElement("li"); // Cria um <li>
        item.textContent = amigo; // Define o texto do <li>

        // Botão para remover um amigo da lista
        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = " ❌ ";
        botaoRemover.classList.add("remove-btn");
        botaoRemover.onclick = function () {
            removerAmigo(index);
        };

        item.appendChild(botaoRemover); // Adiciona o botão ao <li>
        lista.appendChild(item); // Adiciona à lista
    });
}

// Função para remover um amigo da lista
function removerAmigo(index) {
    amigos.splice(index, 1); // Remove do array
    atualizarListaAmigos(); // Atualiza a lista na tela
}

// Função para sortear um amigo da lista com animação de roleta
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear!");
        return;
    }

    let resultado = document.getElementById("resultado");
    let botao = document.querySelector(".button-draw");

    let tempo = 100; // Velocidade da roleta em milissegundos
    let rodadas = 15; // Quantidade de vezes que a roleta gira antes de parar
    let i = 0;

    let intervalo = setInterval(() => {
        let nomeAleatorio = amigos[Math.floor(Math.random() * amigos.length)];
        resultado.innerHTML = `<li class="sorteado">${nomeAleatorio}</li>`;

        if (i >= rodadas) {
            clearInterval(intervalo);

            // Define o vencedor final
            let indiceSorteado = Math.floor(Math.random() * amigos.length);
            let amigoSorteado = amigos[indiceSorteado];
            resultado.innerHTML = `<li class="sorteado final">${amigoSorteado} 🎁</li>`;
                
        }
        i++;
    }, tempo);
}


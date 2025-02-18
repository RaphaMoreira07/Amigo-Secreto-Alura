let amigos = [];
let sorteados = new Set();


function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim();

if (nome) {
        if (!amigos.includes(nome)) { 
            amigos.push(nome); 
            console.log(`Amigo "${nome}" adicionado! Lista atual:`, amigos);
            input.value = "";
            input.focus();
            atualizarListaAmigos();
        } else {
            alert("Esse nome já foi adicionado!");
        }
    } else {
        alert("Digite um nome antes de adicionar!");
    }
}
document.getElementById("amigo").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});
function atualizarListaAmigos() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach((amigo, index) => {
        let item = document.createElement("li");
        item.textContent = amigo;
        item.classList.add("fade-in");
        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = " ❌ ";
        botaoRemover.classList.add("remove-btn");
        botaoRemover.onclick = function () {
            removerAmigo(index);
        };
        item.appendChild(botaoRemover);
        lista.appendChild(item);
    });
}
function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarListaAmigos();
}
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear!");
        return;
    }
    if (sorteados.size === amigos.length) {
        sorteados.clear(); 
        alert("Todos os amigos já foram sorteados! Reiniciando a lista.");
    }
    let resultado = document.getElementById("resultado");
    let rodadas = 15;
    let i = 0;
    let intervalo = setInterval(() => {
        let nomeAleatorio;
        do {
            nomeAleatorio = amigos[Math.floor(Math.random() * amigos.length)];
        } while (sorteados.has(nomeAleatorio));
        
        resultado.innerHTML = `<li class="sorteado">${nomeAleatorio}</li>`;

        if (i >= rodadas) {
            clearInterval(intervalo);
            sorteados.add(nomeAleatorio);
            resultado.innerHTML = `<li class="sorteado final">${nomeAleatorio} 🎁</li>`;
        }
        i++;
    }, 100);
}

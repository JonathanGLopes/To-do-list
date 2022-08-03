const inputTarefa = document.querySelector(".input-tarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

function criaLi(){
    const li = document.createElement('li');
    return li;
}

// Aqui nós utilizando o eventListener para adicionar uma tarefa utilizando o Enter, utilizando uma verificação para que se o evento de keypress for igual o keycode 13 (Enter) ele realizar a tarefa.
inputTarefa.addEventListener("keypress", function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput(){
    inputTarefa.value = ''; // Função criada para limpar o input após adicionar uma tarefa
    inputTarefa.focus(); // O focus aqui serve para retornar o cursor piscando dentro do input utilizado
}

function criaBotaoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar'); //Aqui nós estamos adicionando uma classe através do setAttribute. Nele nós passamos 2 parâmetros, o atributo e o valor. Nesse caso passamos que será adicionado uma classe e logo a frente o nome da classe adicionada.
    botaoApagar.setAttribute('title', 'Apagar tarefa'); // Outro exemplo utilizando setAttribute, que pode ser utilizado de diversas maneiras.
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput){
    const li = criaLi(); // No caso dessa variável li, ela não é a mesma da outra que cria o elemento li no HTML pois estão em escopos de funções diferentes.
    li.innerText = textoInput;
    tarefas.appendChild(li); // Aqui usando o apprendChild nós estamos inserindo o li dentro da ul tarefas.
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}
// Dentro da função criaTarefa nós estamos chamando outras funções, pois quando a criação for executada, junto dela é para ser criado as outras funcionalidades como o botão de apagar por exemplo.


btnTarefa.addEventListener("click", function(){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener("click", function(e){
    const elemento = e.target;

    if(elemento.classList.contains('apagar')){
        elemento.parentElement.remove(); //Aqui nós temos a seguinte condição: Se o elemento clicado conter a classe 'apagar', o pai dele será removido. No caso ao clicar no botão apagar, o pai dele (li) será apagado.
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll("li"); // Selecionando todos elementos dentro da ul tarefas.
    const listaDeTarefas = [];

    for(let tarefa of listaDeTarefas){
        let TarefaTexto = tarefa.innerText;
        TarefaTexto = TarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(TarefaTexto); // Adicionando o texto inserido no input dentro do array
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();
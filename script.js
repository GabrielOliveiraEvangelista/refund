// Seleciona os elementos do DOM
const amount = document.getElementById('amount'); // Campo de entrada para o valor da despesa
const expense = document.getElementById('expense'); // Campo de entrada para o nome da despesa
const category = document.getElementById('category'); // Campo de seleção para a categoria da despesa
const form = document.querySelector('form'); // Seleciona o formulário
const ul = document.querySelector('ul'); // Seleciona a lista não ordenada que conterá as despesas
const spanP = document.querySelector('p span'); // Seleciona o span dentro do elemento <p>, usado para contar as despesas
const h2 = document.querySelector('h2'); // Seleciona o elemento <h2> que exibirá o total das despesas

// Array para armazenar as despesas
const listaDespesas = [];

// Função para formatar valores numéricos como moeda brasileira (R$)
function formatarValor(valor) {
    return Number(valor).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para adicionar uma nova despesa
function addDespesa(objDespesa) {
    try {
        // Adiciona a nova despesa ao array listaDespesas
        listaDespesas.push(objDespesa);

        // Criação de elementos HTML para representar a despesa na lista
        const novaLi = document.createElement('li');
        novaLi.className = 'expense'; // Adiciona uma classe para estilização
        novaLi.dataset.id = listaDespesas.length - 1; // Atribui o índice da despesa como um id de dados

        // Criação e configuração de elementos filhos da li
        const imgLi = document.createElement('img'); // Ícone de tipo da despesa
        imgLi.alt = 'Ícone de tipo da despesa'; // Texto alternativo para acessibilidade
        const divLi = document.createElement('div'); // Div que conterá as informações da despesa
        divLi.className = 'expense-info'; // Classe para estilização da div
        const strongLiDiv = document.createElement('strong'); // Elemento para o nome da despesa
        strongLiDiv.textContent = objDespesa.nomeDespesa; // Atribui o nome da despesa
        const spanLiDiv = document.createElement('span'); // Elemento para a categoria da despesa
        const spanLi = document.createElement('span'); // Elemento para o valor da despesa
        spanLi.className = 'expense-amount'; // Classe para estilização do valor
        spanLi.textContent = objDespesa.valorDespesa.replace('R$', ''); // Atribui o valor da despesa, removendo o símbolo de real
        const smallLiSpan = document.createElement('small'); // Pequeno texto "R$" para o valor
        smallLiSpan.textContent = 'R$'; // Atribui "R$" ao texto
        const imgLiDelete = document.createElement('img'); // Ícone para remover a despesa
        imgLiDelete.src = './img/remove.svg'; // Caminho da imagem de remoção
        imgLiDelete.alt = 'remover'; // Texto alternativo para o ícone de remoção
        imgLiDelete.className = 'remove-icon'; // Classe para estilização do ícone de remoção

        // Determina o ícone e o texto da categoria com base na categoria da despesa
        switch (objDespesa.categoria) {
            case 'food':
                imgLi.src = './img/food.svg';
                spanLiDiv.textContent = 'Alimentação';
                break;
            case 'accommodation':
                imgLi.src = './img/accommodation.svg';
                spanLiDiv.textContent = 'Hospedagem';
                break;
            case 'services':
                imgLi.src = './img/services.svg';
                spanLiDiv.textContent = 'Serviços';
                break;
            case 'transport':
                imgLi.src = './img/transport.svg';
                spanLiDiv.textContent = 'Transporte';
                break;
            case 'others':
                imgLi.src = './img/others.svg';
                spanLiDiv.textContent = 'Outros';
                break;
        }

        // Atualiza o contador de despesas no span
        spanP.textContent = `${listaDespesas.length} despesas`;

        // Calcula o total de todas as despesas
        let totalDespesas = 0;
        listaDespesas.forEach((element) => {
            totalDespesas += Number(element.valorDespesa.replace('R$', '').replace('.', '').replace(',', '.'));
        });

        // Atualiza o texto do <h2> com o total formatado
        h2.textContent = formatarValor(totalDespesas).replace('R$', "");
        const smallH2 = document.createElement('small'); // Cria um elemento <small> para "R$"
        smallH2.textContent = "R$"; // Atribui "R$" ao <small>
        h2.prepend(smallH2); // Adiciona o <small> antes do texto do <h2>

        // Monta a estrutura do item da lista na interface
        ul.appendChild(novaLi); // Adiciona o <li> à lista
        novaLi.appendChild(imgLi); // Adiciona o ícone à <li>
        novaLi.appendChild(divLi); // Adiciona a div de informações à <li>
        divLi.appendChild(strongLiDiv); // Adiciona o nome da despesa à div
        divLi.appendChild(spanLiDiv); // Adiciona a categoria da despesa à div
        spanLi.prepend(smallLiSpan); // Adiciona o "R$" ao valor da despesa
        novaLi.appendChild(spanLi); // Adiciona o valor da despesa à <li>
        novaLi.appendChild(imgLiDelete); // Adiciona o ícone de remoção à <li>

        // Evento de clique para remover a despesa
        imgLiDelete.addEventListener('click', () => {
            const id = novaLi.dataset.id; // Obtém o id da despesa
            listaDespesas.splice(id, 1); // Remove a despesa do array
            novaLi.remove(); // Remove o elemento <li> do DOM

            // Atualiza o contador de despesas após a remoção
            spanP.textContent = `${listaDespesas.length} despesas`;

            // Recalcula o total de despesas após a remoção
            let totalDespesasAtualizado = 0;
            listaDespesas.forEach((element) => {
                totalDespesasAtualizado += Number(element.valorDespesa.replace('R$', '').replace('.', '').replace(',', '.'));
            });

            // Atualiza o texto do <h2> com o novo total formatado
            h2.textContent = formatarValor(totalDespesasAtualizado).replace('R$', "");
            const smallH2Atualizado = document.createElement('small'); // Cria um novo <small> para "R$"
            smallH2Atualizado.textContent = "R$"; // Atribui "R$" ao <small>
            h2.prepend(smallH2Atualizado); // Adiciona o <small> antes do texto do <h2>
        });

    } catch (error) {
        console.log(error); // Loga o erro no console, se ocorrer
    }
}

// Evento de input para formatar o campo de valor em tempo real
amount.addEventListener('input', () => {
    amount.value = amount.value.replace(/\D+/g, ''); // Remove todos os caracteres não numéricos
    amount.value = formatarValor(Number(amount.value) / 100); // Formata o valor como moeda
});

// Evento de submit do formulário para adicionar uma nova despesa
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o comportamento padrão de submit do formulário

    // Cria um objeto com os dados da nova despesa
    const novaDespesa = {
        valorDespesa: amount.value,
        nomeDespesa: expense.value,
        categoria: category.value
    };

    // Chama a função para adicionar a nova despesa
    addDespesa(novaDespesa);
});

// Array para armazenar os funcionários
const funcionarios = [];


// Função para adicionar um funcionário à lista e atualizar a tabela
function adicionarFuncionario() {
    // Obtém os valores dos campos de entrada (nome, cargo e salário)
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;


    // Verifica se todos os campos (nome, cargo e salário) estão preenchidos
    if (nome && cargo && salario) {
        // Verifica se o nome já existe na lista 'funcionarios'
        if (funcionarios.some(funcionario => funcionario.nome === nome)) {
            alert('Esse nome de funcionário já existe na lista.');
            return;
        }


        // Adiciona o funcionário ao array 'funcionarios'
        const novoFuncionario = { nome, cargo, salario };
        funcionarios.push(novoFuncionario);


        // Obtém a tabela de funcionários
        const tabelaFuncionarios = document.getElementById('tabelaFuncionarios');


        // Cria uma nova linha na tabela
        const newRow = tabelaFuncionarios.insertRow();


        // Cria células na linha para nome, cargo, salário e botão de exclusão
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);


        // Preenche as células com os valores do funcionário e um botão "Excluir"
        cell1.innerHTML = nome;
        cell2.innerHTML = cargo;
        cell3.innerHTML = salario;
        cell4.innerHTML = '<button class="btn-delete" onclick="excluirFuncionario(this)">Excluir</button>';


        // Limpa os campos de entrada após adicionar o funcionário
        document.getElementById('nome').value = '';
        document.getElementById('cargo').value = '';
        document.getElementById('salario').value = '';
    }
}


// Função para excluir um funcionário da lista e da tabela
function excluirFuncionario(button) {
    // Obtém a linha da tabela que contém o botão "Excluir"
    const row = button.parentNode.parentNode;


    // Obtém o índice da linha
    const rowIndex = row.rowIndex - 1; // Ajusta para o índice correto no array


    // Remove o funcionário da lista 'funcionarios'
    funcionarios.splice(rowIndex, 1);


    // Remove a linha da tabela
    row.parentNode.removeChild(row);


    // Após excluir o funcionário, chama a função para gerar o CSV
    gerarCSV();
}


// Função para gerar o CSV e exportar
function gerarCSV() {
    // Verifica se há funcionários para exportar
    if (funcionarios.length === 0) {
        alert('Não há funcionários para exportar.');
        return;
    }


    // Cria o conteúdo CSV
    let csvContent = 'Nome,Cargo,Salário\n';


    // Adiciona as informações de cada funcionário ao conteúdo CSV
    for (const funcionario of funcionarios) {
        const { nome, cargo, salario } = funcionario;
        csvContent += `${nome},${cargo},${salario}\n`;
    }


    // Cria um objeto Blob contendo o conteúdo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });


    // Cria um link para download do arquivo CSV
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'funcionarios.csv';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

import express from 'express';

const app = express();
const porta = 3000;

function calcularSalario(idade, sexo, salarioBase, anoContratacao) {
    const anoAtual = new Date().getFullYear();
    const tempoEmpresa = anoAtual - anoContratacao;

    let reajuste = 0;
    let adicional = 0;

    if (idade >= 18 && idade <= 39) {

        reajuste = sexo === 'M' ? 0.10 : 0.08;
        adicional = tempoEmpresa > 10 ? (sexo === 'M' ? 17 : 16) : (sexo === 'M' ? 10 : 11);

    } else if (idade >= 40 && idade <= 69) {

        reajuste = sexo === 'M' ? 0.08 : 0.10;
        adicional = tempoEmpresa > 10 ? (sexo === 'M' ? 15 : 14) : (sexo === 'M' ? 5 : 7);

    } else if (idade >= 70 && idade <= 99) {

        reajuste = sexo === 'M' ? 0.15 : 0.17;
        adicional = tempoEmpresa > 10 ? (sexo === 'M' ? 13 : 12) : (sexo === 'M' ? 15 : 17);
    }

    const novoSalario = salarioBase + (salarioBase * reajuste) + adicional;
    return novoSalario.toFixed(2);
}

app.get('/', (req, res) => {
    const { idade, sexo, salario_base, anoContratacao, matricula } = req.query;

    if (!idade && !sexo && !salario_base && !anoContratacao && !matricula) {
    return res.send(`
        <h1>Calculador de Reajuste Salarial</h1>
        <form method="GET" action="/">
            <label>Idade:</label>
            <input type="number" name="idade" required><br><br>

            <label>Sexo (M ou F):</label>
            <select name="sexo" required>
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
            </select><br><br>

            <label>Salário Base:</label>
            <input type="number" step="0.01" name="salario_base" required><br><br>

            <label>Ano Contratação:</label>
            <input type="number" name="anoContratacao" required><br><br>

            <label>Matrícula:</label>
            <input type="number" name="matricula" required><br><br>

            <button type="submit">Calcular</button>
        </form>
    `);
}

    
    const idadeNum = parseInt(idade);
    const salarioBaseNum = parseFloat(salario_base);
    const anoNum = parseInt(anoContratacao);
    const matriculaNum = parseInt(matricula);
    const sexoFormatado = sexo?.toUpperCase();
    
    if (

        isNaN(idadeNum) || idadeNum <= 16 ||
        isNaN(salarioBaseNum) ||
        isNaN(anoNum) || anoNum < 1960 ||
        isNaN(matriculaNum) || matriculaNum <= 0 ||
        (sexoFormatado !== 'M' && sexoFormatado !== 'F')
    ) {
        return res.send(`
            <h1>Erro nos dados informados</h1>
            <p>Verifique se:</p>
            <ul>
                <li>Idade é maior que 16</li>
                <li>Salário base é um número válido</li>
                <li>Ano de contratação é maior que 1960</li>
                <li>Matrícula é um número maior que zero</li>
                <li>Sexo é "M" ou "F"</li>
            </ul>
            <a href="/">Voltar</a>
        `);
    }

    const novoSalario = calcularSalario(idadeNum, sexo, salarioBaseNum, anoNum);

    res.send(`
        <h1>Resultado do Cálculo</h1>
        <p><strong>Matrícula:</strong> ${matriculaNum}</p>
        <p><strong>Idade:</strong> ${idadeNum}</p>
        <p><strong>Sexo:</strong> ${sexo}</p>
        <p><strong>Salário Base:</strong> R$ ${salarioBaseNum.toFixed(2)}</p>
        <h2 style="color: green;">Novo Salário: R$ ${novoSalario}</h2>
        <a href="/">Calcular novamente</a>
    `);
});


app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});

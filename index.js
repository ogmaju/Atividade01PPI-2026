
import app from "./api/index.js";

const porta = 3000;

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
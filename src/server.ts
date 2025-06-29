import express from "express";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";

const PORT = 3333;
const app = express();

// lidando com resposta em json
app.use(express.json());

// rotas
app.use(routes);

// tratamento de exceções
app.use(errorHandling);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

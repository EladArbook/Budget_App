const express = require("express");
const app = express();
app.use(express.json());
const config = require("./configuration.json");
const cors = require("cors");
app.use(cors());


const incomeController = require("./Control-Layer/income_controller");
const outcomeController = require("./Control-Layer/outcome_controller");

app.use(config.incomeApi, incomeController);
app.use(config.outcomeApi, outcomeController);

app.listen(3800, () => {
    console.log("Listening on 3800");
});



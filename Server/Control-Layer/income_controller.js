const express = require("express");
const router = express.Router();
const incomeBll = require("../Bussiness-Layer/income_bll");

router.get("/", async (req, res) => {
    try {
        const allIncomes = await incomeBll.getAllIncomes();
        res.send(allIncomes);
    }
    catch (err) {
        res.status(404).send({ message: "Server error" });
        console.log(err);
    }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (incomeBll.deleteIncome(id)) {
        res.send("Delete OK.");
        console.log("Income deleted.");
    }
    else
        res.send("Registry wasn't found.");
});

// Middleware

router.post("/", async (req, res) => {

    const newIncome = req.body;
    if (incomeBll.addIncome(newIncome)) {
        res.send("Post Ok");
        console.log("Income posted successfully");
    }
    else {
        res.status(404).send({ message: "Couldn't send income to the server" });
        console.log("Couldn't send income to the server");
    }
});

router.put("/", (req, res) => {
    const editIncome = req.body;
    if (incomeBll.putIncome(editIncome)) {
        res.send("Put OK.");
        console.log("Income has been edited (Put).");
    }
    else
        res.status(404).send("Invalid information has been given in editing income");

});

router.patch("/", (req, res) => {
    const editIncome = req.body;
    if (incomeBll.patchIncome(editIncome))
        res.send("Patch OK.");
    else
        res.status(404).send("Invalid information has been given in patching income");
});

module.exports = router;
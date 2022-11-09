

const express = require("express");
const router = express.Router();
const outcomeBll = require("../Bussiness-Layer/outcome_bll");

router.get("/", async (req, res) => {
    try {
        const allOutcomes = await outcomeBll.getAllOutcomes();
        res.send(allOutcomes);
    }
    catch (err) {
        res.status(404).send({ message: "Server error" });
        console.log(err);
    }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (outcomeBll.deleteOutcome(id)) {
        res.send("Delete OK.");
        console.log("Outcome deleted.");
    }
    else
        res.send("Registry wasn't found.");
});

// Middleware

router.post("/", async (req, res) => {

    const newOutcome = req.body;
    if (outcomeBll.addOutcome(newOutcome)) {
        res.send("Post Ok");
        console.log("Outcome posted successfully");
    }
    else {
        res.status(404).send({ message: "Couldn't send outcome to the server" });
        console.log("Couldn't send outcome to the server");
    }
});

router.put("/", (req, res) => {
    const editOutcome = req.body;
    if (outcomeBll.putOutcome(editOutcome)) {
        res.send("Put OK.");
        console.log("Outcome has been edited (Put).");
    }
    else
        res.status(404).send("Invalid information has been given in editing outcome");

});

router.patch("/", (req, res) => {
    const editOutcome = req.body;
    if (outcomeBll.patchOutcome(editOutcome))
        res.send("Patch OK.");
    else
        res.status(404).send("Invalid information has been given in patching outcome");
});

module.exports = router;
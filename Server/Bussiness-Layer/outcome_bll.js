const dal = require("../Data-Layer/outcome_dal");

function getAllOutcomes() {
    return dal.getAllOutcomes("SELECT * FROM `outcomes` WHERE 1");
}


function deleteOutcome(id) {
    const sqlCmd = `DELETE FROM outcomes WHERE outcomeId=${id}`;
    return (dal.deleteOutcome(sqlCmd));
}

function findErrors(newOutcome) {

    const errors = {};

    if (!newOutcome.amount)
        errors.amount = "amount is missing.";
    else if (newOutcome.amount < 0)
        errors.amount = "amount must be a positive number.";

    if (!newOutcome.category)
        errors.category = "category is missing.";
    else if (newOutcome.category < 1 || newOutcome.category > 4)
        errors.category = "category can only be a number between 1 and 4.";

    if (!newOutcome.date)
        errors.date = "date is required.";

    const errorsLength = Object.keys(errors).length;
    if (errorsLength <= 0)
        return null;
    else
        return errors;
}


function addOutcome(newOutcome) {
    if (newOutcome) {
        let errors = findErrors(newOutcome);

        if (errors) {
            return false;
        }
        else {
            if (!newOutcome.description)
                newOutcome.description = "";
            const sqlCmd = `INSERT INTO outcomes(outcomeId, amount, description, category, date) 
    VALUES ('${newOutcome.outcomeId}','${newOutcome.amount}','${newOutcome.description}','${newOutcome.category}','${newOutcome.date}')`;
            return dal.addOutcome(sqlCmd);
        }
    }
    else
        return false;
}


function putOutcome(editOutcome) {
    if (editOutcome) {
        let errors = findErrors(editOutcome);
        if (errors)
            return false;
        else {
            const sqlCmd = `UPDATE outcomes SET amount='${editOutcome.amount}',
            description='${editOutcome.description}',category='${editOutcome.category}',
            date='${editOutcome.date}' WHERE outcomeId = ${editOutcome.outcomeId}`;
            return dal.putOutcome(sqlCmd);
        }


    }
    else
        return false;
};

function patchOutcome(editOutcome) { //  ___ check if empty on react ___

    if (editOutcome) {

        const sqlCmd = `UPDATE outcomes SET ${editOutcome.amount ? `amount=${editOutcome.amount},` : ""}${editOutcome.description ? `description='${editOutcome.description}',` : ""}${editOutcome.category ? `category=${editOutcome.category},` : ""}${editOutcome.date ? `date='${editOutcome.date}',` : ""}`;
        const sqlCmd1 = sqlCmd.slice(0, sqlCmd.length - 1);
        const sqlCmd2 = sqlCmd1 + ` WHERE outcomeId = ${editOutcome.outcomeId}`;
        return dal.patchOutcome(sqlCmd2);
    }
    else
        return false;
};

module.exports = {
    getAllOutcomes, addOutcome, deleteOutcome, putOutcome, patchOutcome
};


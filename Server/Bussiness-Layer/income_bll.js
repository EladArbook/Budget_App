const dal = require("../Data-Layer/income_dal");

function getAllIncomes() {
    return dal.getAllIncomes("SELECT * FROM `incomes` ORDER by incomeId DESC");
}

function deleteIncome(id) {
    const sqlCmd = `DELETE FROM incomes WHERE incomeId=${id}`;
    return (dal.deleteIncome(sqlCmd));
}

function findErrors(newIncome) {

    const errors = {};

    if (!newIncome.amount)
        errors.amount = "amount is missing.";
    else if (newIncome.amount < 0)
        errors.amount = "amount must be a positive number.";

    if (!newIncome.category)
        errors.category = "category is missing.";
    else if (newIncome.category < 1 || newIncome.category > 4)
        errors.category = "category can only be a number between 1 and 4.";

    if (!newIncome.date)
        errors.date = "date is required.";

    const errorsLength = Object.keys(errors).length;
    if (errorsLength <= 0)
        return null;
    else
        return errors;
}

function addIncome(newIncome) {
    if (newIncome) {
        let errors = findErrors(newIncome);
        if (errors) {
            return false;
        }
        else {
            if (newIncome.description == "")
                newIncome.description = "";
            const sqlCmd = `INSERT INTO incomes(amount, description, category, date) VALUES ('${newIncome.amount}','${newIncome.description}','${newIncome.category}','${newIncome.date}')`;
            return dal.addIncome(sqlCmd);
        }
    }
    else
        return false;
}

function putIncome(editIncome) {
    if (editIncome) {
        let errors = findErrors(editIncome);
        if (errors)
            return false;
        else {
            const sqlCmd = `UPDATE incomes SET amount='${editIncome.amount}',
            description='${editIncome.description}',category='${editIncome.category}',
            date='${editIncome.date}' WHERE incomeId = ${editIncome.incomeId}`;
            return dal.putIncome(sqlCmd);
        }
    }
    else
        return false;
};

function patchIncome(editIncome) { //  ___ check if empty on react ___
    if (editIncome) {
        const sqlCmd = `UPDATE incomes SET ${editIncome.amount ? `amount=${editIncome.amount},` : ""}${editIncome.description ? `description='${editIncome.description}',` : ""}${editIncome.category ? `category=${editIncome.category},` : ""}${editIncome.date ? `date='${editIncome.date}',` : ""}`;
        const sqlCmd1 = sqlCmd.slice(0, sqlCmd.length - 1);
        const sqlCmd2 = sqlCmd1 + ` WHERE incomeId = ${editIncome.incomeId}`;
        return dal.patchIncome(sqlCmd2);
    }
    else
        return false;
};

module.exports = {
    getAllIncomes, addIncome, deleteIncome, putIncome, patchIncome
};
const db = require("mysql");

const pool = db.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "wallet"
});

function dataChanges(sqlCmd) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCmd, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
/*async ? */
function getAllIncomes(sqlCmd) {
    return dataChanges(sqlCmd);
}

function deleteIncome(sqlCmd) {
    return dataChanges(sqlCmd);
}

function addIncome(sqlCmd) {
    return dataChanges(sqlCmd);
}

function putIncome(sqlCmd) {
    return dataChanges(sqlCmd);

};

function patchIncome(sqlCmd) {
    return dataChanges(sqlCmd);
}

module.exports = {
    getAllIncomes, addIncome, deleteIncome, putIncome, patchIncome
    /*,  getSingleIncome, */
}
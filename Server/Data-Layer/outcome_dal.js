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
function getAllOutcomes(sqlCmd) {
    return dataChanges(sqlCmd);
}

function deleteOutcome(sqlCmd) {
    return dataChanges(sqlCmd);
}

function addOutcome(sqlCmd) {
    return dataChanges(sqlCmd);
}

function putOutcome(sqlCmd) {
    return dataChanges(sqlCmd);

};

function patchOutcome(sqlCmd) {
    return dataChanges(sqlCmd);
}

module.exports = {
    getAllOutcomes, addOutcome, deleteOutcome, putOutcome, patchOutcome
}
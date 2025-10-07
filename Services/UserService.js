const conn = require('./Database');


const FetchUsers = (req, res) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * from users";

        let query = conn.query(sql, (err, result, field) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const DeleteUsers = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM users WHERE id = ?`;
        let query = conn.query(sql, [id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const PostUsers = (users) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO users (firstname, lastname) VALUES (?,?)`;
        let query = conn.query(sql, [users.firstname, users.lastname], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
            console.table(result);
        });


    })
};

const PatchUsers = (modification) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE users SET firstname = ?, lastname = ? WHERE id = ?`;
        let query = conn.query(sql, [modification.firstname, modification.lastname, modification.id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const SelectUsersById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        conn.query(sql, [id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};




module.exports = {
    FetchUsers,
    DeleteUsers,
    PostUsers,
    PatchUsers,
    SelectUsersById
}
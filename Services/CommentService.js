const conn = require("./Database")

const FecthComment = (req,res) =>{
    return new Promise((resolve, reject) => {
        const sql = "Select * from comments";
        let querry = conn.query(sql, (err, result, field) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const SelectCommentById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM comments WHERE id = ?';
        let query = conn.query(sql, [id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const ModifyComment = (modification) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE comments SET content = ? WHERE id = ?`;
        let query = conn.query(sql, [modification.content], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const DeleteComment = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM comments WHERE id = ?`;
        let query = conn.query(sql, [id], (err, result, field) => {
            if(err) reject(err);
            resolve(result);
            console.log(result);
            
        })
    })
}




module.exports = {
    FecthComment,
    SelectCommentById,
    ModifyComment,
    DeleteComment
}
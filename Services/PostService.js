const conn = require("./Database")

const FetchPost = (req, res) => {
    return new Promise((resolve, resject) => {
        const sql = "SELECT * from posts";
        let query = conn.query(sql, (err, result, field) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const SelectPostById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM posts WHERE id = ?";
        conn.query(sql, [id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const SelectPostByUserId = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM posts WHERE userId = ?";
        conn.query(sql, [id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const ModifyPost = (modification) => {
    return new Promise((resolve, reject) => {
        let sql = `UPDATE posts SET title = ?, content = ? WHERE id = ?`;
        let query = conn.query(sql, [modification.title, modification.content, modification.id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const DeletePost = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE from posts WHERE id = ?`;
        let query = conn.query(sql, [id], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const DeletePostById = (userId) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE from posts WHERE userId = ?`;
        let query = conn.query(sql, [userId], (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
            console.log(result);

        });
    });
};

const AddPosts = (post) => {
    return new Promise((resolve, reject) => {
        const insertSql = 'INSERT INTO posts (userId, title, content) VALUES (?, ?, ?)';
        conn.query(insertSql, [post.userId, post.title, post.content], (err, result) => {
            if (err) return reject(err);

            const newId = result.insertId;
            const selectSql = 'SELECT id, userId, title, content, createdDT FROM posts WHERE id = ?';
            conn.query(selectSql, [newId], (err2, rows) => {
                if (err2) return reject(err2);
                if (!rows || rows.length === 0)
                    return reject(new Error('Post non trouvé après INSERT'));
                resolve(rows[0]);             
            });
        });
    });
};


module.exports = {
    FetchPost,
    SelectPostById,
    SelectPostByUserId,
    ModifyPost,
    DeletePost,
    AddPosts,
    DeletePostById
}
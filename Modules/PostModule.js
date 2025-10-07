const express = require('express');
const router = express.Router();
const PostService = require('../Services/PostService');
const { format } = require('date-fns');
const { fr } = require('date-fns/locale');
const { succesResponse, errorResponse } = require('../Helpers/postResponseHelper');

// * GET all posts
router.get('/', (req, res) => {
    PostService.FetchPost().then((result) => {
        if (!result || result.length === 0) {
            return errorResponse(res, 204, "Aucun post trouvé", {
                errorCode: "POST_NOT_FOUND"
            });
        };
        return succesResponse(res, 200, result, "Liste des posts récupérée avec succès", {
            count: result.length
        });
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "Erreur lors de la récupération des posts", {
            errorCode: "DB_QUERY_FAILED",
            sqlCode: err.code
        });
    });
});

// * GET post by ID
router.get('/:id', (req, res) => {
    const currentId = req.params.id;

    PostService.SelectPostById(currentId).then((result) => {
        if (!result || result.length === 0) {
            return errorResponse(res, 204, "Aucun post trouvé avec cet identifiant", {
                errorCode: "POST_NOT_FOUND",
                postId: currentId
            });
        };
        return succesResponse(res, 200, result[0], "Le post as été récupéré avec succès", {
            userId: currentId
        });
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "Une erreur est survenue lors de la récupération du post", {
            errorCode: "DB_QUERY_FAILED",
            sqlCode: err.code
        });
    });
});

// * GET posts by user ID
router.get('/users/:id', (req, res) => {
    const currentId = req.params.id;

    PostService.SelectPostByUserId(currentId).then((result) => {
        if (!result || result.length === 0) {
            return errorResponse(res, 204, "Aucun post trouvé avec cet identifiant", {
                errorCode: "POST_NOT_FOUND",
                postId: currentId
            });
        };
        return succesResponse(res, 200, result, "Le ou les posts ont été récupéré avec succès", {
            userId: currentId
        });
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "Erreur lors de la récupération des posts", {
            errorCode: "DB_QUERY_FAILED",
            sqlCode: err.code
        });
    });
});

// * POST new post
router.post('/', (req, res) => {
    let data = req.body;

    if (!data || !data.userId || !data.title || !data.content) {
        return errorResponse(res, 400, "Certains champs obligatoires sont manquants", {
            errorCode: "VALIDATION_ERROR",
            required: ["userId", "title", "content"]
        });
    };
    PostService.AddPosts(data).then(result => {
        const createdDate = format(new Date(result.createdDT), 'dd/MM/yyyy HH:mm', { locale: fr });

        return succesResponse(res, 201, {
            userId: data.userId,
            title: data.title,
            content: data.content
        }, `Le post ${data.title} a bien été créé`, {
            createdId: result.insertId,
            createdAt: createdDate
        });
    }).catch(err => {
        console.log(err);
        return errorResponse(res, 500, "Erreur lors de la création du post", {
            errorCode: "DB_INSERT_FAILED",
            sqlCode: err.code
        });
    });
});

// * PATCH post by ID
router.patch('/:id', async (req, res) => {
    let data = req.body;

    if (!data || !data.title || !data.content || !data.id) {
        return errorResponse(res, 400, "Certains champs obligatoires sont manquants", {
            errorCode: "VALIDATION_ERROR",
            required: ["title", "content", "id"]
        });
    };
    PostService.ModifyPost(data).then(result => {
        return succesResponse(res, 200, {
            title: data.title,
            content: data.content,
        }, `Le post ${data.title} a bien été modifié avec succès`, {
            modifiedPostId: data.id
        })
    }).catch(err => {
        console.log(err);
        return errorResponse(res, 500, "Une erreur est survenue lors de la mise à jour du post", {
            errorCode: "DB_PATCH_FAILED",
            sqlCode: err.code
        });
    });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    PostService.DeletePost(id).then((result) => {
        if (!result || result.affectedRows === 0) {
            return errorResponse(res, 204, "Aucun post trouvé avec cet identifiant", {
                errorCode: "POST_NOT_FOUND",
                PostId: id
            });
        };
        return succesResponse(res, 200, null, "Le post a été supprimé avec succès", {
            postId: id
        });
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "Une erreur est survenue lors de la suppression du post", {
            errorCode: "DB_DELETE_FAILED",
            sqlCode: err.code,
            userId: id
        });
    });
});

router.delete('/users/:userId/posts', async (req, res) => {
    let userId = req.params.userId;

    PostService.DeletePostById(userId).then((result) => {
        if (!result || result.affectedRows === 0) {
            return errorResponse(res, 204, "Aucun post trouvé avec cet identifiant", {
                errorCode: "POST_NOT_FOUND",
                userId: userId
            });
        };
        return succesResponse(res, 200, null, "Le post a été supprimé avec succès", {
            userId: userId
        });
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "Une erreur est survenue lors de la suppression du post", {
            errorCode: "DB_DELETE_FAILED",
            sqlCode: err.code,
            userId: userId
        });
    });
});



module.exports = router;
const express = require('express');
const router = express.Router();
const UserService = require('../Services/UserService');
const { succesResponse, errorResponse } = require('../Helpers/userResponseHelper');

//* GET all users
router.get('/', (req, res) => {
    UserService.FetchUsers().then((result) => {
        if (!result || result.length === 0) {
            return errorResponse(res, 204, "Aucun utilisateur trouvé", {
                errorCode: "USER_NOT_FOUND"
            });
        }

        return succesResponse(res, 200, result, "Liste des utilisateurs récupérée avec succès", {
            count: result.length
        });
    }).catch((err) => {
        console.error(err);
        return errorResponse(res, 500, "Erreur lors de la récupération des utilisateurs", {
            errorCode: "DB_QUERY_FAILED",
            sqlCode: err.code
        });
    });
});

// * GET user by ID
router.get('/:id', (req, res) => {
    const currentId = req.params.id;

    UserService.SelectUsersById(currentId).then((result) => {
        if (!result || result.length === 0) {
            return errorResponse(res, 204, "Aucun utilisateur trouvé avec cet identifiant", {
                errorCode: "USER_NOT_FOUND",
                userId: currentId
            });
        };
        return succesResponse(res, 200, result[0], "L'utilisateur a été récupéré avec succès", {
            userId: currentId
        })
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "Une erreur est survenue lors de la récupération de l'utilisateur", {
            errorCode: "DB_QUERY_FAILED",
            sqlCode: err.code
        });
    });
});

// * POST user
router.post('/', (req, res) => {
    let data = req.body;

    if (!data || !data.firstname || !data.lastname) {
        return errorResponse(res, 400, "Certains champs obligatoires sont manquants", {
            errorCode: "VALIDATION_ERROR",
            required: ["firstname", "lastname"]
        });
    };
    UserService.PostUsers(data).then((result) => {
        return succesResponse(res, 201, {
            id: result.insertId,
            firstname: data.firstname,
            lastname: data.lastname
        }, `L'utilisateur ${data.firstname} a bien été créé`, {
            createdId: result.insertId
        });
    }).catch((err) => {
        console.error(err);
        return errorResponse(res, 500, "Erreur lors de la création de l'utilisateur", {
            errorCode: "DB_INSERT_FAILED",
            sqlCode: err.code
        });
    });
});

// * PATCH user by ID
router.patch('/:id', async (req, res) => {
    let data = req.body;

    if (!data || !data.firstname || !data.lastname || !data.id) {
        return errorResponse(res, 400, "Certains champs obligatoires sont manquants", {
            errorCode: "VALIDATION_ERROR",
            required: ["firstname", "lastname", "id"]
        });
    };
    UserService.PatchUsers(data).then(result => {
        return succesResponse(res, 200, {
            firstname: data.firstname,
            lastname: data.lastname
        }, `L'utilisateur ${data.firstname} a été modifié avec succès`, {
            modifiedUserId: data.id
        });
    }).catch(err => {
        console.error(err);
        return errorResponse(res, 500, "Une erreur est survenue lors de la mise à jour de l'utilisateur", {
            errorCode: "DB_PATCH_FAILED",
            sqlCode: err.code
        });
    });
});

// * DELETE user by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    UserService.DeleteUsers(id).then((result) => {
        if (!result || result.affectedRows === 0) {
            return errorResponse(res, 204, "Aucun utilisateur trouvé avec cet identifiant", {
                errorCode: "USER_NOT_FOUND",
                userId: id
            });
        };
        return succesResponse(res, 200, null, "L'utilisateur a été supprimé avec succès", {
            userId: id
        });
    }).catch((err) => {
        console.error(err);
        return errorResponse(res, 500, "Une erreur est survenue lors de la suppression de l'utilisateur", {
            errorCode: "DB_DELETE_FAILED",
            sqlCode: err.code,
            userId: id
        });
    });
});


module.exports = router;
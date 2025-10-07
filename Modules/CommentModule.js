const express = require("express");
const router = express.Router();
const CommentService = require("../Services/CommentService");


router.get('/', (req, res) => {
    CommentService.FecthComment().then((result) => {
        res.json({ data: result })
    }).catch((err) => {
        res.json({ message: "Erreur lors de la récuparation des Comments." })
    });
});

router.get('/:id', (req, res) => {
    const currentId = req.params.id;

    CommentService.SelectCommentById(currentId).then((result) => {
        if (result.lenght === 0) {
            return res.status(404).json({ message: `Aucun comment avec l'id ${currentId} n'as été trouvé.` });
        }
        res.status(200).json(result[0]);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: `Erreur lors de la récupération du post` })
    });
});

router.patch('/:id', async (req, res) => {
    let data = req.body;
    console.log(data);
    CommentService.ModifyComment(data).then(result => {
        res.status(201);
        res.json(data);
        console.log('Requête SQL :', result);
    }).catch(err => {
        console.log(err);
        res.status(500).send({ "message": "Votre mise à jour ne s'est pas bien passé" });
    });
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    CommentService.DeleteComment(id).then((result) => {
        res.status(200).json({ message: "Comment supprimé" })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Erreur lors de la suppression du commentaire" })
    });
});




module.exports = router;
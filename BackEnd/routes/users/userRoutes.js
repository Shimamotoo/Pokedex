import { Router } from "express";
import db from "../../database/db.js";

const router = Router();

router.get("/", (req, res) => {
    
    const sqlQuery = "SELECT * FROM users";

    db.query(sqlQuery,(err, results) => {
        if(err){
            console.error(err); 
            return res.status(500).json({ error: "Erro ao buscar usuários." });
        }

        res.json(results);
    });
});

export default router;
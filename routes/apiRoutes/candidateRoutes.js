const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// code imported from server.js with route including `/api/...` which was removed since prefix
// is now defined in server.js

// return single candidate
router.get('/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates
                        LEFT JOIN partiies ON candidates.party_id = parties.id
                        WHERE candidates.id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: row
        });
    });
});

// return all candidates
router.get('/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates
                        LEFT JOIN parties ON candidates.party_id = parties.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// create candidate
// here, we are using object destructuring to pull the 'body' property from req object
router.post('/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// update candidate's party
router.put('/candidate/:id', (req, res) => {
    // this ensures that 'party_id' is being used for any PUT request to '/api/candidates/:id'
    const errors = inputCheck(req.body, 'party_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    };
    const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
    // to follow best practice: affected row id should always be part of route (ex `/api/candidate/2`)
    // while actual fields being updated should be part of body
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // check if record exists
        } else if (!result.affectedRows) { 
            res.json({ message: 'Candidate not found.' }); 
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// delete candidate
// `?` is a placeholder, making this a prepared statement (can execute same SQL statement
// repeatedly using different values in place of placeholder)
router.delete('/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id =?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({ message: 'Candidate not found'}) ;
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;
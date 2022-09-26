const express = require('express');
const db = require('./db/connection');
// `index.js` does not need to be specified since Node.js will automatically look for it
// when requiring the directory, but I added it anyways so no confusion occurs
const apiRoutes = require('./routes/apiRoutes');
// file provided by lesson

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// this allows us to remove `/api` prefix from individual API route expressions after moving codes
app.use('/api', apiRoutes);

// 404 as default response
app.use((req, res) => {
    res.status(404).end();
});

// start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// ========================================================
// ========================================================

// MODULARIZING CODE: MOVING THESE CODES TO DIFFERENT FILES

// ========================================================
// ========================================================

// sent to db/connection.js
// const mysql = require('mysql2');
// // connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         // change password to match login for MySQL
//         password: 'tayyabn1',
//         database: 'election'
//     },
//     console.log('Connected to the election database.')
// );

// ========================================================
// ========================================================

// sent to `routes/apiRoutes/candidateRoutes.js`
// const inputCheck = require('./utils/inputCheck');

// // return single candidate
// app.get('/api/candidate/:id', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates
//                         LEFT JOIN partiies ON candidates.party_id = parties.id
//                         WHERE candidates.id = ?`;
//     const params = [req.params.id];
//     db.query(sql, params, (err, row) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: "success",
//             data: row
//         });
//     });
// });

// // return all candidates
// app.get('/api/candidates', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates
//                         LEFT JOIN parties ON candidates.party_id = parties.id`;
//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// // create candidate
// // here, we are using object destructuring to pull the 'body' property from req object
// app.post('/api/candidate', ({ body }, res) => {
//     const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }
//     const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
//   VALUES (?,?,?)`;
//     const params = [body.first_name, body.last_name, body.industry_connected];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: body
//         });
//     });
// });

// // update candidate's party
// app.put('/api/candidate/:id', (req, res) => {
//     // this ensures that 'party_id' is being used for any PUT request to '/api/candidates/:id'
//     const errors = inputCheck(req.body, 'party_id');
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     };
//     const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
//     // to follow best practice: affected row id should always be part of route (ex `/api/candidate/2`)
//     // while actual fields being updated should be part of body
//     const params = [req.body.party_id, req.params.id];
//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             // check if record exists
//         } else if (!result.affectedRows) { 
//             res.json({ message: 'Candidate not found.' }); 
//         } else {
//             res.json({
//                 message: 'success',
//                 data: req.body,
//                 changes: result.affectedRows
//             });
//         }
//     });
// });

// // delete candidate
// // `?` is a placeholder, making this a prepared statement (can execute same SQL statement
// // repeatedly using different values in place of placeholder)
// app.delete('/api/candidate/:id', (req, res) => {
//     const sql = `DELETE FROM candidates WHERE id =?`;
//     const params = [req.params.id];
//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.statusMessage(400).json({ error: err.message });
//         } else if (!result.affectedRows) {
//             res.json({ message: 'Candidate not found'}) ;
//         } else {
//             res.json({
//                 message: 'deleted',
//                 changes: result.affectedRows,
//                 id: req.params.id
//             });
//         }
//     });
// });

// ========================================================
// ========================================================

// sent to `routes/apiRoutes/partyRoutes.js`
// // route for single party
// app.get('/api/party/:id', (req, res) => {
//     const sql = `SELECT * FROM parties WHERE id = ?`;
//     const params = [req.params.id];
//     db.query(sql, params, (err, row) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: row
//         });
//     });
// });

// // route for all parties
// app.get('/api/parties', (req, res) => {
//     const sql = `SELECT * FROM parties`;
//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// // delete party
// app.delete('/api/party/:id', (req, res) => {
//     const sql = `DELETE FROM parties WHERE id = ?`;
//     const params = [req.params.id];
//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: res.message });
//             // checks if anything was deleted
//         } else if (!result.affectedRows) {
//             res.json({ message: 'Party not found.' });
//         } else {
//             res.json ({
//                 message: 'deleted',
//                 changes: result.affectedRows,
//                 id: req.params.id
//             });
//         }
//     });
// });

// ========================================================
// ========================================================
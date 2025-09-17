const express = require('express');
const router = express.Router();
const sdForms = require('../models/sdFormsModel');


//get all Server/Database form data
router.get('/', async (req, res) => {
    
    try {
        const rows = await sdForms.getAllSDForms();
        res.json(rows);
    } catch (err) {
        console.error('Error getting sdForm:', err);
        res.status(500).json({ message: err.message });
    }  
});


//add a new request form
router.post('/', async (req, res) => {
    try {
        console.log('req.body: ', req.body);
        await sdForms.addSDForm(req.body);
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//delete a form by id
router.delete('/:id', async (req, res) => {
    try {
        const result = await sdForms.deleteForm(req.params.id);
        res.json({ affectedRows: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
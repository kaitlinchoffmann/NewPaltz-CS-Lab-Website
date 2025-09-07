const express = require('express');
const router = express.Router();
const sdForms = require('../models/sdFormsModel');


//get all forms
router.get('/', async (req, res) => {
    try {
        const forms = await sdForms.getAllForms();
        res.json(forms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }  
});


//add a new form
router.post('/', async (req, res) => {
    try {
        const id = await sdForms.addSDForm(req.body);
        res.status(201).json({ id });
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
const express = require('express');
const router = express.Router();
const eventsModel = require('../models/eventsModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Middleware to validate required fields for POST
function validateEvent(req, res, next) {
    const { admin_id, title, start_time, end_time } = req.body;
    if (!admin_id || !title || !start_time || !end_time) {
        return res.status(400).json({ message: 'admin_id, title, start_time, and end_time are required' });
    }
    next();
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

// Optional: accept only image files
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    },
});

// Serve uploaded files statically
router.use('/uploads', express.static(uploadsDir));

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await eventsModel.getAllEvents();
        res.json(events);
    } catch (err) {
        console.error('Error getting events:', err);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
});

// Add a new event with optional flyer
// Add a new event with optional flyer
router.post('/', upload.single('flyer'), validateEvent, async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
        const { admin_id, title, description, start_time, end_time, location } = req.body;

        // Validate admin_id as number
        const adminIdNum = Number(admin_id);
        if (isNaN(adminIdNum)) {
            return res.status(400).json({ message: 'admin_id must be a number' });
        }

        // Use uploaded flyer if present, otherwise use default noFlyer
        const flyer_url = req.file ? `/uploads/${req.file.filename}` : `/uploads/noFlyer.jpg`;

        const insertId = await eventsModel.addEvent({
            admin_id: adminIdNum,
            title,
            description,
            start_time,
            end_time,
            location,
            flyer_url,
        });

        // Convert insertId to Number for JSON response
        res.status(201).json({ message: 'Event added successfully', id: Number(insertId) });

    } catch (err) {
        console.error('Error adding event:', err);

        // Foreign key error handling
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ message: 'Invalid admin_id: no matching admin found' });
        }

        res.status(500).json({ message: 'Failed to add event' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        //Get event first so we know the flyer path
        const existingRows = await eventsModel.getEventById(id);
        const existingEvent = existingRows[0];

        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        //Delete the flyer file IF it's not the default image
        if (existingEvent.flyer_url && !existingEvent.flyer_url.includes("noFlyer.jpg")) {

            // absolute path: server/uploads/<filename.jpg>
            const flyerPath = path.join(__dirname, '..', existingEvent.flyer_url);

            fs.unlink(flyerPath, (err) => {
                if (err) {
                    console.error("Failed to delete flyer:", err);
                } else {
                    console.log("Flyer deleted:", flyerPath);
                }
            });
        }

        //Delete event from DB
        const affectedRows = await eventsModel.deleteEvent(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Respond
        res.json({ message: 'Event deleted successfully', affectedRows });

    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Failed to delete event' });
    }
});


// Get events by admin ID
router.get('/admin/:adminId', async (req, res) => {
    try {
        const adminId = Number(req.params.adminId);
        const events = await eventsModel.getEventsByAdminId(adminId);
        res.json(events);
    } catch (err) {
        console.error('Error getting events by admin ID:', err);
        res.status(500).json({ message: 'Failed to fetch events for this admin' });
    }
});


// Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const rows = await eventsModel.getEventById(id);
        const event = rows[0];

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (err) {
        console.error('Error getting event by ID:', err);
        res.status(500).json({ message: 'Failed to fetch event' });
    }
});


// Edit an existing event by ID with optional flyer replacement
router.put('/:id', upload.single('flyer'), async (req, res) => {
    console.log("REQ BODY:", req.body);
console.log("REQ FILE:", req.file);
    try {
        const id = Number(req.params.id);
        const existingRows = await eventsModel.getEventById(id);
        const existingEvent = existingRows[0];

        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const { title, description, start_time, end_time, location } = req.body;

        let flyer_url = existingEvent.flyer_url;

        // Replace flyer if uploaded
        if (req.file) {
            flyer_url = `/uploads/${req.file.filename}`;

            if (existingEvent.flyer_url && !existingEvent.flyer_url.includes('noFlyer.jpg')) {
                const oldPath = path.join(__dirname, '..', existingEvent.flyer_url);

                fs.unlink(oldPath, (err) =>
                    err ? console.error("Failed to delete old flyer:", err)
                        : console.log("Old flyer deleted:", oldPath)
                );
            }
        }

        const eventData = {
            title,
            description,
            start_time,
            end_time,
            location,
            flyer_url,
        };

        const affectedRows = await eventsModel.editEvent(id, eventData);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event updated successfully', affectedRows });

    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ message: 'Failed to update event' });
    }
});

module.exports = router;

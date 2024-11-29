const express = require('express');
const {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
} = require('../controllers/roleController');
const { authenticate } = require('../middlewares/authMiddleware');
const { authorizeRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

//create new role (Admin only)
router.post('/', authenticate, authorizeRole('Admin'), createRole);

//get all roles
router.get('/', authenticate, authorizeRole('Admin'), getAllRoles);

//get specific role by ID
router.get('/:id', authenticate, authorizeRole('Admin'), getRoleById);

//update role
router.put('/:id', authenticate, authorizeRole('Admin'), updateRole);

//delete role
router.delete('/:id', authenticate, authorizeRole('Admin'), deleteRole);

module.exports = router;

const Role = require('../models/Role');

//create new role
exports.createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ error: 'Role already exists' });
        }
        //save new role
        const newRole = new Role({ name, permissions });
        await newRole.save();

        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

//get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

//get role by id
exports.getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

//update role
exports.updateRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;

        const role = await Role.findByIdAndUpdate(
            req.params.id,
            { name, permissions },
            { new: true }
        );

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        res.status(200).json({ message: 'Role updated successfully', role });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

//delete role
exports.deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

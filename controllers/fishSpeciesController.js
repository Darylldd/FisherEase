const multer = require('multer');
const path = require('path');
const FishSpecies = require('../models/fishSpeciesModel');

// Configure storage for uploaded images
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.getAllFishSpecies = async (req, res) => {
    try {
        const speciesList = await FishSpecies.getAllSpecies();
        res.render('fish-species-list', { speciesList });
    } catch (error) {
        console.error("Error fetching fish species:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getSpeciesDetails = async (req, res) => {
    try {
        const species = await FishSpecies.getSpeciesById(req.params.id);
        if (!species) {
            return res.status(404).send("Species not found.");
        }
        res.render('fish-species-details', { species });
    } catch (error) {
        console.error("Error fetching fish species details:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.addSpeciesForm = async (req, res) => {
    try {
        const [speciesList] = await FishSpecies.getAllSpecies(); // Fetch all species from DB
        res.render("admin-add-fish-species", { speciesList }); // Pass to EJS
    } catch (error) {
        console.error("Error fetching species list:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.addFishSpecies = async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging

        const { common_name, scientific_name, description, habitat, fishing_method, regulations } = req.body;
        const imageFilename = req.file ? `/uploads/${req.file.filename}` : null; // Ensure an image path

        if (!common_name || !scientific_name || !description) {
            return res.status(400).send("All fields are required.");
        }

        await FishSpecies.addSpecies(common_name, scientific_name, description, habitat, fishing_method, regulations, imageFilename);
        res.redirect("/admin/fish-species");
    } catch (error) {
        console.error("Error adding fish species:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getAdminFishSpecies = async (req, res) => {
    try {
        const speciesList = await FishSpecies.getAllSpecies();
        console.log("Species List in Admin:", speciesList); // Debugging
        res.render('admin-fish-species', { speciesList });
    } catch (error) {
        console.error("Error fetching fish species for admin:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.updateFishSpecies = async (req, res) => {
    try {
        await FishSpecies.updateSpecies(req.params.id, req.body);
        res.redirect('/admin/fish-species');
    } catch (error) {
        console.error("Error updating fish species:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.deleteFishSpecies = async (req, res) => {
    try {
        const speciesId = req.params.id;
        console.log("Deleting species ID:", speciesId); // Debugging

        await FishSpecies.deleteSpecies(speciesId);
        res.redirect('/admin/fish-species');
    } catch (error) {
        console.error("Error deleting fish species:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.searchFishSpecies = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const speciesList = await FishSpecies.searchSpecies(searchQuery);
        res.render('fish-species-list', { speciesList });
    } catch (error) {
        console.error("Error searching fish species:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.upload = upload;
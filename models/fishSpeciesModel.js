const db = require('./db');

const FishSpecies = {
    getAllSpecies: async () => {
        const [rows] = await db.execute("SELECT * FROM fish_species ORDER BY common_name ASC");
        return rows;
    },

    getSpeciesById: async (id) => {
        const [rows] = await db.execute("SELECT * FROM fish_species WHERE id = ?", [id]);
        return rows[0];
    },
    addSpecies: async (common_name, scientific_name, description, habitat, fishing_method, regulations, imageFilename) => {
        if (!common_name || !scientific_name || !description) {
            throw new Error("All required fields must be filled.");
        }
    
        return db.execute(
            "INSERT INTO fish_species (common_name, scientific_name, description, habitat, fishing_method, regulations, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [common_name, scientific_name, description, habitat || null, fishing_method || null, regulations || null, imageFilename || null]
        );
    },
    
    updateSpecies: async (id, data, imageFilename) => {
        const { common_name, scientific_name, habitat, fishing_method, regulations } = data;
        await db.execute(
            "UPDATE fish_species SET common_name=?, scientific_name=?, habitat=?, fishing_method=?, regulations=?, image_url=? WHERE id=?",
            [common_name, scientific_name, habitat, fishing_method, regulations, imageFilename, id]
        );
    },

    deleteSpecies: async (id) => {
        try {
            const query = "DELETE FROM fish_species WHERE id = ?";
            const [result] = await db.query(query, [id]);
    
            if (result.affectedRows === 0) {
                console.log("No species deleted. ID may not exist.");
            } else {
                console.log(`Deleted species with ID: ${id}`);
            }
        } catch (error) {
            console.error("Error deleting species:", error);
            throw error;
        }
    },
    searchSpecies: async (query) => {
        const [rows] = await db.execute("SELECT * FROM fish_species WHERE common_name LIKE ? OR scientific_name LIKE ?", [`%${query}%`, `%${query}%`]);
        return rows;
    },
    getAllSpecies: async () =>  {
        try {
            const [rows] = await db.query("SELECT * FROM fish_species ORDER BY id DESC");
            return rows;
        } catch (error) {
            console.error("Error fetching all fish species:", error);
            throw error;
        }
    }
};

module.exports = FishSpecies;

const db = require('./db'); // Import PostgreSQL DB connection (e.g., node-postgres)

const FishSpecies = {
  getAllSpecies: async () => {
    try {
      const { rows } = await db.query("SELECT * FROM fish_species ORDER BY common_name ASC");
      return rows;
    } catch (error) {
      console.error("Error fetching all fish species:", error);
      throw error;
    }
  },

  getSpeciesById: async (id) => {
    try {
      const { rows } = await db.query("SELECT * FROM fish_species WHERE id = $1", [id]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching fish species by ID:", error);
      throw error;
    }
  },

  addSpecies: async (common_name, scientific_name, description, habitat, fishing_method, regulations, imageFilename) => {
    try {
      if (!common_name || !scientific_name || !description) {
        throw new Error("All required fields must be filled.");
      }

      const query = `
        INSERT INTO fish_species (common_name, scientific_name, description, habitat, fishing_method, regulations, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `;
      const values = [common_name, scientific_name, description, habitat || null, fishing_method || null, regulations || null, imageFilename || null];
      const { rows } = await db.query(query, values);
      return rows[0].id;
    } catch (error) {
      console.error("Error adding fish species:", error);
      throw error;
    }
  },

  updateSpecies: async (id, data, imageFilename) => {
    try {
      const { common_name, scientific_name, description, habitat, fishing_method, regulations } = data;
      const query = `
        UPDATE fish_species
        SET common_name = $1, scientific_name = $2, description = $3, habitat = $4, fishing_method = $5, regulations = $6, image_url = $7
        WHERE id = $8
      `;
      const values = [common_name, scientific_name, description || null, habitat || null, fishing_method || null, regulations || null, imageFilename || null, id];
      await db.query(query, values);
    } catch (error) {
      console.error("Error updating fish species:", error);
      throw error;
    }
  },

  deleteSpecies: async (id) => {
    try {
      const query = "DELETE FROM fish_species WHERE id = $1";
      const { rowCount } = await db.query(query, [id]);

      if (rowCount === 0) {
        console.log("No species deleted. ID may not exist.");
      } else {
        console.log(`Deleted species with ID: ${id}`);
      }
    } catch (error) {
      console.error("Error deleting fish species:", error);
      throw error;
    }
  },

  searchSpecies: async (query) => {
    try {
      const { rows } = await db.query(
        "SELECT * FROM fish_species WHERE common_name ILIKE $1 OR scientific_name ILIKE $2",
        [`%${query}%`, `%${query}%`]
      );
      return rows;
    } catch (error) {
      console.error("Error searching fish species:", error);
      throw error;
    }
  }
};

module.exports = FishSpecies;
import express from "express";
import {
  getVaccinationsByPetId,
  getVaccinationById,
  addVaccination,
  updateVaccination,
  deleteVaccination,
} from "../database/vaccinations.js";

const router = express.Router();

// GET
router.get("/pets/:petId/vaccinations", async (req, res) => {
  try {
    const { petId } = req.params;
    const rows = await getVaccinationsByPetId(petId);
    res.json(rows);
  } catch (err) {
    console.error("GET /pets/:petId/vaccinations", err);
    res.status(500).json({ error: "Failed to fetch vaccinations" });
  }
});

// POST
router.post("/pets/:petId/vaccinations", async (req, res) => {
  try {
    const { petId } = req.params;
    const {
      vaccine_name,
      date_administered,
      next_due,
      veterinarian,
      notes,
    } = req.body;

    if (!vaccine_name || !date_administered) {
      return res
        .status(400)
        .json({ error: "vaccine_name and date_administered are required" });
    }

    const created = await addVaccination(petId, {
      vaccine_name,
      date_administered,
      next_due,
      veterinarian,
      notes,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("POST /pets/:petId/vaccinations", err);
    res.status(500).json({ error: "Failed to add vaccination" });
  }
});

// Update
router.patch("/vaccinations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const allowed = [
      "vaccine_name",
      "date_administered",
      "next_due",
      "veterinarian",
      "notes",
    ];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    const exists = await getVaccinationById(id);
    if (!exists) return res.status(404).json({ error: "Vaccination not found" });

    const updated = await updateVaccination(id, updates);
    res.json(updated);
  } catch (err) {
    console.error("PATCH /vaccinations/:id", err);
    res.status(500).json({ error: "Failed to update vaccination" });
  }
});

// DELETE
router.delete("/vaccinations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await getVaccinationById(id);
    if (!exists) return res.status(404).json({ error: "Vaccination not found" });

    await deleteVaccination(id);
    res.status(204).end();
  } catch (err) {
    console.error("DELETE /vaccinations/:id", err);
    res.status(500).json({ error: "Failed to delete vaccination" });
  }
});

export default router;

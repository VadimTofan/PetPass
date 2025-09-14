import express from "express";
import {
  getVaccinationsByPetId,
  getVaccinationById,
  addVaccination,
  updateVaccination,
  deleteVaccination,
  getVaccinationsByPetIdentification,
} from "../database/vaccinations.js";

import dbClient from "../database/database_client.js";

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
    const { vaccine_name, date_administered, next_due, veterinarian, notes } =
      req.body;

    // required fields
    if (!vaccine_name || !date_administered) {
      return res
        .status(400)
        .json({ error: "vaccine_name and date_administered are required" });
    }

    const payload = {
      vaccine_name: String(vaccine_name).trim(),
      date_administered, // expect YYYY-MM-DD
      next_due: next_due || null,
      veterinarian: veterinarian ? String(veterinarian).trim() : null,
      notes: notes ? String(notes).trim() : null,
    };

    // validation: dates
    const today = new Date().toISOString().slice(0, 10);
    if (payload.date_administered > today) {
      return res
        .status(400)
        .json({ error: "Date administered cannot be in the future." });
    }
    if (payload.next_due && payload.next_due <= payload.date_administered) {
      return res
        .status(400)
        .json({ error: "Next due date must be after administered date." });
    }

    const created = await addVaccination(petId, payload);
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
    if (!exists)
      return res.status(404).json({ error: "Vaccination not found" });

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
    if (!exists)
      return res.status(404).json({ error: "Vaccination not found" });

    await deleteVaccination(id);
    res.status(204).end();
  } catch (err) {
    console.error("DELETE /vaccinations/:id", err);
    res.status(500).json({ error: "Failed to delete vaccination" });
  }
});

router.get("/api/vaccinations/:petId", async (request, response) => {
  try {
    const petId = Number(request.params.petId);
    if (!petId)
      return response.status(400).send({ error: `No petId is provided` });
    const rows = await getVaccinationsByPetIdentification(petId);
    if (rows.length === 0) {
      // If no vaccinations found
      return response
        .status(404)
        .json({ message: `Pet ID ${petId} has no vaccinations record.` });
    }
    response.json(rows);
  } catch (error) {
    console.error("Error fetching vaccinations:", error);
    response.status(500).json({ error: "Failed to fetch vaccinations" });
  }
});

router.get("/api/pets", async (req, res) => {
  try {
    const pets = await dbClient("pets").select("id", "name");
    if (!pets || pets.length === 0) {
      return res.status(400).json({ message: "No pets found" });
    }
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch pets" });
  }
});

export default router;

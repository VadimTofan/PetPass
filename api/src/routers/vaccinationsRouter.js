import express from "express";
import * as db from "../database/vaccinations.js";

const vaccinationsRouter = express.Router();

vaccinationsRouter.get(
  "/api/vaccinations/:petId",
  async (request, response) => {
    try {
      const petId = Number(request.params.petId);
      if (!petId)
        return response.status(400).send({ error: `No petId is provided` });
      const rows = await db.getVaccinationsByPetId(petId);
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
  }
);
export default vaccinationsRouter;

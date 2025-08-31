import express from "express";
import * as db from "../database/pets.js";

const petsRouter = express.Router();

petsRouter.post("/api/pets", async (request, response) => {
  const pet = request.body;
  const petError = validatePetData(pet);

  if (petError) return response.status(400).send({ error: petError });

  await db.addPet(createPetObject(pet));

  response.status(201).json({ message: "Pet added successfully." });
});

petsRouter.get("/api/pets/:id", async (request, response) => {
  const id = Number(request.query);
  if (!id) return response.status(400).send({ error: `No pets here` });

  const pets = await db.getPetsByUserId(id);

  if (!pets) return response.status(404).send({ error: `User with such ID has no pets` });

  response.send(pets);
});

petsRouter.put("/api/pets/:id", async (request, response) => {
  const id = Number(request.params.id);
  const pet = request.body;

  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const petError = validatePetData(pet);

  if (petError) return response.status(400).send({ error: petError });

  const newPet = createPetObject(pet);

  await db.updatePetById(id, createPetObject(newPet));

  response.status(201).send({ message: "Pet updated successfully." });
});

petsRouter.delete("/api/pets/:id", async (request, response) => {
  const id = Number(request.params.id);

  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const isDeleted = await db.deletePetById(id);

  if (isDeleted) return response.send({ message: "Pet data deleted successfully." });

  response.status(404).send({ error: "Pet not found." });
});

const validatePetData = (pet) => {
  if (!pet) return `Pet data is required.`;
  if (!pet.name) return "Pet name is required";
  if (!pet.species) return "Pet species is required";
  if (!pet.breed) return "Pet breed is required";
  if (!pet.sex) return "Pet sex is required";
  if (!pet.color_markings) return "Pet color markings are required";
  if (!pet.country_of_birth) return "Pet country of birth is required";
  if (!pet.microchip_number) return "Pet microchip number is required";
  if (!pet.microchip_implant_date) return "Pet microchip implant date is required";
  if (!pet.microchip_implant_location) return "Pet microchip implant location is required";
  if (!pet.tattoo_number) return "Pet tattoo number is required";
  if (!pet.passport_number) return "Pet passport number is required";
  if (!pet.country_of_issue) return "Pet passport country of issue is required";
  if (!pet.issue_date) return "Pet passport issue date is required";
  if (!pet.issuing_authority) return "Pet passport issuing authority is required";
  if (!pet.current_status) return "Pet current status is required";
  if (!pet.created_at) return "Pet profile create date is required";
  if (!pet.updated_at) return "Pet profile update date is required";
};

const createPetObject = (pet) => {
  const createPet = {
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    sex: pet.sex,
    color_markings: pet.color_markings,
    date_of_birth: pet.date_of_birth,
    country_of_birth: pet.country_of_birth,
    microchip_number: pet.microchip_number,
    microchip_implant_date: pet.microchip_implant_date,
    microchip_implant_location: pet.microchip_implant_location,
    tattoo_number: pet.tattoo_number,
    passport_number: pet.passport_number,
    country_of_issue: pet.country_of_issue,
    issue_date: pet.issue_date,
    issuing_authority: pet.issuing_authority,
    current_status: pet.current_status,
    created_at: pet.created_at,
    updated_at: pet.updated_at,
  };

  return createPet;
};

export default petsRouter;

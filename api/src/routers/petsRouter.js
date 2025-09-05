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

//Get pets by pet ID
petsRouter.get("/api/pet/:id", async (request, response) => {
  const id = Number(request.params.id);

  if (!id) return response.status(400).send({ error: `No pets here` });

  const pet = await db.getPetById(id);

  if (!pet) return response.status(404).send({ error: `There is no pet with such ID` });

  response.send(pet);
});

//Get pets by user ID
petsRouter.get("/api/pets/:id", async (request, response) => {
  const id = Number(request.params.id);
  if (!id) return response.status(400).send({ error: `This user has no pets` });

  const pets = await db.getPetByUserId(id);

  if (!pets) return response.status(404).send({ error: `No pet belongs to such user ID` });

  response.send(pets);
});

//Update pets by pet ID
petsRouter.put("/api/pet/:id", async (request, response) => {
  const id = Number(request.params.id);
  const pet = request.body;

  if (!id) return response.status(400).send({ error: `Id is mandatory` });

  const petError = validatePetData(pet);
  if (petError) return response.status(400).send({ error: petError });

  const newPet = createPetObject(pet);

  await db.updatePetById(id, newPet);

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
  if (pet.owner_user_id !== undefined && Number.isNaN(Number(pet.owner_user_id))) {
    return "Invalid owner_user_id";
  }
};


const clean = (v) => (v === "" ? undefined : v);

const createPetObject = (pet) => {
  const now = new Date();
  return {
    owner_user_id: pet.owner_user_id ? Number(pet.owner_user_id) : undefined,
    
    name: pet.name,
    species: pet.species,

    breed: clean(pet.breed),
    sex: clean(pet.sex),
    color_markings: clean(pet.color_markings),
    date_of_birth: clean(pet.date_of_birth),
    country_of_birth: clean(pet.country_of_birth),

    microchip_number: pet.microchip_number,
    microchip_implant_date: clean(pet.microchip_implant_date),
    microchip_implant_location: clean(pet.microchip_implant_location),

    passport_number: pet.passport_number,
    country_of_issue: pet.country_of_issue,
    issue_date: clean(pet.issue_date),
    issuing_authority: clean(pet.issuing_authority),

    current_status: clean(pet.current_status) ?? "active", 

    created_at: pet.created_at ?? now,
    updated_at: pet.updated_at ?? now,
  };
};


export default petsRouter;

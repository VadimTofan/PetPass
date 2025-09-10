import dbClient from "./database_client.js";

export async function getVaccinationsByPetId(petId) {
  return dbClient("vaccinations").select("*").where("pet_id", petId);
}

import PetAdd from "../../components/DBFunctions/PetAdd";
import PetView from "../../components/PetView/PetView";

export default async function Page({ params }) {
  const parameters = await params;
  const id = parameters.pet;
  return id === "new" ? <PetAdd /> : <PetView id={id} />;
}

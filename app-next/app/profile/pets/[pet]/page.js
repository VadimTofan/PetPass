import PetAdd from "../../components/DBFunctions/PetAdd";
import PetView from "../../components/PetView/PetView";
import PetsAllView from "../../components/petsAllView/PetsAllView";

export default async function Page({ params }) {
  const { pet: id } = await params;

  if (id === "new") {
    return <PetAdd />;
  }

  if (id === "all") {
    return <PetsAllView />;
  }

  return <PetView id={id} />;
}

import PetAdd from "../../components/DBFunctions/PetAdd";
import PetView from "../../components/PetView/PetView";

export default function Page({ params }) {
  const id = params.pet;
  return id === "new" ? <PetAdd /> : <PetView id={id} />;
}

import PetAdd from "../components/PetAdd";
import PetView from "../components/PetView";

export default function Page({ params }) {
  const id = params.pet;
  return id === "new" ? <PetAdd /> : <PetView id={id} />;
}

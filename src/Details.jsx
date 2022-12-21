import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet); // if results are not cached, fetchPet will be called
  if (results.isError) {
    return <h1>Something went wrong!</h1>;
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>;
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <h1>{pet.name}</h1>
      <h2>
        {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
      </h2>
      <button>Adopt {pet.name}</button>
      <p>{pet.description}</p>
    </div>
  );
};

export default Details;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

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
      <Carousel images={pet.images} />
      <h1>{pet.name}</h1>
      <h2>
        {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
      </h2>
      <button>Adopt {pet.name}</button>
      <p>{pet.description}</p>
    </div>
  );
};

// errors found in children components will get caught by the ErrorBoundary
function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary
      errorMessage={
        <h2>
          Having trouble locating this pet's details. Try again later or{" "}
          <Link to="/">click here</Link> to go back to the home page.
        </h2>
      }
    >
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsWithErrorBoundary;

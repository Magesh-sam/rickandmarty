import { useQuery } from "react-query";
import axios from "axios";
import Character from "../components/Character";
import { CharacterProps } from "../lib/types";
import { Link } from "react-router-dom";
function App() {
  const fetchCharacters = () => {
    return axios.get("https://rickandmortyapi.com/api/character");
  };
  const {
    isLoading,
    error,
    data: characters,
    isError,
  } = useQuery("characters", fetchCharacters, {
    select: (data) => data.data.results.slice(0, 5),
  });

  if (isLoading) return "Loading...";

  if (isError) return "An error has occurred: " + error;

  return (
    <main className="max-w-screen min-h-screen flex flex-col justify-center">
      <img
        src="../../rickandmorty.png"
        alt="Rick and Morty Title"
        className="h-20 w-auto mx-auto"
        width={"auto"}
        height={80}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-3 mt-5">
        {characters.map((character: CharacterProps) => {
          return <Character key={character.id} character={character} />;
        })}
      </section>
      <div className="flex justify-center items-center mt-5">
        <Link to="/characters" className="codepen-button">
          <span>Discover Characters!</span>
        </Link>
      </div>
    </main>
  );
}

export default App;

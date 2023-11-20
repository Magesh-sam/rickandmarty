import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import { CharacterProps } from "../lib/types";
import Character from "../components/Character";
import { Link } from "react-router-dom";
const fetchCharacters = (pageNumber: number) => {
  return axios.get(
    `https://rickandmortyapi.com/api/character?page=${pageNumber}`
  );
};
function Characters() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, data, error, isFetching } = useQuery(
    ["characters", pageNumber],
    () => fetchCharacters(pageNumber),
    {
      select: (data) => {
        return {
          info: data.data.info,
          results: data.data.results,
        };
      },
    }
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return "An error has occurred: " + error;

  return (
    <main className="flex flex-col justify-center">
      <Link to="/">
        <img
          src="../../rickandmorty.png"
          alt="Rick and Morty Title"
          className="h-20 w-auto mx-auto"
        />
      </Link>
      <div className="flex items-center justify-evenly">
        <Link to="/" className="text-xl hover:underline">
          Go Home 🏠
        </Link>
        <h1 className="text-3xl font-bold underline text-center my-5">
          Page {pageNumber}
        </h1>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto  gap-3">
        {data?.results.map((character: CharacterProps) => {
          return <Character key={character.id} character={character} />;
        })}
      </section>
      <section className="flex justify-center items-center gap-5 my-5 ">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={data?.info.previous === null || pageNumber === 1}
          className={`bg-blue-500 text-white p-2 rounded-lg ${
            data?.info.previous ? "  " : "cursor-not-allowed "
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={data?.info.next === null}
          className={`bg-blue-500 text-white p-2 rounded-lg ${
            data?.info.next ? "  " : " cursor-not-allowed "
          }`}
        >
          Next
        </button>
      </section>
      {isFetching && <div>Loading...</div>}
    </main>
  );
}

export default Characters;

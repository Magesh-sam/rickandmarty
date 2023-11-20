import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import { CharacterProps } from "../lib/types";
import Character from "../components/Character";
import { Link } from "react-router-dom";
import BackToTop from "../components/BackToTop";
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
        <div className="flex gap-1">
          <span>page</span>
          <input
            type="number"
            value={pageNumber}
            onChange={(e) => setPageNumber(+e.target.value)}
            min={1}
            max={data?.info.pages}
            className="w-12 border-2 border-black pl-1 "
          />
          of {data?.info.pages}
        </div>
        <button
          aria-label="go to first page"
          className={`${
            data?.info.prev === null ? " cursor-not-allowed " : " "
          } bg-blue-500 text-white p-2 rounded-lg`}
          onClick={() => setPageNumber(1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path
              stroke="#FFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 17l-5-5 5-5m-7 10l-5-5 5-5"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={data?.info.previous === null || pageNumber === 1}
          className={`bg-blue-500 text-white p-2 rounded-lg flex items-center ${
            data?.info.prev === null ? "cursor-not-allowed " : " "
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#FFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M15 6l-6 6 6 6"
            ></path>
          </svg>
          Previous
        </button>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={data?.info.next === null}
          className={`bg-blue-500 text-white p-2 rounded-lg flex items-center ${
            data?.info.next === null ? " cursor-not-allowed " : " "
          } `}
        >
          Next{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path
              stroke="#FFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M9 6l6 6-6 6"
            ></path>
          </svg>{" "}
        </button>
        <button
          className={`${
            data?.info.next === null ? " cursor-not-allowed " : " "
          } bg-blue-500 text-white p-2 rounded-lg`}
          aria-label="go to last page"
          onClick={() => setPageNumber(data?.info.pages)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path
              stroke="#FFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 17l5-5-5-5m7 10l5-5-5-5"
            ></path>
          </svg>
        </button>
      </section>
      <BackToTop />
      {isFetching && <div>Loading...</div>}
    </main>
  );
}

export default Characters;

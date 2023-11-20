import { CharacterProps } from "../lib/types";

function Character({ character }: { character: CharacterProps }) {
  const { name, image, status, species, id } = character;
  const statusColor =
    status === "Alive"
      ? "bg-green-500"
      : status === "Dead"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div>
      <div className="flex flex-col gap-3  ">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-base  ">
            {species} - {status}
          </h3>
          <div
            className={`${statusColor} w-4 h-4 rounded-full font-semibold `}
          ></div>
        </div>
      </div>
      <img
        src={image}
        alt={name}
        width={300}
        height={300}
        className="rounded-lg shadow-lg"
        loading={id > 9 ? "lazy" : "eager"}
      />
    </div>
  );
}

export default Character;

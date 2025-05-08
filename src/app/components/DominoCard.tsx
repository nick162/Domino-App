import { FC } from "react";

interface angkaDomino {
  angka: [number, number];
}

const DominoCard: FC<angkaDomino> = ({ angka }) => {
  const [angkaAtas, angkaBawah] = angka;

  return (
    <div className="flex justify-center items-center border-red-400 border-2 rounded-lg w-16 h-24 m-2 flex-col bg-white overflow-hidden">
      <div className="w-full h-1/2 border-b border-gray-300 flex items-center justify-center text-xl font-bold">
        {angkaAtas}
      </div>
      <div className="w-full h-1/2 flex items-center justify-center text-xl font-bold">
        {angkaBawah}
      </div>
    </div>
  );
};

export default DominoCard;

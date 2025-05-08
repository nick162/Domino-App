"use client";

import { useEffect, useState } from "react";
import DominoCard from "./components/DominoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialDominoes: [number, number][] = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

export default function Home() {
  const [dominoes, setDominoes] = useState<[number, number][]>(initialDominoes);
  const [removeInput, setRemoveInput] = useState("");
  const [addInput, setAddInput] = useState("");
  const [totalDoubles, setTotalDoubles] = useState(0);

  useEffect(() => {
    const count = dominoes.filter(([a, b]) => a === b).length;
    setTotalDoubles(count);
    console.log("Recounting doubles:", count);
  }, [JSON.stringify(dominoes)]);

  const countDoubleNumbers = (data: [number, number][]) => {
    return data.filter(([a, b]) => a === b).length;
  };

  const sortDominoes = (order: "asc" | "desc") => {
    const sorted = [...dominoes].sort((a, b) => {
      const totalA = a[0] + a[1];
      const totalB = b[0] + b[1];
      if (totalA === totalB) {
        return order === "asc" ? a[0] - b[0] : b[0] - a[0];
      }
      return order === "asc" ? totalA - totalB : totalB - totalA;
    });
    setDominoes(sorted);
  };

  const removeDuplicates = () => {
    const seen = new Set<string>();
    const filtered = dominoes.filter((d) => {
      const key = JSON.stringify([...d].sort());
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setDominoes(filtered);
  };

  const flipCards = () => {
    setDominoes(dominoes.map(([a, b]) => [b, a]));
  };

  const removeByTotal = (total: number) => {
    setDominoes(dominoes.filter(([a, b]) => a + b !== total));
  };

  const resetData = () => {
    setDominoes(initialDominoes);
    setAddInput("");
    setRemoveInput("");
  };

  const handleInputRemove = () => {
    const total = parseInt(removeInput);
    if (!isNaN(total)) {
      removeByTotal(total);
      setRemoveInput("");
    }
  };

  const handleAddDomino = () => {
    const parts = addInput.split(",").map(Number);
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return;

    const newDomino: [number, number] = [parts[0], parts[1]];
    setDominoes((prev) => [...prev, newDomino]);
    setAddInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-black mb-10">
        Selection Test Day One
      </h1>

      <p className="text-center text-lg mt-6">
        Total Double Numbers: {totalDoubles}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {dominoes.map((domino, index) => (
          <DominoCard key={index} angka={domino} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <Button
          onClick={() => sortDominoes("asc")}
          className="bg-blue-500 text-white"
        >
          Sort (ASC)
        </Button>
        <Button
          onClick={() => sortDominoes("desc")}
          className="bg-blue-500 text-white"
        >
          Sort (DESC)
        </Button>
        <Button onClick={flipCards} className="bg-blue-500 text-white">
          Flip
        </Button>
        <Button onClick={removeDuplicates} className="bg-blue-500 text-white">
          Remove Duplicate
        </Button>
        <Button onClick={resetData} className="bg-red-500 text-white">
          Reset
        </Button>
      </div>

      <div className="flex flex-col items-center gap-3 mb-6">
        <Input
          type="number"
          placeholder="Hapus domino total sisi (misal: 4)"
          value={removeInput}
          onChange={(e) => setRemoveInput(e.target.value)}
          className="border-orange-300 border-2 rounded-2xl w-64 text-center"
        />
        <Button
          onClick={handleInputRemove}
          className="bg-yellow-500 text-white"
        >
          Remove
        </Button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Input
          type="text"
          placeholder="Tambah domino (misal: 3,4)"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
          className="border-green-400 border-2 rounded-2xl w-64 text-center"
        />
        <Button onClick={handleAddDomino} className="bg-green-500 text-white">
          Add & Hitung Double
        </Button>
      </div>
    </div>
  );
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useState } from "react";

// type Props = {
//   dominoes: [number, number][];
//   onUpdate: (updated: [number, number][]) => void;
//   onReset: () => void;
// };

// export default function DominoControls({ dominoes, onUpdate, onReset }: Props) {
//   const [input, setInput] = useState("");

//   const parseInput = (value: string): [number, number][] => {
//     const cleaned = value.replace(/[^0-9]/g, "");
//     const result: [number, number][] = [];

//     for (let i = 0; i < cleaned.length - 1; i += 2) {
//       const first = parseInt(cleaned[i]);
//       const second = parseInt(cleaned[i + 1]);
//       result.push([first, second]);
//     }

//     return result;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInput(value);
//     const parsed = parseInput(value);
//     onUpdate(parsed.length ? parsed : dominoes);
//   };

//   const handleSort = (asc: boolean) => {
//     const sorted = [...dominoes].sort((a, b) => {
//       const sumA = a[0] + a[1];
//       const sumB = b[0] + b[1];
//       return asc ? sumA - sumB : sumB - sumA;
//     });
//     onUpdate(sorted);
//   };

//   const handleFlip = () => {
//     const flipped = dominoes.map(([a, b]) => [b, a] as [number, number]);
//     onUpdate(flipped);
//   };

//   const handleRemoveDuplicates = () => {
//     const seen = new Set<string>();
//     const filtered = dominoes.filter(([a, b]) => {
//       const key1 = `${a}-${b}`;
//       const key2 = `${b}-${a}`;
//       if (seen.has(key1) || seen.has(key2)) return false;
//       seen.add(key1);
//       seen.add(key2);
//       return true;
//     });
//     onUpdate(filtered);
//   };

//   const handleRemoveByInput = () => {
//     const parsed = parseInput(input);
//     if (!parsed.length) return;

//     const toRemove = new Set(parsed.map((pair) => pair.join(",")));
//     const filtered = dominoes.filter((pair) => !toRemove.has(pair.join(",")));
//     onUpdate(filtered);
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 mt-8">
//       <div className="flex gap-3 flex-wrap justify-center">
//         <div className="flex gap-3 flex-wrap justify-center">
//           <Button
//             onClick={() => handleSort(true)}
//             className="bg-green-500 hover:bg-green-600 text-white"
//           >
//             Sort (ASC)
//           </Button>
//           <Button
//             onClick={() => handleSort(false)}
//             className="bg-red-500 hover:bg-red-600 text-white"
//           >
//             Sort (DESC)
//           </Button>
//           <Button
//             onClick={handleFlip}
//             className="bg-yellow-500 hover:bg-yellow-600 text-white"
//           >
//             Flip
//           </Button>
//           <Button
//             onClick={handleRemoveDuplicates}
//             className="bg-purple-500 hover:bg-purple-600 text-white"
//           >
//             Remove Duplicate
//           </Button>
//           <Button
//             onClick={onReset}
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             Reset
//           </Button>
//         </div>
//       </div>
//       <Input
//         value={input}
//         onChange={handleInputChange}
//         placeholder="Masukkan angka (contoh: 123456)"
//         className="w-72 text-center"
//       />
//       <Button onClick={handleRemoveByInput} className="bg-blue-500 text-white">
//         Remove
//       </Button>
//     </div>
//   );
// }

console.clear();
const input = [
  ["a", "b", "c"],
  ["c", "d", "f"],
  ["d", "f", "g"],
];
let counter = 0;
const result = input.flat().reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});
console.log(result);
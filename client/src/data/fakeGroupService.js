export const groups = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Data and Artificial Intelligence" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

export function getGroups() {
  return groups.filter((g) => g);
}

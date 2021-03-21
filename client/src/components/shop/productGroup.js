export const groups = [
  {
    _id: "5b21ca3eeb7f6fbccd472100",
    name: "Information and Telecommunication Engineering",
  },
  { _id: "5b21ca3eeb7f6fbccd472102", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd472104", name: "Thriller" },
];

export function getGroups() {
  return groups.filter((g) => g);
}

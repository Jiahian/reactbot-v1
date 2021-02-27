export const dataIT = {
  nodes: [
    {
      _id: "5b21ca3eeb7f6fbccd471815",
      id: 1,
      level: 1,
      label: "Data Analyst/Associate Data Engineer",
      group: {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "Data and Artificial Intelligence",
      }, //and data engineering too! :(
      subgroup: "BizIntel",
    },
    {
      _id: "5b21ca3eeb7f6fbccd471816",
      id: 2,
      level: 2,
      label: "Business Intelligence Manager",
      group: {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "Data and Artificial Intelligence",
      },
      subgroup: "BizIntel",
    },
    {
      _id: "5b21ca3eeb7f6fbccd471817",
      id: 3,
      level: 4,
      label: "Business Intelligence Director",
      group: {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "Data and Artificial Intelligence",
      },
      subgroup: "BizIntel",
    },
    {
      _id: "5b21ca3eeb7f6fbccd471819",
      id: 4,
      level: 2,
      label: "Data Engineer",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      subgroup: "DATA ENGINEERING",
    },
    {
      _id: "5b21ca3eeb7f6fbccd47181a",
      id: 5,
      level: 3,
      label: "Senior Data Engineer",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      subgroup: "DATA ENGINEERING",
    },
    {
      _id: "5b21ca3eeb7f6fbccd47181b",
      id: 6,
      level: 4,
      label: "Data Architect",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      subgroup: "DATA ENGINEERING",
    },
    {
      _id: "5b21ca3eeb7f6fbccd47181e",
      id: 7,
      level: 6,
      label: "Chief Data Officer/Chief AI Officer AI",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    },
    {
      _id: "5b21ca3eeb7f6fbccd47181f",
      id: 8,
      level: 3,
      label: "Senior AI/ML Engineer",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      subgroup: "MACHINE LEARNING (ML) ENGINEERING",
    },
    {
      _id: "5b21ca3eeb7f6fbccd471821",
      id: 9,
      level: 5,
      label: "Head of Data Science and AI",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    },
    {
      _id: "5b21ca3eeb7f6fbccd47182a",
      id: 10,
      level: 2,
      label: "AI/ML Engineer",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      subgroup: "MACHINE LEARNING (ML) ENGINEERING",
    },
    {
      _id: "5b21ca3eeb7f6fbccd47182b",
      id: 11,
      level: 4,
      label: "Data Scientist/AI Scientist",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      subgroup: "DATA SCIENCE / AI SCIENCE",
    },
    {
      _id: "5b21ca3eeb7f6fbccd47182c",
      id: 12,
      level: 4,
      label: "AI Applied Researcher",
      group: { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
      subgroup: "AI APPLIED RESEARCH",
    },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 4 },
    { from: 1, to: 11 },
    { from: 2, to: 3 },
    { from: 4, to: 2 },
    { from: 4, to: 10 },
    { from: 4, to: 5 },
    { from: 4, to: 11 },
    { from: 5, to: 6 },
    { from: 5, to: 2 },
    { from: 5, to: 8 },
    { from: 6, to: 7 },
    { from: 8, to: 9 },
    { from: 8, to: 5 },
    { from: 9, to: 7 },
    { from: 10, to: 4 },
    { from: 10, to: 8 },
    { from: 11, to: 9 },
    { from: 12, to: 9 },
    { from: 11, to: 12 },
    { from: 12, to: 11 },
  ],
};

//test
export function getGraph() {
  return dataIT;
}

export function getNode(id) {
  return dataIT.nodes.find((m) => m._id === id);
}

// export function saveMovie(movie) {
//   let movieInDb = movies.find((m) => m._id === movie._id) || {};
//   movieInDb.title = movie.title;
//   movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
//   movieInDb.numberInStock = movie.numberInStock;
//   movieInDb.dailyRentalRate = movie.dailyRentalRate;

//   if (!movieInDb._id) {
//     movieInDb._id = Date.now().toString();
//     movies.push(movieInDb);
//   }

//   return movieInDb;
// }

// export function deleteMovie(id) {
//   let movieInDb = movies.find((m) => m._id === id);
//   movies.splice(movies.indexOf(movieInDb), 1);
//   return movieInDb;
// }

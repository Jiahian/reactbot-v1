export const groups = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Data and Artificial Intelligence" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Infrastructure" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Software and Applications" },
  { _id: "5b21ca3eeb7f6fbccd471826", name: "Strategy and Governance" },
  { _id: "5b21ca3eeb7f6fbccd471832", name: "Operations and Support" },
  { _id: "5b21ca3eeb7f6fbccd471838", name: "Cyber Security" },
  { _id: "5b21ca3eeb7f6fbccd471844", name: "Sales and Marketing" },
];

export const industryGroup = [
  {
    _id: "1ab1ca3eeb7f6fbccd478181",
    name: "Infocommunication Technology",
    group: [
      {
        _id: "5b21ca3eeb7f6fbccd471818",
        name: "Data and Artificial Intelligence",
      },
      { _id: "5b21ca3eeb7f6fbccd471814", name: "Infrastructure" },
      { _id: "5b21ca3eeb7f6fbccd471820", name: "Software and Applications" },
      { _id: "5b21ca3eeb7f6fbccd471826", name: "Strategy and Governance" },
      { _id: "5b21ca3eeb7f6fbccd471832", name: "Operations and Support" },
      { _id: "5b21ca3eeb7f6fbccd471838", name: "Cyber Security" },
      { _id: "5b21ca3eeb7f6fbccd471844", name: "Sales and Marketing" },
    ],
  },
  {
    _id: "1ab1ca3eeb7f6fbccd478183",
    name: "Electronics",
    group: [
      {
        _id: "5b21ca3eeb7f6fbccd471848",
        name: "Technical and Engineering",
      },
      { _id: "5b21ca3eeb7f6fbccd471849", name: "Management" },
    ],
  },
  {
    _id: "1ab1ca3eeb7f6fbccd478185",
    name: "Energy and Power",
    group: [
      {
        _id: "5b21ca3eeb7f6fbccd471861",
        name: "Terminal Operations and Fuel System Operations",
      },
      { _id: "5b21ca3eeb7f6fbccd471862", name: "Power Generation" },
      {
        _id: "5b21ca3eeb7f6fbccd471863",
        name: "Energy Trading and Portfolio Management",
      },
      // { _id: "5b21ca3eeb7f6fbccd471864", name: "Distributed Generation" },
      // {
      //   _id: "5b21ca3eeb7f6fbccd471865",
      //   name: "Electricity Transmission And Distribution",
      // },
      // { _id: "5b21ca3eeb7f6fbccd471866", name: "Gas System Operations" },
      // {
      //   _id: "5b21ca3eeb7f6fbccd471867",
      //   name: "Town Gas Production and Plant Maintenance",
      // },
      // {
      //   _id: "5b21ca3eeb7f6fbccd471868",
      //   name: "Gas Transmission and Distribution",
      // },
      // { _id: "5b21ca3eeb7f6fbccd471869", name: "Town Gas Technical Services" },
      // { _id: "5b21ca3eeb7f6fbccd471849", name: "Energy Retail" },
      // {
      //   _id: "5b21ca3eeb7f6fbccd471870",
      //   name: "Liquefied Natural Gas Trading and Research",
      // },
      // { _id: "5b21ca3eeb7f6fbccd471871", name: "District Cooling Services" },
      // { _id: "5b21ca3eeb7f6fbccd471872", name: "Licensed Work" },
      // {
      //   _id: "5b21ca3eeb7f6fbccd471873",
      //   name: "Liquefied Natural Gas Terminal",
      //},
    ],
  },
];

// export function getGroups() {
//   return groups.filter((g) => g);
// }
// export function getGroups(g) {
//   console.log(g);
//   let industry = industryGroup
//     .filter((m) => m._id === g)[0]
//     .group.filter((n) => n);
//   //console.log(industry[0].group);
//   console.log(industry);

//   return;
// }

export function getIndustry() {
  return industryGroup.filter((g) => g);
}

const companies = [
  {
    id: 1,
    title: "Software Engineer",
    details: "Senior",
    skills: "JavaScript, React, Node.js",
    exp: "5 years",
    description:
      "Experienced software engineer with expertise in JavaScript, React, and Node.js.",
    salary: "$120,000 per year",

  },
  {
    id: 2,
    title: "Data Scientist",
    details: "Senior",
    skills: "Python, Machine Learning, Data Analysis",
    exp: "7 years",
    description:
      "Data scientist with extensive experience in Python, machine learning, and data analysis.",
    salary: "$150,000 per year",

  },
  {
    id: 3,
    title: "UI/UX Designer",
    details: "Mid-level",
    skills: "UI/UX Design, Adobe XD, Figma",
    exp: "3 years",
    description: "Creative UI/UX designer proficient in Adobe XD and Figma.",
    salary: "$90,000 per year",

  },
  {
    id: 4,
    title: "Product Manager",
    details: "Senior",
    skills: "Product Management, Agile, Scrum",
    exp: "6 years",
    description:
      "Experienced product manager skilled in product management methodologies like Agile and Scrum.",
    salary: "$140,000 per year",

  },
  {
    id: 5,
    title: "Marketing Specialist",
    details: "Mid-level",
    skills: "Digital Marketing, SEO, Social Media Marketing",
    exp: "4 years",
    description:
      "Marketing specialist with expertise in digital marketing strategies, SEO, and social media marketing.",
    salary: "$100,000 per year",
   
  },
];

const columns = [
  { name: "Title", uid: "title" },
  { name: "Details", uid: "details" },
  { name: "Skills", uid: "skills" },
  { name: "Experience", uid: "exp" },
  { name: "Description", uid: "description" },
  { name: "Salary", uid: "salary" },
  { name: "Actions", uid: "actions" },
];
export { columns, companies };
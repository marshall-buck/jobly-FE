import {
  Company,
  Job,
  User,
  UserContextInterface,
  FormSignupUser,
  FormEditUser,
} from "./interfaces";

const token: string | null = "long string";

const user: User | FormSignupUser = {
  username: "testuser",
  password: "123456",
  firstName: "jest first",
  lastName: "jest last",
  email: "1@1.com",
};

const userCtx: UserContextInterface = {
  user: user,
  token: token,
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Conservator, furniture",
    salary: 110000,
    equity: "0",
    companyHandle: "watson-davis",
    companyName: "Watson-Davis",
  },
  {
    id: 2,
    title: "Information officer",
    salary: 200000,
    equity: "0",
    companyHandle: "hall-mills",
    companyName: "Hall-Mills",
  },
  {
    id: 3,
    title: "Consulting civil engineer",
    salary: 60000,
    equity: "0",
    companyHandle: "sellers-bryant",
    companyName: "Sellers-Bryant",
  },
];

const companies: Company[] = [
  {
    handle: "anderson-arias-morrow",
    name: "Anderson, Arias and Morrow",
    description:
      "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
    numEmployees: 245,
    logoUrl: "/logos/logo3.png",
  },
  {
    handle: "arnold-berger-townsend",
    name: "Arnold, Berger and Townsend",
    description:
      "Kind crime at perhaps beat. Enjoy deal purpose serve begin or thought. Congress everything miss tend.",
    numEmployees: 795,
    logoUrl: null,
  },
];

const editUser: FormEditUser = {
  username: "testuser",
  firstName: "John",
  lastName: "Doe",
  email: "1@1.com",
  password: "123456",
};

// const filteredResults: Omit<Company, "companyHandle" | "companyName">[] = [
//   {
//     handle: "anderson-arias-morrow",
//     name: "Anderson, Arias and Morrow",
//     description:
//       "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
//     numEmployees: 245,
//     logoUrl: "/logos/logo3.png",
//   },
// ];
const company: Company = {
  handle: "anderson-arias-morrow",
  name: "Anderson, Arias and Morrow",
  description:
    "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
  numEmployees: 245,
  logoUrl: null,
  jobs: [
    {
      id: 7,
      title: "Technical brewer",
      salary: 157000,
      equity: "0",
    },
    {
      id: 18,
      title: "Embryologist, clinical",
      salary: 138000,
      equity: "0",
    },
    {
      id: 62,
      title: "Art gallery manager",
      salary: null,
      equity: "0.085",
    },
    {
      id: 95,
      title: "Writer",
      salary: 172000,
      equity: "0.091",
    },
    {
      id: 119,
      title: "Oceanographer",
      salary: null,
      equity: "0.097",
    },
    {
      id: 127,
      title: "Glass blower/designer",
      salary: 126000,
      equity: "0.099",
    },
  ],
};
const job: Job = {
  id: 1,
  title: "Conservator, furniture",
  salary: 110000,
  equity: "0",
  companyHandle: "watson-davis",
  companyName: "Watson-Davis",
};
const job2: Job = {
  id: 1,
  title: "Conservator, furniture",
  salary: 110000,
  equity: null,
  companyHandle: "watson-davis",
  companyName: "Watson-Davis",
};

const BASE_URL = "http://localhost:3001";
export {
  userCtx,
  jobs,
  job,
  companies,
  company,
  user,
  editUser,
  job2,
  BASE_URL,
};

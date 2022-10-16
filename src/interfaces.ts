type User = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin?: boolean

};

type FormLoginUser = Pick<User, "username" | "password">;

type FormEditUser = Omit<User, "password" | "isAdmin">;

type FormSignupUser =  Omit<User, "isAdmin">

type Company = {
  handle: string;
  name: string;
  description: string;
  numEmployees?: number;
  logoUrl: string;
  jobs?: Job[]
};

interface Jobs {
  jobs: Job[] | null
}

type Job = {
  id: number;
  title: string;
  salary: number;
  equity: string;
  companyName: string;
  companyHandle:string;
};


interface TokenPayload {
  username: string;
  isAdmin: boolean;
}

interface ContextUser {
  user: User | null;
  token: string | null;
}

interface UserContextInterface {
  user: User | null;
  token: string | null;
}

export type {
  User,
  TokenPayload,
  ContextUser,
  UserContextInterface,
  FormLoginUser,
  FormEditUser,
  Company,
  Job,
  Jobs,
  FormSignupUser,

};

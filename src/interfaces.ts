type User = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin?: boolean;
};

type FormLoginUser = Pick<User, "username" | "password">;

type FormEditUser = Omit<User, "isAdmin">;

type FormSignupUser = Omit<User, "isAdmin">;

type Company = {
  handle: string;
  name: string;
  description: string;
  numEmployees?: number;
  logoUrl: string | null;
  jobs?: Job[];
};

type Job = {
  id: number;
  title: string;
  salary: number | null;
  equity: string | null;
  companyName?: string;
  companyHandle?: string;
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

enum AlertTypes {
  INFO = "alert-info",
  SUCCESS = "alert-success",
  WARNING = "alert-warning",
  ERROR = "alert-error",
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
  FormSignupUser,
};
export { AlertTypes };

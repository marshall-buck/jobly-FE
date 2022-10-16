
import { User, UserContextInterface } from "./interfaces";





const token: string | null = "long string"

const user: User = {
  username: "jets test",
  password: "123456",
  firstName: "jest first",
  lastName: "jest last",
  email: "1@1.com",
}


const userCtx= {
  user: user,
  token: token
}

export {
  userCtx
}
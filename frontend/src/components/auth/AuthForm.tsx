import { useState } from "react"
import LoginForm from "./sub_component/LoginForm.tsx"
import SignUpForm from "./sub_component/SignUpForm.tsx"

export default function AuthForm() {
  const [menu, setMenu] = useState("login")
  
  switch (menu) {
    case "login":
      return <LoginForm setMenu={setMenu} />
    case "signup":
      return <SignUpForm setMenu={setMenu} />
    default:
      return <LoginForm setMenu={setMenu} />
  }
}
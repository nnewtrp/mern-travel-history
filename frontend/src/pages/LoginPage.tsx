import NavBar from "../components/layouts/NavBar.tsx"
import AuthForm from "../components/auth/AuthForm.tsx"

export default function LoginPage() {
  return (
    <div className="App">
      <NavBar />

      <div className="mainContainer">
        <AuthForm />
      </div>
    </div>
  )
}
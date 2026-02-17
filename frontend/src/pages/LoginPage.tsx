import { Card } from "@mui/material"

function Body() {
  return (
    <Card sx={{ p: 5, minWidth: 300, maxWidth: 400, margin: '0 auto', mt: 10 }}>
      <h3>Welcome to the Login Page</h3>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="App">
      <div className="mainContainer">
        <Body />
      </div>
    </div>
  )
}
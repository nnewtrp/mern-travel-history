import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css'
import HomePage from "./pages/HomePage.tsx";
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

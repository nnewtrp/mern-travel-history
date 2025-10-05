import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css'
import './App.css'

import LoginPage from "./pages/LoginPage.tsx"
import MapPage from "./pages/MapPage.tsx"
import ManagePage from "./pages/ManagePage.tsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </BrowserRouter>
  )
}

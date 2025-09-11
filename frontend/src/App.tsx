import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import NavBar from './components/layouts/NavBar.tsx'
import './App.css'

function App() {
  return (
    <div className="App">
      <NavBar />

      <div style={{ height: '90vh', width: '100vw' }}>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default App

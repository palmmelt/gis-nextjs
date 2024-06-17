import React, { useState } from "react";
import axios from "axios";
import { SiOpenstreetmap } from "react-icons/si";
import { OpenStreetMapProvider } from 'leaflet-geosearch';


function GeocodingComponent({toggleMenu}:{toggleMenu:boolean}) {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const provider = new OpenStreetMapProvider();

  const [isInputFocus,setIsInputFocus] = useState(false);

  const handleGeocode = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=YOUR_API_KEY`
      );
      const data = response.data;
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setPosition([lat, lng]);
      } else {
        alert("No results found");
      }
    } catch (error) {
      console.error("Geocoding error: ", error);
      alert("An error occurred while geocoding");
    }
  };

  return (
    <div className={`flex flex-row text-main-blue bg-white ps-2 pe-3 py-2 border border-main-blue absolute left-5 top-2 cursor-pointer rounded-3xl `}>
      <div className="flex flex-row justify-center items-center me-1">
        <input
          className={`rounded-s-3xl p-1 border-b-1 border-gray-400 bg-white transition-width ${isInputFocus ? 'w-[250px]':'w-[180px]' } duration-500 focus:outline-none focus:border-none`}
          placeholder="ค้นหาในข้อมูลใน Maps"
          type="text"
          value={address}
          onFocus={()=>setIsInputFocus(true)}
          onBlur={()=>setIsInputFocus(false)}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button
        className="flex flex-row justify-center items-center text-gray-500 rounded-full p-2 hover:bg-gray-100"
        onClick={()=>handleGeocode()}
      >
        <SiOpenstreetmap className="w-4 h-4" />
      </button>
    </div>
  );
}

export default GeocodingComponent;

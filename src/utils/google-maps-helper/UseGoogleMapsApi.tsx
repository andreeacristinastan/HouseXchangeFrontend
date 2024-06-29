// // useGoogleMapsAPI.js
// import { useState, useEffect } from "react";
// // const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

// const useGoogleMapsAPI = (API_KEY) => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const existingScript = document.getElementById("google-maps-script");

//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.id = "google-maps-script";
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
//       script.onload = () => setIsLoaded(true);
//       document.body.appendChild(script);
//     } else {
//       setIsLoaded(true);
//     }
//   }, [API_KEY]);

//   return isLoaded;
// };

// export default useGoogleMapsAPI;

import React, { useEffect } from "react";
import * as pkg from "@googlemaps/js-api-loader";

const { Loader } = pkg;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

export function Map() {
  const mapRef = React.useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyChKRdhhQieTWU272lq-3n22hbEJz0T7_8",
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      const position = {
        lat: -6.2,
        lng: 106.816666,
      };

      const mapOptions = {
        center: position,
        zoom: 15,
        mapId: "MY_NEXTJS_MAPID",
        disableDefaultUI: true,
      };

      new Map(mapRef.current as unknown as HTMLDivElement, mapOptions);
    };
    initMap();
  }, []);
  return (
    <div
      style={{
        height: "600px",
        width: "100%",
        outline: "none",
        borderRadius: 8,
      }}
      ref={mapRef}
    />
  );
}

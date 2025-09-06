"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { KokosilContentData } from "./KokosilContentItem";
import { KokosilSiteData } from "./KokosilSiteItem";

type MapViewProps = {
  items: (KokosilContentData | KokosilSiteData)[];
};

export default function MapView({ items }: MapViewProps) {
  // 仮の緯度経度。本来はitemsから取得します。
  const position: [number, number] = [35.681236, 139.767125]; // 東京駅

  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>検索結果の場所（仮）</Popup>
      </Marker>
    </MapContainer>
  );
}

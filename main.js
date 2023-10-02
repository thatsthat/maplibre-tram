import "./style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import osm2geojson from "osm2geojson-lite";

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
        minzoom: 0,
        maxzoom: 18,
      },
    ],
  },
  center: [2.1, 41.3748],
  zoom: 13,
});

map.addControl(new maplibregl.NavigationControl({}));

const fetchRelation = (async () => {
  try {
    const rawResponse = await fetch(
      "https://overpass-api.de/api/interpreter?data=%5Bout%3Axml%5D%5Btimeout%3A25%5D%3B%0Arel%284666995%29%3B%0A%3E%3B%0Aout%20skel%20qt%3B%0A"
    );
    try {
      const content = await rawResponse.text();
      const geojson = osm2geojson(content);
      console.log(geojson);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
})();

import "./style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import osm2geojson from "osmtogeojson";

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
      // "https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0Arel%284666995%29%3B%0A%3E%3B%0Aout%20skel%20qt%3B%0A"
      'https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];rel[name="T2: Francesc Macià => Llevant-Les planes"](41.3526,2.0558,41.3946,2.1447);way(r)[tracks=1];(._;>;);out skel qt;'
    );
    try {
      const content = await rawResponse.text();
      console.log(osm2geojson(JSON.parse(content)));
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
})();

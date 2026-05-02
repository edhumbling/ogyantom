"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, MapPin, Sparkle } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import type { FeatureCollection, LineString, Point } from "geojson";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";

const OPENFREEMAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

type CoveragePoint = {
  city: string;
  coordinates: [number, number];
  country: string;
  pulse: "origin" | "active" | "watch";
  shortLabel: string;
};

const coveragePoints: CoveragePoint[] = [
  {
    country: "Ghana",
    city: "Accra",
    coordinates: [-0.187, 5.604],
    pulse: "origin",
    shortLabel: "Ghana",
  },
  {
    country: "Canada",
    city: "Toronto",
    coordinates: [-79.383, 43.653],
    pulse: "active",
    shortLabel: "Canada",
  },
  {
    country: "United Kingdom",
    city: "London",
    coordinates: [-0.128, 51.507],
    pulse: "active",
    shortLabel: "UK",
  },
  {
    country: "United States",
    city: "New York",
    coordinates: [-74.006, 40.713],
    pulse: "active",
    shortLabel: "USA",
  },
  {
    country: "Holland / Netherlands",
    city: "Amsterdam",
    coordinates: [4.904, 52.367],
    pulse: "watch",
    shortLabel: "Holland",
  },
  {
    country: "Sweden",
    city: "Stockholm",
    coordinates: [18.069, 59.329],
    pulse: "watch",
    shortLabel: "Sweden",
  },
  {
    country: "South Africa",
    city: "Johannesburg",
    coordinates: [28.047, -26.204],
    pulse: "active",
    shortLabel: "South Africa",
  },
  {
    country: "Germany",
    city: "Berlin",
    coordinates: [13.405, 52.52],
    pulse: "watch",
    shortLabel: "Germany",
  },
];

const fivefoldCoveragePath = ["Ghana", "United Kingdom", "Sweden", "Canada", "South Africa", "Ghana"];

function makePointCollection(): FeatureCollection<Point, CoveragePoint> {
  return {
    type: "FeatureCollection",
    features: coveragePoints.map((point) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: point.coordinates,
      },
      properties: point,
    })),
  };
}

function makeRouteCollection(): FeatureCollection<LineString, { kind: "origin" | "fivefold" }> {
  const ghana = coveragePoints[0];
  const pointByCountry = new Map(coveragePoints.map((point) => [point.country, point]));
  const fivefoldCoordinates = fivefoldCoveragePath
    .map((country) => pointByCountry.get(country)?.coordinates)
    .filter((coordinate): coordinate is [number, number] => Boolean(coordinate));

  return {
    type: "FeatureCollection",
    features: [
      ...coveragePoints.slice(1).map((point) => ({
        type: "Feature" as const,
        geometry: {
          type: "LineString" as const,
          coordinates: [ghana.coordinates, point.coordinates],
        },
        properties: {
          kind: "origin" as const,
        },
      })),
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: fivefoldCoordinates,
        },
        properties: {
          kind: "fivefold",
        },
      },
    ],
  };
}

export function GlobalPrayerCoverageMap() {
  const router = useRouter();
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedCountry, setSelectedCountry] = useState("Ghana");
  const selectedPoint = useMemo(
    () => coveragePoints.find((point) => point.country === selectedCountry) ?? coveragePoints[0],
    [selectedCountry],
  );

  useEffect(() => {
    let cancelled = false;

    async function bootMap() {
      if (!mapNodeRef.current || mapRef.current) {
        return;
      }

      try {
        const maplibregl = await import("maplibre-gl");

        if (cancelled || !mapNodeRef.current) {
          return;
        }

        const map = new maplibregl.Map({
          attributionControl: false,
          bearing: -8,
          center: [7, 30],
          container: mapNodeRef.current,
          cooperativeGestures: true,
          dragRotate: false,
          keyboard: true,
          maxPitch: 0,
          maxZoom: 6,
          minZoom: 1,
          pitch: 0,
          style: OPENFREEMAP_STYLE_URL,
          zoom: 1.35,
        });

        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

        map.on("load", () => {
          if (cancelled) {
            return;
          }

          map.addSource("ogya-coverage-routes", {
            type: "geojson",
            data: makeRouteCollection(),
          });

          map.addLayer({
            id: "ogya-coverage-routes-glow",
            type: "line",
            source: "ogya-coverage-routes",
            paint: {
              "line-blur": 10,
              "line-color": ["match", ["get", "kind"], "fivefold", "#d4af5d", "#34f5a4"],
              "line-opacity": ["match", ["get", "kind"], "fivefold", 0.38, 0.18],
              "line-width": ["match", ["get", "kind"], "fivefold", 4.2, 2.4],
            },
          });

          map.addLayer({
            id: "ogya-coverage-routes-core",
            type: "line",
            source: "ogya-coverage-routes",
            paint: {
              "line-color": ["match", ["get", "kind"], "fivefold", "#fff2ba", "#cfb45f"],
              "line-dasharray": ["match", ["get", "kind"], "fivefold", ["literal", [1.8, 1.15]], ["literal", [1, 1.7]]],
              "line-opacity": ["match", ["get", "kind"], "fivefold", 0.72, 0.42],
              "line-width": ["match", ["get", "kind"], "fivefold", 1.45, 1],
            },
          });

          map.addSource("ogya-coverage-points", {
            type: "geojson",
            data: makePointCollection(),
          });

          map.addLayer({
            id: "ogya-coverage-halo",
            type: "circle",
            source: "ogya-coverage-points",
            paint: {
              "circle-blur": 0.55,
              "circle-color": ["match", ["get", "pulse"], "origin", "#ff7a1a", "active", "#34f5a4", "#cfb45f"],
              "circle-opacity": 0.28,
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 12, 4, 28],
            },
          });

          map.addLayer({
            id: "ogya-coverage-core",
            type: "circle",
            source: "ogya-coverage-points",
            paint: {
              "circle-color": ["match", ["get", "pulse"], "origin", "#ff7a1a", "active", "#34f5a4", "#cfb45f"],
              "circle-opacity": 0.95,
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 4.5, 4, 9],
              "circle-stroke-color": "#fff8e8",
              "circle-stroke-opacity": 0.88,
              "circle-stroke-width": 1.4,
            },
          });

          map.addLayer({
            id: "ogya-coverage-labels",
            type: "symbol",
            source: "ogya-coverage-points",
            layout: {
              "text-allow-overlap": false,
              "text-anchor": "top",
              "text-field": ["get", "shortLabel"],
              "text-font": ["Noto Sans Bold"],
              "text-offset": [0, 1.15],
              "text-size": ["interpolate", ["linear"], ["zoom"], 1, 10, 4, 13],
            },
            paint: {
              "text-color": "#fff8e8",
              "text-halo-blur": 0.8,
              "text-halo-color": "#030604",
              "text-halo-width": 1.4,
              "text-opacity": 0.95,
            },
          });

          markersRef.current = coveragePoints.map((point) => {
            const markerButton = document.createElement("button");
            markerButton.type = "button";
            markerButton.className = `global-prayer-marker global-prayer-marker-${point.pulse}`;
            markerButton.setAttribute(
              "aria-label",
              `Focus ${point.country} prayer coverage ping in ${point.city}`,
            );
            markerButton.addEventListener("click", () => {
              setSelectedCountry(point.country);
              map.flyTo({
                center: point.coordinates,
                duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 900,
                essential: false,
                zoom: Math.max(map.getZoom(), 3.15),
              });
            });

            return new maplibregl.Marker({
              anchor: "center",
              element: markerButton,
            })
              .setLngLat(point.coordinates)
              .addTo(map);
          });

          setMapStatus("ready");
        });

        map.on("error", () => {
          if (!cancelled) {
            setMapStatus("error");
          }
        });
      } catch {
        if (!cancelled) {
          setMapStatus("error");
        }
      }
    }

    bootMap();

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }

    router.push("/");
  }

  return (
    <main className="global-prayer-page">
      <a className="global-prayer-skip" href="#global-prayer-list">
        Skip to coverage list
      </a>

      <div className="global-prayer-map-shell" aria-hidden={mapStatus === "error" ? "true" : undefined}>
        <div
          ref={mapNodeRef}
          className="global-prayer-map"
          role="application"
          aria-label="Interactive OpenFreeMap world map with Ogya Ntom Prayer Army coverage pings"
        />
        <div className="global-prayer-vignette" aria-hidden="true" />
        <div className="global-prayer-fivefold" aria-hidden="true" />
      </div>

      <button type="button" className="global-prayer-back" onClick={handleBack}>
        <ArrowLeft size={17} weight="bold" aria-hidden="true" />
        <span>Back</span>
      </button>

      <section className="global-prayer-command" aria-labelledby="global-prayer-title">
        <p className="global-prayer-kicker">
          <Sparkle size={14} weight="fill" aria-hidden="true" />
          Global Prayer Coverage
        </p>
        <h1 id="global-prayer-title">Prayer pings across the nations</h1>
      </section>

      <p className="global-prayer-live" aria-live="polite">
        {mapStatus === "loading" ? "Loading world coverage…" : null}
        {mapStatus === "ready" ? `${selectedPoint.shortLabel} · ${selectedPoint.city}` : null}
        {mapStatus === "error" ? "Map unavailable. Coverage list is still available." : null}
      </p>

      <section
        id="global-prayer-list"
        className="global-prayer-ledger"
        aria-labelledby="global-prayer-list-title"
      >
        <div className="global-prayer-ledger-head">
          <h2 id="global-prayer-list-title">Coverage Pings</h2>
        </div>
        <ul>
          {coveragePoints.map((point) => (
            <li key={point.country}>
              <button
                type="button"
                aria-pressed={selectedCountry === point.country}
                onClick={() => {
                  setSelectedCountry(point.country);
                  mapRef.current?.flyTo({
                    center: point.coordinates,
                    duration:
                      typeof window !== "undefined" &&
                      window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? 0
                        : 800,
                    essential: false,
                    zoom: Math.max(mapRef.current.getZoom(), 3.15),
                  });
                }}
              >
                <MapPin size={15} weight="fill" aria-hidden="true" />
                <span>
                  <strong>{point.shortLabel}</strong>
                  <small>{point.city}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p>More incoming as the army extends.</p>
      </section>
    </main>
  );
}

"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { Tooltip as ReactTooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import { scaleQuantile } from "d3-scale"
import { ZoomIn, ZoomOut, Refresh, Public, BarChart } from "@mui/icons-material"
import styles from "./americasmaps.module.css"

// Este componente puede recibir datos de clientes por país como prop
// Si no se proporcionan, se utilizarán estos datos de ejemplo
const DEFAULT_CLIENT_DATA = [
  { name: "Mexico", value: 35, growth: "+12%" },
  { name: "United States of America", value: 25, growth: "+8%" },
  { name: "Colombia", value: 12, growth: "+15%" },
  { name: "Chile", value: 8, growth: "+5%" },
  { name: "Canada", value: 5, growth: "+3%" },
  { name: "Brazil", value: 15, growth: "+10%" },
  { name: "Argentina", value: 7, growth: "+4%" },
  { name: "Peru", value: 4, growth: "+2%" },
  { name: "Venezuela", value: 3, growth: "+1%" },
  { name: "Guatemala", value: 2, growth: "+6%" },
  { name: "Ecuador", value: 6, growth: "+9%" },
  { name: "Bolivia", value: 2, growth: "+3%" },
  { name: "Paraguay", value: 1, growth: "+1%" },
  { name: "Uruguay", value: 3, growth: "+2%" },
  { name: "Panama", value: 4, growth: "+7%" },
  { name: "Costa Rica", value: 3, growth: "+5%" },
  { name: "Dominican Republic", value: 2, growth: "+4%" },
  { name: "Haiti", value: 1, growth: "+1%" },
  { name: "Cuba", value: 2, growth: "+2%" },
]

const AmericasMaps = ({
  clientData = DEFAULT_CLIENT_DATA,
  showStats = true, // Opción para mostrar u ocultar el panel de estadísticas
  title = "Client Distribution by Country",
  geoUrl = "/Americas.json", // Ruta al archivo GeoJSON
  className = "", // Clase adicional para personalización
}) => {
  const [position, setPosition] = useState({ coordinates: [-80, 0], zoom: 1 })
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Crear escala de colores basada en los valores de clientes
  const colorScale = scaleQuantile()
    .domain(clientData.map((d) => d.value))
    .range([
      "#d0d1ff", // Tono más claro
      "#b5b6ff",
      "#9a9bff",
      "#7f80ff",
      "#6362e7", // Color principal de la marca
      "#5251c6",
      "#4140a5",
      "#302f84",
      "#201f63", // Tono más oscuro
    ])

  const handleZoomIn = () => {
    if (position.zoom >= 4) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.2 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.2 }))
  }

  const handleReset = () => {
    setPosition({ coordinates: [-80, 0], zoom: 1 })
    setSelectedCountry(null)
  }

  const getCountryColor = (geo) => {
    const countryName = geo.properties.NAME || geo.properties.name
    const country = clientData.find((d) => d.name === countryName)
    return country ? colorScale(country.value) : "#F5F5F5" // Gris por defecto para países sin datos
  }

  const getClientCount = (geo) => {
    const countryName = geo.properties.NAME || geo.properties.name
    const country = clientData.find((d) => d.name === countryName)
    return country ? country.value : 0
  }

  const getGrowthRate = (geo) => {
    const countryName = geo.properties.NAME || geo.properties.name
    const country = clientData.find((d) => d.name === countryName)
    return country ? country.growth : "0%"
  }

  // Obtener los 5 países principales por cantidad de clientes
  const topCountries = [...clientData].sort((a, b) => b.value - a.value).slice(0, 5)

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Public className={styles.titleIcon} />
          {title}
        </h3>
        <div className={styles.controlsContainer}>
          <button onClick={handleZoomIn} className={styles.controlButton} title="Zoom In">
            <ZoomIn fontSize="small" />
          </button>
          <button onClick={handleZoomOut} className={styles.controlButton} title="Zoom Out">
            <ZoomOut fontSize="small" />
          </button>
          <button onClick={handleReset} className={styles.controlButton} title="Reset View">
            <Refresh fontSize="small" />
          </button>
        </div>
      </div>

      <div className={`${styles.gridContainer} ${showStats ? styles.withStats : ""}`}>
        <div className={styles.mapContainer}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 190,
            }}
            width={800}
            height={400}
            style={{ width: "100%", height: "100%" }}
            className={styles.mapWrapper}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={(position) => setPosition(position)}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.NAME || geo.properties.name
                    const clientCount = getClientCount(geo)
                    const isSelected = selectedCountry === countryName

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isSelected ? "#514fbb" : getCountryColor(geo)}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? 1 : 0.5}
                        className={`${styles.country} ${isSelected ? styles.countrySelected : ""}`}
                        onClick={() => {
                          setSelectedCountry(countryName)
                        }}
                        data-tooltip-id="map-tooltip"
                        data-tooltip-html={`
                          <div class="${styles.tooltipTitle}">${countryName}</div>
                          <div class="${styles.tooltipValue}">Clients: ${clientCount}</div>
                          ${
                            clientData.find((c) => c.name === countryName)?.growth
                              ? `<div>Growth: ${getGrowthRate(geo)}</div>`
                              : ""
                          }
                        `}
                      />
                    )
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Leyenda */}
          <div className={styles.legend}>
            <div className={styles.legendTitle}>Client Count</div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.colorLow}`}></div>
              <span>Low</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.colorMedium}`}></div>
              <span>Medium</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.colorHigh}`}></div>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Panel de estadísticas por país - solo se muestra si showStats es true */}
        {showStats && (
          <div className={styles.statsPanel}>
            <div className={styles.statsPanelHeader}>
              <BarChart className={styles.statsPanelIcon} fontSize="small" />
              <h4 className={styles.statsPanelTitle}>Client Statistics</h4>
            </div>

            {selectedCountry ? (
              <div>
                <h5 className={styles.countryTitle}>{selectedCountry}</h5>
                {clientData.find((c) => c.name === selectedCountry) ? (
                  <>
                    <div className={styles.statsGrid}>
                      <div className={styles.statCard}>
                        <div className={styles.statLabel}>Clients</div>
                        <div className={`${styles.statValue} ${styles.clientValue}`}>
                          {clientData.find((c) => c.name === selectedCountry).value}
                        </div>
                      </div>
                      <div className={styles.statCard}>
                        <div className={styles.statLabel}>Growth</div>
                        <div className={`${styles.statValue} ${styles.growthValue}`}>
                          {clientData.find((c) => c.name === selectedCountry).growth || "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className={styles.countryInfo}>
                      {selectedCountry} represents{" "}
                      {(
                        (clientData.find((c) => c.name === selectedCountry).value /
                          clientData.reduce((sum, c) => sum + c.value, 0)) *
                        100
                      ).toFixed(1)}
                      % of total clients.
                    </div>
                    <button className={styles.viewAllButton} onClick={() => setSelectedCountry(null)}>
                      View all countries
                    </button>
                  </>
                ) : (
                  <div className={styles.noDataMessage}>No client data available for {selectedCountry}</div>
                )}
              </div>
            ) : (
              <>
                <h5 className={styles.statsPanelTitle}>Top Countries</h5>
                <div className={styles.topCountriesList}>
                  {topCountries.map((country, index) => (
                    <div
                      key={country.name}
                      className={styles.topCountryItem}
                      onClick={() => setSelectedCountry(country.name)}
                    >
                      <div className={styles.topCountryRank}>
                        <div className={styles.rankBadge}>{index + 1}</div>
                        <span>{country.name}</span>
                      </div>
                      <div className={styles.topCountryValue}>{country.value}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.totalClients}>
                  Total Clients: {clientData.reduce((sum, c) => sum + c.value, 0)}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <ReactTooltip id="map-tooltip" className={styles.tooltip} />
    </div>
  )
}

export default AmericasMaps

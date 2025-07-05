/**
 * Animates the map camera to a given location with default zoom level.
 * @param {object} mapRef - Ref to MapView
 * @param {number} latitude - Latitude to center on
 * @param {number} longitude - Longitude to center on
 * @param {number} [zoomLevel=0.002] - Optional zoom level (smaller = closer)
 */
export const animateToLocation = (mapRef, latitude, longitude, zoomLevel = 0.002) => {
  if (!mapRef || !mapRef.current) {
    console.warn('Map ref is not set');
    return;
  }

  mapRef.current.animateToRegion(
    {
      latitude,
      longitude,
      latitudeDelta: zoomLevel,
      longitudeDelta: zoomLevel,
    },
    1000 // duration in ms
  );
};

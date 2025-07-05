// 📄 services/NearbyVendorsService.js
export const getNearbyVendors = async (lat, lng, storeType, searchText = '') => {
  try {
    const res = await fetch(
      `http://192.168.1.150:5000/api/vendors/nearby?lat=${lat}&lng=${lng}&storeType=${storeType}&q=${encodeURIComponent(searchText)}`
    );
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json || [];
  } catch (err) {
    console.error('Failed to fetch nearby vendors:', err);
    return [];
  }
};

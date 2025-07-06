export const getFilteredVendors = (allVendors, searchText) => {
  if (!searchText || !allVendors) return [];

  const filtered = allVendors.filter((vendor) =>
    vendor.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  return filtered.slice(0, 5);
};

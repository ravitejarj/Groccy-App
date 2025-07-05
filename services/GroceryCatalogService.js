import axios from 'axios';

const BASE_URL = 'http://192.168.1.150:5000/api/grocery';

/**
 * 🧩 Fetch catalog structure (categories + subcategories) for a given vendor
 * @param {string} vendorId
 */
export const getCatalogStructure = async (vendorId) => {
  const response = await axios.get(`${BASE_URL}/catalog/${vendorId}/structure`);
  return response.data;
};

/**
 * 📦 Fetch all categories for a vendor
 * (alias for catalog structure – used in older screens)
 */
export const getVendorCategories = getCatalogStructure;

/**
 * 📂 Fetch subcategories for a specific vendor and category
 * @param {string} vendorId
 * @param {string} categoryId
 */
export const getVendorSubcategories = async (vendorId, categoryId) => {
  const response = await axios.get(`${BASE_URL}/${vendorId}/subcategories/${categoryId}`);
  return response.data;
};

/**
 * 🛍 Fetch all products under a specific subcategory
 * @param {string} vendorId
 * @param {string} subcategoryId
 */
export const getProductsBySubcategory = async (vendorId, subcategoryId) => {
  const response = await axios.get(`${BASE_URL}/${vendorId}/subcategory/${subcategoryId}/products`);
  return response.data;
};

/**
 * 🔎 Get single product detail by ID
 * @param {string} vendorId
 * @param {string} productId
 */
export const getProductById = async (vendorId, productId) => {
  const response = await axios.get(`${BASE_URL}/vendor/${vendorId}/product/${productId}`);
  return response.data;
};

/**
 * 🔍 Search vendor products by keyword
 * @param {string} vendorId
 * @param {string} keyword
 */
export const searchVendorProducts = async (vendorId, keyword) => {
  const response = await axios.get(`${BASE_URL}/search/${vendorId}/products?search=${keyword}`);
  return response.data;
};

/**
 * 🔎 Search all products under a specific vendor + category
 * @param {string} vendorId
 * @param {string} categoryId
 * @param {string} keyword
 */
export const searchCategoryProducts = async (vendorId, categoryId, keyword) => {
  const response = await axios.get(
    `${BASE_URL}/search/${vendorId}/category/${categoryId}/products?search=${keyword}`
  );
  return response.data;
};

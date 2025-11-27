// components/Grocery/Subcategory/subcategoryHelpers.js

export const CUSTOM_SUBCATEGORY_ORDER = {
  'Vegetables & Fruits': ['vegetables', 'coriander & essentials', 'fruits'],
  'Atta, Rice & Dal': ['Rice', 'Atta', 'Dal', 'Beans & Chana', 'Poha & Daliya'],
  'Dry Fruits & Cereals': ['Dry Fruits', 'Corn Flakes & Kids Cereals'],
  'Sweets & Chocolates': ['Indian Sweets', 'Chocolates', 'Candies'],
  'Oil, Ghee & Masala': ['Spices', 'Powdered Spices', 'Oil', 'Ghee', 'Salt, Sugar, Jaggery'],
  'Kitchenware & Appliances': ['Kitchen Appliances', 'Cutting & Chopping', 'Dining & Serveware', 'Storage & Container', 'Glasses & Mugs'],
  'Chips': ['Chips', 'Bhujia & Mixtures', 'Papad & Fyrums'],
  'Drinks & Juices': ['Soft Drinks', 'Drinks', 'Fruit Juices', 'Energy Drinks'],
  'Tea, Coffee': ['Tea', 'Coffe'],
  'Bakery & Biscuits': ['Cookies', 'Rusks', 'Cream Bisuits', 'Sweet & Salty'],
  'Instant Food': ['Idli & Dosa Batter', 'Frozen Veg Snacks', 'Frozen Non Veg Snacks', 'Deserts', 'Ready to Eat', 'Noodles', 'Pasta'],
  'Ice Creams & More': ['Sticks', 'Cones', 'Tubs'],
  'Frozen Vegetables': ['Frozen Vegetables'],
  'Bath & Body': ['Soaps', 'Face Cleaning', 'Oral Care', 'Body Lotions', 'Handwash', 'Fragrance'],
  'Hair': ['Hair Oil', 'Hair Accessories', 'Shampoo', 'Conditioner'],
};

export function sortSubcategoriesByOrder(subcategories, categoryName) {
  const orderList = CUSTOM_SUBCATEGORY_ORDER[categoryName];

  if (!orderList) {
    // No order defined, return alphabetical
    return subcategories.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Create a map of ID to subcategory
  const subMap = {};
  subcategories.forEach((s) => (subMap[s._id] = s));

  // Sort based on custom order
  const sorted = orderList
    .map((id) => subMap[id])
    .filter(Boolean); // Remove missing IDs

  // Add remaining subcategories not in the order list
  const remaining = subcategories.filter((s) => !orderList.includes(s._id));

  return [...sorted, ...remaining];
}
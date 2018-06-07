export function addProduct(product) {
  return { type: "ADD_PRODUCT", product };
}

export function rmProduct(product) {
  return { type: "RM_PRODUCT", product };
}

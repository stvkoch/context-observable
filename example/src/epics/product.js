export function epicAddProduct($action, state) {
  return $action.filter(a => a.type === "ADD_PRODUCT").map(a => ({
    type: a.type,
    product: { ...a.product, name: "hello " + a.product.name }
  }));
}

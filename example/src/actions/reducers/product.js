const initialState = null;

export default function product(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return action.product;
    case "RM_PRODUCT":
      return null;
    default:
      return state;
  }
}

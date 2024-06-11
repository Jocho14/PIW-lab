export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...(state.items || []), action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: (state.items || []).filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "SET_CART":
      return { ...state, items: action.payload.items || [] };
    default:
      return state;
  }
};

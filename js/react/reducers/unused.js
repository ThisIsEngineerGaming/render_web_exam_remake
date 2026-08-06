const initialState = {
  items: [],
};

export function unused(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          item => item.id !== action.payload
        ),
      };

    case "INCREASE":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE":
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      };

    case "CLEAR":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

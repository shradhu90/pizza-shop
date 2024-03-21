import { ADD_ORDER, MOVE_TO_NEXT_STAGE, MOVE_TO_PICKED_STAGE, CANCEL_ORDER } from '../actions/types';

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  console.log(action, state)
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case MOVE_TO_NEXT_STAGE:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload ? { ...order, stage: order.stage + 1 } : order
        ),
      };
    case MOVE_TO_PICKED_STAGE:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload ? { ...order, stage: 3 } : order
        ),
      };
    case CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };
    default:
      return state;
  }
};

export default orderReducer;

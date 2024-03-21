import { ADD_ORDER, MOVE_TO_NEXT_STAGE, MOVE_TO_PICKED_STAGE, CANCEL_ORDER } from './types';

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const moveToNextStage = (orderId) => ({
  type: MOVE_TO_NEXT_STAGE,
  payload: orderId,
});

export const moveToPickedStage = (orderId) => ({
  type: MOVE_TO_PICKED_STAGE,
  payload: orderId,
});

export const cancelOrder = (orderId) => ({
  type: CANCEL_ORDER,
  payload: orderId,
});

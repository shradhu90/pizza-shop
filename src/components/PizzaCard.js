import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelOrder, moveToNextStage, moveToPickedStage } from '../actions/orderActions';
import "./PizzaCard.css";

const PizzaCard = () => {
  const orders = useSelector(state => state.orders.orders); // Assuming 'orders' is the key in your rootReducer
  const dispatch = useDispatch();

  const handleMoveToNextStage = (orderId) => {
    dispatch(moveToNextStage(orderId));
  };

  const handleMoveToPickedStage = (orderId) => {
    dispatch(moveToPickedStage(orderId));
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const calculateTimeRemaining = (order) => {
    const makingTime = {
      Small: 180, // 3 minutes in seconds
      Medium: 240, // 4 minutes in seconds
      Large: 300 // 5 minutes in seconds
    };
    const elapsedTime = (new Date() - new Date(order.createdAt)) / 1000; // Elapsed time in seconds
    const remainingTime = makingTime[order.size] - elapsedTime;
    return remainingTime >= 0 ? remainingTime : 0;
  };

  return (
    <div className="order-list">
      <div className="order-section">
        <h3>Order in Progress</h3>
        <div className="order-cards">
          {orders.filter(order => order.stage === 0).length > 0 ? (
            orders.filter(order => order.stage === 0).map(order => (
              <div className="order-card" key={order.id}>
                <p>Order {order.id}</p>
                <p>Time Remaining: {calculateTimeRemaining(order)} sec</p>
                <div className="card-buttons">
                  <button onClick={() => handleMoveToNextStage(order.id)}>Next</button>
                  <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                </div>
              </div>
            ))
          ) : (
            <p>No orders in this stage</p>
          )}
        </div>
      </div>
      <div className="order-section">
        <h3>Order in Making</h3>
        <div className="order-cards">
          {orders.filter(order => order.stage === 1).length > 0 ? (
            orders.filter(order => order.stage === 1).map(order => (
              <div className="order-card" key={order.id}>
                <p>Order {order.id}</p>
                <p>Time Remaining: {calculateTimeRemaining(order)} sec</p>
                <div className="card-buttons">
                  <button onClick={() => handleMoveToNextStage(order.id)}>Next</button>
                  <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                </div>
              </div>
            ))
          ) : (
            <p>No orders in this stage</p>
          )}
        </div>
      </div>
      <div className="order-section">
        <h3>Order Ready</h3>
        <div className="order-cards">
          {orders.filter(order => order.stage === 2).length > 0 ? (
            orders.filter(order => order.stage === 2).map(order => (
              <div className="order-card" key={order.id}>
                <p>Order {order.id}</p>
                <p>Time Remaining: {calculateTimeRemaining(order)} sec</p>
                <div className="card-buttons">
                  <button onClick={() => handleMoveToPickedStage(order.id)}>Next</button>
                  <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                </div>
              </div>
            ))
          ) : (
            <p>No orders in this stage</p>
          )}
        </div>
      </div>
      <div className="order-section">
        <h3>Order Picked</h3>
        <div className="order-cards">
          {orders.filter(order => order.stage === 3).length > 0 ? (
            orders.filter(order => order.stage === 3).map(order => (
              <div className="order-card" key={order.id}>
                <p>Order {order.id}</p>
                <p>Picked</p>
              </div>
            ))
          ) : (
            <p>No orders in this stage</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;

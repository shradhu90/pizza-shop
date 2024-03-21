import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cancelOrder, moveToNextStage, moveToPickedStage } from '../actions/orderActions';
import './OrderTable.css'; // Assuming you have a separate CSS file for styling

const OrderTable = () => {
  const orders = useSelector(state => state.orders.orders); // Assuming 'orders' is the key in your rootReducer
  const dispatch = useDispatch();

  const totalDeliveredOrders = orders.filter(order => order.stage === 3).length;

  const handleMoveToPickedStage = (orderId) => {
    dispatch(moveToPickedStage(orderId));
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <div className="order-table-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Stage</th>
            <th>Total Time Spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage === 0 ? 'Order Placed' : order.stage === 1 ? 'Order in Making' : order.stage === 2 ? 'Order Ready' : 'Order Picked'}</td>
              {/* Calculate total time spent here based on order.createdAt */}
              <td>
                {(() => {
                  const currentTime = new Date();
                  const createdAtTime = new Date(order.createdAt);
                  const timeDifference = currentTime - createdAtTime;
                  const totalSeconds = Math.floor(timeDifference / 1000);

                  const hours = Math.floor(totalSeconds / 3600);
                  const minutes = Math.floor((totalSeconds % 3600) / 60);
                  const seconds = totalSeconds % 60;

                  return `${hours}h ${minutes}m ${seconds}s`;
                })()}
              </td>
              <td>
                {order.stage === 0 && (
                  <>
                    
                    <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                  </>
                )}
                {order.stage === 1 && (
                  <>
                    
                    <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                  </>
                )}
                {order.stage === 2 && (
                  <>
                    
                    <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total orders delivered: {totalDeliveredOrders}</p>

    </div>
  );
};

export default OrderTable;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../actions/orderActions';
import './OrderForm.css'; // Import the CSS file for OrderForm styling
import { moveToNextStage } from '../actions/orderActions'; 
const OrderForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const [order, setOrder] = useState({ type: '', size: '', base: '' });
  const [estimatedTime, setEstimatedTime] = useState('');
  
  useEffect(() => {
    calculateEstimatedTime();
  }, [order.size]); // Update estimated time when size changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevState => ({ ...prevState, [name]: value }));
  };
  const STAGE_DELAY = {
    Small: 3000, // 3 seconds for Small size
    Medium: 4000, // 4 seconds for Medium size
    Large: 5000, // 5 seconds for Large size
  };
  
  const calculateEstimatedTime = () => {
    let time = 0;
    switch (order.size) {
      case 'Small':
        time = 3; // 3 minutes for small pizza
        break;
      case 'Medium':
        time = 4; // 4 minutes for medium pizza
        break;
      case 'Large':
        time = 5; // 5 minutes for large pizza
        break;
      default:
        time = 0;
    }
    setEstimatedTime(time);
  };
  const getNextShortId = () => {
    const orderCount = orders.length + 1;
    return orderCount < 10 ? `0${orderCount}` : `${orderCount}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(order.base&&order.size&&order.type){
        const newOrder = { ...order, id: getNextShortId(), stage: 0, createdAt: new Date() };
        dispatch(addOrder(newOrder));
        setTimeout(() => {
            dispatch(moveToNextStage(newOrder.id));
          }, STAGE_DELAY[order.size] || 0); 
        setOrder({ type: '', size: '', base: '' });
    }else{
        alert('add all items')
    }
    

  };

  return (
    <div className="order-form-container">
      <h2>Place Your Pizza Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select id="type" name="type" value={order.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="size">Size:</label>
          <select id="size" name="size" value={order.size} onChange={handleChange}>
            <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="base">Base:</label>
          <select id="base" name="base" value={order.base} onChange={handleChange}>
            <option value="">Select Base</option>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </div>
        <p>Estimated Making Time: {estimatedTime} minutes</p>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;

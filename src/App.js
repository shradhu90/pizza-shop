import React from 'react';
import OrderForm from './components/OrderForm';
import OrderTable from './components/OrderTable';
import PizzaCard from './components/PizzaCard';
import './App.css';
const App = () => {
  return (
    <div className="app-container">
      <OrderForm />
      <PizzaCard />
      <div className="order-list-container">
        <h2>Order Status</h2>
        <OrderTable />
      </div>
    </div>
  );
};

export default App;

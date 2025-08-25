import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleCheckOut();
  }, []);

  const handleCheckOut = async () => {
    try {
      const res = await fetch("http://localhost:5000/getorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
      });
      const data = await res.json();
      console.log("API response:", data);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100">
      <Header />

      <div className="container mt-5">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <table className="table text-light">
            <thead>
              <tr>
                <th>Order list</th>
                <th>Order Image</th>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((userOrder, userIdx) =>
                userOrder.order_data
                  .slice(0)
                  .reverse()
                  .map((orderGroup, groupIdx) => {
                    const dateObj = orderGroup[0];
                    const items = orderGroup.slice(1);
                    console.log("item :", items);
                    return (
                      <React.Fragment key={`${userIdx}-${groupIdx}`}>
                        <tr>
                          <td colSpan="4">
                            <strong>{dateObj.order_date}</strong>
                          </td>
                        </tr>

                        {items.map((item, itemIdx) => (
                          <tr key={item.id}>
                            <td>{itemIdx + 1}</td>
                            <td><img
                              src={`http://localhost:5000/images/${item.img}`}
                              alt={item.name}
                              style={{ width: "60px", height: "60px" }}
                            /></td>
                            <td>
                              {item.name} ({item.size} × {item.qty})
                            </td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })
              )}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MyOrder;

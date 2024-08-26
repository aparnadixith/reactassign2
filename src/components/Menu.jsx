import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
const data = [
  {
    product_name: "Pizza",
    prouct_desc: "Classic pizza with your favourite toppings.",
    price: "99.99",
    quantity: 0,
    image: "./Images/Pizza1.jpg",
  },
  {
    product_name: "Burger",
    prouct_desc: "A delicious burger with all the fixings.",
    price: "79.99",
    quantity: 0,
    image: "./Images/Burger1.jpg",
  },
  {
    product_name: "Fries",
    prouct_desc: "Crispy golden fries served hot and fresh.",
    price: "59.99",
    quantity: 0,
    image: "./Images/Fries.jpg",
  },
];

export const Menu = () => {
  const [theme, setTheme] = useState(["light"]);
  const handleThemeChange = (val) => {
    setTheme(val);
  };
  return (
    <div
      style={{
        backgroundColor: theme.includes("light") ? "white" : "black",
        height: "100vh",
      }}
    >
      <ToggleButtonGroup
        type="checkbox"
        value={theme}
        onChange={handleThemeChange}
      >
        <ToggleButton
          id="tbg-btn-1"
          value={"light"}
          variant={theme.includes("light") ? "light" : "dark"}
        >
          {theme.includes("light") ? "Light" : "Dark"}
        </ToggleButton>
      </ToggleButtonGroup>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          color: theme.includes("light") ? "black" : "white",
        }}
      >
        Fast Food Menu
      </div>
      <ProductData theme={theme} />
    </div>
  );
};

const ProductData = ({ theme }) => {
  const [productData, setProductData] = useState(data);

  const addToOrder = (originalItem, itemIndex) => {
    const updatedData = productData.map((value, index) => {
      if (originalItem.product_name === value.product_name) {
        return {
          ...value,
          quantity: value.quantity + 1,
        };
      } else {
        return value;
      }
    });
    setProductData(updatedData);
  };

  return (
    <>
      <Container>
        <Row>
          {productData.map((item, index) => {
            return (
              <Col
                key={index}
                style={{ backgroundColor: "white", padding: 10, margin: 20 }}
              >
                <Row>
                  <Image src={require(`${item.image}`)} rounded />
                </Row>
                <Row style={{ paddingLeft: 10, fontWeight: "bold" }}>
                  {item.product_name}
                </Row>
                <Row style={{ paddingLeft: 10 }}>SEK {item.price}</Row>
                <Row style={{ paddingLeft: 10 }}>{item.prouct_desc}</Row>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => addToOrder(item, index)}
                >
                  Add To Order
                </Button>
              </Col>
            );
          })}
        </Row>
        <Row>
          <OrderManagement
            orderData={productData}
            setOrderData={setProductData}
            theme={theme}
          />
        </Row>
      </Container>
    </>
  );
};

function OrderManagement({ orderData, setOrderData, theme }) {
  const increment = (data) => {
    const updatedData = orderData.map((value, index) => {
      if (data.product_name === value.product_name) {
        return {
          ...value,
          quantity: value.quantity + 1,
        };
      } else {
        return value;
      }
    });
    setOrderData(updatedData);
  };

  const decrement = (data) => {
    const updatedData = orderData.map((value, index) => {
      if (data.product_name === value.product_name) {
        return {
          ...value,
          quantity: value.quantity - 1,
        };
      } else {
        return value;
      }
    });

    setOrderData(updatedData);
  };

  let orderTotal = 0;

  return (
    <div
      style={{
        padding: 10,
        margin: 20,
      }}
    >
      <div
        style={{
          marginTop: 20,
          fontWeight: "bold",
          paddingLeft: 10,
          color: theme.includes("light") ? "black" : "white",
          backgroundColor: theme.includes("light") ? "white" : "black",
        }}
      >
        Your Order
      </div>
      <Container>
        {orderData.map((product, index) => {
          //if product quantity is greater than 0, then show order items
          const isQuantityGreaterThanZero = product.quantity > 0;
          const productTotal = `SEK ${parseFloat(
            Number(product.price) * product.quantity
          ).toFixed(2)}`;
          orderTotal = orderTotal + Number(product.price) * product.quantity;
          return (
            <div key={index}>
              {isQuantityGreaterThanZero ? (
                <>
                  <Row
                    style={{
                      color: theme.includes("light") ? "black" : "white",
                      marginBottom: 5,
                    }}
                  >
                    <Col>
                      {product.product_name} x {product.quantity}
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => decrement(product)}
                      >
                        -
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => increment(product)}
                      >
                        +
                      </Button>
                    </Col>
                    <Col>{productTotal}</Col>
                  </Row>
                </>
              ) : null}
            </div>
          );
        })}
        {orderTotal > 0 ? (
          <Row
            style={{
              marginTop: 20,
              fontWeight: "bold",
              paddingLeft: 0,
              color: theme.includes("light") ? "black" : "white",
              backgroundColor: theme.includes("light") ? "white" : "black",
            }}
          >
            <Col>Order Total</Col>
            <Col></Col>
            <Col>{`SEK ${orderTotal.toFixed(2)}`}</Col>
          </Row>
        ) : (
          <Row
            style={{
              alignItems: "center",
              justifyContent: "center",
              color: theme.includes("light") ? "black" : "white",
            }}
          >
            No Items Added Yet
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Menu;

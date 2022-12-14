import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import CartItem from "./CartItem";
import logo from "../assets/loadingIcon.gif";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
/// renders cart page
const Cart = () => {
  const {
    Total,
    cart,
    state,
    actions: { addItemToCart, removeItemFromCart, deleteCart },
  } = useContext(CartContext);

  //set state for the clean array that will let us display the number of item in the cart
  const [numberedCart, setNumberedCart] = useState();

  //reformat the array so that we can see the number of time one item is in it
  useEffect(() => {
    if (cart) {
      let cleanArr = {};
      for (const item of cart) {
        let keys = item;
        cleanArr[keys] = ++cleanArr[item] || 1;
      }
      setNumberedCart(Object.entries(cleanArr));
    }
  }, [cart, state]);

  //declare navigate as a function
  const navigate = useNavigate();

  /// removes item from cart context
  const handleRemove = (currentItem) => {
    removeItemFromCart(currentItem._id);
  };

  /// adds item to cart context
  const handleAdd = (e, currentItem) => {
    addItemToCart(currentItem._id);
  };

  const handleClear = () => {
    deleteCart();
    navigate("/");
  };

  return (
    <Div>
      {!cart || !numberedCart ? (
        <Logo src={logo} alt="loading" />
      ) : (
        <>
          <ShoppingDiv>
            <TitleDiv>
              <h2>Shopping Cart</h2>
            </TitleDiv>
            {/* {!cart ? <Logo src={logo} alt="loading" /> : ( */}
            <ItemsDiv>
              {numberedCart.map((item, i) => {
                return (
                  <CartItem
                    key={item[0] + i}
                    item={item[0]}
                    occurences={item[1]}
                    index={i}
                    handleAdd={handleAdd}
                    handleRemove={handleRemove}
                    cart={cart}
                  />
                );
              })}
            </ItemsDiv>
          </ShoppingDiv>
          <Container>
          {cart.length === 0 ? null : (
              <Button onClick={() => handleClear()}>Clear Cart</Button>
          )}
          <TotalDiv>
            <Span>Cart Total</Span>
            {!Total ? (
              <Logo src={logo} alt="loading" />
            ) : (
              <h4>Total: ${Total}</h4>
            )}
            <NavLink href="/order">
              <BtnCheck>Checkout</BtnCheck>
            </NavLink>
          </TotalDiv>
          </Container>
        </>
      )}
    </Div>
  );
};

const Button = styled.button`
  width: 250px;
  margin-bottom: 80px;
  background-color: #eff0f2;
  border: 2px solid var(--border-color);
  color: black;
  &:hover {
        background-color: #00CC96;
        color: white;
    }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 34px;
`
const NavLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
`;

const BtnCheck = styled.button`
  margin-top: 50px;
  width: 250px;
`;

const TitleDiv = styled.div`
  margin: 20px 0px 0px 54px;
  display: flex;
  justify-content: space-between;
`;

const TotalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 48px;
  padding: 24px;
  height: 300px;
  width: 400px;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

const ShoppingDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const ItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px 24px 24px;
  margin: 20px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;

`;

const Span = styled.span`
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 600;
  padding: 0px 24px;
  text-align: center;
  border-bottom: 2px solid #f6f7fb;
`;

export default Cart;

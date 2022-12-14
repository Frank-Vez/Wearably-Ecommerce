import Form from "./Form";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import styled from "styled-components";
import logo from "../assets/loadingIcon.gif";
import { useNavigate } from "react-router-dom";

/// renders the order page
const OrderPage = ({setorderId}) => {
    const {
        Total,
        cart
    } = useContext(CartContext);
    const navigate = useNavigate();

/// POSTs the order when the order now button is clicked on the Form
    const handleSubmit = (e, formData) => {
        e.preventDefault();
        fetch('/api/add-order', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ /// sends the data to the BE in key/value pairs
                _id: setorderId,
                order: cart,
                total: Total,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                postalCode: formData.postalCode,
                creditCard: formData.creditCard,
                expiration: formData.expiration
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.status >= 300) {
                window.alert(data.message);
            }
            else {
                setorderId(data.data.insertedId, "orderId") /// sends the orderId to PersistedState from App
                navigate(`/confirmation`);
            }
        })
        .catch((error) => {
            window.alert(error);
        })
        }

    return (
        <Div>
            <div>
                <TitleDiv><h2>Checkout</h2></TitleDiv>
                {/* the Form component is passed the handleSubmit function */}
                <Form handleSubmit={handleSubmit} />
            </div>
            <TotalDiv>
                <Span>Order Summary</Span>
                {/* implements a loading state if the Total is not calculated yet */}
                {!Total ? <Logo src={logo} alt="loading" /> :
                    <h4>Total: ${Total}</h4>
                }
            </TotalDiv>
        </Div>
    );
};

const Logo = styled.img`
    width: 50px;
    height: 50px;
`

const TitleDiv = styled.div`
    margin: 20px 0px 0px 24px;
`
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const TotalDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 48px;
    padding: 24px;
    height: 300px;
    width: 400px;
`
const Span = styled.span`
    margin-bottom: 80px;
    font-size: 32px;
    font-weight: 600;
    padding: 0px 24px;
    text-align: center;
    border-bottom:  2px solid #F6F7FB;
`

export default OrderPage;

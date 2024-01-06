import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    // new
    // const initialCart = [];
    // const initialQuantity = 0;
    // const initialPrice = 0;
  
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

  //   // new
  //   // Persisting the cart items
  // useEffect(() => {
  //   if (cartItems !== initialCart) {
  //       localStorage.setItem("cart", JSON.stringify(cartItems));
  //     }
  //   }, [cartItems]);

  // useEffect(() => {
  //     const cartData = JSON.parse(localStorage.getItem("cart"));
  //     if (cartData !== null & cartData !== undefined) {
  //       console.log('cartData', cartData);
  //     setCartItems(cartData);
  //     }
  //   }, [cartItems]);

  // // Persisting the total quantity of the card
  // useEffect(() => {
  //     if (totalQuantities !== initialQuantity) {
  //       localStorage.setItem("quantity", JSON.stringify(totalQuantities));
  //     }
  //   }, [totalQuantities]);

  // useEffect(() => {
  //     const cartQuantity = JSON.parse(localStorage.getItem("quantity"));
  //     if (cartQuantity) {
  //       setTotalQuantities(cartQuantity);
  //     }
  //   }, []);

  // // Persisting the total price
  // useEffect(() => {
  //     if (totalPrice !== initialPrice) {
  //       localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  //     }
  //   }, [totalPrice]);

//   useEffect(() => {
//       const cartPrice = JSON.parse(localStorage.getItem("totalPrice"));
//       if (cartPrice) {
//         setTotalPrice(cartPrice);
//       }
//     }, []);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        if(checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }; 
            return {
                ...cartProduct
            }
          })
    
          setCartItems(updatedCartItems);
        } else {
          product.quantity = quantity;
          
          setCartItems([...cartItems, { ...product }]);
        }
    
        toast.success(`${qty} ${product.name} added to the cart.`);
        setQty(1);
      } 

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);
        newCartItems.splice(index, 0, foundProduct);

        if (value === 'inc') {
            newCartItems[index].quantity += 1;
            setCartItems(newCartItems);   
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
            
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                newCartItems[index].quantity += -1;
                setCartItems(newCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                setQty
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import { renderHook } from "@testing-library/react";
import items from "./products.json";

function App() {
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [itemList, setItemList] = useState(items);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm("");
  const updatetotwo = (data) => {
    console.log(data); // log all data
    console.log(data.fullName); // log only fullname
    // update hooks
    setDataF(data);
    setViewer(data.viewer = 2);
  };      
  const updatetoone = () => {
    setViewer(dataF.viewer = 1);
    setDataF(dataF);
  };
  const updateHooks = () => {
    setViewer(dataF.viewer = 0);
    setDataF({});
    setCart([]);
    setCartTotal(0);
  };
  const addToCart = (list) => {
    setCart([...cart, list]);
    <button type="button" variant="light" onClick={() => addToCart(list)}>
      {" "}
      +{" "}
    </button>;
    
  };
  const removeFromCart = (list) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== list.id);
    setCart(hardCopy);
  };
  useEffect(() => {
    total();
  }, [cart]);
  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(totalVal);
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = items.filter(eachItem => {
        if(e.target.value === "") return itemList;
        return eachItem.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    console.log(results);
    setItemList(results);
  }
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }
  function ListView () {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm("");
    
    
    const listItems = itemList.map((list) => (
    // PRODUCT
    <div class="row border-top border-bottom" key={list.id}>
      <div class="row main align-items-center">
        <div class="col-2">
          <img class="img-fluid" src={list.image} />
        </div>
        <div class="col">
          <div class="row text-muted">{list.title}</div>
          <div class="row">{list.category}</div>
        </div>
        <div class="col">
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(list)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button type="button" variant="light" onClick={() => addToCart(list)}>
            {" "}
            +{" "}
          </button>
        </div>
        <div class="col">
          ${list.price} <span class="close">&#10005;</span>
          {howManyofThis(list.id)}
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      STORE SE/ComS319
      <div className = "searchbar">
        <input type="search" value={query} onChange={handleChange} />
      </div>
      <div class="card">
        <div class="row">
          {/* HERE, IT IS THE SHOPING CART */}
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>319 Shopping Cart</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  Products selected {cart.length}
                </div>
              </div>
              <div class="float-end">
            <p class="mb-0 me-5 d-flex align-items-center">
              <span class="small text-muted me-2">Order total:</span>
              <span class="lead fw-normal">${cartTotal}</span>
            </p>
          </div>
            </div>
            <div>{listItems}</div>
          </div>
          <button onClick={updatetoone} className=
"btn btn-secondary">Checkout</button>
        </div>
      </div>
    </div>
  );
  }
  function PaymentView() {
    const cartItems = cart.map((list) => (
        <div key={list.id}>
          <img
            class="img-fluid"
            src={list.image}
            alt="image_of_product"
            width={150}
          />
          {list.title}  ${list.price}    X{howManyofThis(list.id)}
        </div>
      ));
    const onSubmit = data => {
      console.log(data); // log all data
      console.log(data.fullName); // log only fullname
      // update hooks
      setDataF(data);
      setViewer(data.viewer = 2);
    }
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
            <div>
                
                {cartItems}
            </div>
        <div className="form-group">
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name" className="form-control"
          />
          {errors.fullName && <p className="text-danger">Full Name is required.</p>}
          </div>
          <div className="form-group">
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email" className="form-control"
          />
          {errors.email && <p className="text-danger">Email is required.</p>}
          </div>
          <div className="form-group">
          <input
            {...register("creditCard", { required: true })}
            placeholder="Credit Card" className="form-control"
          />
          {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
          </div>
          <div className="form-group">
          <input
            {...register("address", { required: true })}
            placeholder="Address" className="form-control"
          />
          {errors.address && <p className="text-danger">Address is required.</p>}
          </div>
          <div className="form-group">
          <input {...register("address2")} placeholder="Address 2"  className="form-control"/>
          <input {...register("city", { required: true })} placeholder="City" className="form-control" />
          {errors.city && <p className="text-danger">City is required.</p>}
          </div>
          <div className="form-group">
          <input
            {...register("state", { required: true })}
            placeholder="State" className="form-control"
          />
          {errors.state && <p className="text-danger">State is required.</p>}
          </div>
          <div className="form-group">
          <input {...register("zip", { required: true })} placeholder="Zip" className="form-control" />
          {errors.zip && <p className="text-danger">Zip is required.</p>}
          </div>
          <button type="submit" className=
"btn btn-primary">Submit</button>
<button onClick={updateHooks} type="button" className="btn btn-secondary">Return</button>
        </form>
      </div>
    );
  }
  function Summary() {
   
    const cartItems = cart.map((list) => (
        <div key={list.id}>
          <img
            class="img-fluid"
            src={list.image}
            alt="image_of_product"
            width={150}
          />
          {list.title}   X{howManyofThis(list.id)}
        </div>
      ));
    return (
      <div style={{textAlign : "center"}}>
        <h1>Congragulations your order has been placed!</h1>
        <h2>Order summary:</h2>
        <div>
                
                {cartItems}
            </div>
        <h3>{dataF.fullName}</h3>
        <p>{dataF.email}</p>
        <p>{dataF.creditCard}</p>
        <p>{dataF.address}</p>
        <p>
          {dataF.city},{dataF.state} {dataF.zip}{" "}
        </p>
        
        <button onClick={updateHooks} className=
"btn btn-secondary">Return to shop.</button>
      </div>
    );
  }
  return (
    <div>
    {viewer === 0 && <ListView />}
     {viewer === 1 && <PaymentView />}
     {viewer === 2 && <Summary />}
    </div>
  );
}
export default App;

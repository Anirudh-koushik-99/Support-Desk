import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const{ isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() =>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess){
      dispatch(reset())
      navigate('/tickets')
    }
    dispatch(reset())
  },[isError, dispatch, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({product, description}))
  };

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <BackButton url={'/'}/>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input className="form-control" type="text" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input className="form-control" type="email" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea name="description" id="description" className="form-control" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;

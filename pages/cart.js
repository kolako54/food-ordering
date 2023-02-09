import styles from "../styles/Cart.module.css";
import Image from "next/image";
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react';
import {useRouter} from "next/router";
import axios from 'axios'
import { reset } from "@/redux/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const [checkout, setCheckout] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch()
  const [alertInput, setAlertInput] = useState([])
  const [details, setDetails] = useState({
    method: '',
    status: '',
    address: '',
    total: '',
    customer: ''
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setDetails(prev => ({...prev, [name]: value}))

  }
  const handleClick = async () => {
    if (!details.method || !details.status || !details.address || !details.total || !details.customer) {
        setAlertInput('fill all the inputs')
    } else {
      setAlertInput('')
      try {
        const order = await axios.post('http://localhost:3000/api/order', details);
        dispatch(reset())
        order.status === 201 && router.push(`/order/${order.data._id}`);
      } catch (err) {
        console.log(err);
      }

    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart.products.map((product) => (

          <tr className={styles.tr} key={product._id}>
            <td>
              <div className={styles.imgContainer}>
                <Image
                  src={product.img}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </td>
            <td>
                <span className={styles.name}>{product.title}</span>
            </td>
            <td>
              <span className={styles.extras}>
                  {
                    product.extra.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))
                }
              </span>
            </td>
            <td>
                <span className={styles.price}>{product.price}</span>
            </td>
            <td>
                <span className={styles.quantity}>{product.quantity}</span>
            </td>
            <td>
                <span className={styles.total}>${product.quantity * product.price}</span>
            </td>
          </tr>
          ))}
        </table>
      </div>
      <div className={styles.right}>
        { !checkout &&
          <div className={styles.wrapper}>
            <h2 className={styles.title}>CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>${cart.total}
            </div>
          </div>
        }
          <div className={styles.wrapper}>
            <div className={styles.add} style={{display: 'flex', justifyContent: 'space-around', margin: '10px'}}>
              <label for="customer">customer</label>
              <input type="text" id="customer" name="customer" style={{ width: '15em' }} onChange={handleChange} />
            </div>
            <div className={styles.add} style={{display: 'flex', justifyContent: 'space-around', margin: '10px'}}>
              <label for="address">address</label>
              <input type="text" id="address" name="address" onChange={handleChange} style={{width: '15em'}}/>
            </div>
            <div className={styles.add} style={{display: 'flex', justifyContent: 'space-around', margin: '10px'}}>
              <label for="total">total</label>
              <input type="number" name="total" id="total" style={{ width: '15em' }} onChange={handleChange} />
            </div>
            <div className={styles.add} style={{display: 'flex', justifyContent: 'space-around', margin: '10px'}}>
              <label for="status">status</label>
              <input name="status" type="number" id="status" style={{ width: '15em' }} onChange={handleChange} />
            </div>
            <div className={styles.add} style={{display: 'flex', justifyContent: 'space-around', margin: '10px'}}>
              <label for="methodval">method</label>
              <input name="method" type="number" id="methodval" style={{ width: '15em' }} onChange={handleChange} />
              </div>
          <button className={styles.button} onClick={handleClick}> CHECKOUT NOW!</button>
                <h4 style={{textAlign: 'center', color: '#b7903c', margin: '10px 0'}}>{alertInput}</h4>

          </div>

      </div>
    </div>
  );
};

export default Cart;
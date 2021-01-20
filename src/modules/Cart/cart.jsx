import {FaMinusCircle} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {removeFromCart} from '../../redux/ProductReducer/product.actions';
export const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {userInfo} = useSelector(state => state.auth);
    const {Items, totalQty, totalPrice} = useSelector(state => state.products);
    
    // console.log(userInfo);
    // console.log(Items);
    // console.log(totalPrice);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }


    return <>
      <div className="container">
         <p className="text-lg font-sans text-gray-600 w-4/5 my-8 mx-auto">Cart Items({totalQty})</p>
         <div className="my-4 mx-auto w-4/5">
            {Items.length > 0 ? Items.map((v, i) => 
                <div key={v.id} className="my-3 shadow bg-white border border-gray-300 rounded-sm p-3 grid grid-cols-4">
                  <p>Item : {v.title}</p>
                  <p className="flex items-center justify-center">Price : {v.price} INR</p>
                  <p className="flex items-center justify-center">Quantity : {v.qty}</p>
                  <div className="flex items-center justify-center">
                  <div 
                  onClick={() => removeFromCartHandler(v.id)}
                  className="flex justify-evenly items-center ring-1 ring-red-300 rounded-sm h-8 w-24 cursor-pointer active:opacity-80 active:ring-4 select-none">
                      <FaMinusCircle size={"1.2em"} className="text-red-600"/>
                      <p className="ml-1">Remove</p>
                  </div>
                  </div>
                </div>
            ) : <div className="w-full h-60 bg-gray-200 grid place-content-center text-lg text-gray-600 font-sans select-none">
                 <div>
                 Cart is empty.  Please add something. <span className="py-1 px-2 text-sm cursor-pointer active:opacity-60 hover:bg-purple-500 hover:text-white uppercase ring-2 ring-purple-500 rounded-sm" onClick={() => {
                     history.push('/products');
                 }}> Go to Product Page</span> 
                 </div>
            </div> }
            
         </div>
         {Items.length > 0 && <div className="w-4/5 mt-2 mx-auto bg-white ring-1 ring-gray-200 rounded-sm p-2 shadow">
               Total Price <strong>{totalPrice}</strong>
             </div>}
      </div>
    </>
}

// category: "men clothing"
// description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket."
// id: 2
// image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
// price: 22.3
// qty: 1
// title: "Mens Casual Premium Slim Fit T-Shirts "
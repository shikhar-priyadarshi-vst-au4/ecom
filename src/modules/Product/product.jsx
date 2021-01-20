import {useEffect, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, addToCart} from "../../redux/ProductReducer/product.actions";
import {BsFillBucketFill} from 'react-icons/bs';
import {BiUserCircle, BiPlus} from 'react-icons/bi';
import {AlertContext} from '../../components/alert';

export const Product = () => {
    const dispatch = useDispatch();
    const {onAlert} = useContext(AlertContext);
    const {auth, products : {products}} = useSelector(state =>  state)
    
    useEffect(() => {
      dispatch(getProducts());
    },[])
    console.log(auth, products);

    const addToCartHandler = (item) => {
        onAlert({
            type : "SUCCESS",
            title : "Cart Status",
            message : "Item is added in cart successfully."
        })
        dispatch(addToCart(item));
    }

    return <>
    <div className="h-screen w-full bg-gray-50">
         {/* <header className="flex justify-between items-center ring-1 ring-gray-400 shadow-md h-16">
             <div className="text-2xl text-purple-600 ring-1 ring-purple-400 ml-4 p-2 italic rounded-full flex items-center">ECOM <BsFillBucketFill/></div>
             <div className="flex justify-start items-center mx-4 space-x-4">
                 <div className="text-purple-600 ring-2 ring-purple-200 rounded-full p-2 flex items-center">
                     <BiUserCircle size="1.6em"/>
                     Shikhar@gmail.com</div>
                 <div className=" bg-purple-200 py-2 px-4 text-purple-600 rounded-lg">Cart 0</div>
                 <div className="ring-2 ring-purple-600 rounded-md py-2 px-4 hover:bg-purple-600 hover:text-purple-100 active:opacity-50 font-semibold cursor-pointer ">LOGOUT</div>
             </div>
             <div className="lg:hidden">
                 
             </div>
         </header> */}
         <section className="mt-10 px-8">
             <p className="text-lg font-sans font-medium">List of products ({products.length})</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-4">
                 {
                     products.map((v,i) => <div key={v.id} className="bg-gray-50 w-60 h-96 mx-auto ring-1 ring-gray-200 relative">
                         <img className="h-56 w-60 mx-auto" src={v.image} alt="N/A"/>
                         <small className="user-select-none p-1 m-2 inline-block ring-1 ring-gray-500 font-semibold tracking-wide bg-yellow-400 capitalize rounded">{v.category}</small>
                         <p className="user-select-none mx-2 text-sm font-sans truncate">{v.title}</p>
                         <div className="user-select-none mx-2 mt-4 flex justify-between absolute w-11/12 bottom-2 left-0">
                           {/* {v.description} */}
                           <div className="text-base lining-nums  font-sans">
                           &#x20B9;{v.price}
                           </div>
                           <div 
                           onClick={() => addToCartHandler(v)}
                           className="w-24 h-10 cursor-pointer hover:opacity-75 rounded ring-1 bg-purple-600 ring-purple-400 flex justify-start items-center px-2">
                             <BiPlus size={"1em"} className="text-white"/>
                             <div className="text-sm text-white mx-1">Add Cart</div>        
                           </div>
                         </div>
                     </div>)
                 }
             </div>
         </section>
    </div>
    </>
}



// category: "men clothing"
// description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
// id: 1
// image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
// price: 109.95
// title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
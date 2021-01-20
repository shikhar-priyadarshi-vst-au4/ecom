
import {BrowserRouter, Switch, Route, Redirect, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {BsFillBucketFill} from 'react-icons/bs';
import {BiUserCircle} from 'react-icons/bi';

import {Account} from './modules/Account/account';
import {Product} from './modules/Product/product';
import {Cart} from './modules/Cart/cart';
import {AuthRoute} from './hoc/Auth';
import {signOut} from './firebase';
import {AlertControl} from './components/alert';
import './App.css';


function App() {
  
  

  return <>
  <AlertControl>
  <BrowserRouter basename="/ecom">
     <Switch>
       <Route exact path="/account" component={Account}/>
       <HeaderWrapper>
         <Switch>
          <AuthRoute exact path="/products" component={Product}/>
          <AuthRoute exact path="/cart" component={Cart}/>
          <Route exact path="*" render={() => <Redirect to="/account"/>}/>
         </Switch>
       </HeaderWrapper>
       <Route exact path="*" render={() => <Redirect to="/account"/>}/>
     </Switch>
  </BrowserRouter>
  </AlertControl>
  </>
}

export default App;

const HeaderWrapper = ({children}) => {
   const history = useHistory();
   const auth = useSelector(state => state.auth);
   const products = useSelector(state => state.products);
  //  console.log("auth =>", auth);
  //  console.log("products =>", products);

  const signOutHandler = () => {
    signOut();
  }

  return <>
  <header className="flex justify-between items-center ring-1 ring-gray-400 shadow-md h-16">
             <div className="text-2xl text-purple-600 ring-1 ring-purple-400 ml-4 p-2 italic rounded-full flex items-center">ECOM <BsFillBucketFill/></div>
             <div className="flex justify-start items-center mx-4 space-x-4">
                 <div className="text-purple-600 ring-2 ring-purple-200 rounded-full p-2 flex items-center">
                     <BiUserCircle size="1.6em"/>
                     {auth?.userInfo?.email}
                     </div>
                 <div className=" bg-purple-200 py-2 px-4 text-purple-600 rounded-lg cursor-pointer" onClick={() => {
                  history.push("/cart");
                 }}>Cart {products.totalQty}</div>
                 <div className="ring-2 ring-purple-600 rounded-md py-2 px-4 hover:bg-purple-600 hover:text-purple-100 active:opacity-50 font-semibold cursor-pointer" onClick={() => signOutHandler()}>LOGOUT</div>
             </div>
             <div className="lg:hidden">
                 
             </div>
         </header>
         {children}
  </>
}
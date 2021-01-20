import {useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuthenticated } from '../firebase';
import {SETUSER} from '../redux/AuthReducer/auth.actions'
import {resetCart} from '../redux/ProductReducer/product.actions';


export const AuthRoute = ({component : Component, ...rest}) => {
    // let user = localStorage.getItem("access_token");
    const [status, setStatus] = useState("loading");
    const dispatch = useDispatch();
    // useEffect(() => {
        isAuthenticated().onAuthStateChanged((user) => {
            if(!!user){
                user?.getIdTokenResult().then(res => {
                    console.log(res);
                    if(res.token){
                        let persistRoot = localStorage.getItem('persist:root'); 
                        if(!!persistRoot){
                            let persistData = JSON.parse(JSON.parse(persistRoot).auth)?.userInfo?.email;
                            console.log(user.email, persistData);
                            if( !!persistData && user.email!== persistData){
                                dispatch(resetCart());
                            }
                        }
                        dispatch(SETUSER({
                            name : user.displayName,
                            email : user.email,
                            emailVerified : user.emailVerified,
                            uid : user.uid    
                        }))
                        setStatus("success");
                        
                    }
                    
                })
            }
            else{
                setStatus("error")
            }
        }); 
    // }, [])
    console.log("user status", status);
    
    return <Route {...rest} render={(props) => status === "loading"? <>Loading</> : status === "success" ? <Component {...props}/> : <Redirect to={{
        pathname : "/login",
        state : { from : props.location }
    }} />}/>
}


  
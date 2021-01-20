import {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, isAuthenticated} from '../../firebase';
import {SETUSER} from '../../redux/AuthReducer/auth.actions';
import {AlertContext} from '../../components/alert';

export const Account = () => {

  const [state, setState] = useState({
      email : "",
      password : ""
  })
  const [toggle, setToggle] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const {onAlert} = useContext(AlertContext);
//   const selector = useSelector(state => state.auth);
//   console.log(selector);
  useEffect(() => {
      let timer;
      isAuthenticated().onAuthStateChanged((user) => {
        if(!!user){
            user.getIdTokenResult().then(res => {
                if(res.token){
                    localStorage.setItem('access_token', res.token);
                    dispatch(SETUSER({
                        name : user.displayName,
                        email : user.email,
                        emailVerified : user.emailVerified,
                        uid : user.uid    
                    }))
                        history.push('/products');
                }
            })
        }
      })

      return () => {
          clearTimeout(timer);
      }
  },[])

  const alertHandler = (payload) => {
    onAlert(payload);
  }
  
  const changeHandler = (e) => { setState({...state, [e.target.name] : e.target.value }); }
  const onRegister = () => {
      console.log(state)
      createUserWithEmailAndPassword(state.email, state.password, alertHandler);
      setState({
          email : "",
          password : ""
      })
    }

  const onLogin = () => {
      console.log(state);
      signInWithEmailAndPassword(state.email, state.password, alertHandler);
  }  

//   console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth));
  return <>
      <div className="h-screen bg-purple-500 grid">
         <div className="w-80 pt-6 pb-8 m-auto bg-white rounded-md">
            <div className="text-xl text-center text-gray-500 font-medium p-4">
                {toggle === 0 ? "Create ECOM Account" : "Login ECOM Account"}
            </div>
            <div className="flex w-64 h-8 mx-auto my-4 ring-2 ring-gray-400 rounded items-center">
                <div className={`w-1/2 cursor-pointer text-center ${toggle === 0 ? "text-white z-50" : ""}`} onClick={() => setToggle(0)}>Register</div>
                <div className={`w-1/2 cursor-pointer text-center ${toggle === 1 ? "text-white z-50" : ""}`} onClick={() => setToggle(1)}>Login</div>
                <div className={`absolute w-32 transform transition-all ${toggle === 0 ? "rounded-l-sm" : "translate-x-32 rounded-r-sm"} h-8 bg-purple-700 z-0`}></div>
            </div>
            <div className="grid grid-cols-1 gap-4 px-4">
                <div className="flex flex-col">
                    <label>Email Id</label>
                    <input 
                        type="text" 
                        className="px-2 my-2 h-10 focus:outline-none focus:ring-purple-500 ring-gray-300 ring" 
                        placeholder="Enter your email id" 
                        name="email"
                        value={state.email}
                        onChange={changeHandler}
                        />
                </div>
                <div className="flex flex-col">
                    <label>Password</label>
                    <input 
                        type="text" 
                        className="px-2 my-2 h-10 focus:outline-none focus:ring-purple-500 ring-gray-300 ring" 
                        placeholder="Enter your password" 
                        name="password" 
                        value={state.password}
                        onChange={changeHandler}
                    />
                </div>
                <div className="mt-6">
                    <div className="h-10 cursor-pointer uppercase active:opacity-50 bg-purple-600 flex justify-center items-center text-white rounded" onClick={() => {
                        toggle === 0 ? onRegister() : onLogin();
                    }}>
                       {toggle === 0 ? "REGISTER" : "LOGIN"}
                    </div>
                </div>
            </div>
            {toggle === 0 ?  
            <small className="mx-4 user-select-none">
                Have an account? <strong className="p-2 text-purple-600 cursor-pointer hover:opacity-80 user-select-none active:opacity-50" onClick={() => setToggle(1)}>Login</strong>
            </small>
            : <small className="mx-4 user-select-none">
            Don't have an account? <strong className="p-2 text-purple-600 cursor-pointer hover:opacity-80 user-select-none active:opacity-50" onClick={() => setToggle(0)}>Register</strong>
        </small>}
         </div>
      </div>
    </>
}
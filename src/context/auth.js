import React, {createContext, useReducer} from 'react';
import jwtDecode from 'jwt-decode';

const initialUser = {
    user: null
};

if(localStorage.getItem("jwtToken")) {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now) {
        localStorage.removeItem("jwtToken");
    }
    else {
        initialUser.user = decodedToken;
    }
}


const AuthContext = createContext({
    user: initialUser.user,
    login: (userData) => {},
    logout: () => {}
});

const AuthReducer = (state, action) => {
    // console.log(action)
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state, 
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default: 
            return state;
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, initialUser);

    const login = (userData) => {
        localStorage.setItem("jwtToken", userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
        dispatch({ type: 'LOGOUT' });
    }
    
    return (
        <AuthContext.Provider 
            value = {{ user: state.user, login, logout}}
            {...props}
        />
    )
}

export {AuthContext, AuthProvider};



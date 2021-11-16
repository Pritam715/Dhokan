export const BuyNow = ({ id, data }) => {

    return {

        type: "BUY_NOW",
        payload: { id, data },


    }
}



export const AddToCart = ({ id, data }) => {

    return {

        type: "ADD_TO_CART",
        payload: { id, data },


    }
}

export const Buynow = ({ id, data }) => {

    return {

        type: "BUY_NOW",
        payload: { id, data },


    }
}

export const Increment = ({ id, c }) => {

    return {
        type: "INC",
        payload: { id, c }
    }
}


export const Decrement = ({ id, c }) => {

    return {
        type: "DEC",
        payload: { id, c }
    }
}

export const Delete = ({ id, c }) => {

    return {
        type: "DELETE",
        payload: { id, c }
    }
}

// Auth
export const Login = ({ token, user }) => {
    return {
        type: "LOGIN",
        payload: { token, user }
    }
}
export const Logout = ({ token, user }) => {
    return {
        type: "LOGOUT",
        payload: { token, user }
    }
}
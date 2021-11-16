


const initialState =
{
    token: null,
    user: null,
}
export const AuthReducer = (state = initialState, { type, payload }) => {
    const { token, user } = state;
    let t;
    let u;


    switch (type) {

        case 'LOGIN':

            t = payload.token;
            u = payload.user;
            return { token: t, user: u };
            break;

        case 'LOGOUT':

            t = payload.token;
            u = payload.user;
            return { token: t, user: u };
            break;


        default:
            return state;
    }

};
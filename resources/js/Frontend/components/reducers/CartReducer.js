


const initialState =
{
    shoppingCart: [],
    totalPrice: 0,
    qty: 0,
    error: null
}
export const cartReducer = (state = initialState, { type, payload }) => {
    const { shoppingCart, totalPrice, qty } = state;
    let product;
    let index;
    let updatedPrice;
    let updatedQty;
    switch (type) {


        case 'BUY_NOW':
            const checked = shoppingCart.find(product => product.product_id === payload.id);
            if (checked) {
                return { ...state, error: 'error' };
            }
            else {
                product = payload.data;
                updatedQty = qty + product.product_quantity;
                updatedPrice = totalPrice + (product.product_price * product.product_quantity);
                return { shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, qty: updatedQty };

            }
            break;

        case 'ADD_TO_CART':
            const check = shoppingCart.find(product => product.product_id === payload.id);
            if (check) {
                return { ...state, error: 'error' };
            }
            else {
                product = payload.data;
                updatedQty = qty + product.product_quantity;
                updatedPrice = totalPrice + (product.product_price * product.product_quantity);
                return { shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, qty: updatedQty };

            }
            break;
        case 'INC':
            product = payload.c;
            if (product.product_quantity != 5) {
                product.product_quantity = product.product_quantity + 1;
                updatedPrice = totalPrice + product.product_price;
                updatedQty = qty + 1;
                index = shoppingCart.findIndex(c => c.product_id === payload.id);
                shoppingCart[index] = product;
                return { shoppingCart: [...shoppingCart], totalPrice: updatedPrice, qty: updatedQty }
            }
            else {
                return state;
            }
            break;


        case 'DEC':
            product = payload.c;
            if (product.product_quantity > 1) {
                product.product_quantity = product.product_quantity - 1;
                updatedPrice = totalPrice - product.product_price;
                updatedQty = qty - 1;
                index = shoppingCart.findIndex(c => c.product_id === payload.id);
                shoppingCart[index] = product;
                return { shoppingCart: [...shoppingCart], totalPrice: updatedPrice, qty: updatedQty }
            }
            else {
                return state;
            }
            break;


        case 'DELETE':
            const filtred = shoppingCart.filter(product => product.product_id !== payload.id)
            product = payload.c;
            updatedQty = qty - product.product_quantity;
            updatedPrice = totalPrice - product.product_price * product.product_quantity;
            return { shoppingCart: [...filtred], totalPrice: updatedPrice, qty: updatedQty }
            break;



        default:
            return state;
    }

};
import axios from 'axios';


const initialState = {
    user: {},
    colorArr: [],
    makeArr: [],
    modelArr: [],
    yearArr: [],
    inventoryArr:[],
    waitlistArr:[]
}

//action Types go here:
const GET_USER = 'GET_USER';
const GET_COLOR_ARRAY = 'GET_COLOR_ARRAY';



export default function reducer(state = initialState, action) {
    switch (action.type) {
        //Cases go here
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case GET_COLOR_ARRAY:
        return Object.assign({}, state, {colorArr: action.payload})


        default:
            return state;
    }

}
//action creators
export function getUser() {
    let userData = axios.get('/auth/me')
        .then(res => {
            return res.data;
        })
    return {
        type: GET_USER,
        payload: userData
    }
}
export function getColorArr(colorArr) {
    // let currentColors = axios.get('/findcolor')//not confident in this. We need an endpoint to direct the request to the conroller which will need a function to get the data from the db
  
    return{
        type:GET_COLOR_ARRAY,
        payload:colorArr
    }
}
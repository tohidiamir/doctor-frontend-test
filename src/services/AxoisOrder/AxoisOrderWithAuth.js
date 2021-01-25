import axios from 'axios';


const instance = axios.create({
    // baseURL: 'http://easy.sayehost.com/' ,
    baseURL: 'http://localhost:3001/' ,
    // headers: {'Authorization': 'basic '+ ((this.props.isAuthenticated)?this.props.tokenData:'')}
})

// const mapStateToProps = state => {
//     return {
//         tokenData : state.auth.token ,
//         isAuthenticated: state.auth.token !== null
//     }
// }

export default (instance);
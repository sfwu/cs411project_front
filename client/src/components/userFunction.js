import axios from 'axios';

export const profileUpdate = user => {
    return axios
    .post('users/profile', {
        firstName : user.firstName,
        lastName : user.lastName,
        emial : user.email,
        password: user.password,
        netid: user.netid,
    })
    .then(res =>{
        console.log(res)
    })
}

export const login = user => {
    return axios
    .post('users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('userInfo', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}


export async function getLoginInfo() {
    // return 
    let res = await axios.get('http://127.0.0.1:5000/api/find_user')
    let data = res.data
    console.log(data)
    return data
}
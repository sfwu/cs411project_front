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
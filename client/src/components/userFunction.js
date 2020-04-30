import axios from 'axios';


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

export const userRegister = (user) => {
    return fetch("/api/register", {
        method:"POST",
        // cache: "no-cache",
        headers:{
            "content_type":"application/json",
        },
        body:JSON.stringify(user)
        }).then(res => res.json())
}


export const userLogin = (user) => {
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  };


export const profileModify = (user) => {
    return fetch("/api/profile",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
  };


  export const profileUpdate= (user) => {
    return fetch("/api/profile",{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
  };












//   for employment page

  export const employmentAdd= (userEmployment) => {
    return fetch("/api/employment",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmployment),
    })
      .then((res) => res.json())
  };


  export const employmentDelete= (userEmployment) => {
    return fetch("/api/employment",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmployment),
    })
      .then((res) => res.json())
  };

  export const employmentUpdate= (userEmployment) => {
    return fetch("/api/employment",{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEmployment),
    })
      .then((res) => res.json())
  };


  export const employmentGetAll= (user) => {
    return fetch("/api/find_employment",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
  };















  

//   for enrollment page

export const enrollmentAdd= (userEnrollment) => {
    return fetch("/api/enrollment",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEnrollment),
    })
      .then((res) => res.json())
  };


  export const enrollmentDelete= (userEnrollment) => {
    return fetch("/api/enrollment",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEnrollment),
    })
      .then((res) => res.json())
  };

  export const enrollmentUpdate= (userEnrollment) => {
    return fetch("/api/enrollment",{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEnrollment),
    })
      .then((res) => res.json())
  };


  export const enrollmentGetAll= (user) => {
    return fetch("/api/find_enrollment",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
  };

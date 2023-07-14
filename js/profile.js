API.get('auth/me', {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).then(res => {
  
}).catch((err)=>{
  window.location.href="index.html"
})


let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputPhone = document.getElementById("phone");
let inputAddress = document.getElementById("address");


API.get('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    const user = res.data.data;
    inputName.value = user.name
    inputEmail.value = user.email
    inputPhone.value = user.phone
    inputAddress.value = user.address
  })

API.get('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    window.location.href="index.html"
  })

const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formPhone = document.getElementById("phone");
const formAddress = document.getElementById("address")
const formPassword = document.getElementById("loginPassword");
const elRegister = document.getElementById("login-form");

elRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('123');
    const name = formName.value.trim();
    const email = formEmail.value.trim();
    const phone = formPhone.value.trim();
    const address = formAddress.value.trim();
    const password = formPassword.value.trim();
    const elMessage = document.getElementById("message");
    
    API.post('users/register', {
        name,
        email,
        phone,
        address,
        password,
    }).then((res) => {
        console.log('res', res);
        API.post('auth/login', {
            email: email,
            password: password,
        }).then((res) => {
            console.log('res', res);
            
            localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
            window.location.href="index.html";
        })
    }).catch(err => {
        console.log('err', err);
        const errors = err.response.data.errors;
        
        let message = "";
        for(const key in errors){
            message += `<P class=mb-0>${errors[key][0]}</p>`
        }

        elMessage.innerHTML =/*html*/
            `<div class="alert alert-danger alert-icon alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
     })
})




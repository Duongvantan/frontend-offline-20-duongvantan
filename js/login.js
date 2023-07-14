API.get('auth/me', {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).then(res => {
  window.location.href="index.html"
})

// bắt sự kiện submit của login form
// dùng preventDefault để chặn form submit
// lấy giá trị email và password từ form (các ô input)
// gọi api login (auth/login)
// log ra response

const elForm = document.getElementById('login-form');
const elEmail = document.getElementById("loginEmail");
const elPasword = document.getElementById('loginPassword');
const elErr = document.getElementById("error");

//axios.post(url, data);
elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('123');
    
    let email = elEmail.value;
    let password = elPasword.value;

    console.log('email', email);
    console.log('password', password);
    API.post('auth/login', {
        email: email,
        password: password,
    }).then((res) => {
        console.log('res', res);
        
        localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
        window.location.href="index.html";
    }).catch(err => {
        elErr.innerHTML =/*html*/
        `<div class="alert alert-danger alert-icon alert-dismissible fade show" role="alert">
        <i class="uil uil-times-circle"></i> Thông tin đăng nhập không đúng
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
        
        
     })
})
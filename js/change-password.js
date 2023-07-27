// Chức năng thay đổi mật khẩu
// API: /auth/change-password
// Phương thức: PUT
// Data gởi đi: password_current, password, password_confirmation
// Phải kèm theo token khi call api
// Show thông báo khi thành công hoặc khi có lỗi
API.get('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    
  }).catch((err)=>{
    window.location.href="index.html"
  })


let elForm = document.getElementById("login-form");
let elPasswordCurrent = document.getElementById("passwordCurrent");
let elPasswordNew = document.getElementById("passwordNew");
let elRepeatPassword = document.getElementById("repeatPassword");
let elMessage = document.getElementById("error");

elForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let password_current = elPasswordCurrent.value.trim();
    let password = elPasswordNew.value.trim();
    let password_confirmation = elRepeatPassword.value.trim();
    let data = {password_current,password,password_confirmation}
    API.put("/auth/change-password", data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        elMessage.innerHTML=/*html*/
        `<div class="alert alert-success alert-icon alert-dismissible fade show" role="alert">
          <i class="uil uil-times-circle"></i> Thành công
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
      }).catch((err)=>{
        const errors = err.response.data.errors;
          console.log('errors', errors);
          
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
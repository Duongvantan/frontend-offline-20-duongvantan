let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputPhone = document.getElementById("phone");
let inputAddress = document.getElementById("address");
let elForm = document.getElementById("login-form");
let elMessage = document.getElementById("error");


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
  }).catch((err)=>{
    window.location.href="index.html"
  })

// bắt sự kiện submit của form profile
//   lấy giá trị
//   call api
//     dùng phương thức PUT
//     tham số 1: url
//     tham số 2: data -> object -> name, phone, address
//     tham số 3: option -> {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
  // update thành công thì show thông báo thành công -> then
  // nếu lỗi thì show lỗi -> catch
  elForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name = inputName.value;
    let phone = inputPhone.value;
    let address = inputAddress.value;
    API.put("/auth/update",{
      name,
      phone,
      address,
    },{
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
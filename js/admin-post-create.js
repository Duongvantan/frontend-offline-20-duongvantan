// Thêm bài viết mới
// - Trên menu sẽ có thêm một menu "Thêm bài viết"
// - url dẫm đến trang "admin-post-create.html"
// - API: /articles/create
// - data: title, description, content, thumb, category_id
// - Kèm token khi gọi api
// - thông báo
API.get('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    
  }).catch((err)=>{
    window.location.href="index.html"
  })

ClassicEditor.create( document.querySelector('#content') ).catch( error => {console.error(error );} );

let elForm = document.getElementById("login-form");
let elImages = document.getElementById("images");
let elTitle = document.getElementById("title");
let elDescription = document.getElementById("description");
let elCategory = document.getElementById("category_id");
let elContent = document.getElementById("content");
let elMessage = document.getElementById("error");
let elImg = document.getElementById("thumb-preview");
let btnRandomThumb = document.getElementById("random-thumb");

// 0phbjeqQGHggQc2p8M-_Sf-YkVH1reLJodWqDtAIfi4
// OY_GZuq3NGBnLovRwZExtq8btXctxbNeaAG4zhxznBA
// https://api.unsplash.com/photos/random?orientation=landscape&client_id=OY_GZuq3NGBnLovRwZExtq8btXctxbNeaAG4zhxznBA
btnRandomThumb.addEventListener("click",()=>{
  axios.get("https://api.unsplash.com/photos/random?orientation=landscape&client_id=OY_GZuq3NGBnLovRwZExtq8btXctxbNeaAG4zhxznBA")
  .then((res)=>{
    const urlImg = res.data.urls.regular;
    elImg.src=urlImg;
    elImages.value=urlImg;
  })
})

elImages.addEventListener("change",()=>{
    const url = elImages.value.trim();
    elImg.src = url;
})


elForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const data = {
      title: elTitle.value.trim(), 
      description: elDescription.value.trim(), 
      content: elContent.value.trim(), 
      thumb: elImages.value.trim(), 
      category_id: elCategory.value.trim()
    }

    API.post("articles/create", data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        elMessage.innerHTML=/*html*/
        `<div class="alert alert-success alert-icon alert-dismissible fade show" role="alert">
          <i class="fa-solid fa-check"></i> Thành công
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
        // window.location.href = "index.html";
      }).catch((err)=>{
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
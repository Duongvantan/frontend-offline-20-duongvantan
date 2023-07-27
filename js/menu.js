const elNavbar = document.getElementsByClassName("nav-menu");


//Do lỗi font trong bộ gõ, nên chuyển đổi.

const searchForm = document.getElementsByClassName('search-form');

for (let i = 0; i < searchForm.length; i++) {
  searchForm[i].addEventListener('submit', (e) => {
    e.preventDefault();
    const inputKeyword = searchForm[i].querySelector('[name="keyword"]');
    console.log('inputKeyword', inputKeyword.value);
    const value = encodeURIComponent(inputKeyword.value);
    console.log('value', value);
    window.location.href = `search.html?keyword=${value}`;//Chuyển hướng 
  })
}

API.get("categories_news")
  .then((res) => {
    const data = res.data.data;
    renderMenu(data);
  })

document.addEventListener("click",(e)=>{
  const el = e.target;
  if(el.classList.contains("btn-logout")){
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href="index.html"
  }
})

function renderMenu(arrData) {
  let htmlMenu = "";
  let htmlDropMenu = "";

  arrData.forEach((item, index) => {
    if (index <= 2) {
      htmlMenu += /*html*/
        `
            <li class="nav-item">
                <a class="nav-link" href="category.html?id=${item.id}">${item.name}</a>
            </li>
            `
    } else {
      htmlDropMenu += /*html*/
        `
            <li class="nav-item"><a class="dropdown-item" href="category.html?id=${item.id}">${item.name}</a></li>
            `
    }
  });
  let loginName = "";
  API.get('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    console.log(res);

    loginName = res.data.data.name;
  })
    .catch((err) => {

    }).finally(() => {

      let htmlAccount = /*html*/
        `<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Tài khoản</a>
          <ul class="dropdown-menu">
          <li class="nav-item"><a class="dropdown-item" href="login.html">Đăng nhập</a></li>
          <li class="nav-item"><a class="dropdown-item" href="register.html">Đăng ký</a></li>
        </ul>
        </li>`
      if (loginName) {
        htmlAccount =
          `<li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">${loginName}</a>
              <ul class="dropdown-menu">
                <li class="nav-item"><a class="dropdown-item" href="profile.html">Thông tin tài khoản</a></li>
                <li class="nav-item"><a class="dropdown-item" href="change-password.html">Đổi mật khẩu</a></li>
                <li class="nav-item"><a class="dropdown-item" href="admin-post-create.html">Thêm bài viết</a></li>
                <li class="nav-item"><a class="dropdown-item" href="admin-post-management.html">Quản lý bài viết</a></li>
                <li class="nav-item"><a class="dropdown-item btn-logout" href="#">Đăng Xuất</a></li>
              </ul>
            </li>`
      }
      for (let i = 0; i < elNavbar.length; i++) {

        // elNavbar[i].innerHTML = htmlMenu + htmlLi;
        // console.log(elNavbar[i].innerHTML);

        // const elListSelect = document.getElementsByClassName("list-select");

        // elListSelect[i].innerHTML = htmlDropMenu;

        elNavbar[i].innerHTML = htmlMenu + /*html*/`
          <li class="nav-item dropdown nav-select">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh Mục Khác</a>
            <ul class="dropdown-menu list-select">
            ${htmlDropMenu}
            </ul>
          </li>
            ${htmlAccount}
        `;
      }

    })

}

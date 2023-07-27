const elGridView = document.getElementById("grid-view");
const elImageList = document.getElementById("image-list");
const elArticle = document.getElementById("posts");
const elLoadMore = document.getElementById("btn-load-more");
const elReviewed = document.getElementById("article-reviwed");
let currentPage = 1;

// fetch("https://apiforlearning.zendvn.com/api/v2/categories_news")
//   .then((response) => response.json())
//   .then((res) => {
//     let data = res.data;
//     let htmlMenu = "";
//     let htmlDropMenu = "";
//     let htmlLi = "";

//     htmlLi = `
//                 <li class="nav-item dropdown nav-select">
//                   <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh Mục Khác</a>
//                   <ul class="dropdown-menu list-select">
//                   </ul>
//                 </li>
//               `;

//     data.forEach((item, index) => {
//       if (index <= 2) {
//         htmlMenu += /*html*/
//           `
//                 <li class="nav-item">
//                     <a class="nav-link" href="#">${item.name}</a>
//                 </li>
//                 `
//       } else {
//         htmlDropMenu += /*html*/
//           `
//                 <li class="nav-item"><a class="dropdown-item" href="#">${item.name}</a></li>
//                 `
//       }
//     });

//     for (let i = 0; i < elNavbar.length; i++) {

//       // elNavbar[i].innerHTML = htmlMenu + htmlLi;
//       // console.log(elNavbar[i].innerHTML);

//       // const elListSelect = document.getElementsByClassName("list-select");

//       // elListSelect[i].innerHTML = htmlDropMenu;
//       elNavbar[i].innerHTML = htmlMenu + /*html*/`
//             <li class="nav-item dropdown nav-select">
//               <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh Mục Khác</a>
//               <ul class="dropdown-menu list-select">
//               ${htmlDropMenu}
//               </ul>
//             </li>
//           `;
//     }
//   })



//===========ARTICLE TOP BOTTOM===================//
API.get("articles/popular?limit=7")
  .then((res) => {
    console.log('res', res);
    
    let data = res.data.data;
    console.log('data', data);
    let dataTop = data.slice(0, 2);
    let dataDown = data.slice(2);

    renderArticleTop(dataTop);
    renderArticleDown(dataDown);
  })

// API.get("articles?limit=4")
//   .then((res) => {
//     let data = res.data.data;
//     renderArticleLatest(data)
//   })
fetchArticleLatest(page = 1)
renderArticleReviewed()
elLoadMore.addEventListener("click", () => {
  elLoadMore.innerText = "Đang Tải...."
  elLoadMore.disabled = true;
  currentPage++;
  fetchArticleLatest(currentPage);
})

function renderArticleTop(arrData) {
  let htmlUp = "";
  arrData.forEach((item) => {
    let publishDate = dayjs(item.publish_date).fromNow();
    // let publishDate = item.publish_date;
    // let date = moment(publishDate, "YYYY-MM-DD");
    // console.log(date.fromNow());

    htmlUp += /*html*/
      `
            <div class="col-lg-6 mb-4">
            <figure class="overlay caption caption-overlay rounded mb-0 h-100"><a href="detail.html?id=${item.id}" class="h-100"> <img class="h-100"
                  src="${item.thumb}" alt="" /></a>
              <figcaption style="background: rgba(0, 0, 0, 0.5)">
                <span class="badge badge-lg bg-white text-uppercase mb-3">${item.category.name}</span>
                <h2 class="post-title h3 mt-1 mb-3"><a href="detail.html?id=${item.id}">${item.title}</a></h2>
                <ul class="post-meta text-white mb-0">
                  <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publishDate}</span></li>
                  <li class="post-author"><a href="#"><i class="uil uil-user"></i><span>By ${item.author}</span></a></li>
                  <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${item.views}<span> Comments</span></a></li>
                </ul>
              </figcaption>
            </figure>
          </div>
            `
  })
  elGridView.innerHTML = htmlUp;
}

function renderArticleDown(arrData) {
  let htmlDown = "";
  arrData.forEach((item) => {
    let publishDate = dayjs(item.publish_date).fromNow();
    // let publishDate = item.publish_date;
    // let date = moment(publishDate, "YYYY-MM-DD");
    // console.log(date.fromNow());
    htmlDown += /*html*/
      `
            <li>
              <figure class="rounded"><a href="detail.html?id=${item.id}"><img src="${item.thumb}" alt="" /></a>
              </figure>
              <div class="post-content">
                <h6 class="mb-2"> <a class="link-dark line-clamp line-clamp-1" title="${item.title}" href="detail.html?id=${item.id}">${item.title}</a> </h6>
                <ul class="post-meta">
                  <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publishDate}</span></li>
                  <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${item.views}</a></li>
                </ul>
                <!-- /.post-meta -->
              </div>
            </li>
              `
  })
  elImageList.innerHTML = htmlDown;
}

function renderArticleLatest(arrData) {
  let html = "";
  arrData.forEach((item) => {
    let publishDate = dayjs(item.publish_date).fromNow();
    // let publishDate = item.publish_date;
    // let date = moment(publishDate, "YYYY-MM-DD");
    // console.log(date.fromNow());
    html +=/*html*/
      `
            <article class="item post col-md-6">
            <div class="card shadow-lg h-100">
              <figure class="card-img-top overlay overlay-1"><a href="detail.html?id=${item.id}"> <img src="${item.thumb}"
                    alt="" /></a>
                <figcaption>
                  <h5 class="from-top mb-0">Read More</h5>
                </figcaption>
              </figure>
              <div class="card-body">
                <div class="post-header">
                  <div class="post-category">
                    <a href="detail.html?id=${item.id}" class="hover link-yellow" rel="category">${item.category.name}</a>
                  </div>
                  <!-- /.post-category -->
                  <h2 class="post-title h3 mt-1 mb-3"><a class="link-navy" href="detail.html?id=${item.id}">${item.title}</a></h2>
                </div>
                <!-- /.post-header -->
                <div class="post-content">
                  <p class="line-clamp line-clamp-4">${item.description}</p>
                </div>
                <!-- /.post-content -->
              </div>
              <!--/.card-body -->
              <div class="card-footer">
                <ul class="post-meta d-flex mb-0">
                  <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publishDate}</span></li>
                  <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${item.views}</a></li>
                  <li class="post-likes ms-auto"><a href="#"><i class="uil uil-heart-alt"></i>5</a></li>
                </ul>
                <!-- /.post-meta -->
              </div>
              <!-- /.card-footer -->
            </div>
            <!-- /.card -->
          </article>
            `
  })
  elArticle.innerHTML += html;
}

function fetchArticleLatest(page = 1) {
  API.get(`articles?limit=4&page=${page}`)
    .then((res) => {
      let data = res.data.data;
      if (currentPage === 1) elArticle.innerHTML = "";
      renderArticleLatest(data);
      elLoadMore.innerText = "Xem Thêm";
      elLoadMore.disabled = false;
    })
}

function renderArticleReviewed(){
  const ARTICLES_VIEWED = JSON.parse(localStorage.getItem("ARTICLES_VIEWED")) || [];
  let html="";
  ARTICLES_VIEWED.forEach(article=>{
    html+=`<li><a href="detail.html?id=${article.id}" class="link-dark line-clamp line-clamp-1" title="${article.title}">${article.title}</a></li>`
  })
  elReviewed.innerHTML = html;
}
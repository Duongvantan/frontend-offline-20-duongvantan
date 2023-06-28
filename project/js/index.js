const elNavbar = document.getElementsByClassName("nav-menu");
const elGridView = document.getElementById("grid-view");
const elImageList = document.getElementById("image-list");
const elArticle = document.getElementById("posts");
fetch("https://apiforlearning.zendvn.com/api/v2/categories_news")
    .then((response) => response.json())
    .then((res) => {
        let data = res.data;
        let htmlMenu = "";
        let htmlDropMenu = "";
        let htmlLi = "";

        htmlLi = `
                <li class="nav-item dropdown nav-select">
                  <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Other Menu</a>
                  <ul class="dropdown-menu list-select">
                  </ul>
                </li>
              `;
        
        data.forEach((item, index) => {
            if (index <= 2) {
                htmlMenu +=
                    `
                <li class="nav-item">
                    <a class="nav-link" href="#">${item.name}</a>
                </li>
                `
            } else {
                htmlDropMenu +=
                    `
                <li class="nav-item"><a class="dropdown-item" href="#">${item.name}</a></li>
                `
            }
        });

        for (let i = 0; i < elNavbar.length; i++) {

            elNavbar[i].innerHTML = htmlMenu + htmlLi;
            console.log(elNavbar[i].innerHTML);

            const elListSelect = document.getElementsByClassName("list-select");

            elListSelect[i].innerHTML = htmlDropMenu;
        } 
    })

fetch("https://apiforlearning.zendvn.com/api/v2/articles/popular?limit=7")
    .then((response) => response.json())
    .then((res) => {
        let data = res.data;
        let htmlUp = "";
        let htmlDown = "";
        data.forEach((item, index) => {
            if (index <= 1) {
                htmlUp += `
            <div class="col-lg-6 mb-4">
            <figure class="overlay caption caption-overlay rounded mb-0"><a href="#"> <img
                  src="${item.thumb}" alt="" /></a>
              <figcaption>
                <span class="badge badge-lg bg-white text-uppercase mb-3">Places</span>
                <h2 class="post-title h3 mt-1 mb-3"><a href="./blog-post.html">${item.title}</a></h2>
                <ul class="post-meta text-white mb-0">
                  <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${item.publish_date}</span></li>
                  <li class="post-author"><a href="#"><i class="uil uil-user"></i><span>By ${item.author}</span></a></li>
                  <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${1}<span> Comments</span></a></li>
                </ul>
              </figcaption>
            </figure>
          </div>
            `
            } else {
                htmlDown += `
            <li>
            <figure class="rounded"><a href="./blog-post.html"><img src="${item.thumb}" alt="" /></a>
            </figure>
            <div class="post-content">
              <h6 class="mb-2"> <a class="link-dark" href="./blog-post.html">${item.title}</a> </h6>
              <ul class="post-meta">
                <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${item.publish_date}</span></li>
                <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${item.status}</a></li>
              </ul>
              <!-- /.post-meta -->
            </div>
          </li>
            `
            }
        })
        elImageList.innerHTML = htmlDown;
        elGridView.innerHTML = htmlUp;

    })

fetch("https://apiforlearning.zendvn.com/api/v2/articles?limit=4")
    .then((response) => response.json())
    .then((res) => {
        let data = res.data;
        let html = "";
        data.forEach((item) => {
            html +=
                `
            <article class="item post col-md-6">
            <div class="card shadow-lg">
              <figure class="card-img-top overlay overlay-1"><a href="#"> <img src="${item.thumb}"
                    alt="" /></a>
                <figcaption>
                  <h5 class="from-top mb-0">Read More</h5>
                </figcaption>
              </figure>
              <div class="card-body">
                <div class="post-header">
                  <div class="post-category">
                    <a href="#" class="hover link-yellow" rel="category">${item.category.name}</a>
                  </div>
                  <!-- /.post-category -->
                  <h2 class="post-title h3 mt-1 mb-3"><a class="link-navy" href="./blog-post.html">${item.title}</a></h2>
                </div>
                <!-- /.post-header -->
                <div class="post-content">
                  <p>${item.description}</p>
                </div>
                <!-- /.post-content -->
              </div>
              <!--/.card-body -->
              <div class="card-footer">
                <ul class="post-meta d-flex mb-0">
                  <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${item.publish_date}</span></li>
                  <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${item.status}</a></li>
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
        elArticle.innerHTML = html;

    })
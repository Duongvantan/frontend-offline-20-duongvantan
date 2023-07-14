const elArticleCate = document.getElementById("category-ar");
const elPagination = document.getElementById("pagination");
const elH1 = document.getElementById("titleCategory");

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
let currentPage = 1;

//==============Article=============//
fetchArticle();

elPagination.addEventListener("click", (e) => {
  e.preventDefault();
  
  let el = e.target;
  if (el.classList.contains("page-number")) {
    currentPage = parseInt(el.innerText);
    fetchArticle(currentPage);
    window.scrollTo(0, 0);
  }

  if (el.classList.contains("pagePrevious")) {
    currentPage--;
    fetchArticle(currentPage);
    window.scrollTo(0, 0);
  }

  if (el.classList.contains("pageNext")) {
    currentPage++;
    fetchArticle(currentPage);
    window.scrollTo(0, 0)
  }
})

function fetchArticle(page = 1) {
  API.get(`categories_news/${id}/articles?limit=6&page=${page}`)
    .then(res => {
      let data = res.data.data;
      const totalPage = res.data.meta.last_page;
      const title =  res.data.data[0].category.name;
      elH1.innerText = title;
      renderNextPage(totalPage);
      rederArticle(data);
    })
}
function rederArticle(arrData) {
  let html = "";
  arrData.forEach(item => {
    let publishDate = dayjs(item.publish_date).fromNow();
    // let publishDate = item.publish_date;
    // let date = moment(publishDate, "YYYY-MM-DD");
    // console.log(date.fromNow());
    html += /*html*/
      `
        <article class="item post col-md-6 col-lg-4">
                  <div class="card h-100">
                    <figure class="card-img-top overlay overlay-1 hover-scale">
                      <a href="#">
                        <img src="${item.thumb}" alt="" />
                      </a>
                      <figcaption>
                        <h5 class="from-top mb-0">Read More</h5>
                      </figcaption>
                    </figure>
                    <div class="card-body">
                      <div class="post-header">
                        <!-- /.post-category -->
                        <h2 class="post-title h3 mt-1 mb-3"><a class="link-dark" href="./blog-post.html">${item.title}</a></h2>
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
                        <li class="post-likes ms-auto"><a href="#"><i class="uil uil-heart-alt"></i>${item.status}</a></li>
                      </ul>
                      <!-- /.post-meta -->
                    </div>
                    <!-- /.card-footer -->
                  </div>
                  <!-- /.card -->
        </article>`
  })
  elArticleCate.innerHTML = html;
}

function renderNextPage(totalPage) {
  let previous = currentPage === 1 ? 'disabled' : '';
  let next = currentPage === totalPage ? 'disabled' : '';

  let html = "";
  for (let i = 1; i <= totalPage; i++) {
    const active = currentPage === i ? 'active' : '';
    html += `<li class="page-item ${active}"><a class="page-link page-number " href="#">${i}</a></li>`
  }

  elPagination.innerHTML =/*html*/
    `<li class="page-item ${previous}">
        <a class="page-link pagePrevious" href="#" aria-label="Previous">
         <span aria-hidden="true" class="pagePrevious"><i class="uil uil-arrow-left pagePrevious"></i></span>
        </a>
        </li>`+
    html
    /*html*/
    + ` <li class="page-item ${next}">
                <a class="page-link pageNext" href="#" aria-label="Next">
                <span aria-hidden="true" class="pageNext"><i class="uil uil-arrow-right pageNext"></i></span>
                </a>
            </li>`
}
const params = new URLSearchParams(window.location.search);
const keyWord2 = params.get('keyword');
console.log('keyword2', keyWord2);

const keyWord = encodeURIComponent(params.get('keyword'));
console.log('keyWord', keyWord);
if(!keyWord) window.location.href = "404.html";
//==============Article=============//
fetchArticle();

function fetchArticle(page = 1) {
  API.get(`articles/search?q=${keyWord}&limit=6&page=${page}`)
    .then(res => {
      let data = res.data.data;
      const totalPage = res.data.meta.last_page;
      renderNextPage(totalPage);
      rederArticle(data);
    })
    .catch((err)=>{
      window.location.href = "404.html";
    })
}

function rederArticle(arrData) {
  let html = "";
  arrData.forEach(item => {
    let publishDate = dayjs(item.publish_date).fromNow();
    let description = item.description;
    let title = item.title;
    // let publishDate = item.publish_date;
    if (keyWord2) {
      let patt = new RegExp(keyWord2, 'igm');
      description = description.replace(patt, (match) => {
        return `<mark>${match}</mark>`;
      })
      title = title.replace(patt, (match) => {
        return `<mark>${match}</mark>`;
      })
    }

    // let date = moment(publishDate, "YYYY-MM-DD");
    // console.log(date.fromNow());
    html += /*html*/
      `
          <article class="item post col-md-6 col-lg-4">
                    <div class="card h-100">
                      <figure class="card-img-top overlay overlay-1 hover-scale">
                        <a href="detail.html?id=${item.id}">
                          <img src="${item.thumb}" alt=""/>
                        </a>
                        <figcaption>
                          <h5 class="from-top mb-0">Read More</h5>
                        </figcaption>
                      </figure>
                      <div class="card-body">
                        <div class="post-header">
                          <!-- /.post-category -->
                          <h2 class="post-title h3 mt-1 mb-3"><a class="link-dark" href="detail.html?id=${item.id}">${title}</a></h2>
                        </div>
                        <!-- /.post-header -->
                        <div class="post-content">
                          <p class="line-clamp line-clamp-4">${description}</p>
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

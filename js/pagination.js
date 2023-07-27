const elArticleCate = document.getElementById("category-ar");
const elPagination = document.getElementById("pagination");

let currentPage = 1;
const PAGE_RANGE = 3;
let star = 1;
let end = PAGE_RANGE;


elPagination.addEventListener("click", (e) => {
  e.preventDefault();
  let el = e.target;
  if (el.classList.contains("page-number")) {
    currentPage = parseInt(el.innerText);
    fetchArticle(currentPage);
    // window.scrollTo(0, 0);
  }

  if (el.classList.contains("pagePrevious")) {
    currentPage--;
    if (currentPage % PAGE_RANGE === 0) {
      end = currentPage;
      star = currentPage - PAGE_RANGE + 1;
    }
    fetchArticle(currentPage);
    // window.scrollTo(0, 0)
  }

  if (el.classList.contains("pageNext")) {
    currentPage++;
    // 1  2  3  4  5
    // 6  7  8  9  10
    // 11 12 13 14 15
    // 17 18 19 20 
    if (currentPage % PAGE_RANGE === 1) {
      star = currentPage;
      end = currentPage + PAGE_RANGE - 1;
    }
    fetchArticle(currentPage);
    // window.scrollTo(0, 0)
  }
})

function renderNextPage(totalPage) {
  let previous = currentPage === 1 ? 'disabled' : '';
  let next = currentPage === totalPage ? 'disabled' : '';

  let html = "";
  if (end > totalPage) end = totalPage;
  for (let i = star; i <= end; i++) {
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
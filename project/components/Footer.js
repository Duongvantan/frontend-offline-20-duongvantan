class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /*html*/
            `<footer class="bg-dark text-inverse">
        <div class="container py-6 py-md-10">
          <div class="row gy-6 gy-lg-0">
            <div class="col">
              <div class="widget text-center">
                <h4 class="widget-title text-white mb-3">Thông tin</h4>
                <address>ZendVN - Học lập trình online, offline</address>
                <address>Số 01, Khối A1, Toà nhà Đạt Gia, 43 Đường Cây Keo, Tam Phú, Thủ Đức, Hồ Chí Minh</address>
              </div>
            </div>
          </div>
          <p class="mt-6 mb-0 text-center">© 2023 ZendVN. All rights reserved.</p>
        </div>
      </footer>`
    }
}

customElements.define("zvn-footer", Footer);
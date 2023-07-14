class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /*html*/
            ` <header class="wrapper bg-gray">
            <nav class="navbar navbar-expand-lg center-nav navbar-light navbar-bg-light">
              <div class="container flex-lg-row flex-nowrap align-items-center">
                <div class="navbar-brand w-100">
                  <a href="./index.html">
                    <!-- <img src="./assets/img/logo-dark.png" alt="" /> -->
                    <img src="https://zendvn.com/upload/1/log-zendvn-detail.png" alt="" />
                  </a>
                </div>
                <div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
                  <div class="offcanvas-header d-lg-none">
                    <h3 class="text-white fs-30 mb-0">ZendVN News</h3>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                      aria-label="Close"></button>
                  </div>
                  <div class="offcanvas-body ms-lg-auto d-flex flex-column h-100">
                    <ul class="navbar-nav nav-menu">
                      <li class="nav-item">
                        <a class="nav-link" href="#">Menu 1</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Menu 2</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Menu 3</a>
                      </li>
                      <li class="nav-item dropdown nav-select">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Other Menu</a>
                        <ul class="dropdown-menu list-select">
                          <li class="nav-item"><a class="dropdown-item" href="#">Menu Child 1</a></li>
                          <li class="nav-item"><a class="dropdown-item" href="#">Menu Child 2</a></li>
                          <li class="nav-item"><a class="dropdown-item" href="#">Menu Child 3</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <!-- /.offcanvas-body -->
                </div>
                <!-- /.navbar-collapse -->
                <div class="navbar-other w-100 d-flex ms-auto">
                  <ul class="navbar-nav flex-row align-items-center ms-auto">
                    <li class="nav-item">
                      <form action="search.html" class="search-form">
                        <input type="text" name="keyword" class="form-control"
                          placeholder="Type something to search ..." required="">
                      </form>
                      <!-- /.social -->
                    </li>
                    <li class="nav-item d-lg-none">
                      <button class="hamburger offcanvas-nav-btn"><span></span></button>
                    </li>
                  </ul>
                  <!-- /.navbar-nav -->
                </div>
                <!-- /.navbar-other -->
              </div>
              <!-- /.container -->
            </nav>
            <!-- /.navbar -->
          </header>
          <div class="progress-wrap">
          <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
          </svg>
        </div>
          `
    }
}

customElements.define("zvn-header", Header);
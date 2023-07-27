API.get('auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res=>{})
    .catch(err=>{
        window.location.href = "index.html"
    })

const elTable = document.getElementById("articles");



API.get("/articles/my-articles", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res=>{
    const articles = res.data.data;
    console.log('articles',articles);
    let html="";
    articles.forEach(item => {

        const checked = item.status === 1? "checked":"";
        html +=/*html*/
        `<tr>
            <td>${item.id}</td>
            <td><img style="width: 150px" src="${item.thumb}" class="img-fluid" alt=""></td>
            <td>${item.title}</td>
            <td data-id="${item.id}">${renderSlbCategory(item.category_id)}</td>
            <td>
                <input class="form-check-input csk-status" type="checkbox" value="${item.id}" ${checked}>
            </td>
            <td>
                <a href="detail.html?id=${item.id}" class="btn btn-sm btn-info">View</a>
                <button type="button" class="btn btn-sm btn-warning">Edit</button>
                <button type="button" class="btn btn-sm btn-danger btn-delete" data-id=${item.id}>Delete</button>
            </td>
        </tr>`
    });
    elTable.innerHTML = html;
  })

elTable.addEventListener("click",(e)=>{
    const el = e.target;
    if(el.classList.contains("btn-delete")){
        const id = parseInt(el.dataset.id);
        
        if(confirm(`Bạn có chắc muốn xóa bài viết ${id}`)){
            API.delete(`articles/${id}`,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
            .then((res)=>{
                console.log('res', res);
                
                const tr = el.parentElement.parentElement;
                tr.remove();
                rederPopup(`Bài viết ${id} đã được xóa thành công`);
            })
        }
    }

    if(el.classList.contains("csk-status")){
        const id = parseInt(el.value);
        const status = el.checked? 1:0;
        API.patch(`articles/${id}`,{status: status},{
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then(res=>{
            if(status){
                rederPopup(`Bài viết ${id} đã được đăng thành công`);
            }else{
                rederPopup(`Bài viết ${id} đã được ẩn`);
            }
           
          })
    }
})

elTable.addEventListener("change",(e)=>{
    const el = e.target;
    if(el.classList.contains("slb-category")){
        const categoryID = el.value;
        const id = el.parentElement.dataset.id;
        API.patch(`articles/${id}`,{category_id: categoryID},{
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((res)=>rederPopup(`Đã cập nhật thành công danh mục bài viết ${id}`))
    }
})

  function renderSlbCategory(categoryID) {
    const categories = [
        {
            id: 1,
            name: "Thế Giới",
        },
        {
            id: 2,
            name: "Thời Sự",
        },
        {
            id: 3,
            name: "Kinh Doanh",
        },
        {
            id: 5,
            name: "Giải Trí",
        },
        {
            id: 6,
            name: "Thể Thao",
        },
        {
            id: 7,
            name: "Pháp Luật",
        },
        {
            id: 8,
            name: "Giáo Dục",
        },
        {
            id: 9,
            name: "Sức Khỏe",
        },
        {
            id: 10,
            name: "Đời Sống",
        },
        {
            id: 11,
            name: "Du Lịch",
        },
        {
            id: 12,
            name: "Khoa Học",
        },
        {
            id: 13,
            name: "Số Hóa",
        },
        {
            id: 14,
            name: "Xe",
        }
    ]
let htmlCategories = "";
    categories.forEach(item=>{
        let selected = item.id === categoryID ? "selected":"";
        htmlCategories += `<option value="${item.id}" ${selected}>${item.name}</option>`
    })
    return /*html*/`
<select class="form-select slb-category">
    ${htmlCategories}
</select>`
  }

  function rederPopup(message){
    Toastify({

        text: message,
        
        duration: 3000
        
        }).showToast();
  }
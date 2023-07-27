const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));


const elTitle = document.getElementById("title")
const elCategory = document.getElementById("category")
const elPushlish = document.getElementById("pushlish-date");
const elThumbs  = document.getElementById("img")
const elContent  = document.getElementById("content")
const elPageLoader = document.getElementById("page-loader")

// console.log(id);

API.get(`articles/${id}`)
.then((res)=>{
    console.log('res', res);
    let data = res.data.data;
    console.log('data', data);
    elCategory.href =`category.html?id=${data.category_id}`;
    elCategory.innerText = data.category.name;
    elTitle.innerText = data.title;
    elPushlish.innerText = data.publish_date;
    elThumbs.src = data.thumb;
    elContent.innerText = data.content;
    elPageLoader.remove();
    
    const ARTICLES_VIEWED = JSON.parse(localStorage.getItem("ARTICLES_VIEWED")) || [];
    console.log('ARTICLES_VIEWED', ARTICLES_VIEWED);
    let foundIdex = ARTICLES_VIEWED.findIndex(itemArticle=>{
        return data.id === itemArticle.id
    })

    if(foundIdex === -1){
        if(ARTICLES_VIEWED.length >4) ARTICLES_VIEWED.shift();
            ARTICLES_VIEWED.push({id:data.id, title:data.title});
        localStorage.setItem("ARTICLES_VIEWED", JSON.stringify(ARTICLES_VIEWED));
    } 
})
.catch(err=>{
    window.location.href="404.html"
})
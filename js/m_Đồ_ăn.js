const productlist = document.getElementById("food")
console.log(productlist);

fetch("./js/api_Đồ_ăn.json")
.then((res) => res.json())
.then((json)=>{
  json.map((products)=>{
    productlist.innerHTML+=`
    <div class="row">
      <div class="col-lg-4 col-md-12 mb-4">
        <div class="card">
        <a href="#!">
          <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light">
            <img src="${products.img}"
              class="w-100" />
              <div class="hover-overlay">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
              </div>
          </div>
          <div class="card-body">
              <h5 class="card-title mb-3">${products.tiltle}</h5>
            <h6 class="mb-3">${products.price}</h6>
          </div>
          </a>
        </div>
      </div>
    `
  })
})


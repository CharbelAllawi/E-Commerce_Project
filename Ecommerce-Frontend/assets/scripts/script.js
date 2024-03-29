
// this function is to show the edit page to admin
function editProduct(event, product_id) {
    document.querySelector(`#description-wrapper2-${product_id}`).style.display = "block";
}
// this function is to close the edit page to admins
function closebutton(event, product_id) {
    document.querySelector(`#description-wrapper2-${product_id}`).style.display = "none";
}


// this function is to save the edited stuff in edit page
function save(event, product_id) {
    const name = document.querySelector(`#product-name-${product_id}`).value;
    const price = document.querySelector(`#product-price-${product_id}`).value;
    const color = document.querySelector(`#product-color-${product_id}`).value;
    const image = document.querySelector(`#product-img-${product_id}`);
    const description = document.querySelector(`#product-description-${product_id}`).value;
    let category = document.querySelector(`#product-category-${product_id}`).value;
    if (category == "iPhone") {
        category = '1';
    } else if (category == "iPad - Mac") {
        category = '2';
    } else if (category == "iAccessories") {
        category = '3';
    }
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("category_id", category);
    formdata.append("imageurl", image.files[0]);
    formdata.append("color", color);
    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    fetch("http://127.0.0.1:8000/api/add_update_product/" + product_id, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    location.reload();
}
// this function is to delete item from DB
async function deleteProduct(event, product_id) {
    const default_url = "http://127.0.0.1:8000/api/remove/" + product_id
    async function remove() {
        const response = await fetch(default_url, {
            method: "GET",

        })
        return response
    }
    await remove();
    location.reload();
}
// this function is to animate the login-signup
function menuToggle() {
    MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "200px" : "0px";
}

var LoginForm = document.getElementById("LoginForm");
var RegForm = document.getElementById("RegForm");
var Indicator = document.getElementById("Indicator");

function register() {
    RegForm.style.transform = "translateX(0)";
    LoginForm.style.transform = "translateX(0)";
    Indicator.style.transform = "translateX(100%)";
}

function login() {
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0)";
}
function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
    }
    else {
        MenuItems.style.maxHeight = "0px";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    //this is for favourite section
    var MenuItems = document.getElementById("MenuItems");
    MenuItems.style.maxHeight = "0px";
    // favourite
    let cartIcon2 = document.querySelector("#cart-icon2");
    let cart2 = document.querySelector(".cart2");
    let closeCart2 = document.querySelector("#close-cart2");

    // Open favourite
    cartIcon2.onclick = () => {
        cart2.classList.add("active");
    };

    // Close favourite
    closeCart2.onclick = () => {
        cart2.classList.remove("active");
    };

    // favourite start
    document.addEventListener("DOMContentLoaded", ready2);

    function ready2() {
        var removeCartButtons = document.getElementsByClassName("cart-remove2");
        for (var i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i];
            button.addEventListener("click", removeCartItem);
        }
        var addfav = document.getElementsByClassName("add-to-favorites-btn");
        for (var i = 0; i < addfav.length; i++) {
            var button = addfav[i];
            button.addEventListener("click", addCartClicked2);
        }
    }
    // Add to favourite
    function addCartClicked2(event) {
        var button = event.target;
        var shopProduct = button.parentElement;
        var title = shopProduct.querySelector(".items").innerHTML;

        var price = shopProduct.querySelector(".cart-price").innerHTML;
        var productImg = shopProduct.querySelector(".images").innerHTML;
        addfavorite(title, price, productImg);
    }
    //this is for cart section

    // Cart
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let closeCart = document.querySelector("#close-cart");

    // Open Cart
    cartIcon.onclick = () => {
        cart.classList.add("active");
    };

    // Close Cart
    closeCart.onclick = () => {
        cart.classList.remove("active");
    };

    // Cart Working
    document.addEventListener("DOMContentLoaded", ready);

    // Making Function
    function ready() {
        // Remove item from cart
        var removeCartButtons = document.getElementsByClassName("cart-remove");
        for (var i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i];
            button.addEventListener("click", removeCartItem);
        }

        // Quantity Changes
        var quantityInputs = document.getElementsByClassName("cart-quantity");
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener("change", quantityChanged);
        }

        // Add to Cart
        var addCart = document.getElementsByClassName("add-to-cart-btn");
        for (var i = 0; i < addCart.length; i++) {
            var button = addCart[i];
            button.addEventListener("click", addCartClicked);
        }


    }

    // Function to remove item from the cart
    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateTotal();
    }

    // Function for the quantity change
    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
    }

    // Add to Cart
    function addCartClicked(event) {
        var button = event.target;
        var shopProduct = button.parentElement;
        var title = shopProduct.querySelector(".items").innerHTML;
        // var price = shopProduct.querySelector(".cart-price").innerText;
        // var title = "hello";
        var price = shopProduct.querySelector(".cart-price").innerHTML;
        var productImg = shopProduct.querySelector(".images").innerHTML;
        // var productImg = "assets/images/iphone14.svg"
        addProductToCart(title, price, productImg);
        updateTotal();
    }
    //here im getting products from DB
    async function getproducts() {
        const default_url = "http://127.0.0.1:8000/api/get_products/"
        async function categories() {

            const response = await fetch(default_url, {
                method: "GET",
            })
            return response
        }
        async function answer() {
            const result = await categories()
            const jsonresult = await result.json()
            return jsonresult
        }
        products = await answer();
        let irow = document.querySelector(".irow");
        console.log(localStorage.getItem('id'));
        if (localStorage.getItem('id') == null || localStorage.getItem('id') != 1) {
            for (let i = 0; i < products.products.length; i++) {
                const product = products.products[i];
                if (products.products[i]['category_id'] == '1') {
                    irow.innerHTML += `<div class="col-4">
                <img src="${products.products[i]['imageurl']}" alt="${products.products[i]['name']}">
                <h4>${products.products[i]['name']}<h4>
                <div class="description-wrapper">
                    <p class="items">Name: ${products.products[i]['name']}</p>
                    <p class="images">${products.products[i]['imageurl']}</p>
                    <p>Description: ${products.products[i]['description']}</p>
                    <p>Color: ${products.products[i]['color']}</p>
                    <p class="cart-price">Price: ${products.products[i]['price']}$</p>
                    <p class="cart-price">Category: iPhone</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                    <button class="add-to-favorites-btn">Add to Favorites</button>
                </div >
                <div style="display: none;" class="description-wrapper2" id="description-wrapper2-${product.product_id}">
                <form id="RegForm2">
                <input id="product-name-${product.product_id}" type="text" placeholder="Name: ${products.products[i]['name']}">
                <input id="product-price-${product.product_id}" type="text" placeholder="Price: ${products.products[i]['price']}">
                <input id="product-color-${product.product_id}" type="text" placeholder="Color: ${products.products[i]['color']}">
                <input id="product-img-${product.product_id}" class="upload" id="fileInput" type="file" placeholder="image">
                <input id="product-description-${product.product_id}" type="text" placeholder="Description:${products.products[i]['description']}">
                <select name="category" id="product-category-${product.product_id}">
                    <option value="iPhone">iPhone</option>
                    <option value="iPad - Mac">iPad - Mac</option>
                    <option value="iAccessories">iAccessories</option>
                </select>
                <button type="button" class="btn" onclick="save(event, ${product.product_id})">Save</button>
                <button type="button" class="btn closebtn" onclick="closebutton(event, ${product.product_id})">Close</button>
            </form>
              </div>
              `
                }
                if (products.products[i]['category_id'] == '2') {
                    document.querySelector('.irow2').innerHTML += `<div class="col-4">
                    <img src="${products.products[i]['imageurl']}" alt="${products.products[i]['name']}">
                    <h4>${products.products[i]['name']}<h4>
                    <div class="description-wrapper">
                    <p class="items">Name: ${products.products[i]['name']}</p>
                    <p class="images">${products.products[i]['imageurl']}</p>
                    <p>Description: ${products.products[i]['description']}</p>
                    <p>Color: ${products.products[i]['color']}</p>
                    <p class="cart-price">Price: ${products.products[i]['price']}$</p>
                    <p class="cart-price">Category: iPad - Mac</p>
                        <button class="add-to-cart-btn">Add to Cart</button>
                        <button class="add-to-favorites-btn">Add to Favorites</button>
                    </div >
                    <div style="display: none;" class="description-wrapper2" id="description-wrapper2-${product.product_id}">
                    <form id="RegForm2">
                    <input id="product-name-${product.product_id}" type="text" placeholder="Name: ${products.products[i]['name']}">
                    <input id="product-price-${product.product_id}" type="text" placeholder="Price: ${products.products[i]['price']}">
                    <input id="product-color-${product.product_id}" type="text" placeholder="Color: ${products.products[i]['color']}">
                    <input id="product-img-${product.product_id}" class="upload" id="fileInput" type="file" placeholder="image">
                    <input id="product-description-${product.product_id}" type="text" placeholder="Description:${products.products[i]['description']}">
                    <select name="category" id="product-category-${product.product_id}">
                        <option value="iPhone">iPhone</option>
                        <option value="iPad - Mac">iPad - Mac</option>
                        <option value="iAccessories">iAccessories</option>
                    </select>
                    <button type="button" class="btn" onclick="save(event, ${product.product_id})">Save</button>
                    <button type="button" class="btn closebtn" onclick="closebutton(event, ${product.product_id})">Close</button>
                </form>
                  </div>
                  `
                }
                if (products.products[i]['category_id'] == '3') {
                    document.querySelector('.irow3').innerHTML += `<div class="col-4">
                    <img src="${products.products[i]['imageurl']}" alt="${products.products[i]['name']}">
                    <h4>${products.products[i]['name']}<h4>
                    <div class="description-wrapper">
                    <p class="items">Name: ${products.products[i]['name']}</p>
                    <p class="images">${products.products[i]['imageurl']}</p>
                    <p>Description: ${products.products[i]['description']}</p>
                    <p>Color: ${products.products[i]['color']}</p>
                    <p class="cart-price">Price: ${products.products[i]['price']}$</p>
                    <p class="cart-price">Category: iAccessories</p>
                        <button class="add-to-cart-btn">Add to Cart</button>
                        <button class="add-to-favorites-btn">Add to Favorites</button>
                    </div >
                    <div style="display: none;" class="description-wrapper2" id="description-wrapper2-${product.product_id}">
             <form id="RegForm2">
            <input id="product-name-${product.product_id}" type="text" placeholder="Name: ${products.products[i]['name']}">
            <input id="product-price-${product.product_id}" type="text" placeholder="Price: ${products.products[i]['price']}">
            <input id="product-color-${product.product_id}" type="text" placeholder="Color: ${products.products[i]['color']}">
            <input id="product-img-${product.product_id}" class="upload" id="fileInput" type="file" placeholder="image">
            <input id="product-description-${product.product_id}" type="text" placeholder="Description:${products.products[i]['description']}">
            <select name="category" id="product-category-${product.product_id}">
                <option value="iPhone">iPhone</option>
                <option value="iPad - Mac">iPad - Mac</option>
                <option value="iAccessories">iAccessories</option>
            </select>
            <button type="button" class="btn" onclick="save(event, ${product.product_id})">Save</button>
            <button type="button" class="btn closebtn" onclick="closebutton(event, ${product.product_id})">Close</button>
        </form>
                  </div>
                  `
                }
            }
        }
        if (localStorage.getItem('id') == 1) {
            document.getElementById("dash").style.display = "block";
            for (let i = 0; i < products.products.length; i++) {
                const product = products.products[i];
                if (products.products[i]['category_id'] == '1') {
                    irow.innerHTML += `<div class="col-4">
                <img src="${products.products[i]['imageurl']}" alt="${products.products[i]['name']}">
                <h4>${products.products[i]['name']}<h4>
                <div class="description-wrapper">
                    <p class="items">Name: ${products.products[i]['name']}</p>
                    <p class="images">${products.products[i]['imageurl']}</p>
                    <p>Description: ${products.products[i]['description']}</p>
                    <p>Color: ${products.products[i]['color']}</p>
                    <p class="cart-price">Price: ${products.products[i]['price']}$</p>
                    <p class="cart-price">Category: iPhone</p>
                    <button class="add-to-cart-btn">Add to Cart</button>
                    <button class="add-to-favorites-btn">Add to Favorites</button>
                    <button class="edit-button" onclick="editProduct(event, ${product.product_id})">Edit</button>
                    <button class="delete-button" onclick="deleteProduct(event, ${product.product_id})">Delete</button>
                </div >
                <div style="display: none;" class="description-wrapper2" id="description-wrapper2-${product.product_id}">
                <form id="RegForm2">
                <input id="product-name-${product.product_id}" type="text" placeholder="Name: ${products.products[i]['name']}">
                <input id="product-price-${product.product_id}" type="text" placeholder="Price: ${products.products[i]['price']}">
                <input id="product-color-${product.product_id}" type="text" placeholder="Color: ${products.products[i]['color']}">
                <input id="product-img-${product.product_id}" class="upload" id="fileInput" type="file" placeholder="image">
                <input id="product-description-${product.product_id}" type="text" placeholder="Description:${products.products[i]['description']}">
                <select name="category" id="product-category-${product.product_id}">
                    <option value="iPhone">iPhone</option>
                    <option value="iPad - Mac">iPad - Mac</option>
                    <option value="iAccessories">iAccessories</option>
                </select>
                <button type="button" class="btn" onclick="save(event, ${product.product_id})">Save</button>
                <button type="button" class="btn closebtn" onclick="closebutton(event, ${product.product_id})">Close</button>
            </form>
              </div>
              `
                }
                if (products.products[i]['category_id'] == '2') {
                    document.querySelector('.irow2').innerHTML += `<div class="col-4">
                    <img src="${products.products[i]['imageurl']}" alt="${products.products[i]['name']}">
                    <h4>${products.products[i]['name']}<h4>
                    <div class="description-wrapper">
                    <p class="items">Name: ${products.products[i]['name']}</p>
                    <p class="images">${products.products[i]['imageurl']}</p>
                    <p>Description: ${products.products[i]['description']}</p>
                    <p>Color: ${products.products[i]['color']}</p>
                    <p class="cart-price">Price: ${products.products[i]['price']}$</p>
                    <p class="cart-price">Category: iPad - Mac</p>
                        <button class="add-to-cart-btn">Add to Cart</button>
                        <button class="add-to-favorites-btn">Add to Favorites</button>
                        <button class="edit-button" onclick="editProduct(event, ${product.product_id})">Edit</button>
                        <button class="delete-button" onclick="deleteProduct(event, ${product.product_id})">Delete</button>
                    </div >
                    <div style="display: none;" class="description-wrapper2" id="description-wrapper2-${product.product_id}">
                    <form id="RegForm2">
                    <input id="product-name-${product.product_id}" type="text" placeholder="Name: ${products.products[i]['name']}">
                    <input id="product-price-${product.product_id}" type="text" placeholder="Price: ${products.products[i]['price']}">
                    <input id="product-color-${product.product_id}" type="text" placeholder="Color: ${products.products[i]['color']}">
                    <input id="product-img-${product.product_id}" class="upload" id="fileInput" type="file" placeholder="image">
                    <input id="product-description-${product.product_id}" type="text" placeholder="Description:${products.products[i]['description']}">
                    <select name="category" id="product-category-${product.product_id}">
                        <option value="iPhone">iPhone</option>
                        <option value="iPad - Mac">iPad - Mac</option>
                        <option value="iAccessories">iAccessories</option>
                    </select>
                    <button type="button" class="btn" onclick="save(event, ${product.product_id})">Save</button>
                    <button type="button" class="btn closebtn" onclick="closebutton(event, ${product.product_id})">Close</button>
                </form>
                  </div>
                  `
                }
                if (products.products[i]['category_id'] == '3') {
                    document.querySelector('.irow3').innerHTML += `<div class="col-4">
                    <img src="${products.products[i]['imageurl']}" alt="${products.products[i]['name']}">
                    <h4>${products.products[i]['name']}<h4>
                    <div class="description-wrapper">
                    <p class="items">Name: ${products.products[i]['name']}</p>
                    <p class="images">${products.products[i]['imageurl']}</p>
                    <p>Description: ${products.products[i]['description']}</p>
                    <p>Color: ${products.products[i]['color']}</p>
                    <p class="cart-price">Price: ${products.products[i]['price']}$</p>
                    <p class="cart-price">Category: iAccessories</p>
                        <button class="add-to-cart-btn">Add to Cart</button>
                        <button class="add-to-favorites-btn">Add to Favorites</button>
                        <button class="edit-button" onclick="editProduct(event, ${product.product_id})">Edit</button>
                        <button class="delete-button" onclick="deleteProduct(event, ${product.product_id})">Delete</button>
                    </div >
                    <div style="display: none;" class="description-wrapper2" id="description-wrapper2-${product.product_id}">
             <form id="RegForm2">
            <input id="product-name-${product.product_id}" type="text" placeholder="Name: ${products.products[i]['name']}">
            <input id="product-price-${product.product_id}" type="text" placeholder="Price: ${products.products[i]['price']}">
            <input id="product-color-${product.product_id}" type="text" placeholder="Color: ${products.products[i]['color']}">
            <input id="product-img-${product.product_id}" class="upload" id="fileInput" type="file" placeholder="image">
            <input id="product-description-${product.product_id}" type="text" placeholder="Description:${products.products[i]['description']}">
            <select name="category" id="product-category-${product.product_id}">
                <option value="iPhone">iPhone</option>
                <option value="iPad - Mac">iPad - Mac</option>
                <option value="iAccessories">iAccessories</option>
            </select>
            <button type="button" class="btn" onclick="save(event, ${product.product_id})">Save</button>
            <button type="button" class="btn closebtn" onclick="closebutton(event, ${product.product_id})">Close</button>
        </form>
                  </div>
                  `
                }
            }
        }
        ready();
        ready2();
    };
    getproducts();
    //this function is to addfavorites to cart
    function addfavorite(title, price, productImg) {
        var cartRow = document.createElement("div");
        cartRow.classList.add("cart-row2");
        var cartItems = document.querySelector(".cart-content2");
        var cartRowContent = `
                        <div class="cart-item">
                            <img class="cart-img" src="${productImg}">
                                <span class="cart-product-title">${title}</span>
                        </div>
                        <span class="cart-price">${price}</span>
                                `;
        cartRow.innerHTML = cartRowContent;
        cartItems.append(cartRow);
    }
    //add product to cart with total
    function addProductToCart(title, price, productImg) {
        var cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        var cartItems = document.querySelector(".cart-content");
        var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText === title) {
                alert("You have already added this item to the cart");
                return;
            }
        }
        var cartRowContent = `
                        <div class="cart-item">
                            <img class="cart-img" src="${productImg}">
                                <span class="cart-product-title">${title}</span>
                        </div>
                        <span class="cart-price">${price}</span>
                        <input class="cart-quantity" type="number" value="1">
                            <img class="cart-remove" src="assets/images/deleteicon.svg" alt="Remove">
                                `;
        cartRow.innerHTML = cartRowContent;
        cartItems.append(cartRow);
        cartRow.querySelector(".cart-remove").addEventListener("click", removeCartItem);
        cartRow.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
    }

    function updateTotal() {
        var cartItems = document.getElementsByClassName("cart-row");
        var total = 0;
        for (var i = 0; i < cartItems.length; i++) {
            var cartItem = cartItems[i];
            var priceElement = cartItem.querySelector(".cart-price");
            var quantityElement = cartItem.querySelector(".cart-quantity");
            priced = priceElement.innerText.replace("$", "");
            var price = parseFloat(priced.replace("Price: ", ""));
            var quantity = quantityElement.value;
            total += price * quantity;
        }
        total = Math.round(total * 100) / 100;
        document.querySelector(".total-price").innerText = "$" + total;
    }


});
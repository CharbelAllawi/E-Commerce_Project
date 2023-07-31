
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


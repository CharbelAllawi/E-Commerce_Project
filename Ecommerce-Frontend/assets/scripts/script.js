
// this function is to show the edit page to admin
function editProduct(event, product_id) {
    document.querySelector(`#description-wrapper2-${product_id}`).style.display = "block";
}
// this function is to close the edit page to admins
function closebutton(event, product_id) {
    document.querySelector(`#description-wrapper2-${product_id}`).style.display = "none";
}
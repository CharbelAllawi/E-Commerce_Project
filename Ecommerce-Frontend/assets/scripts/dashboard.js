function product() {
  const submit_btn = document.getElementById("submit-product");
  submit_btn.addEventListener('click', (e) => {
    const selectElement = document.getElementById('product-category');

    e.preventDefault();
    let name = document.getElementById("product-name").value;
    let description = document.getElementById("product-description").value;
    let price = document.getElementById("product-price").value;
    let category = ""
    let image = document.getElementById("product-img");
    let color = document.getElementById("product-color").value;
    const selectedValue = selectElement.value;
    if (selectedValue === "iPhone") {
      category = '1';
    } else if (selectedValue === "iPad - Mac") {
      category = '2';
    } else if (selectedValue === "iAccessories") {
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
    fetch("http://127.0.0.1:8000/api/add_update_product/", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        document.getElementById("product-name").value = "";
        document.getElementById("product-description").value = "";
        document.getElementById("product-price").value = "";
        document.getElementById("product-img").value = "";
        document.getElementById("product-color").value = "";
      })
      .catch(error => console.log('error', error));

  });

}
product();

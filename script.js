
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const product = data.product;
    document.querySelector('.vendor p').textContent = product.vendor;
    document.querySelector('.tilte p').textContent = product.title;
    document.querySelector('.price p').textContent = product.price;
    document.querySelector('.oldprice p').textContent = product.compare_at_price;
    document.querySelector('.desc p').innerHTML = product.description;


    const price = parseFloat(product.price.replace('$', '').replace(',', ''));
    const comparePrice = parseFloat(product.compare_at_price.replace('$', '').replace(',', ''));
    const discountPercentage = ((comparePrice - price) / comparePrice) * 100;

    document.querySelector('.price span').textContent = `${discountPercentage.toFixed(2)}% Off`;

    const colorButtons = document.querySelectorAll('.colorbox');
    product.options[0].values.forEach((colorObj, index) => {
      const colorName = Object.keys(colorObj)[0];
      const colorCode = colorObj[colorName];
      colorButtons[index].style.backgroundColor = colorCode;
    });
    const sizeCheckboxes = document.querySelectorAll('.sizebox input');
    product.options[1].values.forEach((size, index) => {
      sizeCheckboxes[index].value = size;
      sizeCheckboxes[index].nextElementSibling.textContent = size;
    });

  })
  .catch(error => {

    console.error('Error is here', error);
    alert("There is errroe")
  });


//   note : images are not fecthing so that we use the static images
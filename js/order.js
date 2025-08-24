document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: "Laptop", price: 750, img: "assets/images/laptop.png" },
    { id: 2, name: "Headphones", price: 50, img: "assets/images/headphones.png" },
    { id: 3, name: "Smartphone", price: 500, img: "assets/images/phone.png" },
    { id: 4, name: "Keyboard", price: 30, img: "assets/images/keyboard.png" },
    { id: 5, name: "Mouse", price: 20, img: "assets/images/mouse.png" }
  ];

  const productList = document.getElementById('productList');

  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = "bg-white rounded shadow p-4 flex flex-col items-center";
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}" class="w-32 h-32 object-contain mb-3">
      <h3 class="text-lg font-semibold">${prod.name}</h3>
      <p class="text-gray-600 mb-2">$${prod.price}</p>
      <label class="flex items-center space-x-2">
        <input type="checkbox" data-id="${prod.id}" data-name="${prod.name}" data-price="${prod.price}">
        <span>Select</span>
      </label>
    `;
    productList.appendChild(card);
  });

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    const selected = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(chk => {
      selected.push({
        id: chk.dataset.id,
        name: chk.dataset.name,
        price: chk.dataset.price
      });
    });

    if (selected.length === 0) {
      alert("Please select at least one item to proceed!");
      return;
    }

    localStorage.setItem('cartItems', JSON.stringify(selected));
    window.location = 'placeorder.html';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const tbody = document.querySelector('#orderTable tbody');
  let total = 0;

  cartItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border border-gray-300 p-2">${item.name}</td>
      <td class="border border-gray-300 p-2">$${item.price}</td>
    `;
    tbody.appendChild(row);
    total += parseFloat(item.price);
  });

  // Calculate tax (10%)
  const tax = total * 0.10;
  const grandTotal = total + tax;

  // Display total in iframe
  const iframeDoc = document.getElementById('totalFrame').contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(`
    <html><body style="font-family: sans-serif; text-align: center;">
      <h3>Total: $${total.toFixed(2)}</h3>
      <h3>Tax (10%): $${tax.toFixed(2)}</h3>
      <h2>Grand Total: $${grandTotal.toFixed(2)}</h2>
    </body></html>
  `);
  iframeDoc.close();

  // Handle Place Order button
  document.getElementById('placeOrderBtn').addEventListener('click', () => {
    const form = document.getElementById('userInfo');
    if (!form.checkValidity()) {
      alert("Please fill in all user details before placing order.");
      return;
    }
    localStorage.removeItem('cartItems');
    document.getElementById('confirmationMsg').classList.remove('hidden');
    setTimeout(() => window.location = 'index.html', 3000);
  });
});

document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  let record = {};

  // Handle multiple checkbox values properly
  formData.forEach((value, key) => {
    if (record[key]) {
      record[key] = Array.isArray(record[key]) ? [...record[key], value] : [record[key], value];
    } else {
      record[key] = value;
    }
  });

  let records = JSON.parse(localStorage.getItem('records') || '[]');
  records.push(record);
  localStorage.setItem('records', JSON.stringify(records));

  window.location = 'records.html';
});


document.addEventListener('DOMContentLoaded', function() {
    let records = JSON.parse(localStorage.getItem('records') || '[]');
    let table = '<thead><tr>';
    if (records.length > 0) {
        Object.keys(records[0]).forEach(key => table += `<th>${key}</th>`);
        table += '</tr></thead><tbody>';
        records.forEach(rec => {
            table += '<tr>';
            Object.values(rec).forEach(val => table += `<td>${val}</td>`);
            table += '</tr>';
        });
        table += '</tbody>';
    }
    document.getElementById('recordsTable').innerHTML = table;
    $('#recordsTable').DataTable();
});

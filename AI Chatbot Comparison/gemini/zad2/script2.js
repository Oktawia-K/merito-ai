const invoiceList = document.getElementById('invoiceList');
const addInvoiceBtn = document.getElementById('addInvoiceBtn');
const addInvoiceForm = document.getElementById('addInvoiceForm');
const invoiceForm = document.getElementById('invoiceForm');

// Define Invoice class with properties and methods
class Invoice {
  constructor(id, title, amount, recurring, dueDate, paidDate) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.recurring = recurring;
    this.dueDate = dueDate;
    this.paidDate = paidDate;
  }

  // Add methods for invoice display, payment, and next cycle calculation (if recurring)

  getFormattedPaidDate() {
    return this.paidDate ? this.paidDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : 'Not Paid';
  }
}

// Function to load invoices from local storage
function loadInvoices() {
  const invoices = localStorage.getItem('invoices');
  return invoices ? JSON.parse(invoices) : [];
}

// Function to save invoices to local storage
function saveInvoices(invoices) {
  localStorage.setItem('invoices', JSON.stringify(invoices));
}

let invoices = loadInvoices();

// Function to display invoices in the list
function displayInvoices() {
  invoiceList.innerHTML = '';
  invoices.forEach(invoice => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${invoice.title} - ${invoice.amount} - Due: ${invoice.dueDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} 
      ( ${invoice.recurring ? 'Recurring' : 'One-Time'} ) - Paid: <span class="math-inline">\{invoice\.getFormattedPaidDate\(\)\}
<button data\-invoice\-id\="</span>{invoice.id}">${invoice.recurring ? 'Pay & Advance' : 'Pay'}</button>`;
    invoiceList.appendChild(listItem);
  });
}

displayInvoices(); // Display initial invoices

// Functionality for adding new invoice
addInvoiceBtn.addEventListener('click', () => {
  addInvoiceForm.style.display = addInvoiceForm.style.display === 'none' ? 'block' : 'none';
});

invoiceForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newInvoice = new Invoice(
    // Generate unique ID (implement logic)
    Date.now(),
    document.getElementById('title').value,
    parseFloat(document.getElementById('amount').value),
    document.getElementById('recurring').checked,
    new Date(document.getElementById('dueDate').value),
    null // Paid date will be set upon payment
  );
  invoices.push(newInvoice);
  saveInvoices(invoices);
  displayInvoices();
})

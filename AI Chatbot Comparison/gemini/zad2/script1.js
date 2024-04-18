const invoiceList = document.getElementById('invoiceList');
const addInvoiceBtn = document.getElementById('addInvoiceBtn');

// Define Invoice class with properties and methods
class Invoice {
  constructor(id, title, amount, recurring, dueDate) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.recurring = recurring;
    this.dueDate = dueDate;
  }

  // Add methods for invoice display, payment, and next cycle calculation (if recurring)
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
      ${invoice.title} - ${invoice.amount} - Due: ${invoice.dueDate} 
      ( ${invoice.recurring ? 'Recurring' : 'One-Time'} )
      <button data-invoice-id="${invoice.id}">${invoice.recurring ? 'Pay & Advance' : 'Pay'}</button>`;
    invoiceList.appendChild(listItem);
  });
}

displayInvoices(); // Display initial invoices

// Functionality for adding new invoice (form handling not included)
addInvoiceBtn.addEventListener('click', () => {
  // Prompt user for invoice details (title, amount, recurring, due date)
  const newInvoice = new Invoice(/* Populate with user input */);
  invoices.push(newInvoice);
  saveInvoices(invoices);
  displayInvoices();
});

// Functionality for handling pay button click on invoice list item
invoiceList.addEventListener('click', (event) => {
  const clickedButton = event.target;
  if (clickedButton.tagName === 'BUTTON') {
    const invoiceId = clickedButton.dataset.invoiceId;
    const invoiceIndex = invoices.findIndex(invoice => invoice.id === invoiceId);
    if (invoices[invoiceIndex].recurring) {
      // Advance due date for recurring invoice
      invoices[invoiceIndex].dueDate = calculateNextDueDate(invoices[invoiceIndex].dueDate);
    } else {
      invoices.splice(invoiceIndex, 1);
    }
    saveInvoices(invoices);
    displayInvoices();
  }
});

// Function to calculate due date for next recurring invoice cycle (implementation needed)

// Dummy invoice data (replace with your data)
const dummyInvoices = [
  new Invoice(1, 'Electricity Bill', 100, true, new Date(2024, 4, 20)),
  new Invoice(2, 'Internet Service', 50, true, new Date(2024, 4, 15)),
  new Invoice(3, 'Book Purchase', 20, false, new Date(2024, 4, 25)),
];

// Add dummy invoices if no invoices exist in local storage
if (!invoices.length) {
  invoices.push(...dummyInvoices);
  saveInvoices(invoices);
}

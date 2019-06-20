'use strict';

const dropdown = document.querySelector('#dropdown');
const listOfItems = document.querySelector('#items');
const form = document.querySelector('form');
const message = document.querySelector('.message');

function loadData() {
  const getItems = new XMLHttpRequest();
  getItems.open('GET', 'http://localhost:4500/api/items');
  getItems.setRequestHeader('Content-Type', 'application/json');
  getItems.onload = data => {
    const response = JSON.parse(data.target.response);
    response.forEach(item => {
      const option = document.createElement('option');
      option.id = item.id;
      const listElement = document.createElement('li');

      option.innerText = item.title;
      dropdown.appendChild(option);

      listElement.innerText = `${item.title}`
      listOfItems.appendChild(listElement);
    });
  }
  getItems.send();
}

let currentId = 0;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitBid = new XMLHttpRequest();
  
  const selectedOption = dropdown.value;
  const allOptions = document.querySelectorAll('option');

  allOptions.forEach(option => {
    if (option.innerText = selectedOption) {
      currentId = option.id;
    }
  });

  submitBid.open('POST', `http://localhost:4500/api/items/${currentId}/bids`);
  submitBid.setRequestHeader('Content-Type', 'application/json');
  submitBid.onload = data => {
    message.innerText = JSON.parse(data.target.response).message;
    if (submitBid.status === 200) {
      dropdown.innerHTML = '';
      listOfItems.innerHTML = '';
      loadData();
    }
  }
  submitBid.send(JSON.stringify({
    "name": event.target.elements.name.value,
    "amount": event.target.elements.amount.value
  }));

  
});

window.onload = () => {
  loadData();
}

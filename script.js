/* The following code fetches data from three API endpoints and 
displays the data in tables or div elements on the webpage. */

/* Adds an onClick listener to the button with an ID of "fetch-data" and
calls the startPromiseChain function when clicked. */
const fetchBtn = document.querySelector("#fetch-data");
fetchBtn.addEventListener("click", startPromiseChain);

// The three API endpoints as constants
const endpoint1 = "https://dummyjson.com/posts";
const endpoint2 = "https://dummyjson.com/products";
const endpoint3 = "https://dummyjson.com/todos";

//The three Promise functions that fetch data from the above endpoints and handle errors and display the fetched data
function promiseAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(endpoint1)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const socialTable = document.querySelector("#socialTable");
          const heading = document.createElement("h2");
          heading.innerHTML = `<div style="text-align: center">Social Media Data</div>`;
          socialTable.appendChild(heading);
          // Get the table body element
          const tableBody = document.querySelector("#data-table");

          // Create the heading row
          const headingRow = document.createElement("tr");
          headingRow.innerHTML = `
            <th>ID</th>
            <th>TITLE</th>
            <th>BODY</th>
            <th>USER ID</th>
            <th>TAGS</th>
            <th>REACTIONS</th>
          `;
          tableBody.appendChild(headingRow);

          // Loop through the posts and create a table row for each post
          data.posts.forEach((post) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${post.id}</td>
              <td>${post.title}</td>
              <td>${post.body}</td>
              <td>${post.userId}</td>
              <td>${post.tags}</td>
              <td>${post.reactions}</td>
            `;
            tableBody.appendChild(row);
          });

          // Resolve the Promise
          resolve(true);
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error fetching data:", error);

          // Reject the Promise
          reject(error);
        });
    }, 1000);
  });
}

function promiseAPI2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch(endpoint2)
        .then((response) => response.json())
        .then((data) => {
          // Display the data in a table
          const productContainer = document.querySelector(".product-container");
          // Add a heading "All Items" above the products
          const productHead = document.querySelector("#product-head");

          const heading = document.createElement("h1");
          heading.innerHTML = `<div style="text-align: center">All Items</div>`;
          productHead.appendChild(heading);
          // Iterate over the products in the data and create a product element for each one
          data.products.forEach((product) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            // Create the HTML for the product element using template literals
            productElement.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
        <h3 class="product-font">${product.title}</h3>         
        <p class="product-font">Brand: ${product.brand}</p>
        <p class="product-font">Price: ${product.price}</p>
        <p class="product-font">Rating: ${product.rating}</p>
        <p class="product-font">Stock: ${product.stock}</p>
      `;

            // Append the product element to the product container
            productContainer.appendChild(productElement);
          });
          console.log(data);
          // Resolve the Promise
          resolve(true);
        });
    }, 2000);
  });
}

function promiseAPI3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch(endpoint3)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Display the data in a table
          const todoList = document.querySelector("#todoList");
          const heading = document.createElement("h2");
          heading.innerHTML = `<div style="text-align: center">TODO LIST DATA</div>`;
          todoList.appendChild(heading);
          // Get the table body element
          const todoTable = document.querySelector("#todo-data");

          // Create the heading row
          const headRow = document.createElement("tr");
          headRow.innerHTML = `
            <th>ID</th>
            <th>TODO</th>
            <th>COMPLETED</th>
            <th>USER ID</th>
          `;
          todoTable.appendChild(headRow);

          // Loop through the posts and create a table row for each post
          data.todos.forEach((todos) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${todos.id}</td>
              <td>${todos.todo}</td>
              <td>${todos.completed}</td>
              <td>${todos.userId}</td>
            `;
            todoTable.appendChild(row);
          });
          // Resolve the Promise
          resolve(true);
        });
    }, 3000);
  });
}

/* The startPromiseChain function that runs the above Promise functions in sequence using promises chaining and
 checks if the promises resolve true. */

// Remove data button is added and its function reloads and resets the page.
const removeData = document.querySelector("#remove-data");
function startPromiseChain() {
  promiseAPI1()
    .then(() => {
      if (true) {
        return promiseAPI2();
      }
    })
    .then(() => {
      if (true) {
        return promiseAPI3();
      }
    })
    .then(() => {
      if (true) {
        if (fetchBtn) {
          fetchBtn.style.display = "none";
          removeData.style.display = "block";
          console.log("Data Fetched and displayed");
          removeData.addEventListener("click", function () {
            return window.location.reload();
          });
        }
      }
    });
}

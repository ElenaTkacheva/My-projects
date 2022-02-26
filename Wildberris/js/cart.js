const cart = function() {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.querySelector("#modal-cart");
  const closeBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector('.cart-table__goods');
  const modalForm = document.querySelector(".modal-form");
  const sumElement = cart.querySelector(".card-table__total");

  const updateSum = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    let sum = 0;
    cart.forEach((item) => {
      sum += Number(item.price) * Number(item.count);
    });
    const sumText = String(sum);
    sumElement.textContent = sumText;
  };

  const deteleCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.filter((good) => {
      return good.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((good) => {
      if (good.id === id && good.count > 0) {
        good.count--;
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
  };


  const addToCard = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find(good => good.id === id);
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];


      if(cart.some(good => good.id === clickedGood.id)) {
        cart.map(good => {
          if(good.id === clickedGood.id) {
            good.count ++;
          }
          return good;
        })
      } else {
        clickedGood.count = 1;
        cart.push(clickedGood);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
  }

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = '';
    goods.forEach(good => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>${good.price}$</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${good.count}</td>
        <td><button class=" cart-btn-plus"">+</button></td>
        <td>${+good.price * +good.count}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `;

      cartTable.append(tr);

      tr.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id);
        } else if (target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id);
        } else if (target.classList.contains('cart-btn-delete')) {
          deteleCartItem(good.id);
        }
      });
    });
    updateSum();
  }

  const sendForm = () => {
    let nameInput = document.getElementsByName('nameCustomer');
    let phoneInput = document.getElementsByName('phoneCustomer');
    let name = nameInput.value;
    let phone = phoneInput.value;
    
    const cartArray = localStorage.getItem('cart') ?
    JSON.parse(localStorage.getItem('cart')) : [];
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: name,
        phone: phone,
      })
    }).then(() => {
      nameInput.value = '';
      phoneInput.value = '';

      cart.style.display = '';
      localStorage.removeItem('cart');
      cartTable.innerHTML = '';
    });
  };

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    sendForm();
  });

  cartBtn.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    renderCartGoods(cartArray);
    cart.style.display = "flex";
  });
  closeBtn.addEventListener("click", () => {
    cart.style.display = "";
  });

   cart.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.closest('.modal') && target.classList.contains('overlay')) {
      cart.style.display = '';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cart.style.display = '';
    }
  });

  if(goodsContainer) {
    goodsContainer.addEventListener('click', (event) => {
      if (event.target.closest('.add-to-cart')) {
        const buttonToCart = event.target.closest('.add-to-cart');
        const goodId = buttonToCart.dataset.id;

        addToCard(goodId);

      }
    })
  }
}

cart();


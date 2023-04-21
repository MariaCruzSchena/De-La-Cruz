const welcome = document.querySelector(".bienvenido");
const greeting = document.querySelector(".saludo");
let purchase = document.querySelector(".compra");
const confirm = document.querySelector(".confirm");
const confirmButton = document.querySelector(".confirmButtonNo");
const okButton = document.querySelector(".okButtonOff");
const emptyButton = document.querySelector(".vaciarButtonOff");
const okTitle = document.querySelector(".okTitleOff");

let totalCost = 0;
function totalCostCalculation() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const prices = cart.map((el) => el.price);

    let total = 0;

    for (let price of prices) {
      total = total + price;
    }
    return total;
  } else {
    let total = 0;
    return total;
  }
}

function deleteProduct(id) {
  const btn = document.createElement("button");
  btn.innerText = `Eliminar`;
  btn.className = "delete";

  btn.onclick = (e) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    productFound = cart.find((el) => el.id === id);

    if (productFound.amount == 1) {
      let cartIds = cart.map((el) => el.id);
      let productId = cartIds.indexOf(id);

      cart.splice(productId, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      totalCost = totalCostCalculation();
      localStorage.setItem("totalCost", totalCost);

      purchase.removeChild(e.target.parentElement);
    } else {
      productFound.price =
        (productFound.price / productFound.amount) * (productFound.amount - 1);
      productFound.amount -= 1;
      purchase.removeChild(e.target.parentElement);

      updateList(productFound);

      let cartIds = cart.map((el) => el.id);
      let productId = cartIds.indexOf(id);

      cart.splice(productId, 1);
      cart.push(productFound);
      localStorage.setItem("cart", JSON.stringify(cart));

      totalCost = totalCostCalculation();
      localStorage.setItem("totalCost", totalCost);
    }

    if (totalCost == 0) {
      localStorage.clear();
      okButton.remove();
      emptyButton.remove();
      okTitle.remove();
      location.reload();

      greeting.innerHTML = `¡Bienvenido a De la Cruz! 
            Tu carrito esta vacío, dirigite a shop para comprar.`;

      const emptyP = document.querySelector(".pVacio");
      emptyP.innerText = "No hay productos en el carrito";
    }
  };
  return btn;
}

function updateList(obj) {
  let updatedLi = document.createElement("li");
  updatedLi.innerText = `${obj.name} (${obj.amount});    
    $${obj.price}`;
  updatedLi.className = "productoActualizado";
  purchase.appendChild(updatedLi);
  updatedLi.append(deleteProduct(obj.id));
}

function emptyCart() {
  localStorage.clear();
  okButton.remove();
  emptyButton.remove();
  okTitle.remove();
  location.reload();
}

function budgetAssessment(budget, total) {
  okTitle.remove();
  okButton.remove();
  emptyButton.remove();

  if (budget >= total) {
    confirm.innerText = `Tu gasto total es ${total}$ y tu presupuesto es suficiente. 
        ¿Deseas continuar la compra?`;
    return true;
  } else {
    confirm.innerText = `Lo sentimos, tu gasto total es ${total}$ y tu presupuesto es insuficiente. 
        Esperamos que regreses pronto!`;

    localStorage.clear();
    greeting.remove();
    confirmButton.remove();
    purchase.remove();
    btn.remove();
    return false;
  }
}

function buying() {
  welcome.remove();

  const userName = localStorage.getItem("nombre");
  const userBudget = localStorage.getItem("dinero");

  greeting.innerText = `¡Hola ${userName}! Estos son los productos que seleccionaste:`;

  let cart = JSON.parse(localStorage.getItem("cart"));

  for (let product of cart) {
    let li = document.createElement("li");
    li.innerText = `${product.name} (${product.amount})    
        $${product.price}`;
    li.className = "producto";
    purchase.appendChild(li);
    li.appendChild(deleteProduct(product.id));
  }

  okTitle.className = "okTitle";
  okButton.className = "okButton";
  emptyButton.className = "vaciarButton";

  okButton.onclick = () => {
    confirmButton.className = "confirmButton";

    totalCost = localStorage.getItem("totalCost");
    totalCost = totalCostCalculation();

    budgetAssessment(userBudget, totalCost);

    confirmButton.onclick = () => {
      Swal.fire({
        title:
          "¿Te gustaria suscribirte a nuestro newletter y obtener un 10% de descuento?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `¡Si, quiero mi 10% off!`,
        denyButtonText: `No, gracias.`,
      }).then((result) => {
        if (result.isConfirmed) {
          function descuento(totalCost) {
            nuevoTotal = totalCost * 0.9;
          }
          descuento(totalCost);

          Swal.fire({
            title: `Tu nuevo total es ARS ${nuevoTotal}$`,
            confirmButtonText: `Comprar`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "¡Tu compra ha sido realizada con éxito!",
                "",
                "success"
              );
              confirm.innerText = `Gracias por comprar en De la Cruz. ¡Volvé pronto!`;
            }
          });
        } else if (result.isDenied) {
          Swal.fire({
            title: `Tu total es ARS ${totalCost}$`,
            confirmButtonText: `Comprar`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "¡Tu compra ha sido realizada con éxito!",
                "",
                "success"
              );
              confirm.innerText = `Gracias por comprar en De la Cruz. ¡Volvé pronto!`;
            }
          });
        }
      });

      localStorage.clear();
      confirmButton.remove();
      greeting.remove();
      purchase.remove();
      btn.remove();
      li.remove();
    };
  };

  emptyButton.onclick = () => {
    emptyCart();
  };
}

let nombre = localStorage.getItem("nombre");
let dinero = localStorage.getItem("dinero");
let formulario = document.querySelector(".formulario");

function showOnScreen() {
  totalCost = totalCostCalculation();
  localStorage.setItem("totalCost", totalCost);

  if (totalCost == 0) {
    formulario.className = "form";
    welcome.remove();
    confirmButton.remove();

    greeting.innerHTML = `¡Bienvenido a De la Cruz! 
        Tu carrito esta vacío, dirigite a shop para comprar.`;

    const emptyP = document.querySelector(".pVacio");
    emptyP.innerText = "No hay productos en el carrito";
  } else {
    if (nombre && dinero) {
      formulario.className = "form";
      welcome.remove();
      buying();
    } else {
      formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        nombre = document.querySelector("#name").value;
        localStorage.setItem("nombre", nombre);

        dinero = document.querySelector("#money").value;
        localStorage.setItem("dinero", dinero);

        formulario.className = "form";

        buying();
      });
    }
  }
}

showOnScreen();

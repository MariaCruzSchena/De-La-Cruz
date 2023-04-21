//SELECCION DE PRODUCTOS POR EL USUARIO Y GUARDADO EN LOCAL STORAGE

class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

const products = [
  new Product(0, "Conserjería nutricional", 15000, true),
  new Product(1, "Entrenamientos personalizados", 15000, true),
  new Product(2, "E-Book Form", 15000, true),
  new Product(3, "E-Book Pace", 15000, true),
  new Product(4, "E-Book Yang", 15000, true),
  new Product(5, "E-Book Breathe", 15000, true),
  new Product(6, "E-Book Eat", 15000, true),
];

const stock = products.filter((el) => el.stock == true);

function add(id, name, price) {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ id: id, name: name, amount: 1, price: price }])
    );
    return;
  }

  let productFinder = cart.find((element) => element.id === id);

  if (!productFinder) {
    cart.push({ id: id, name: name, amount: 1, price: price });
  } else {
    for (let product of cart) {
      if (product.id == id) {
        product.amount++;
        product.price = price * product.amount;
        break;
      }
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function alert(name) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: `¡El producto ${name} se guardo en tu carrito!`,
    showConfirmButton: false,
    timer: 1000,
  });
}

document.querySelector(".comprar0").onclick = () => {
  add(stock[0].id, stock[0].name, stock[0].price);
  alert(stock[0].name);
};

document.querySelector(".comprar1").onclick = () => {
  add(stock[1].id, stock[1].name, stock[1].price);
  alert(stock[1].name);
};

document.querySelector(".comprar2").onclick = () => {
  add(stock[2].id, stock[2].name, stock[2].price);
  alert(stock[2].name);
};

document.querySelector(".comprar3").onclick = () => {
  add(stock[3].id, stock[3].name, stock[3].price);
  alert(stock[3].name);
};

document.querySelector(".comprar4").onclick = () => {
  add(stock[4].id, stock[4].name, stock[4].price);
  alert(stock[4].name);
};

document.querySelector(".comprar5").onclick = () => {
  add(stock[5].id, stock[5].name, stock[5].price);
  alert(stock[5].name);
};

document.querySelector(".comprar6").onclick = () => {
  add(stock[6].id, stock[6].name, stock[6].price);
  alert(stock[6].name);
};

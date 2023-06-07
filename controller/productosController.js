const fs = require('fs');
const path = require('path');


const productosFilePath = path.join(__dirname, '../data/cosmeticos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const imagesFilePath = path.join(__dirname, "../data/image.json");
const images = JSON.parse(fs.readFileSync(imagesFilePath, "utf-8"));


const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productosController = {
  list: (req, res) => {
    res.render("productos/list", { productos, toThousand });
  },
  create: (req, res) => {
    res.render("productos/creacionProductos");
  },
  store: (req, res) => {
    let { nombre, tono, precio, oferta, stock, imagenBanner, image } = req.body;
    console.log(req.file);
    let newProduct = {
      id: productos[productos.length - 1].id + 1,
      nombre,
      tono,
      precio,
      oferta,
      stock,
      imagenBanner: " ",
      image: req.file ? req.file.filename : "Rose.jpg",
    };

    productos.push(newProduct);
    fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
    res.redirect("/productos");
  },
  detail: (req, res) => {
    let idProduct = req.params.id;
    let product = productos.find((product) => product.id == idProduct);
    let image = images.find((image) => image.id == idProduct);
    let hayStock = 0;
    let cssStock = 0;
    if (product.stock == 0) {
      hayStock = " No hay en stock";
      cssStock = "status_stock_no";
    } else {
      hayStock = "hay" + product.stock + "en stock";
      cssStock = "status_stock_si";
    }
    res.render("productos/detail", {
      title: product.nombre,
      hayStock,
      cssStock,
      product,
      image,
      toThousand,
    });
  },
  editProd: (req, res) => {
    let id = req.params.id;
    let editProduct = productos.find((producto) => producto.id == id);
    res.render("productos/edicionProd", { editProduct });
  },
  update: (req, res) => {
    let id = req.params.id;
    let editProduct = productos.find((producto) => producto.id == id);
    editProduct = {
      id: editProduct.id,
      ...req.body,

      stock: editProduct.stock,
      imagenBanner: editProduct.imagenBanner,
      image: editProduct.image,
    };
    let newproducts = productos.map((producto) => {
      if (producto.id === editProduct.id) {
        return (product = { ...editProduct });
      }
      return producto;
    });
    fs.writeFileSync(productosFilePath, JSON.stringify(newproducts, null, " "));
    res.redirect(editProduct.id);
  },
  editImage: (req, res) => {
    let id = req.params.id;
    let editImage = images.find((producto) => producto.id == id);
    res.render("productos/editImageProd", { editImage });
  },

  destroy: (req, res) => {
    let id = req.params.id;
    let finalProductos = productos.filter((producto) => producto.id != id);

    fs.writeFileSync(
      productosFilePath,
      JSON.stringify(finalProductos, null, " ")
    );
    res.redirect("/productos");
  },
};

module.exports = productosController;  
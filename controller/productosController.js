const fs = require('fs');
const path = require('path');
const productosFilePath = path.join(__dirname, '../data/cosmeticos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productosController ={
    list:(req,res)=> {
        res.render('home',{productos})
    },
    create: (req,res) => {
        res.render ('productos/creacionProductos');
    },
    store: (req,res) =>{
        const { nombre, tono, precio, oferta } = req.body;
        const newProduct = {
            id: productos[productos.length - 1].id + 1,
            nombre,
            tono,
            precio,
            oferta,
            stock
        };
        productos.push(newProduct);
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "));
        res.redirect('/');
    },
    detail: (req,res)=>{
        let idProduct = req.parms.id;
        let product = productos.find(product =>product.id = idProduct)
        let hayStock = 0
        let cssStock = 0
        if (product.stock == 0){
            hayStock = " No hay en stock"
            cssStock = "status_stock_no"

        }else{
            hayStock = "hay"+ product.stock + "en stock"
        }
        res.render("productos/detail",{title : productos.nombre,hayStock,cssStock})
    },
    editProd: (req,res)=>{
        let id = req.params.id
        let editProduct= productos.find(producto => producto.id == id)
        res.render("productos/ediciomProd",{editProduct})
    },
    uptdate:(req,res)=>{
        let id = req.params.id
        let editProduct = productos.find(producto => producto.id == id)
        editProduct={
            id:editProduct.id,
            ...req.body,
            cantVendida:editProduct.cantVendida,
            stock:editProduct.stock,

        }
      let newproducts = productos.map(producto => {
        if(producto.id==editProduct.id){
        return 
        }
      }
        )  
    }
}

module.exports = productosController;  
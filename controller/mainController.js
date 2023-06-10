const fs = require("fs");
const path = require("path");

const productosFilePath = path.join(__dirname, "../data/cosmeticos.json");
const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
    home: (req,res)=>{
    const inSaleProducts = productos.filter ( (producto) => {
		return producto.oferta === "si";
	});

    const masVendidosProducts = productos.sort(function (a, b){
        return (b.cantVendida - a.cantVendida)
    })
    const topCincoVendidos = masVendidosProducts.slice(0,6)
       
    res.render('home',{ productos, inSaleProducts, topCincoVendidos, toThousand });
	},
    
    carrito: (req,res)=>{
        res.render('productos/carrito');
        // renderizar vista de carrito
 
    },
}
module.exports = mainController;
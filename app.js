const express = require("express");
const session = require("express-session");
const hbs = require("hbs");

const app = express();
const port = 5000;

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

//MIDDLEWARES FUNCIONES QUE NOS AGREGAN FUNCIONALIDAD

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(
    session({
        secret: "11123o3",
        resave: true,
        saveUninitialized:true,
    })
);

app.get("/", (req,res)=>{
    res.render("home");
})

// Hacemos una nueva ruta con app.post (post viene del formulario)
// Uso post cuando quiero enviar información Cuando usamos post la informacion no se ve en el navegador
app.post("/registro", (req, res)=>{
    req.session.myvariable = req.body
    res.redirect("/perfil"); //redirect lo redirije a perfil
})

app.get("/perfil", (req, res)=>{
  const usuario = req.session.myvariable;
  delete req.session.myvariable;
  res.render("perfil", {
      usuario
  })
})


app.listen(port, ()=>{
    console.log(`Usando el puerto http://localhost: ${port}`);
});


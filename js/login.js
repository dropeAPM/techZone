
//volver a la pagina de inicio
function volverPrincipal(){
    location.href = "../index.html";
};
// lista de usuarios (admins)
let admin =[
    {user:"admin",password:"admin"},
];

//funciones para el login

function validarUsuario(usuario,contra){
    for (var i = 0; i < admin.length; i++){
        if(admin[i].user === usuario && admin[i].password === contra){
            alert("Usuario Correcto")
            location.href =("admin.html")
            return true;
        }
    }
    alert("Usuario No encontrado")
    return false;

};
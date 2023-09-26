import service from "./service";

function autenticar(email, senha){
    return new Promise((resolve, reject) => {
        service.post('/login', {email, senha})
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    });
}

function salvarToken(token){
    localStorage.setItem('token', token)
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

function obterToken(){
    return localStorage.getItem("token") // returns token value
}

function obterUsuario(){
    return localStorage.getItem("usuario") || "{}"; // returns item user or nothing
}

function sairSistema(){
    localStorage.removeItem("token"); //remove the "token" item, clear 
    localStorage.removeItem("usuario");
    direcionarTelaDeLogin();
}

function direcionarTelaDeLogin(){
    window.open('/login','_self');
}

function usuarioEstaLogado(){
    let token = obterToken();

    return !!token;
}

function validarUsuarioAutenticado(){

    let logado = usuarioEstaLogado();

    if(window.location.pathname == "/login"){
        if(logado){
            window.open("/", '_self')
        }
    } else if(!logado && window.location.pathname != "/login"){
        direcionarTelaDeLogin();
    }
}
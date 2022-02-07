const visualizacao = document.querySelector(".containercheck");
const tbody = document.querySelector("tbody");
const pswUser = document.querySelector("#pswUser");
const imgUser = document.querySelector("#imgUser");
const emailUser = document.querySelector("#emailUser");

const camera = document.querySelector("#camera");
const foto = document.querySelector("#foto");

const menu = document.querySelector('.menu');
const menuimg = document.querySelector('.menu-img')

const userData = JSON.parse(localStorage.getItem('userdata'));

var imagem = "";

camera.addEventListener("click", () => {
    foto.click();
});

foto.addEventListener("change", (e) => {
    let file = e.target.files[0];

    let reader = new FileReader();

    reader.onload = (data) => {
        //console.log(data.target.result);
        imagem = data.target.result;
        imgUser.src = imagem;
    }

    reader.readAsDataURL(file);
});

function load() {
    carregarAlertas();
    carregarMeusAlertas();
    carregarDados();
}

function carregarMeusAlertas() {
    let idUser = JSON.parse(localStorage.getItem("userdata")).id;
    fetch("http://localhost:3000/local?id_user=" + idUser)
        .then(resp => { return resp.json() })
        .then(data => {
            data.forEach(local => {
                let tr = document.createElement('tr');

                let tdId = document.createElement('td');
                let tdCoord = document.createElement('td');
                let tdTipo = document.createElement('td');

                tdId.innerHTML = local.id;
                tdCoord.innerHTML = local.coordenadas;
                tdCoord.style.maxWidth = "150px"
                tdCoord.style.wordWrap = "break-word";
                tdTipo.innerHTML = local.alertum.tipo;

                tr.appendChild(tdId);
                tr.appendChild(tdCoord);
                tr.appendChild(tdTipo);

                tbody.appendChild(tr);
            })
        })
}

function carregarAlertas() {
    let alertas = localStorage.getItem('alertas');

    fetch("http://localhost:3000/alerta")
        .then(resp => { return resp.json(); })
        .then(data => {
            data.forEach(alerta => {
                let label = document.createElement("label");
                let checkbox = document.createElement("input");
                let meualerta = document.createElement("div");
                meualerta.className = "div-checkbox"

                label.innerHTML = alerta.tipo;
                label.for = alerta.id;

                checkbox.type = "checkbox";
                checkbox.name = alerta.id;
                if (alertas !== null) {
                    if (alertas.includes(alerta.id)) checkbox.checked = true;
                } else {
                    checkbox.checked = true;
                }


                meualerta.appendChild(checkbox);
                meualerta.appendChild(label);
                visualizacao.appendChild(meualerta);
            })
        })
}

function carregarDados() {
    imgUser.src = (userData.foto !== "") ? userData.foto : '../assets/avatar.png';
    emailUser.value = userData.email;
}

function atualizarDados() {
    let data = {};

    if (pswUser.value !== "") data.senha = md5(pswUser.value);
    if (emailUser.value !== userData.email) data.email = emailUser.value;
    if (imgUser.src !== userData.foto) data.foto = imgUser.src;
    console.log("http://localhost:3000/usuario/" + userData.id)

    fetch("http://localhost:3000/usuario/" + userData.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => { return resp.json() })
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                localStorage.setItem('userdata', JSON.stringify(data[0]));
                window.location.reload();
            } else {
                alert("Não foi possível atualizar os dados");
            }
        })
}

function mostrarMeusAlertas(e) {
    e.classList.toggle("up");
    e.parentNode.parentNode.classList.toggle("show");
}

function salvaralertasAtivos() {
    let alertas = document.querySelector("#alerts").querySelectorAll("input")
    let arr = []

    alertas.forEach(alertas => {
        if (alertas.checked == true) arr.push(alertas.name);
    })

    localStorage.setItem('alertas', arr);
    alert("Alertas Slavos")
}

function showMenu() {
    menu.style.left = "0"
    menuimg.style.marginLeft = "-250px"

}

function closeMenu() {
    menu.style.left = "-50vw"
    menuimg.style.marginLeft = "0"
}

function gotoMap() {
    window.location.href = "../Home"
}

function Sair() {
    localStorage.clear();
    window.location.href = "../Login"
}
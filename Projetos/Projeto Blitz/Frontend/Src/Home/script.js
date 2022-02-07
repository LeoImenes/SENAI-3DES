const alerta = document.querySelector('#alerta')
const cadastrar = document.querySelector('.cadastrar')
const modal = document.querySelector('.modal')
const body = document.querySelector('body');
const menu = document.querySelector('.menu');
const menuimg = document.querySelector('.menu-img')

var map;
var meuAlerta;

function initMap() {
    map = new google.maps.Map(document.querySelector(".map"), {
        center: { lat: -22.7038255, lng: -46.9926161 },
        zoom: 18,
    });

    map.addListener("click", (data) => {
        // console.log(data.latLng.lat(), data.latLng.lng())
        let coord = {
                lat: data.latLng.lat(),
                lng: data.latLng.lng()
            }
            // addMarker(coord, "teste", "../Assets/Icons/radar.png")
        meuAlerta = coord

        showModal();
    })

    navigator.geolocation.getCurrentPosition((location) => {
        console.log(location.coords.latitude, location.coords.longitude)
        let coord = { lat: location.coords.latitude, lng: location.coords.longitude }

        map.setCenter(coord);

        new google.maps.Marker({
            position: coord,
            map: map,
            title: "Hello",
            icon: "../Assets/Icons/map-icon/loca.png"
        })

    });



}

function addMarker(coord, title, image) {
    new google.maps.Marker({
        position: coord,
        map: map,
        title: title,
        icon: image
    })
}

function cadastro() {

    let idUser = JSON.parse(localStorage.getItem("userdata")).id

    let data = JSON.stringify({
        "id_user": idUser,
        "id_alerta": alerta.value,
        "coordenadas": meuAlerta.lat + "," + meuAlerta.lng,
        "ativo": true
    })
    fetch("http://localhost:3000/local", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": data
        }).then(response => { return response.json() })
        .then(data => {
            console.log(data)
            if (data.id != undefined) {
                let tipo = alerta.value;
                addMarker(meuAlerta, tipo, "../Assets/Icons/map-icon/" + tipo + ".png");

                modal.hidden = true;
            } else {
                alert("Falha ao informar alerta")
            }
        })


}

function carregarAlertas() {
    console.log("teste")
    fetch("http://localhost:3000/alerta")
        .then(response => { return response.json() })
        .then(data => {
            data.forEach(alert => {
                let op = document.createElement("option");
                op.value = alert.id;
                op.innerHTML = alert.tipo;
                alerta.appendChild(op);

            })
        })
}

function inicializar() {
    mostrarMarcacoes();
    carregarAlertas();

}

function mostrarMarcacoes() {
    let alertas = localStorage.getItem('alertas');



    fetch("http://localhost:3000/local")
        .then(response => { return response.json() })
        .then(data => {
            data.forEach(localizacao => {

                let coordenadas = localizacao.coordenadas.split(",");
                let coord = { lat: Number(coordenadas[0]), lng: Number(coordenadas[1]) }
                let imagem = "../assets/icons/map-icon/" + localizacao.alertum.id + ".png"
                if (alertas !== null) {
                    if (alertas.includes(localizacao.alertum.id)) {
                        addMarker(coord, localizacao.alertum.tipo, imagem)
                    }
                } else {
                    addMarker(coord, localizacao.alertum.tipo, imagem)
                }

            })
        })
}

function showModal() {
    modal.style.display = 'flex'
}

function closeModal() {
    modal.style.display = 'none'
}

function showMenu() {
    menu.style.left = "0"
    menuimg.style.marginLeft = "-250px"

}

function closeMenu() {
    menu.style.left = "-50vw"
    menuimg.style.marginLeft = "0"
}

function gotoConfig() {
    window.location.href = "../UserPage"
}

function Sair() {
    localStorage.clear();
    window.location.href = "../Login"


}
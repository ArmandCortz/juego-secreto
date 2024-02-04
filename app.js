let numerosSorteados = [];
let numeroMaximo = 10;
function asignarTextoElemento(elemento, texto) {
	let elementoHTML = document.querySelector(elemento);
	elementoHTML.innerHTML = texto;
	return;
}

function asignarAtributoElemento(idelemento, atributo, texto) {
	let elemento = document.getElementById(idelemento);
	elemento.setAttribute(atributo, texto);
}
function escucha() {
	document
		.getElementById("valorUsuario")
		.addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				// Definimos la tecla que se desea capturar
				event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario
				verificarIntento(); // Llamamos la funcion verificarIntento
			}
		});
}

function verificarIntento() {
	let numeroDeUsuario = parseInt(
		document.querySelector("#valorUsuario").value
	);

	if (numeroDeUsuario === numeroSecreto) {
		asignarTextoElemento(
			"small",
			`¡Acertaste, el número secreto es: ${numeroSecreto}, Lo hiciste en ${intentos} ${
				intentos == 1 ? "oportunidad" : "oportunidades"
			}!`
		);
		limpiarCaja();
		document
			.querySelector("#valorUsuario")
			.setAttribute("disabled", "true");
		document.querySelector("#intentar").setAttribute("disabled", "true");
		document.querySelector("#reiniciar").removeAttribute("hidden");
		document.querySelector("#reiniciar").innerHTML = "Nuevo juego";
	} else if (numeroDeUsuario !== numeroSecreto) {
		if (numeroDeUsuario > numeroSecreto) {
			asignarTextoElemento("small", "El número secreto es menor");
			document.querySelector("#reiniciar").innerHTML = "Reiniciar juego";
			document.querySelector("#reiniciar").removeAttribute("hidden");
			limpiarCaja();
			intentos++;
		} else {
			asignarTextoElemento("small", "El número secreto es mayor");
			document.querySelector("#reiniciar").innerHTML = "Reiniciar juego";
			document.querySelector("#reiniciar").removeAttribute("hidden");
			limpiarCaja();
			intentos++;
		}
	}
	return;
}

function limpiarCaja() {
	document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
	let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
	if (
		numerosSorteados.includes(numeroGenerado) &&
		numerosSorteados.length < numeroMaximo
	) {
		return generarNumeroSecreto();
	} else if (numerosSorteados.length === numeroMaximo) {
		asignarTextoElemento(
			"small",
			"Se han sorteado todos los números posibles disponibles"
		);
		document
			.querySelector("#valorUsuario")
			.setAttribute("disabled", "true");
		document.querySelector("#intentar").setAttribute("hidden", "true");
		document.querySelector("#resetall").removeAttribute("hidden");
		limpiarCaja();
	} else {
		numerosSorteados.push(numeroGenerado);
		return numeroGenerado;
	}
}

function condicionesIniciales() {
	asignarTextoElemento("h1", "¡Juego del número secreto!");
	asignarAtributoElemento(
		"valorUsuario",
		"placeholder",
		`Indica un número del 1 al ${numeroMaximo}.`
	);
	asignarTextoElemento("small", "");
	document.querySelector("#valorUsuario").removeAttribute("disabled");
	document.querySelector("#intentar").removeAttribute("disabled");
	document.querySelector("#reiniciar").setAttribute("hidden", "true");
	document.querySelector("#resetall").setAttribute("hidden", "true");
	numeroSecreto = generarNumeroSecreto();
	// console.log(numeroSecreto);
	escucha();
	intentos = 1;
}

function reiniciarJuego(n) {
	if (n === 1) {
		limpiarCaja();
		numerosSorteados = [];
		condicionesIniciales();
		document.querySelector("#intentar").removeAttribute("hidden");
		document.querySelector("#reiniciar").setAttribute("hidden", "true");
	} else {
		condicionesIniciales();
		document.querySelector("#reiniciar").setAttribute("hidden", "true");
	}
}

condicionesIniciales();

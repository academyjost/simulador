//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
// Referencias a los botones
const btnCalcular = document.getElementById("btnCalcular");
const btnReiniciar = document.getElementById("btnReiniciar");

btnCalcular.addEventListener("click", function() {
    // 1. Capturar valores de la pantalla
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let egresos = parseFloat(document.getElementById("txtEgresos").value) || 0;
    let monto = parseFloat(document.getElementById("txtMonto").value) || 0;
    let plazo = parseFloat(document.getElementById("txtPlazo").value) || 0;
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value) || 0;

    // 2. Usar las funciones de 'funciones.js' para los cálculos
    let disponible = obtenerDisponible(ingresos, egresos);
    let capacidadPago = disponible * 0.40; // 40% según la regla bancaria
    
    let interesTotal = calcularInteres(monto, tasa, plazo);
    let totalPrestamo = monto + interesTotal;
    let cuotaMensual = totalPrestamo / (plazo * 12);

    // 3. Mostrar resultados usando la función de 'utils.js'
    mostrarEnSpan("spnDisponible", "$" + disponible.toFixed(2));
    mostrarEnSpan("spnCapacidadPago", "$" + capacidadPago.toFixed(2));
    mostrarEnSpan("spnInteresPagar", "$" + interesTotal.toFixed(2));
    mostrarEnSpan("spnTotalPrestamo", "$" + totalPrestamo.toFixed(2));
    mostrarEnSpan("spnCuotaMensual", "$" + cuotaMensual.toFixed(2));

    // 4. Determinar si se aprueba
    let estado = analizarEstado(cuotaMensual, capacidadPago);
    let spanEstado = document.getElementById("spnEstadoCredito");
    spanEstado.textContent = estado;
    
    // Cambiar color visualmente según el resultado
    spanEstado.style.color = (estado === "APROBADO") ? "#28a745" : "#dc3545";
});

btnReiniciar.addEventListener("click", function() {
    // Limpia la página para un nuevo cálculo
    location.reload();
});
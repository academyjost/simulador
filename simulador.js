//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML
// Referencias a los botones
const btnCalcular = document.getElementById("btnCalcular");
const btnReiniciar = document.getElementById("btnReiniciar");

btnCalcular.addEventListener("click", function() {
    // 1. Capturar Ingresos
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;

    // 2. Capturar los nuevos 3 campos de gastos
    let arriendo = parseFloat(document.getElementById("txtArriendo").value) || 0;
    let alimentacion = parseFloat(document.getElementById("txtAlimentacion").value) || 0;
    let varios = parseFloat(document.getElementById("txtVarios").value) || 0;

    // 3. Calcular el total de egresos (Punto 3 de tu pedido)
    let totalEgresos = arriendo + alimentacion + varios;
    
    // Mostramos el total de gastos en pantalla
    mostrarEnSpan("spnTotalEgresos", "$" + totalEgresos.toFixed(2));

    // 4. Capturar datos del préstamo
    let monto = parseFloat(document.getElementById("txtMonto").value) || 0;
    let plazo = parseFloat(document.getElementById("txtPlazo").value) || 0;
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value) || 0;

    // 5. Cálculos (Se mantiene igual, pero usando 'totalEgresos')
    let disponible = obtenerDisponible(ingresos, totalEgresos);
    let capacidadPago = disponible * 0.40; 
    
    let interesTotal = calcularInteres(monto, tasa, plazo);
    let totalPrestamo = monto + interesTotal;
    let cuotaMensual = totalPrestamo / (plazo * 12);

    // 6. Mostrar el resto de resultados
    mostrarEnSpan("spnDisponible", "$" + disponible.toFixed(2));
    mostrarEnSpan("spnCapacidadPago", "$" + capacidadPago.toFixed(2));
    mostrarEnSpan("spnInteresPagar", "$" + interesTotal.toFixed(2));
    mostrarEnSpan("spnTotalPrestamo", "$" + totalPrestamo.toFixed(2));
    mostrarEnSpan("spnCuotaMensual", "$" + cuotaMensual.toFixed(2));

    // 7. Analizar aprobación
    let estado = analizarEstado(cuotaMensual, capacidadPago);
    document.getElementById("spnEstadoCredito").textContent = estado;
});
btnReiniciar.addEventListener("click", function() {
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtArriendo").value = "";
    document.getElementById("txtAlimentacion").value = "";
    document.getElementById("txtVarios").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";
    
    // Reiniciar los spans
    mostrarEnSpan("spnTotalEgresos", "$0.00");
    mostrarEnSpan("spnDisponible", "$0.00");
    mostrarEnSpan("spnCapacidadPago", "$0.00");
    mostrarEnSpan("spnInteresPagar", "$0.00");
    mostrarEnSpan("spnTotalPrestamo", "$0.00");
    mostrarEnSpan("spnCuotaMensual", "$0.00");
    document.getElementById("spnEstadoCredito").textContent = "ESPERANDO DATOS...";
});
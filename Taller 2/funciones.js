// Calcula la diferencia entre ingresos y egresos
function obtenerDisponible(ingresos, egresos) {
    return ingresos - egresos;
}

// Calcula el interés simple (Monto * Tasa * Tiempo)
function calcularInteres(monto, tasaAnual, años) {
    let tasaDecimal = tasaAnual / 100;
    return monto * tasaDecimal * años;
}

// Determina si el crédito es aprobado
function analizarEstado(cuota, capacidad) {
    if (cuota > capacidad) {
        return "RECHAZADO (Excede capacidad)";
    } else {
        return "APROBADO";
    }
}
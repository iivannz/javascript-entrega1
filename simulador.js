// Simulador de División de Cuenta
// Variables globales
let montoTotal = 0;
let numeroComensales = 0;
let nombresComensales = [];
let propina = 0;
let totalConPropina = 0;
let montoPorPersona = 0;

// Constantes
const PORCENTAJE_PROPINA = 0.10; // 10% de propina

console.log("=== SIMULADOR DE DIVISIÓN DE CUENTA ===");
console.log("Bienvenido al simulador de división de cuenta");
console.log("Presiona F12 para ver la consola y hacer clic en 'Iniciar Simulador'");

// Función 1: ENTRADA DE DATOS - Obtener información del usuario
function obtenerDatosEntrada() {
    console.log("\n--- RECOPILANDO DATOS ---");
    
    // Obtener monto total de la cuenta
    do {
        let montoIngresado = prompt("¿Cuál es el monto total de la cuenta? (Ingresa solo números)");
        
        // Validar que se ingresó algo
        if (montoIngresado === null) {
            alert("Operación cancelada");
            return false;
        }
        
        montoTotal = parseFloat(montoIngresado);
        
        // Validar que es un número válido y positivo
        if (isNaN(montoTotal) || montoTotal <= 0) {
            alert("Por favor, ingresa un monto válido mayor a 0");
            montoTotal = 0;
        }
    } while (montoTotal <= 0);
    
    console.log(`Monto total de la cuenta: $${montoTotal}`);
    
    // Obtener número de comensales
    do {
        let numeroIngresado = prompt("¿Cuántos comensales van a dividir la cuenta?");
        
        if (numeroIngresado === null) {
            alert("Operación cancelada");
            return false;
        }
        
        numeroComensales = parseInt(numeroIngresado);
        
        if (isNaN(numeroComensales) || numeroComensales <= 0) {
            alert("Por favor, ingresa un número válido de comensales mayor a 0");
            numeroComensales = 0;
        }
    } while (numeroComensales <= 0);
    
    console.log(`Número de comensales: ${numeroComensales}`);
    
    // Obtener nombres de los comensales
    nombresComensales = []; // Limpiar array
    
    for (let i = 0; i < numeroComensales; i++) {
        let nombre;
        do {
            nombre = prompt(`Ingresa el nombre del comensal ${i + 1}:`);
            
            if (nombre === null) {
                alert("Operación cancelada");
                return false;
            }
            
            if (nombre.trim() === "") {
                alert("El nombre no puede estar vacío. Por favor, ingresa un nombre válido.");
            }
        } while (nombre.trim() === "");
        
        nombresComensales.push(nombre.trim());
        console.log(`Comensal ${i + 1}: ${nombre.trim()}`);
    }
    
    return true;
}

// Función 2: PROCESAMIENTO DE DATOS - Calcular propina y división
function procesarDatos() {
    console.log("\n--- PROCESANDO CÁLCULOS ---");
    
    // Calcular propina del 10%
    propina = montoTotal * PORCENTAJE_PROPINA;
    console.log(`Propina (10%): $${propina.toFixed(2)}`);
    
    // Calcular total con propina
    totalConPropina = montoTotal + propina;
    console.log(`Total con propina: $${totalConPropina.toFixed(2)}`);
    
    // Calcular monto por persona
    montoPorPersona = totalConPropina / numeroComensales;
    console.log(`Monto por persona: $${montoPorPersona.toFixed(2)}`);
    
    return true;
}

// Función 3: SALIDA DE DATOS - Mostrar resultados finales
function mostrarResultados() {
    console.log("\n--- RESULTADOS FINALES ---");
    
    // Crear mensaje detallado para mostrar
    let mensaje = "=== DIVISIÓN DE CUENTA ===\n\n";
    mensaje += `Monto original: $${montoTotal.toFixed(2)}\n`;
    mensaje += `Propina (10%): $${propina.toFixed(2)}\n`;
    mensaje += `Total a pagar: $${totalConPropina.toFixed(2)}\n\n`;
    mensaje += `Número de comensales: ${numeroComensales}\n`;
    mensaje += `Monto por persona: $${montoPorPersona.toFixed(2)}\n\n`;
    mensaje += "LISTA DE COMENSALES:\n";
    
    // Mostrar cada comensal con su monto a pagar
    for (let i = 0; i < nombresComensales.length; i++) {
        mensaje += `${i + 1}. ${nombresComensales[i]}: $${montoPorPersona.toFixed(2)}\n`;
        console.log(`${nombresComensales[i]} debe pagar: $${montoPorPersona.toFixed(2)}`);
    }
    
    // Mostrar resultado en alert
    alert(mensaje);
    
    // Confirmar si desea realizar otro cálculo
    let repetir = confirm("¿Deseas dividir otra cuenta?");
    
    if (repetir) {
        iniciarSimulador();
    } else {
        alert("¡Gracias por usar el simulador de división de cuenta!");
        console.log("Simulador finalizado. ¡Hasta la próxima!");
    }
}

// Función principal que coordina todo el simulador
function iniciarSimulador() {
    console.log("\n=== INICIANDO NUEVO CÁLCULO ===");
    
    // Llamar a las tres funciones principales en secuencia
    if (obtenerDatosEntrada()) {
        if (procesarDatos()) {
            mostrarResultados();
        }
    }
}

// Función adicional para mostrar información del simulador
function mostrarInformacion() {
    console.log("\n=== INFORMACIÓN DEL SIMULADOR ===");
    console.log("Este simulador te ayuda a:");
    console.log("1. Calcular la propina (10% automático)");
    console.log("2. Dividir el total entre todos los comensales");
    console.log("3. Mostrar cuánto debe pagar cada persona");
    console.log("4. Mantener registro de nombres para mejor organización");
    console.log("\nPara usar el simulador, haz clic en el botón 'Iniciar Simulador'");
}

// Mostrar información inicial
mostrarInformacion();
const opcionesPropina = [
    { numero: 1, porcentaje: 10, descripcion: '10%' },
    { numero: 2, porcentaje: 15, descripcion: '15%' },
    { numero: 3, porcentaje: 20, descripcion: '20%' },
    { numero: 4, porcentaje: null, descripcion: 'Otra' },
    { numero: 5, porcentaje: 0, descripcion: 'No dejar propina' }
];

let historialCuentas = [];

function iniciarCalculadora() {
    alert('¡Bienvenido a la Calculadora de Cuenta Restaurante!');
    
    let continuarCalculando = true;
    
    while (continuarCalculando) {
        const datosCuenta = solicitarDatosCuenta();
        
        if (datosCuenta === null) {
            continuarCalculando = false;
            mostrarHistorial();
            alert('¡Gracias por usar la calculadora!');
            break;
        }
        
        const resultadoDivision = calcularDivisionCuenta(datosCuenta);
        
        if (resultadoDivision !== null) {
            mostrarResultado(datosCuenta, resultadoDivision);
            guardarEnHistorial(datosCuenta, resultadoDivision);
        }
        
        continuarCalculando = confirm('¿Desea calcular otra división de cuenta?');
    }
    
    alert('¡Gracias por usar la calculadora!');
}

function solicitarDatosCuenta() {
    const datosCuenta = {};
    let precioValido = false;
    while (!precioValido) {
        const precio = parseFloat(prompt('Ingrese el precio final de la cuenta del restaurante:'));
        if (!isNaN(precio) && precio > 0) {
            datosCuenta.precioTotal = precio;
            precioValido = true;
        } else {
            alert('Por favor, ingrese un precio válido mayor a 0.');
        }
    }
    
    let comensalesValido = false;
    while (!comensalesValido) {
        const comensales = parseInt(prompt('Ingrese la cantidad de comensales:'));
        if (!isNaN(comensales) && comensales > 0) {
            datosCuenta.cantidadComensales = comensales;
            comensalesValido = true;
        } else {
            alert('Por favor, ingrese una cantidad válida de comensales mayor a 0.');
        }
    }
    
    const incluirPropina = confirm('¿Desean incluir propina en la cuenta?');
    datosCuenta.incluirPropina = incluirPropina;
    
    if (incluirPropina) {
        const propina = solicitarPropina(datosCuenta.precioTotal);
        if (propina === null) {
            return null;
        }
        datosCuenta.propina = propina;
    }
    
    return datosCuenta;
}

function calcularDivisionCuenta(datosCuenta) {
    if (!datosCuenta || datosCuenta.precioTotal <= 0 || datosCuenta.cantidadComensales <= 0) {
        alert('Error: Datos de cuenta inválidos.');
        return null;
    }
    
    let totalConPropina = datosCuenta.precioTotal;
    
    if (datosCuenta.incluirPropina && datosCuenta.propina > 0) {
        totalConPropina += datosCuenta.propina;
    }
    
    const montoPorPersona = totalConPropina / datosCuenta.cantidadComensales;
    
    return {
        montoPorPersona: montoPorPersona,
        totalConPropina: totalConPropina,
        propinaIncluida: datosCuenta.incluirPropina ? datosCuenta.propina : 0
    };
}

function solicitarPropina(precioTotal) {
    let propinaValida = false;
    let propina = 0;
    
    while (!propinaValida) {
        let mensajeOpciones = 'Seleccione el porcentaje de propina:\n\n';
        
        for (let i = 0; i < opcionesPropina.length; i++) {
            const opcion = opcionesPropina[i];
            mensajeOpciones += `${opcion.numero}. ${opcion.descripcion}\n`;
        }
        
        const opcionSeleccionada = prompt(mensajeOpciones);
        
        if (opcionSeleccionada === null) {
            return null;
        }
        
        const numeroOpcion = parseInt(opcionSeleccionada);
        
        if (!isNaN(numeroOpcion) && numeroOpcion >= 1 && numeroOpcion <= 5) {
            const opcionElegida = opcionesPropina.find(opcion => opcion.numero === numeroOpcion);
            
            if (opcionElegida) {
                if (opcionElegida.numero === 4) {
                    propina = solicitarPropinaPersonalizada(precioTotal);
                    if (propina !== null) {
                        propinaValida = true;
                    } else {
                        return null;
                    }
                } else if (opcionElegida.numero === 5) {
                    propina = 0;
                    propinaValida = true;
                } else {
                    propina = precioTotal * (opcionElegida.porcentaje / 100);
                    propinaValida = true;
                }
            }
        } else {
            alert('Por favor, ingrese un número válido del 1 al 5.');
        }
    }
    
    return propina;
}

function solicitarPropinaPersonalizada(precioTotal) {
    let propinaValida = false;
    let porcentajePropina = 0;
    
    while (!propinaValida) {
        const porcentajeInput = prompt(`Ingrese el porcentaje de propina (0-20):\n(Precio total: $${precioTotal})`);
        
        if (porcentajeInput === null) {
            return null;
        }
        
        porcentajePropina = parseFloat(porcentajeInput);
        if (!isNaN(porcentajePropina) && porcentajePropina >= 0 && porcentajePropina <= 20) {
            propinaValida = true;
        } else {
            alert('Por favor, ingrese un porcentaje válido entre 0 y 20.');
        }
    }
    
    const propina = precioTotal * (porcentajePropina / 100);
    return propina;
}

function mostrarResultado(datosCuenta, resultado) {
    let mensaje = `=== DIVISIÓN DE CUENTA ===\n\n`;
    mensaje += `Precio total: $${datosCuenta.precioTotal.toFixed(2)}\n`;
    mensaje += `Comensales: ${datosCuenta.cantidadComensales}\n`;
    
    if (datosCuenta.incluirPropina) {
        mensaje += `Propina: $${resultado.propinaIncluida.toFixed(2)}\n`;
        mensaje += `Total con propina: $${resultado.totalConPropina.toFixed(2)}\n`;
    }
    
    mensaje += `\n💰 CADA PERSONA PAGA: $${resultado.montoPorPersona.toFixed(2)}`;
    
    alert(mensaje);
    console.log(mensaje);
}

function guardarEnHistorial(datosCuenta, resultado) {
    const cuentaHistorial = {
        precioTotal: datosCuenta.precioTotal,
        cantidadComensales: datosCuenta.cantidadComensales,
        incluirPropina: datosCuenta.incluirPropina,
        propina: datosCuenta.incluirPropina ? resultado.propinaIncluida : 0,
        totalConPropina: resultado.totalConPropina,
        montoPorPersona: resultado.montoPorPersona,
        fecha: new Date().toLocaleString()
    };
    
    historialCuentas.push(cuentaHistorial);
}

function mostrarHistorial() {
    if (historialCuentas.length === 0) {
        alert('No hay cuentas en el historial.');
        return;
    }
    
    let mensajeHistorial = 'HISTORIAL DE CUENTAS DIVIDIDAS:\n\n';
    
    for (let i = 0; i < historialCuentas.length; i++) {
        const cuenta = historialCuentas[i];
        mensajeHistorial += `${i + 1}. Cuenta: $${cuenta.precioTotal.toFixed(2)} | `;
        mensajeHistorial += `${cuenta.cantidadComensales} personas | `;
        
        if (cuenta.incluirPropina) {
            mensajeHistorial += `Propina: $${cuenta.propina.toFixed(2)} | `;
        }
        
        mensajeHistorial += `Cada uno: $${cuenta.montoPorPersona.toFixed(2)}\n`;
        mensajeHistorial += `   Fecha: ${cuenta.fecha}\n\n`;
    }
    
    alert(mensajeHistorial);
    console.log('Historial completo:', historialCuentas);
}

console.log('Calculadora de Cuenta Restaurante iniciada');
console.log('Opciones de propina disponibles:', opcionesPropina.map(op => `${op.numero}. ${op.descripcion}`));
iniciarCalculadora();
// ============================================
// SIMULADOR DE TIENDA ONLINE - JavaScript
// Entrega 1 - Estructura del simulador
// ============================================

// CONSTANTES Y VARIABLES GLOBALES
const DESCUENTO_MAYORISTA = 0.15; // 15% de descuento
const IVA = 0.21; // 21% de IVA
const ENVIO_GRATIS_MINIMO = 50000;

let nombreUsuario = "";
let carritoCompras = [];
let totalSinDescuento = 0;
let totalConDescuento = 0;

// ARRAY DE PRODUCTOS DISPONIBLES
const productosDisponibles = [
    { id: 1, nombre: "Smartphone Samsung", precio: 45000, stock: 10, categoria: "electronica" },
    { id: 2, nombre: "Laptop HP", precio: 85000, stock: 5, categoria: "electronica" },
    { id: 3, nombre: "Auriculares Sony", precio: 12000, stock: 15, categoria: "electronica" },
    { id: 4, nombre: "Tablet iPad", precio: 60000, stock: 8, categoria: "electronica" },
    { id: 5, nombre: "Smart TV 55''", precio: 75000, stock: 6, categoria: "electronica" },
    { id: 6, nombre: "Teclado Mecánico", precio: 8500, stock: 20, categoria: "accesorios" },
    { id: 7, nombre: "Mouse Gaming", precio: 6000, stock: 25, categoria: "accesorios" },
    { id: 8, nombre: "Cámara Canon", precio: 95000, stock: 3, categoria: "fotografia" }
];

// ============================================
// FUNCIÓN 1: ENTRADA DE DATOS - Obtener información del usuario
// ============================================
function obtenerDatosUsuario() {
    console.log("=".repeat(50));
    console.log("🎯 INICIANDO OBTENCIÓN DE DATOS DEL USUARIO");
    console.log("=".repeat(50));
    
    // Solicitar nombre del usuario
    let nombre = prompt("¡Bienvenido a nuestra tienda online!\n\n" +
                       "Para comenzar, por favor ingresa tu nombre:");
    
    // Validación del nombre
    if (nombre === null || nombre.trim() === "") {
        alert("❌ Error: Debes ingresar un nombre válido para continuar.\n" +
              "El simulador se cerrará.");
        return false;
    }
    
    nombreUsuario = nombre.trim();
    
    console.log(`👋 Usuario registrado: ${nombreUsuario}`);
    console.log(`⏰ Fecha de acceso: ${new Date().toLocaleString()}`);
    
    alert(`¡Hola ${nombreUsuario}! 🎉\n\n` +
          "Bienvenido a nuestra tienda online.\n" +
          "A continuación podrás ver nuestro catálogo de productos.");
    
    return true;
}

// ============================================
// FUNCIÓN 2: PROCESAMIENTO - Mostrar catálogo y gestionar selecciones
// ============================================
function mostrarCatalogoYProcesar() {
    console.log("\n" + "=".repeat(50));
    console.log("📦 CATÁLOGO DE PRODUCTOS DISPONIBLES");
    console.log("=".repeat(50));
    
    let catalogoTexto = "🛍️ CATÁLOGO DE PRODUCTOS:\n\n";
    
    // Ciclo FOR para mostrar todos los productos
    for (let i = 0; i < productosDisponibles.length; i++) {
        const producto = productosDisponibles[i];
        catalogoTexto += `${producto.id}. ${producto.nombre}\n` +
                        `   💰 Precio: $${producto.precio.toLocaleString()}\n` +
                        `   📊 Stock: ${producto.stock} unidades\n` +
                        `   🏷️ Categoría: ${producto.categoria}\n\n`;
        
        // Mostrar también en consola
        console.log(`ID: ${producto.id} | ${producto.nombre} | $${producto.precio.toLocaleString()} | Stock: ${producto.stock}`);
    }
    
    // Mostrar catálogo en alert
    alert(catalogoTexto + "Consulta la consola para más detalles.");
    
    // Proceso de selección de productos
    let continuarComprando = true;
    
    while (continuarComprando) {
        let idProducto = prompt("Ingresa el ID del producto que deseas agregar al carrito:\n" +
                               "(Números del 1 al 8)\n\n" +
                               "Escribe 'SALIR' para terminar la compra.");
        
        // Condicional: verificar si quiere salir
        if (idProducto === null || idProducto.toUpperCase() === "SALIR") {
            continuarComprando = false;
            break;
        }
        
        // Convertir a número y validar
        let numeroId = parseInt(idProducto);
        
        // Condicional: validar ID del producto
        if (isNaN(numeroId) || numeroId < 1 || numeroId > productosDisponibles.length) {
            alert("❌ ID de producto inválido.\n" +
                  "Por favor ingresa un número entre 1 y " + productosDisponibles.length);
            continue;
        }
        
        // Encontrar el producto seleccionado
        let productoSeleccionado = null;
        for (let i = 0; i < productosDisponibles.length; i++) {
            if (productosDisponibles[i].id === numeroId) {
                productoSeleccionado = productosDisponibles[i];
                break;
            }
        }
        
        // Condicional: verificar stock
        if (productoSeleccionado.stock <= 0) {
            alert(`❌ Lo sentimos, el producto "${productoSeleccionado.nombre}" está agotado.\n` +
                  "Por favor selecciona otro producto.");
            continue;
        }
        
        // Solicitar cantidad
        let cantidad = prompt(`Producto seleccionado: ${productoSeleccionado.nombre}\n` +
                             `Precio unitario: $${productoSeleccionado.precio.toLocaleString()}\n` +
                             `Stock disponible: ${productoSeleccionado.stock}\n\n` +
                             "¿Cuántas unidades deseas?");
        
        if (cantidad === null) continue;
        
        let numeroCantidad = parseInt(cantidad);
        
        // Condicional: validar cantidad
        if (isNaN(numeroCantidad) || numeroCantidad <= 0) {
            alert("❌ Cantidad inválida. Debe ser un número mayor a 0.");
            continue;
        }
        
        // Condicional: verificar si hay suficiente stock
        if (numeroCantidad > productoSeleccionado.stock) {
            alert(`❌ No hay suficiente stock.\n` +
                  `Stock disponible: ${productoSeleccionado.stock}\n` +
                  `Cantidad solicitada: ${numeroCantidad}`);
            continue;
        }
        
        // Agregar al carrito
        agregarAlCarrito(productoSeleccionado, numeroCantidad);
        
        // Preguntar si desea continuar
        let seguirComprando = confirm(`✅ Producto agregado al carrito!\n\n` +
                                     `${productoSeleccionado.nombre} x${numeroCantidad}\n` +
                                     `Subtotal: $${(productoSeleccionado.precio * numeroCantidad).toLocaleString()}\n\n` +
                                     "¿Deseas agregar otro producto?");
        
        if (!seguirComprando) {
            continuarComprando = false;
        }
    }
}

// ============================================
// FUNCIÓN AUXILIAR: Agregar productos al carrito
// ============================================
function agregarAlCarrito(producto, cantidad) {
    // Verificar si el producto ya está en el carrito
    let productoExistente = null;
    
    for (let i = 0; i < carritoCompras.length; i++) {
        if (carritoCompras[i].id === producto.id) {
            productoExistente = carritoCompras[i];
            break;
        }
    }
    
    // Condicional: si ya existe, sumar cantidad; si no, crear nuevo item
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        productoExistente.subtotal = productoExistente.precio * productoExistente.cantidad;
    } else {
        const nuevoItem = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,
            subtotal: producto.precio * cantidad,
            categoria: producto.categoria
        };
        carritoCompras.push(nuevoItem);
    }
    
    // Actualizar stock
    producto.stock -= cantidad;
    
    console.log(`✅ Agregado al carrito: ${producto.nombre} x${cantidad}`);
}

// ============================================
// FUNCIÓN 3: SALIDA DE DATOS - Calcular totales y mostrar resumen
// ============================================
function calcularTotalesYMostrarResumen() {
    console.log("\n" + "=".repeat(50));
    console.log("🧮 PROCESANDO CÁLCULOS FINALES");
    console.log("=".repeat(50));
    
    // Condicional: verificar si el carrito está vacío
    if (carritoCompras.length === 0) {
        alert("🛒 Tu carrito está vacío.\n" +
              "¡Gracias por visitarnos! Vuelve pronto.");
        console.log("❌ Compra cancelada - carrito vacío");
        return;
    }
    
    // Calcular totales
    totalSinDescuento = 0;
    
    // Ciclo FOR para sumar todos los subtotales
    for (let i = 0; i < carritoCompras.length; i++) {
        totalSinDescuento += carritoCompras[i].subtotal;
    }
    
    // Mostrar resumen del carrito en consola
    console.log("\n📋 RESUMEN DEL CARRITO:");
    console.log("-".repeat(40));
    
    for (let i = 0; i < carritoCompras.length; i++) {
        const item = carritoCompras[i];
        console.log(`${item.nombre}`);
        console.log(`  Cantidad: ${item.cantidad}`);
        console.log(`  Precio unitario: $${item.precio.toLocaleString()}`);
        console.log(`  Subtotal: $${item.subtotal.toLocaleString()}`);
        console.log("-".repeat(30));
    }
    
    // Aplicar descuentos según condiciones
    let descuentoAplicado = 0;
    let motivoDescuento = "";
    
    // Condicional: descuento por compra mayorista (más de 3 productos diferentes)
    if (carritoCompras.length >= 3) {
        descuentoAplicado = DESCUENTO_MAYORISTA;
        motivoDescuento = "Compra mayorista (3+ productos diferentes)";
    }
    
    // Condicional: descuento adicional por monto alto
    if (totalSinDescuento > 100000) {
        descuentoAplicado += 0.05; // 5% adicional
        motivoDescuento += descuentoAplicado > DESCUENTO_MAYORISTA ? " + Compra de alto valor" : "Compra de alto valor";
    }
    
    // Calcular total con descuento
    let montoDescuento = totalSinDescuento * descuentoAplicado;
    totalConDescuento = totalSinDescuento - montoDescuento;
    
    // Calcular IVA
    let montoIVA = totalConDescuento * IVA;
    let totalFinal = totalConDescuento + montoIVA;
    
    // Calcular costo de envío
    let costoEnvio = 0;
    let mensajeEnvio = "";
    
    // Condicional: envío gratis para compras superiores a $50,000
    if (totalFinal >= ENVIO_GRATIS_MINIMO) {
        mensajeEnvio = "🚚 ¡ENVÍO GRATIS!";
    } else {
        costoEnvio = 3000;
        mensajeEnvio = `🚚 Costo de envío: $${costoEnvio.toLocaleString()}`;
        totalFinal += costoEnvio;
    }
    
    // Crear resumen detallado
    let resumenCompleto = `🧾 RESUMEN DE TU COMPRA\n` +
                         `Cliente: ${nombreUsuario}\n` +
                         `Fecha: ${new Date().toLocaleString()}\n\n` +
                         `📦 PRODUCTOS (${carritoCompras.length}):\n`;
    
    // Agregar cada producto al resumen
    for (let i = 0; i < carritoCompras.length; i++) {
        const item = carritoCompras[i];
        resumenCompleto += `• ${item.nombre} x${item.cantidad} = $${item.subtotal.toLocaleString()}\n`;
    }
    
    resumenCompleto += `\n💰 CÁLCULOS:\n` +
                      `Subtotal: $${totalSinDescuento.toLocaleString()}\n`;
    
    // Condicional: mostrar descuento solo si aplica
    if (descuentoAplicado > 0) {
        resumenCompleto += `Descuento (${(descuentoAplicado * 100).toFixed(1)}%): -$${montoDescuento.toLocaleString()}\n` +
                          `Motivo: ${motivoDescuento}\n` +
                          `Total con descuento: $${totalConDescuento.toLocaleString()}\n`;
    }
    
    resumenCompleto += `IVA (21%): $${montoIVA.toLocaleString()}\n` +
                      `${mensajeEnvio}\n` +
                      `\n🎯 TOTAL FINAL: $${totalFinal.toLocaleString()}`;
    
    // Mostrar resumen en console y alert
    console.log("\n" + resumenCompleto);
    alert(resumenCompleto);
    
    // Confirmar compra
    let confirmarCompra = confirm("¿Deseas confirmar tu compra?\n\n" +
                                 `Total a pagar: $${totalFinal.toLocaleString()}\n\n` +
                                 "Selecciona OK para confirmar o Cancelar para salir.");
    
    // Condicional: procesar confirmación
    if (confirmarCompra) {
        procesarCompraFinal(totalFinal);
    } else {
        alert("❌ Compra cancelada.\n" +
              "¡Gracias por visitarnos! Tus productos quedan reservados por 30 minutos.");
        console.log("❌ Compra cancelada por el usuario");
    }
}

// ============================================
// FUNCIÓN AUXILIAR: Procesar compra final
// ============================================
function procesarCompraFinal(totalFinal) {
    console.log("\n🎉 PROCESANDO COMPRA FINAL...");
    
    // Solicitar método de pago
    let metodoPago = prompt("Selecciona tu método de pago:\n\n" +
                           "1. Tarjeta de Crédito\n" +
                           "2. Tarjeta de Débito\n" +
                           "3. Transferencia Bancaria\n" +
                           "4. Efectivo (solo retiro en tienda)\n\n" +
                           "Ingresa el número de tu opción:");
    
    let nombreMetodo = "";
    let esValido = true;
    
    // Condicional: validar método de pago
    switch (metodoPago) {
        case "1":
            nombreMetodo = "Tarjeta de Crédito";
            break;
        case "2":
            nombreMetodo = "Tarjeta de Débito";
            break;
        case "3":
            nombreMetodo = "Transferencia Bancaria";
            break;
        case "4":
            nombreMetodo = "Efectivo (retiro en tienda)";
            break;
        default:
            esValido = false;
            alert("❌ Método de pago inválido.\nCompra cancelada.");
            return;
    }
    
    // Condicional: continuar solo si el método es válido
    if (esValido) {
        // Generar número de pedido aleatorio
        let numeroPedido = Math.floor(Math.random() * 900000) + 100000;
        
        let confirmacionFinal = `✅ ¡COMPRA CONFIRMADA!\n\n` +
                               `🎫 Número de pedido: #${numeroPedido}\n` +
                               `👤 Cliente: ${nombreUsuario}\n` +
                               `💳 Método de pago: ${nombreMetodo}\n` +
                               `💰 Total pagado: $${totalFinal.toLocaleString()}\n` +
                               `📅 Fecha: ${new Date().toLocaleString()}\n\n` +
                               `📧 Recibirás un email de confirmación.\n` +
                               `📦 Tiempo estimado de entrega: 3-5 días hábiles.\n\n` +
                               `¡Gracias por tu compra! 🎉`;
        
        alert(confirmacionFinal);
        
        console.log("✅ COMPRA EXITOSA:");
        console.log(`Pedido #${numeroPedido}`);
        console.log(`Cliente: ${nombreUsuario}`);
        console.log(`Total: $${totalFinal.toLocaleString()}`);
        console.log(`Método: ${nombreMetodo}`);
        console.log("🎉 ¡Transacción completada con éxito!");
        
        // Resetear variables para nueva simulación
        carritoCompras = [];
        totalSinDescuento = 0;
        totalConDescuento = 0;
    }
}

// ============================================
// FUNCIÓN PRINCIPAL: Iniciar simulador
// ============================================
function iniciarSimulador() {
    console.clear();
    console.log("🚀 INICIANDO SIMULADOR DE TIENDA ONLINE");
    console.log("=====================================");
    
    // ENTRADA DE DATOS
    if (!obtenerDatosUsuario()) {
        return; // Salir si no se ingresaron datos válidos
    }
    
    // PROCESAMIENTO DE DATOS
    mostrarCatalogoYProcesar();
    
    // SALIDA DE DATOS
    calcularTotalesYMostrarResumen();
    
    console.log("\n🏁 SIMULADOR FINALIZADO");
    console.log("Gracias por usar nuestro simulador!");
}

// ============================================
// FUNCIÓN ADICIONAL: Reiniciar simulador
// ============================================
function reiniciarSimulador() {
    let confirmarReinicio = confirm("¿Estás seguro de que deseas reiniciar el simulador?\n\n" +
                                   "Se perderán todos los datos actuales.");
    
    if (confirmarReinicio) {
        // Resetear todas las variables
        nombreUsuario = "";
        carritoCompras = [];
        totalSinDescuento = 0;
        totalConDescuento = 0;
        
        // Restaurar stock original (simulación)
        for (let i = 0; i < productosDisponibles.length; i++) {
            switch (productosDisponibles[i].id) {
                case 1: productosDisponibles[i].stock = 10; break;
                case 2: productosDisponibles[i].stock = 5; break;
                case 3: productosDisponibles[i].stock = 15; break;
                case 4: productosDisponibles[i].stock = 8; break;
                case 5: productosDisponibles[i].stock = 6; break;
                case 6: productosDisponibles[i].stock = 20; break;
                case 7: productosDisponibles[i].stock = 25; break;
                case 8: productosDisponibles[i].stock = 3; break;
            }
        }
        
        alert("🔄 Simulador reiniciado correctamente.\n" +
              "Puedes comenzar una nueva simulación.");
        
        console.log("🔄 SIMULADOR REINICIADO");
    }
}

// ============================================
// MENSAJE INICIAL EN CONSOLA
// ============================================
console.log("🎯 SIMULADOR DE TIENDA ONLINE CARGADO");
console.log("=====================================");
console.log("📋 Funciones disponibles:");
console.log("• iniciarSimulador() - Comenzar nueva simulación");
console.log("• reiniciarSimulador() - Reiniciar el sistema");
console.log("\n💡 Haz clic en el botón 'Iniciar Simulador' en la página web");
console.log("   o ejecuta iniciarSimulador() en esta consola.");
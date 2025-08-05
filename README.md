# 🛒 Simulador de Tienda Online - Entrega 1

## 📝 Descripción

Simulador interactivo de una tienda online que permite a los usuarios navegar por un catálogo de productos, agregar artículos a su carrito de compras, aplicar descuentos y procesar compras completas. Todo el sistema funciona a través de la consola del navegador y cuadros de diálogo.

## 🎯 Objetivos Cumplidos

### ✅ Objetivos Generales
- ✓ Estructura base del simulador armada
- ✓ Integración de herramientas JS aprendidas

### ✅ Objetivos Específicos
- ✓ Variables, constantes y arrays declarados
- ✓ Funciones JS que generan interacción
- ✓ Ciclos de iteración y condicionales implementados
- ✓ Uso de Console JS, Prompt, Confirm y Alert

## 🏗️ Estructura del Proyecto

```
Entregable1+[TuApellido]/
├── index.html          # Documento HTML principal
├── js/
│   └── simulador.js    # Archivo JavaScript principal
└── README.md          # Documentación del proyecto
```

## 🔧 Características Técnicas Implementadas

### Variables y Constantes
- `const DESCUENTO_MAYORISTA = 0.15` - Descuento del 15%
- `const IVA = 0.21` - IVA del 21%
- `const ENVIO_GRATIS_MINIMO = 50000` - Monto mínimo para envío gratis
- `let nombreUsuario`, `carritoCompras[]`, `totalSinDescuento`, etc.

### Arrays
- `productosDisponibles[]` - Catálogo de 8 productos con propiedades completas
- `carritoCompras[]` - Items seleccionados por el usuario

### Funciones Principales (Algoritmo Básico)

1. **ENTRADA DE DATOS**: `obtenerDatosUsuario()`
   - Solicita nombre del usuario
   - Valida datos ingresados
   - Registra información en consola

2. **PROCESAMIENTO**: `mostrarCatalogoYProcesar()`
   - Muestra catálogo completo
   - Gestiona selección de productos
   - Valida stock y cantidades
   - Administra carrito de compras

3. **SALIDA DE DATOS**: `calcularTotalesYMostrarResumen()`
   - Calcula totales y descuentos
   - Aplica IVA y costos de envío
   - Muestra resumen detallado
   - Procesa confirmación de compra

### Funciones Auxiliares
- `agregarAlCarrito()` - Gestiona items del carrito
- `procesarCompraFinal()` - Finaliza la transacción
- `reiniciarSimulador()` - Resetea el sistema

### Condicionales Implementados
- Validación de datos de entrada
- Verificación de stock disponible
- Aplicación de descuentos por condiciones
- Validación de métodos de pago
- Control de flujo de compra

### Ciclos Utilizados
- `for` loops para mostrar catálogo de productos
- `for` loops para calcular totales del carrito
- `while` loop para el proceso de compra continua
- `for` loops para buscar productos por ID

### Cuadros de Diálogo
- **Prompt**: Entrada de datos (nombre, ID producto, cantidad, método de pago)
- **Alert**: Mostrar información (catálogo, errores, confirmaciones)
- **Confirm**: Decisiones del usuario (continuar comprando, confirmar compra)

### Console.log Extensivo
- Registro de todas las acciones del usuario
- Mostrar detalles del catálogo
- Resumen detallado del carrito
- Seguimiento del proceso de compra

## 🚀 Instrucciones de Uso

1. **Abrir el simulador**:
   - Doble clic en `index.html`
   - O abrir en navegador web

2. **Iniciar simulación**:
   - Abrir consola del navegador (F12 → Console)
   - Hacer clic en "Iniciar Simulador"
   - O ejecutar `iniciarSimulador()` en consola

3. **Seguir el flujo**:
   - Ingresar nombre cuando se solicite
   - Seleccionar productos del catálogo (ID 1-8)
   - Especificar cantidades deseadas
   - Revisar carrito y confirmar compra
   - Seleccionar método de pago

4. **Observar resultados**:
   - Ver detalles en la consola
   - Revisar cálculos automáticos
   - Obtener número de pedido

## 💡 Funcionalidades Destacadas

- **Gestión de Stock**: Control automático de inventario
- **Descuentos Inteligentes**: Por cantidad de productos y monto
- **Cálculo de IVA**: Aplicación automática del 21%
- **Envío Gratuito**: Para compras superiores a $50,000
- **Validaciones Completas**: En cada paso del proceso
- **Mensajes Claros**: Con emojis y formato legible
- **Sistema de Reinicio**: Para múltiples simulaciones

## 🎨 Detalles de Implementación

- **Concatenación**: Uso extensivo de template literals y concatenación
- **Saltos de línea**: `\n` para mejorar legibilidad
- **Formato de números**: `toLocaleString()` para precios
- **Validación robusta**: Control de errores en cada entrada
- **UX optimizada**: Mensajes claros y proceso intuitivo

## 📋 Criterios de Evaluación Cumplidos

- ✅ **Estructura HTML**: Completa con buenas prácticas
- ✅ **Archivo JS**: Correctamente referenciado
- ✅ **Algoritmos**: IF y bucles FOR utilizados óptimamente
- ✅ **Funciones**: Nombres claros, estructura correcta, dinámicas
- ✅ **Resultado**: Ejecución correcta y completa

---

**Autor**: [Tu Nombre]  
**Fecha**: $(date +'%d/%m/%Y')  
**Versión**: 1.0
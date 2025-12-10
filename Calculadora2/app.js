const input = document.querySelector('input');
input.value = '0';

// Función para limpiar el visor
function limpiar() {
    input.value = '0';
}

// Función para borrar el último carácter
function borrar() {
    if (input.value.length > 1) {
        input.value = input.value.slice(0, -1);
    } else {
        input.value = '0';
    }
}

// Función para calcular el porcentaje
function porcentaje() {
    const numero = parseFloat(input.value);
    if (!isNaN(numero)) {
        input.value = numero / 100;
    }
}

// Función para agregar números y operadores
function agregar(valor) {
    const operadores = ['+', '-', 'x', '/'];

    // Validar que no se inicie con un operador
    if (input.value === '0' && operadores.includes(valor)) {
        alert('El formato usado no es válido!');
        return;
    }

    // Validar que no se ingrese el punto más de una vez
    if (valor === '.') {
        const partes = input.value.split(/[\+\-x\/]/);
        const ultimoNumero = partes[partes.length - 1];
        if (ultimoNumero.includes('.')) {
            return;
        }
    }

    // Si el visor muestra 0 y no es un punto, reemplazar
    if (input.value === '0' && valor !== '.') {
        input.value = valor;
    } else {
        input.value += valor;
    }
}

// Función para calcular el resultado
function calcular() {
    try {
        let expresion = input.value;

        // Validar división por cero
        if (expresion.includes('/0')) {
            throw new Error('División por cero');
        }

        // Reemplazar 'x' por '*'
        expresion = expresion.replace(/x/g, '*');

        const resultado = eval(expresion);

        if (isNaN(resultado) || !isFinite(resultado)) {
            throw new Error('Resultado inválido');
        }

        input.value = resultado;

    } catch (error) {
        input.value = 'Error';
    }

    // Restablecer después de 2 segundos
    setTimeout(() => {
        input.value = '0';
    }, 2000);
}

const boton = document.querySelectorAll('button');
const input = document.querySelector('input');
input.value = 0;

boton.forEach(boton => {
    boton.addEventListener('click', function () {
        const textoBoton = this.textContent;

        // Botón C - Borrar todo
        if (textoBoton === 'C') {
            input.value = '0';
            return;
        }

        // Botón ← - Borrar último carácter
        if (textoBoton === '←') {
            if (input.value.length > 1) {
                input.value = input.value.slice(0, -1);
            } else {
                input.value = '0';
            }
            return;
        }

        // Botón % - Dividir entre 100
        if (textoBoton === '%') {
            const numero = parseFloat(input.value);
            if (!isNaN(numero)) {
                input.value = numero / 100;
            }
            return;
        }

        // Validar que no se inicie con un operador
        const operadores = ['+', '-', 'x', '/'];
        if (input.value === '0' && operadores.includes(textoBoton)) {
            alert('El formato usado no es válido!');
            return;
        }

        // Si no es el botón =, agregar al visor
        if (textoBoton !== '=') {
            // Validar que no se ingrese el punto más de una vez
            if (textoBoton === '.') {
                // Obtener el último número en la expresión
                const partes = input.value.split(/[\+\-x\/]/);
                const ultimoNumero = partes[partes.length - 1];
                if (ultimoNumero.includes('.')) {
                    return; // No permitir más de un punto
                }
            }

            // Si el visor muestra 0 y no es un punto, reemplazar
            if (input.value === '0' && textoBoton !== '.') {
                input.value = textoBoton;
            } else {
                input.value += textoBoton;
            }
            return;
        }

        try {
            let expresion = input.value;

            // Validar división por cero antes de evaluar
            if (expresion.includes('/0')) {
                throw new Error('División por cero');
            }

            // Reemplazar 'x' por '*' para que eval() funcione
            expresion = expresion.replace(/x/g, '*');


            const resultado = eval(expresion);


            if (isNaN(resultado) || !isFinite(resultado)) {
                throw new Error('Resultado inválido');
            }

            input.value = resultado;

        } catch (error) {
            input.value = 'Error';
        }


        setTimeout(() => {
            input.value = '0';
        }, 2000);
    })
})

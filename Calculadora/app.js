const boton = document.querySelectorAll('button');
const input = document.querySelector('input');
input.value = 0;
boton.forEach(boton => {
    boton.addEventListener('click', function () {
        const textoBoton = this.textContent;
        if (textoBoton === 'C') {
            input.value = '0';
            return;
        }

        if (textoBoton === '←') {
            if (input.value.length > 1) {
                input.value = input.value.slice(0, -1);
            } else {
                input.value = '0';
            }
            return;
        }

        if (textoBoton !== '=') {
            if (input.value === '0' && textoBoton !== '.') {
                input.value = textoBoton;
            } else {
                input.value += textoBoton;
            }
            return;
        }

        if (textoBoton === 'x' in [0] || textoBoton === '/' in [0] || textoBoton === '-' in [0] || textoBoton === '+' in [0]) {
            alert('Error');
            return;
        }
        // Buscar el operador en la expresión (sin necesidad de espacios)
        let expresion = input.value;
        let operadorMatch = expresion.match(/[\+\-x\/\%]/);

        if (!operadorMatch) {
            input.value = 'Error';
            return;
        }

        let operador = operadorMatch[0];
        let indiceOperador = expresion.indexOf(operador);
        let num1 = parseFloat(expresion.substring(0, indiceOperador));
        let num2 = parseFloat(expresion.substring(indiceOperador + 1));
        let resultado;

        switch (operador) {
            case '+':
                resultado = num1 + num2;
                break;
            case '-':
                resultado = num1 - num2;
                break;

            case 'x':
                resultado = num1 * num2;
                break;
            case '/':
                resultado = num1 / num2;
                break;
            default:
                resultado = 'Error';
                break;
        }

        input.value = resultado;

    })
})



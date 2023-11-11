// ==UserScript==
// @name         Descifrar mensaje en sitio de informante
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Imprime en consola las letras mayúsculas de la sección <p>, cuenta la cantidad de <div> y descifra el ID de cada <div> usando 3DES, luego imprime el resultado en la página
// @author       Vicente Lineros
// @match        https://cripto.tiiny.site/*
// @match        https://np.tiiny.site/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js#sha512-K370YU8yriXHZ5X2yLHdIBwZRa6aI7+fIBfSUajh4+RQXfNUDR1Q7FOgnGF9BOE+f+xdxgNnvUZ9XIl0q/M2fA==
// ==/UserScript==

(function() {
    'use strict';

    // Obtener el contenido de la etiqueta <p>
    const parrafoContent = document.querySelector('p').textContent;

    // Filtrar solo las letras mayúsculas
    const letrasMayusculas = parrafoContent.match(/[A-Z]/g);

    // Crear un string con las letras mayúsculas
    const llave = letrasMayusculas ? letrasMayusculas.join('') : 'No se encontraron letras mayúsculas';

    // Imprimir en la consola las letras mayúsculas
    console.log('La llave es:', llave);

    // Contar la cantidad de elementos <div>
    const divs = document.querySelectorAll('div');
    const cantidadDivs = divs.length;

    // Imprimir en la consola la cantidad de <div>
    console.log('Los mensajes son:', cantidadDivs);

    const secretkey= CryptoJS.enc.Utf8.parse(llave.substr(0, 24));

    // Descifrar y mostrar el ID de cada <div>
    divs.forEach(div => {
        const encryptedId = div.getAttribute('id');
        const decryptedId = CryptoJS.TripleDES.decrypt(encryptedId, secretkey, {mode: CryptoJS.mode.ECB});
        const decryptedIdText = decryptedId.toString(CryptoJS.enc.Utf8);

        // Crear un nuevo elemento para mostrar el resultado descifrado
        const resultadoDescifrado = document.createElement('div');
        resultadoDescifrado.textContent = decryptedIdText;
        console.log(`${div.getAttribute('id')} ${decryptedId.toString(CryptoJS.enc.Utf8)}`);

        // Agregar el elemento a la página
        document.body.appendChild(resultadoDescifrado);
    });
})();

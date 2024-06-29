/*export function ponerEspacios(texto){

    let str = JSON.stringify(texto);
    str = str.replaceAll("%20", " ");
    let resultado = JSON.parse(str);
    return resultado;
}*/

export function ponerEspacios(texto){
    return texto
} //ERA INNECESARIO

export let Estado = 0;

export function cambiarEstado(nuevoEstado){
    Estado = nuevoEstado;
}
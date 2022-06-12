let alfabeto = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ,'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let palavras = ['marmelo','trigo', 'bolo', 'abobrinha', 'cenoura', 'ameixa', 'manga', 'noz', 'sardinha', 'alface', 'chuchu', 'morango', 'melancia', 'chocolate', 'arroz', 'feijao', 'tomate']
let palavraSorteada = ''
let displayArray = []
let displayStringTemp, displayString, displayTrim = ''
let chances = 5

const letraDigitada = document.getElementById("letraDigitada")
const list = document.getElementById("keys-display")
const display = document.getElementById("palavraSecretaDisplay")
const chancesDisplay = document.getElementById("chances")


/*--------------- funções ---------------*/
function getLetra(x){
    letraDigitada.value = "Letra Digitada:" + x.toUpperCase()
}

function iniciarDisplay(){
    displayStringTemp = displayArray.toString()
    displayString = displayStringTemp.replace(/,/g, " ")
    display.value = displayString
    chancesDisplay.value = "Chances Restantes: " + chances
}

function sortearPalavra(){
    let tam = palavras.length
    let sorteador = Math.floor(Math.random()*tam)
    palavraSorteada = palavras[sorteador]
}

function verifyLetra(letra, palavra){
    console.log(letra, palavra)
    var controle = false
    for (let iVerify = 0; iVerify < palavra.length; iVerify++) {
            if (letra == palavra[iVerify]) {
                displayArray[iVerify] = letra
                controle = true
            }     
    }

    if(!controle){
        chances -= 1
    }

    displayStringTemp = displayArray.toString()
    displayString = displayStringTemp.replace(/,/g, " ")
    display.value = displayString

    displayTrim = displayStringTemp.replace(/,/g, "")

    console.log(displayTrim, palavraSorteada)
/*--------------- logica vitoria ---------------*/
    if (displayTrim == palavraSorteada ) {
        console.log("VOCE VENCEU")
        document.querySelectorAll('.key').forEach(elem => {
            elem.disabled = true,
            elem.style.background = 'green';
          });
    }
    if (chances<1) {
        console.log("VOCE PERDEU")
        document.querySelectorAll('.key').forEach(elem => {
            elem.disabled = true,
            elem.style.background = 'red';
          });
        
    }
}

/*--------------- logica display ---------------*/
sortearPalavra()

for (let iDisplay = 0; iDisplay < palavraSorteada.length; iDisplay++) {
    displayArray.push('_')    
}
iniciarDisplay()
/*--------------- removendo virgulas do array ---------------*/



/*--------------- logica e criação do teclado ---------------*/
for(let i=0; i<alfabeto.length; i++){
    if (i % 13 == 0) {
        list.appendChild(document.createElement("br"))
    }
    const letter = document.createElement("button")
    letter.className = 'key'
    letter.onclick = function lerLetra(){

                    getLetra(this.value)
                    verifyLetra(this.value, palavraSorteada)
                    chancesDisplay.value = "Chances Restantes: " + chances
                    letter.disabled = "disabled"
                }
    letter.innerHTML = alfabeto[i];
    letter.value = alfabeto[i];
    letter.name = alfabeto[i];
    list.appendChild(letter)
    
}

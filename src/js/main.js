/**
* File Name: codigo-principal.js
* Author Name: William Alves Jardim
* Author Email: williamalvesjardim@gmail.com
*
* License: Derivator © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
*
*/

//Quando clicar no botão de calcular
document.getElementById('btn-calcular').onclick = function(){

    let operacaoSelecionada = DomUtils.Input.getSelectedOption('operacao'),
        opcoesCheckboxRecursos = DomUtils.Input.getSelectedOption('checkTabelaFuncao'),
        pontosInteresse = document.getElementById('pontosInteresse').value.split(',').map( (ponto)=>{ return Number(ponto) } );
    
    //Trata os pontos
    pontosInteresse = pontosInteresse.length == 1 && pontosInteresse[0] == '' ? [] : pontosInteresse;

    switch( operacaoSelecionada ){

        case 'derivative':
            break;

        case 'limit':
            break;

    }

}
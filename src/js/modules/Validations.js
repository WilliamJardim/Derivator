/**
* File Name: codigo-principal.js
* Author Name: William Alves Jardim
* Author Email: williamalvesjardim@gmail.com
*
* License: Derivator © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
*
*/
var ValidationsModule = {

    //Exibe a mensagem em um elemento html
    avisarUsuario: function(elemento, mensagem, duracao=null){
        const context = this;

        document.getElementById(elemento).style.visibility = 'visible';
        document.getElementById(elemento).style.display = 'block';
        document.getElementById(elemento).innerHTML = mensagem;

        if( duracao ){
            setTimeout(function(){
                context.sumirAviso(elemento);
            }, duracao);
        }
    },

    sumirAviso: function(elemento){
        document.getElementById(elemento).style.visibility = 'hidden';
        document.getElementById(elemento).style.display = 'none';
    },

    //Realiza as validações dentro do contexto do programa 
    validar: function( parametros, callbackAposValidar=null ){
        let {mathFunction, pontos} = parametros;

        //Valida se os pontos está vazio
        let validado = {
            status: 'ok',
            msg: 'Tudo ok'
        }

        if( pontos.length == 0 ){
            validado = {
                etapa: 'pontoslength',
                status: 'invalido',
                msg: 'AVISO: Nenhum ponto de interesse definido!.'
            }
        }

        if( callbackAposValidar ){ callbackAposValidar(validado) };
        return validado
    }

}

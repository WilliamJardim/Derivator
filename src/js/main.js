/**
* File Name: codigo-principal.js
* Author Name: William Alves Jardim
* Author Email: williamalvesjardim@gmail.com
*
* License: Derivator © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
*
*/

var gridFuncao = MyGrid.VisualGrid({
    writeTo: 'my-function-grid-el',
    title: 'Pontos da função',
    columns: [
        {
            name: 'Ponto',
            style: {
                applies: ['header', 'body'],
                textColor: 'black',
                backgroundColor: '#a2cf63'
            }
        },
        {
            name: 'Resultado',
            style: {
                applies: ['header', 'body'],
                textColor: 'black',
                backgroundColor: '#a2cf63'
            }
        }
    ],
    style: {},
    samples: [],
    emptyColumnValue: 'INDETERMINADO',
    autoRender: true
});

var gridDerivadaFuncao = MyGrid.VisualGrid({
    writeTo: 'my-functionderivate-grid-el',
    title: 'Derivada para cada ponto',
    columns: [
        {
            name: 'Ponto',
            style: {
                applies: ['header', 'body'],
                color: 'black',
                backgroundColor: '#a2cf63'
            }
        },
        {
            name: 'Derivada',
            style: {
                applies: ['header', 'body'],
                color: 'black',
                backgroundColor: '#a2cf63'
            }
        }
    ],
    style: {},
    samples: [],
    emptyColumnValue: '',
    autoRender: true
});


function calcularOsPontos(funcaoMatematica, pontos, operacaoSelecionada, maxTentativas, passos, passosLargos){
    //Chama a operação escolhida pelo usuário
    var resultadosCalculos = OperacoesModule.use(operacaoSelecionada, {
        funcaoMatematica: funcaoMatematica,
        pontos: pontos,

        //Parametros extras usados em outras operacoes
        maxTentativas: maxTentativas, 
        limitStep: passos, 
        limitLargeStep: passosLargos
    });

    return resultadosCalculos;
}

//Quando clicar no botão de calcular
document.getElementById('btn-calcular').onclick = function(){

    let operacaoSelecionada = DomUtils.Input.getSelectedOption('operacao'),
        opcoesCheckboxRecursos = DomUtils.Input.getSelectedOption('checkTabelaFuncao'),
        funcaoMatematica = DomUtils.Input.getValue('formula-input'),
        pontosInteresse = DomUtils.Input.getValue('pontosInteresse').split(',').map( (ponto)=>{ return Number(ponto) } );
    
    let maxTentativas = Number(DomUtils.Input.getValue('max-iter-input')),
        passos = Number(DomUtils.Input.getValue('step-input')),
        passosLargos = Number(DomUtils.Input.getValue('large-step-input'));

    //Trata os pontos
    pontosInteresse = pontosInteresse.length == 1 && pontosInteresse[0] == '' ? [] : pontosInteresse;

    //Faz validações
    const statusValidacao = ValidationsModule.validar({
        mathFunction: funcaoMatematica,
        pontos: pontosInteresse

    }, function( resultadoValidacao ){
        
        switch(resultadoValidacao.etapa){
            case 'pontoslength':
                ValidationsModule.avisarUsuario( 'pontos-warning-container', resultadoValidacao.msg );
                DomUtils.Input.focus('pontosInteresse', null);
                break;
        }
    });

    if( statusValidacao.status != 'ok' ){
        return;
    }

    //Retira os avisos
    ValidationsModule.sumirAviso('formula-warning-container');
    ValidationsModule.sumirAviso('pontos-warning-container');

    //Executa a operação
    let resultadosCalculos = calcularOsPontos(funcaoMatematica, pontosInteresse, operacaoSelecionada, maxTentativas, passos, passosLargos);

    //Trata os resultados para poder servir para alimentar as tabelas
    const samplesGridFuncao = [];
    for( let i = 0 ; i < resultadosCalculos.pontos.length ; i++ ){
        samplesGridFuncao.push({
            'Ponto': resultadosCalculos.pontos[i],
            'Resultado': resultadosCalculos.saidasPorPonto[ resultadosCalculos.pontos[i] ] 
        })
    }

    const samplesGridDerivadaFuncao = [];
    for( let i = 0 ; i < resultadosCalculos.pontos.length ; i++ ){
        samplesGridDerivadaFuncao.push({
            'Ponto': resultadosCalculos.pontos[i],
            'Derivada': resultadosCalculos.resultadoOperacao[ resultadosCalculos.pontos[i] ] 
        })
    }

    //Gera a tabela com os pontos da função
    gridFuncao.setSamples(samplesGridFuncao);
    gridFuncao.redraw();

    gridDerivadaFuncao.setSamples(samplesGridDerivadaFuncao);
    gridDerivadaFuncao.redraw();
}

document.getElementById('pontosInteresse').onkeydown = function(){
    ValidationsModule.sumirAviso('pontos-warning-container');
}
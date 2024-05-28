/**
* File Name: FunctionUtils.js
* Author Name: William Alves Jardim
* Author Email: williamalvesjardim@gmail.com
*
* License: Derivator © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
*
*/
FunctionUtils = {
    replaceDefaultVariablesInMatchFunction(mathFunction){
        let toUpperCaseExpression = mathFunction.toUpperCase().trim();
        let novaFormula = toUpperCaseExpression;
        novaFormula = String(novaFormula).split('PI').join(String(Math.PI));
        novaFormula = String(novaFormula).split('EULER').join(String(1.4901161193847656e-8));
        
        return novaFormula;
    },

    //Extrai as variaveis usadas em uma função matemática
    extractMathFunctionVariables( mathFunction ){
        let toUpperCaseExpression = mathFunction.toUpperCase().trim();
        const parametros = toUpperCaseExpression.split(') = ')[0].split('(')[1].trim();
        const paramsArray = parametros.split(',');

        return paramsArray;
    },

    //Retorna todas as vezes um numero constante apareceu multiplicando uma variavel especifica na formula, IGNORANDO AS DEMAIS VARIAVEIS
    getNumberConstantsTimesVariable: function( mathFunction, palavra ){
        //Se tiver um numero e logo em seguida(sem espaços) o nome da variavel, ele é incluido na contagem
        return mathFunction.split(' ').filter( (x)=>{ if( !isNaN(Number(x[0])) && /[+\-*/^=<>!%&|~]/.test(x[1]) == false && String(x).replace(x[0], ' ').indexOf(palavra) != -1 ) return x.toUpperCase() } );
    },

    //Conta quantas vezes um numero constante apareceu multiplicando uma variavel especifica na formula, IGNORANDO AS DEMAIS VARIAVEIS
    countNumberConstantsTimesVariable: function( mathFunction, palavra ){
        return this.getNumberConstantsTimesVariable(mathFunction, palavra).length;
    },

    //Converte uma função matemática para uma função javascript
    mathFunctionToFunction( mathFunction ){
        let toUpperCaseExpression = mathFunction.toUpperCase().trim();

        //Substitui ^ por **
        toUpperCaseExpression = String(toUpperCaseExpression).split('^').join('**');
        
        //Substitui variaveis comuns como PI, EULER
        toUpperCaseExpression = FunctionUtils.replaceDefaultVariablesInMatchFunction(toUpperCaseExpression);

        //TODO: Procurar onde aparece 2X ou X2 ou algo assim, para transformar em multiplicação
        let variaveisFuncao = FunctionUtils.extractMathFunctionVariables(toUpperCaseExpression);
        let expressaoTratada = toUpperCaseExpression;

        for( let i = 0 ; i < variaveisFuncao.length ; i++ ){
            const variavelAtual = variaveisFuncao[i];
            const vezesApareceuSendoMultiplicadoPorConstanteNumerica = FunctionUtils.getNumberConstantsTimesVariable( toUpperCaseExpression, variavelAtual );

            //Faz a substituição
            for( let j = 0 ; j < vezesApareceuSendoMultiplicadoPorConstanteNumerica.length ; j++ ){
                
                const termoBuscaAtual = vezesApareceuSendoMultiplicadoPorConstanteNumerica[j].toUpperCase(),
                      divideComSplit = termoBuscaAtual.split( termoBuscaAtual[0] ),
                      nomeVariavel = divideComSplit[1].toUpperCase(),
                      constanteNumerica = termoBuscaAtual[0],
                      novoTermoAtual = `(${constanteNumerica} * ${nomeVariavel})`;

                expressaoTratada = String(expressaoTratada).replace( termoBuscaAtual, novoTermoAtual )
            }
        }

        const functionName = expressaoTratada.split(') = ')[0].replace(')', '').replace('(', '').trim();
        const functionBody = expressaoTratada.split(') = ')[1].trim();
        const parametros = expressaoTratada.split(') = ')[0].split('(')[1].trim();
        const paramsArray = parametros.split(',');

        const jsFunction = `
            return ${functionBody};
        `;

        return {
            functionObj: new Function(...paramsArray, jsFunction),
            buildString: jsFunction.trim(),
            callName: functionName,
            params: parametros
        };

    }
}

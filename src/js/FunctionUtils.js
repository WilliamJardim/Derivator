/**
* File Name: FunctionUtils.js
* Author Name: William Alves Jardim
* Author Email: williamalvesjardim@gmail.com
*
* License: Derivator © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
*
*/
FunctionUtils = {
    mathFunctionToFunction( mathFunction ){
        let toUpperCaseExpression = mathFunction.toUpperCase().trim();

        //Substitui ^ por **
        toUpperCaseExpression = String(toUpperCaseExpression).split('^').join('**');

        //TODO: Procurar onde aparece 2X ou X2 ou algo assim, para transformar em multiplicação

        const functionName = toUpperCaseExpression.split(') = ')[0].replace(')', '').replace('(', '').trim();
        const functionBody = toUpperCaseExpression.split(') = ')[1].trim();
        const parametros = toUpperCaseExpression.split(') = ')[0].split('(')[1].trim();
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

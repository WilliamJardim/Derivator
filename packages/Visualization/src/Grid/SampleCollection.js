/*
 * File Name: SampleCollection.js
 * 
 * LICENSE: WilliamJardim/Visualization © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/**
*/

if( !globalThis.MyGrid ){
    globalThis.MyGrid = {};
}

/*
* Coleção de amostras
* @param {array} sampleArray - contem a lista de amostras(classe Sample)
* @param {object} config - configuracoes internas
*
* Exemplo de uso:
*   var vector = MyGrid.SampleCollection([ {x:10, y:15}, {x:22, y:44} ])
*
*/
MyGrid.SampleCollection = function(sampleArray=[], config={}){
    const context = AbstractClass(config);
    context._isSampleColletion = true;
    context._sampleArray = sampleArray;
    context.objectName = 'SampleCollection';
    context.samples = [];

    //Transforma os registros do sampleArray em objetos manipulaveis MyGrid.Sample
    for( let i = 0 ; i < sampleArray.length ; i++ )
    {   
        context.samples.push( MyGrid.Sample( sampleArray[i], {} ) );
    }

    //Métodos
    context.getSamples = function(){
        return context.samples;
    }

    return context;
}
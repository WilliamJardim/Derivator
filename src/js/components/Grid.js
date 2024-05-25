var MyGrid = {};

/*
Amostra da tabela
*/
MyGrid.Sample = function(featuresDict={}, config={}){
    const context = AbstractClass(config);
    context._isSample = true;
    context.objectName = 'Sample';
    context.sampleData = featuresDict;

    //Métodos
    context.getColumnValue = function(columnName){
        return context.sampleData[columnName];
    }
    context.setColumnValue = function(columnName, columnNewValue){
        context.sampleData[columnName] = columnNewValue;
    }

    return context;
}

/*
Coleção de amostras

a = MyGrid.SampleCollection([ {x:10, y:15}, {x:22, y:44} ])
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

/*
Cria a grid, ou seja, a classe que manipula as linhas e colunas
*/
MyGrid.GridComponent = function(config={}){
    const context = AbstractClass(config);
    context._isGrid = true;
    context.objectName = 'GridComponent';
    context.sampleCollection = (config['samples'] || {})._isSampleColletion ? config['samples'] : MyGrid.SampleCollection(config['samples']);

    return context;
}

//Cria a grid visual
/*

grid = MyGrid.VisualGrid({
    id: 'mygrid',
    columns: ['Nome', 'Idade'],
    writeTo: 'mygrid-el',
    samples: [
        { Nome: 'William', Idade: 20 },
        { Nome: 'Rafael', Idade: 24 },
        { Nome: 'Ana', Idade: 35 },
        { Nome: 'Gustavo', Idade: 33 }
    ],
    autoRender: true
});

*/
MyGrid.VisualGrid = function(config={}){
    const context = MyGrid.GridComponent(config);
    context.extendedFrom = 'GridComponent';
    context._isVisualGrid = true;
    context.objectName = 'VisualGrid';
    context._writeTo = config['writeTo'] || null;
    context._columnNames = config['columns'] || null;
    context._columnNameMap = {};
    context._colunasHtml = ``;
    context._renderedHtmlLines = ``;
    context._autoRender = config['autoRender'] || false;
    context._elementId = config['id'] || String( new Date().getTime() );
    context.samples = context.sampleCollection.samples || [];
    
    //Cria as colunas TD
    for( let i = 0 ; i < context._columnNames.length ; i++ )
    {   
        context._colunasHtml += `
            <td class='MyGrid-column ${ i == 0 ? 'MyGrid-first-column' : '' }'> ${ context._columnNames[i] } </td>
        `;
        context._columnNameMap[ i ] = context._columnNames[i];
    }

    //Adiciona as amostras
    for( let i = 0 ; i < context.samples.length ; i++ )
    {   
        const sample = context.samples[i];
        let sampleColunasTD = ``;

        for( let j = 0 ; j < context._columnNames.length ; j++ )
        {
            sampleColunasTD += `
                <td class='MyGrid-column ${ j == 0 ? 'MyGrid-first-column' : '' }'> ${ sample.getColumnValue( context._columnNames[j] ) } </td>
            `
        }   

        context._renderedHtmlLines += `
            <tr class='MyGrid-row'>
                ${ sampleColunasTD }
            </tr>
        `;
    }

    //Concatena tudo em um unico template em forma de string
    context._htmlTemplate = `
        <table class='MyGrid-table' id='${ context._elementId }'>
            <tr class='MyGrid-header-row MyGrid-row'>
                ${context._colunasHtml}
            </tr>
            ${context._renderedHtmlLines}
        </table>
    `;

    /* Métodos */
    //Renderiza a grid no html
    context.drawHtml = function(){
        if( context._writeTo )
        {
            document.getElementById( context._writeTo ).innerHTML = context._htmlTemplate;
        }else{
            console.warn('Impossible to render grid, without "writeTo" prop.');
        }
    }

    if(context._autoRender){ 
        context.drawHtml();
    }

    return context;
}
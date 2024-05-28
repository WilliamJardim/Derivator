var OperacoesModule = {

    /**Calcular a derivada usando o método númerico */
    derivative(parametros){
        const {funcao, pontos} = parametros;

        const resultados = {}; //Contém ponto e resultado

        //Calcula a derivada para cada ponto
        for( let i = 0 ; i < pontos.length ; i++ )
        {
            const ponto = pontos[i];
            resultados[ ponto ] = derivada_por_definicao( funcao, ponto );
        }

        return resultados;
    },

    //Chama a operação selecionada
    use(operacao, parametros){
        const {funcaoMatematica, pontos} = parametros;

        //Converte a função matemática para uma função javascript
        const funcaoConvertida = FunctionUtils.mathFunctionToFunction( funcaoMatematica );

        //Depois que tratou tudo
        const parametrosTratados = {
            funcao: funcaoConvertida.functionObj,
            pontos: pontos
        }

        //Processa a saida a função para cada ponto(apenas para arquivar)
        const saidasValues = [];
        const saidasPorPonto = {};
        for( let i = 0 ; i < pontos.length ; i++ ){
            const saida = parametrosTratados.funcao( pontos[i] );
            saidasValues.push(saida);
            saidasPorPonto[ pontos[i] ] = saida;
        }

        const resultadoObtido = this[operacao](parametrosTratados) || {};

        //Retorna um resumo do que foi feito
        return {
            funcao: funcaoConvertida,
            funcaoMatematica: funcaoMatematica,
            pontos: pontos,
            saidas: saidasValues,
            saidasPorPonto: saidasPorPonto,
            operacao: operacao,
            resultadoOperacao: resultadoObtido, //Resultados da operação Um dicionario ponto:resultado
            resultadoOperacaoValues: Object.values(resultadoObtido) //Apenas os valores
        };
    }

}
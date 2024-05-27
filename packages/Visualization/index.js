/*
 * File Name: index.js
 * 
 * LICENSE: WilliamJardim/Visualization © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/**
*/

var grid = MyGrid.VisualGrid({
    id: 'mygrid',
    writeTo: 'mygrid-el',
    title: 'A Grid',
    
    columns: [
        {
            name: 'Tipo',
            altname: 'tipo',
            style: {
                applies: ['header', 'body'],
                textColor: 'black',
                fontSize: '22px',
                backgroundColor: 'red',
                bold: false,
                italic: true,
                width: 50,
                cssClass: 'mycustomclass'
            }
        },
        {
            name: 'Nome',
            altname: 'nome',
            style: {
                applies: ['header', 'body'],
                textColor: 'black',
                fontSize: '22px',
                backgroundColor: 'green',
                bold: false,
                italic: true,
                width: 100,
                cssClass: 'mycustomclass'
            }
        },
        {
            name:  'Idade',
            antname: 'idade',
            style: {
                applies: ['header', 'body'],
                textColor: 'black',
                fontSize: '22px',
                backgroundColor: 'orange',
                bold: false,
                italic: true,
                width: 100,
                cssClass: 'mycustomclass'
            }
        }
    ],
    
    samples: [
        { Nome: 'William', Idade: 20, Tipo: 'Amigo' },
        { Nome: 'Rafael', Idade: 24, Tipo: 'Parente' },
        { Nome: 'Ana', Idade: 35, Tipo: 'Parente' },
        { Nome: 'Gustavo', Idade: 33, Tipo: 'Amigo' }
    ],
    emptyColumnValue: '',
    autoRender: true,
    
    /*Estilos aplicados diretamente*/
    style: {
        title: {
            textColor: 'black',
            fontSize: '30px',
            backgroundColor: 'orange',
            bold: true,
            italic: true
        },
        header: {
            textColor: 'black',
            fontSize: '22px',
            backgroundColor: '#a2cf63',
            bold: true,
            italic: true
        },
        body: {
            textColor: 'black',
            fontSize: '22px',
            backgroundColor: '#a0e342',
            bold: false
        },
        //Aplica um estilo especifico para determinadas colunas
        columns: {
            '*': {
                applies: ['header'],
                textColor: 'black',
                fontSize: '22px',
                backgroundColor: 'blue',
                bold: true,
                italic: true,
                width: 100,
                height: 20,
                textAlign: 'center'
            }
        }
    }
});
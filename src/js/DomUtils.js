/**
* File Name: DomUtils.js
* Author Name: William Alves Jardim
* Author Email: williamalvesjardim@gmail.com
*
* License: Derivator © 2024 by William Alves Jardim is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. To view a copy of this license, visit https://creativecommons.org/licenses/by-nc-sa/4.0/
*
*/
var DomUtils = {

    Input: {

        getSelectedOption( ratioOrCheckbox_name ){
            let returnValue; //vai depender do tipo do input
            let elementsQuery = [... document.getElementsByName(ratioOrCheckbox_name)];

            switch( elementsQuery[0].type ){
                case 'radio':
                    for( let i = 0 ; i < elementsQuery.length ; i++ )
                    {   
                        if( elementsQuery[i].checked ){
                            returnValue = elementsQuery[i].value;
                            break;
                        }
                    }
                    break;

                case 'checkbox':
                    returnValue = {};
                    for( let i = 0 ; i < elementsQuery.length ; i++ )
                    {
                        if( elementsQuery[i].checked ){
                            returnValue[ elementsQuery[i].id ] = elementsQuery[i].checked;
                        }
                    }
                    break;
            }

            return returnValue;
        }

    }

}
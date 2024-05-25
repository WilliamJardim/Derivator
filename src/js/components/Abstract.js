function AbstractClass(config){
    const classObject = {};
    classObject._config = config;
    classObject.objectName = 'AbstractClass';
    classObject.extendedFrom = 'AbstractClass';

    //Copia os argumentos
    let configKeys = Object.keys(config);
    for( let i = 0 ; i < configKeys.length ; i++){
        classObject[ configKeys[i] ] = config[ configKeys[i] ];
    }

    return classObject;
}
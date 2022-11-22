/*
* -------------------------------------------------------------------- 
*
* Package:         server
* File:            index.js
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

'use strict';

//va messo prima di tutto questo comando, per inizializzare la variabile di stato. Così metti il setting a normale. E usi il db normale
const { setTesting }=require('./test/mockDB/iAmTesting');
setTesting(0);

//App va chiamata per gli integration test, ma se la chiamo da index, 
//index setta testing a 0 e quindi poi nei test si utilizza il db normale al posto del Mock
//Quindi app viene configurato in un altro file indipendente dallo stato di testing 
const {setApp}=require('./utils/appUtil');

// ecco appc
const app = setApp();




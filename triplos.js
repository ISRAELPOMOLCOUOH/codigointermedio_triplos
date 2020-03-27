        
        //autor:Israel Pomol Couoh
        //formas: 2+5*y - a/a+b*b - (a+2)/3+b - (a+2)/(3-b) - 2*y-((4*y)+z)
        triplos();


        function triplos(){
            var cadenaOriginal = "2*y-((4*y)+z)";
            var cadenaPosfija = "";
            var val1 = "",val2 = "",op ="",n = 0;//variables en donde se almacenara los operadores,el operando y que posicion tiene t
            cadenaPosfija = convertirPosfija(cadenaOriginal);//se almacena la cadena ya convertida en posfija
            document.write(cadenaPosfija);
            var pilaResultados = new Array();//pila en donde se almacenara los resultados de las simplificaciones de las operaciones
            var pilaFinal = new Array();//pila en donde se almacenara las expresiones de cada operacion
            for(var i=0; i<cadenaPosfija.length;i++){
                if(operador(cadenaPosfija.charAt(i))){//cuando detecta que es un operador realiza una operacion con dos caracteres dentro de la pilas
                    val1 = pilaResultados.pop();
                    val2 = pilaResultados.pop();
                    op = cadenaPosfija.charAt(i);
                    pilaFinal.push(simplificar(val1,val2,op,n));//se agrega la expresion
                    pilaResultados.push("t"+n);//se agrega la expresion simplificada a la pila como t0,etc
                    n++;
                }else{
                    pilaResultados.push(cadenaPosfija.charAt(i));
                   
                }
            }
            pilaFinal.push("<br/>"+"X = "+ pilaResultados.pop());//se quita el ultimo valor simplificado y se agrega a la pila final

        }

        function simplificar(valor1,valor2,operador,n){//simplifica la operacion posfija en t1,t2,etc..
            var sim = "";
            sim = "<br/>"+"t" + n + " = "+ valor2 + operador + valor1; //se almacena la operacion ..ejemplo : sim = t0 = a*b
            return sim;
        }




        //funcion para convertir la cadena original a postfija y pueda ser interpretada por la computadora
        function convertirPosfija(cadena){
            var cad = "";//se inicializa como vacio para que pueda reconcer el length de la cadena
            cad = cadena;
            var resultadoCadena = "";//en esta variable se ira almacenando la expresion postfija conforme se evalue
            var pilaOp = new Array();
            pilaOp.push("-1");//se le agrega el -1 para que cuando llegue la pila a este numero identifiquemos que esta vacio
            var ultimo;
            for(var i=0;i<cad.length;i++){
                ultimo = pilaOp[pilaOp.length-1];//se realizo de esta manera para no eliminar el ultimo valor con el pop y solo compare
                if(operador(cad.charAt(i)) || cad.charAt(i)== ")"){//si es un operador o parentesis derecho entra
                    //si la pila esta vacia agrega el operador
                    if(ultimo == "-1"){
                        pilaOp.push(cad.charAt(i));
                    }else{
                        //operador = precedencia se cambia (sale el ultimo y se queda el nuevo)
                        if(prioridad(cad.charAt(i)) == prioridad(ultimo)){
                            if(cad.charAt(i) == "("){//cuando es un parentesis ( no lo saca, solo lo agrega a la pila
                                pilaOp.push(cad.charAt(i)); //porque ( == ( pero no se toman en cuenta
                            }else{
                                resultadoCadena += pilaOp.pop();
                                pilaOp.push(cad.charAt(i));
                            }
                        //operador tiene > precedencia se agrega a la pila
                        }else if(prioridad(cad.charAt(i)) > prioridad(ultimo)){
                            pilaOp.push(cad.charAt(i));
                        //operador < precedencia -saca a los operadores excepto el ) 
                        }else if(prioridad(cad.charAt(i)) < prioridad(ultimo)){
                            while(ultimo != "-1" && ultimo != "("){ //al agregar el || falla en esta parte 
                                resultadoCadena+=pilaOp.pop();
                                ultimo = pilaOp[pilaOp.length-1];
                            }
                            pilaOp.push(cad.charAt(i));
                         //parentesis derecho vacia la pila hasta encontrar el peimero parentesis izquierdo   
                        }else if(cad.charAt(i) == ")"){
                            while(ultimo != "("){
                                resultadoCadena+=pilaOp.pop();
                                ultimo = pilaOp[pilaOp.length-1]; 
                            }
                            pilaOp.pop(cad.charAt(i));
                        }
                    }
                    
                }else{
                    //cuando no sea un operador lo agrega a la cadena nueva directamente
                    resultadoCadena += cad.charAt(i); 
                }  

                //cuando detecta que la cadena ha llegado al ultimo digito, por ultimo vacia todo lo que haya en la pila y lo agrega a la nueva cadena
                if(i == cad.length-1){
                    while(ultimo != "-1"){
                        resultadoCadena+= pilaOp.pop();
                        ultimo = pilaOp[pilaOp.length-1];
                    }
                }
            }

            return resultadoCadena;

        }
        //funcion para determinar si el caracter que se recorre en la posicion i es un operador o no
        function operador(op){
            if(op == "(" || op == "^" || op == "*" || op == "/" || op == "+" || op == "-") return true;
            return false;
        }

        //funcion para determinar cual operador tiene mayor prioridad
        function prioridad(op){
            if(op == "(") return 4;
            if(op == "^") return 3;
            if(op == "*" || op =="/") return 2;
            if(op == "+" || op == "-") return 1;
        }
      
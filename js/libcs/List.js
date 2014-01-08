

//==========================================
//      Lists
//==========================================
List={};
List.helper={};

List.turnIntoCSList=function(l){
    return {'ctype':'list','value':l};
}


List.realVector=function(l){
    var erg=[];
    for(var i=0;i<l.length;i++){
        erg[erg.length]={"ctype":"number" ,"value":{'real':l[i],'imag':0}};
    }
    return {'ctype':'list','value':erg};
}



List.sequence=function(a,b){
    var erg=[];
    for(var i=Math.round(a.value.real);i<Math.round(b.value.real)+1;i++){
        erg[erg.length]={"ctype":"number" ,"value":{'real':i,'imag':0}};
    }
    return {'ctype':'list','value':erg};
}

List.pairs=function(a){
    var erg=[];
    for(var i=0;i<a.value.length-1;i++){
        for(var j=i+1;j<a.value.length;j++){
            erg[erg.length]={'ctype':'list','value':[a.value[i],a.value[j]]};
        }
    }
    return {'ctype':'list','value':erg};
}

List.triples=function(a){
    var erg=[];
    for(var i=0;i<a.value.length-2;i++){
        for(var j=i+1;j<a.value.length-1;j++){
            for(var k=j+1;k<a.value.length;k++){
                erg[erg.length]={'ctype':'list','value':[a.value[i],a.value[j],a.value[k]]};
            }
        }
    }
    return {'ctype':'list','value':erg};
}

List.triples=function(a){
    var erg=[];
    for(var i=0;i<a.value.length-2;i++){
        for(var j=i+1;j<a.value.length-1;j++){
            for(var k=j+1;k<a.value.length;k++){
                erg[erg.length]={'ctype':'list','value':[a.value[i],a.value[j],a.value[k]]};
            }
        }
    }
    return {'ctype':'list','value':erg};
}


List.cycle=function(a){
    var erg=[];
    for(var i=0;i<a.value.length-1;i++){
        erg[erg.length]={'ctype':'list','value':[a.value[i],a.value[i+1]]};
    }
    erg[erg.length]={'ctype':'list','value':[a.value[a.value.length-1],a.value[0]]};

    return {'ctype':'list','value':erg};
}

List.consecutive=function(a){
    var erg=[];
    for(var i=0;i<a.value.length-1;i++){
        erg[erg.length]={'ctype':'list','value':[a.value[i],a.value[i+1]]};
    }

    return {'ctype':'list','value':erg};
}

List.reverse=function(a){
    var erg=[];
    for(var i=a.value.length-1;i>=0;i--){
        erg[erg.length]=a.value[i];
    }

    return {'ctype':'list','value':erg};
}



List.directproduct=function(a,b){
    var erg=[];
    for(var i=0;i<a.value.length;i++){
        for(var j=0;j<b.value.length;j++){
            erg[erg.length]={'ctype':'list','value':[a.value[i],b.value[j]]};
        }
    }
    return {'ctype':'list','value':erg};
}


List.concat=function(a,b){
    var erg=[];
    for(var i=0;i<a.value.length;i++){
        erg[erg.length]=a.value[i];
    }
    for(var j=0;j<b.value.length;j++){
        erg[erg.length]=b.value[j];
    }
    return {'ctype':'list','value':erg};
}


List.prepend=function(b,a){
    var erg=[];
    erg[erg.length]=b;

    for(var i=0;i<a.value.length;i++){
        erg[erg.length]=a.value[i];
    }
    return {'ctype':'list','value':erg};
}

List.append=function(a,b){
    var erg=[];
    for(var i=0;i<a.value.length;i++){
        erg[erg.length]=a.value[i];
    }
    erg[erg.length]=b;
    return {'ctype':'list','value':erg};
}


List.contains=function(a,b){
    var erg=[];
    var bb=false; 
    for(var i=0;i<a.value.length;i++){
        var cc=a.value[i];
        if((evaluator.helper.equals(cc,b)).value){
            return {'ctype':'boolean','value':true};

        };
    }
    return {'ctype':'boolean','value':false};
}


List.common=function(a,b){
    var erg=[];
    for(var i=0;i<a.value.length;i++){
        var bb=false; 
        var cc=a.value[i];
        for(var j=0;j<b.value.length;j++){
            bb=bb||(evaluator.helper.equals(cc,b.value[j])).value;
        }
        if(bb){
            erg[erg.length]=a.value[i];
        }
    }
    return {'ctype':'list','value':erg};
}

List.remove=function(a,b){
    var erg=[];
    for(var i=0;i<a.value.length;i++){
        var bb=false; 
        var cc=a.value[i];
        for(var j=0;j<b.value.length;j++){
            bb=bb||(evaluator.helper.equals(cc,b.value[j])).value;
        }
        if(!bb){
            erg[erg.length]=a.value[i];
        }
    }
    return {'ctype':'list','value':erg};
}

List.helper.compare=function(a,b){
    if(a.ctype=='number' && b.ctype=='number'){
        return a.value.real-b.value.real
    }
    return -1;

}

List.sort1=function(a){
  var erg=a.value.sort(General.compare);
  return List.turnIntoCSList(erg);
}

List.helper.isEqual=function(a1,a2){
    return List.equals(a1,a2).value;
}

List.helper.isLessThan=function(a,b){

    var s1 = a.value.length;
    var s2 = b.value.length;
    var i = 0;
    
    while (!(    i >= s1 
                 || i >= s2 
                 || !General.isEqual(a.value[i], b.value[i])
                 )) {i++;}
    if (i == s1 && i < s2) {return true};
    if (i == s2 && i < s1) {return false};
    if (i == s1 && i == s2) {return false};
    return General.isLessThan(a.value[i], b.value[i]);
    
}


List.helper.compare=function(a,b) {
    if(List.helper.isLessThan(a,b)){return -1}
    if(List.helper.isEqual(a,b)){return 0}
    return 1;
}

List.equals=function(a1,a2){
    if(a1.value.length != a2.value.length){
        return {'ctype':'boolean','value':false};
    }
    var erg=true;
    for(var i=0;i<a1.value.length;i++){
        var av1=a1.value[i];
        var av2=a2.value[i];
        
        if(av1.ctype=='list' && av2.ctype=='list' ){
            erg=erg && List.equals(av1,av2).value;
        } else {
            erg=erg && evaluator.comp_equals([av1,av2],[]).value;
            
        }
    }
    return {'ctype':'boolean','value':erg};
}

List.almostequals=function(a1,a2){
    
    if(a1.value.length != a2.value.length){
        return {'ctype':'boolean','value':false};
    }
    var erg=true;
    for(var i=0;i<a1.value.length;i++){
        var av1=a1.value[i];
        var av2=a2.value[i];
        
        if(av1.ctype=='list' && av2.ctype=='list' ){
            erg=erg && List.comp_almostequals(av1,av2).value;
        } else {
            erg=erg && evaluator.comp_almostequals([av1,av2],[]).value;
            
        }
    }
    return {'ctype':'boolean','value':erg};
}

List.set=function(a1){
    var erg=[];
    var erg1=a1.value.sort(General.compare);

    for(var i=0;i<erg1.length;i++){
        if(i==0||!(evaluator.comp_equals([erg[erg.length-1],erg1[i]],[])).value){
            erg[erg.length]=erg1[i];

        }

    }
    
    return {'ctype':'list','value':erg};

}




List.sum1=function(a){
  var erg=Number.real(0);
  for(var i=0;i<a.value.length;i++){
     erg=Number.add(erg,a.value[i]); 
  }
  return erg;
}


List.product1=function(a){
  var erg=Number.real(1);
  for(var i=0;i<a.value.length;i++){
     erg=Number.mult(erg,a.value[i]); 
  }
  return erg;
}




///////////////////////////






List.scaldiv=function(a1,a2){
    if(a1.ctype != 'number'){
        return nada;
    }
    var erg=[];
    for(var i=0;i<a2.value.length;i++){
        var av2=a2.value[i];
        if(av2.ctype=='number' ){
            erg[erg.length]=General.div(av2,a1);
        } else if(av2.ctype=='list'  ){
            erg[erg.length]=List.scaldiv(a1,av2);
        } else {
            erg[erg.length]=nada;
        }
    }
    return {'ctype':'list','value':erg};
}


List.scalmult=function(a1,a2){
    if(a1.ctype != 'number'){
        return nada;
    }
    var erg=[];
    for(var i=0;i<a2.value.length;i++){
        var av2=a2.value[i];
        if(av2.ctype=='number' ){
            erg[erg.length]=General.mult(av2,a1);
        } else if(av2.ctype=='list'  ){
            erg[erg.length]=List.scalmult(a1,av2);
        } else {
            erg[erg.length]=nada;
        }
    }
    return {'ctype':'list','value':erg};
}


List.add=function(a1,a2){
    
    if(a1.value.length != a2.value.length){
        return nada;
    }
    var erg=[];
    for(var i=0;i<a1.value.length;i++){
        var av1=a1.value[i];
        var av2=a2.value[i];
        if(av1.ctype=='number' && av2.ctype=='number' ){
            erg[erg.length]=General.add(av1,av2);
        } else if(av1.ctype=='list' && av2.ctype=='list' ){
            erg[erg.length]=List.add(av1,av2);
        } else {
            erg[erg.length]=nada;
        }
    }
    return {'ctype':'list','value':erg};
}


List.sub=function(a1,a2){
    
    if(a1.value.length != a2.value.length){
        return nada;
    }
    var erg=[];
    for(var i=0;i<a1.value.length;i++){
        var av1=a1.value[i];
        var av2=a2.value[i];
        if(av1.ctype=='number' && av2.ctype=='number' ){
            erg[erg.length]=Number.sub(av1,av2);
        } else if(av1.ctype=='list' && av2.ctype=='list' ){
            erg[erg.length]=List.sub(av1,av2);
        } else {
            erg[erg.length]=nada;
        }
    }
    return {'ctype':'list','value':erg};
}



List.abs2=function(a1){
    
    var erg=0;
    for(var i=0;i<a1.value.length;i++){
        var av1=a1.value[i];
        if(av1.ctype=='number' ){
            erg+=Number.abs2(av1).value.real;
        } else if(av1.ctype=='list' ){
            erg+=List.abs2(av1).value.real;
        } else {
            return nada;
        }
    }

    return {"ctype":"number" ,
        "value":{'real':erg, 'imag':0}};
}

List.abs=function(a1){
   return Number.sqrt(List.abs2(a1))
}


List.recursive=function(a1,op){
    var erg=[];
    for(var i=0;i<a1.value.length;i++){
        var av1=evaluateAndVal(a1.value[i]);//Will man hier evaluieren
        if(av1.ctype=='number'){
            erg[erg.length]=Number[op](av1);
        } else if(av1.ctype=='list'){
            erg[erg.length]=List[op](av1);
        } else {
            erg[erg.length]=nada;
        }
    }
    return {'ctype':'list','value':erg};

}

List.re=function(a){
    return List.recursive(a,"re");
}


List.neg=function(a){
    return List.recursive(a,"neg");
}

List.im=function(a){
    return List.recursive(a,"im");
}

List.conjugate=function(a){
    return List.recursive(a,"conjugate");
}


List.round=function(a){
    return List.recursive(a,"round");
}


List.ceil=function(a){
    return List.recursive(a,"ceil");
}


List.floor=function(a){
    return List.recursive(a,"floor");
}

List.helper.colNumb=function(a){
    if(a.ctype!='list') {
        return -1;
    }
    var ind=-1;
    for(var i=0;i<a.value.length;i++){
        if((a.value[i]).ctype!='list') {
            return -1;
        }
        if(i==0){
            ind=(a.value[i]).value.length;
        } else {
            if(ind!=(a.value[i]).value.length)
                return -1
        }
    }
    return ind;

}

List.helper.isNumberVecN=function(a,n){
    
    if(a.ctype!='list') {
        return false;
    }
    if(a.value.length!=n) {
        return false;
    }

    for(var i=0;i<a.value.length;i++){
        if((a.value[i]).ctype!='number') {
            return false;
        }
    }
    return true;
        
}



List.isNumberVector=function(a){
    if(a.ctype!='list') {
        return {'ctype':'boolean','value':false};
    }
    for(var i=0;i<a.value.length;i++){
        if((a.value[i]).ctype!='number') {
            return {'ctype':'boolean','value':false};
        }
    }
    return {'ctype':'boolean','value':true};
    
}


List.isNumberVectorN=function(a,n){
    if(a.ctype!='list') {
        return {'ctype':'boolean','value':false};
    }
    if(a.value)
    for(var i=0;i<a.value.length;i++){
        if((a.value[i]).ctype!='number') {
            return {'ctype':'boolean','value':false};
        }
    }
    return {'ctype':'boolean','value':true};
    
}






List.isNumberMatrix=function(a){
    if(List.helper.colNumb(a)==-1){
        return {'ctype':'boolean','value':false};
    }

    for(var i=0;i<a.value.length;i++){
        if(!List.isNumberVector((a.value[i])).value) {
            return {'ctype':'boolean','value':false};
        }
    }
    return {'ctype':'boolean','value':true};
    
}



List.scalproduct=function(a1,a2){
    if(a1.value.length != a2.value.length){
        return nada;
    }
    var erg={'ctype':'number','value':{'real':0,'imag':0}};
    for(var i=0;i<a2.value.length;i++){
        var av1=a1.value[i];
        var av2=a2.value[i];
        if(av1.ctype=='number' && av2.ctype=='number'){
            erg=Number.add(Number.mult(av1,av2),erg);
        } else {
            return nada;
        }
    }
    
    return erg;
}

List.productMV=function(a,b){
    if(a.value[1].value.length != b.value.length){
        return nada;
    }
    var li=[];
    for(var j=0;j<a.value.length;j++){
        var erg={'ctype':'number','value':{'real':0,'imag':0}};
        var a1=a.value[j];
        for(var i=0;i<b.value.length;i++){
            var av1=a1.value[i];
            var av2=b.value[i];

            if(av1.ctype=='number' && av2.ctype=='number'){
                erg=Number.add(Number.mult(av1,av2),erg);
            } else {
                return nada;
            }
        }
        li[li.length]=erg;
    }    
    return List.turnIntoCSList(li);

}


List.productVM=function(a,b){
    if(a.value.length != b.value.length){
        return nada;
    }
    var li=[];
    for(var j=0;j<b.value[1].value.length;j++){
        var erg={'ctype':'number','value':{'real':0,'imag':0}};
        for(var i=0;i<a.value.length;i++){
            var av1=a.value[i];
            var av2=b.value[i].value[j];

            if(av1.ctype=='number' && av2.ctype=='number'){
                erg=Number.add(Number.mult(av1,av2),erg);
            } else {
                return nada;
            }
        }
        li[li.length]=erg;
    }    
    return List.turnIntoCSList(li);

}

List.productMM=function(a,b){
    if(a.value[1].value.length != b.value.length){
        return nada;
    }
    var li=[];
    for(var j=0;j<a.value.length;j++){
        var aa=a.value[j];
        var erg=List.productVM(aa,b);
        li[li.length]=erg;
    }    
    return List.turnIntoCSList(li);
}





List.mult=function(a,b){

   if(a.value.length==b.value.length && List.isNumberVector(a).value && List.isNumberVector(b).value){
      return List.scalproduct(a,b);
   } 

    if(List.isNumberMatrix(a).value && b.value.length==a.value[1].value.length && List.isNumberVector(b).value){
      return List.productMV(a,b);
   } 

    if(List.isNumberMatrix(b).value && a.value.length==b.value.length && List.isNumberVector(a).value){
      return List.productVM(a,b);
   } 

    if(List.isNumberMatrix(a).value && List.isNumberMatrix(b) && b.value.length==a.value[1].value.length){
      return List.productMM(a,b);
   } 

   return nada;


}



List.cross=function(a,b){//Assumes that a,b are 3-Vectors
    var x=Number.sub(Number.mult(a.value[1],b.value[2]),Number.mult(a.value[2],b.value[1]));
    var y=Number.sub(Number.mult(a.value[2],b.value[0]),Number.mult(a.value[0],b.value[2]));
    var z=Number.sub(Number.mult(a.value[0],b.value[1]),Number.mult(a.value[1],b.value[0]));
    return List.turnIntoCSList([x,y,z]);
}

List.det3=function(p,q,r){//Assumes that a,b,c are 3-Vectors
                          //Keine Ahnung ob man das so inlinen will (hab das grad mal so übernommen)

        var re=   p.value[0].value.real * q.value[1].value.real * r.value[2].value.real 
                - p.value[0].value.imag * q.value[1].value.imag * r.value[2].value.real 
                - p.value[0].value.imag * q.value[1].value.real * r.value[2].value.imag 
                - p.value[0].value.real * q.value[1].value.imag * r.value[2].value.imag 
                + p.value[2].value.real * q.value[0].value.real * r.value[1].value.real 
                - p.value[2].value.imag * q.value[0].value.imag * r.value[1].value.real 
                - p.value[2].value.imag * q.value[0].value.real * r.value[1].value.imag 
                - p.value[2].value.real * q.value[0].value.imag * r.value[1].value.imag 
                + p.value[1].value.real * q.value[2].value.real * r.value[0].value.real 
                - p.value[1].value.imag * q.value[2].value.imag * r.value[0].value.real 
                - p.value[1].value.imag * q.value[2].value.real * r.value[0].value.imag 
                - p.value[1].value.real * q.value[2].value.imag * r.value[0].value.imag
                - p.value[0].value.real * q.value[2].value.real * r.value[1].value.real 
                + p.value[0].value.imag * q.value[2].value.imag * r.value[1].value.real 
                + p.value[0].value.imag * q.value[2].value.real * r.value[1].value.imag 
                + p.value[0].value.real * q.value[2].value.imag * r.value[1].value.imag 
                - p.value[2].value.real * q.value[1].value.real * r.value[0].value.real 
                + p.value[2].value.imag * q.value[1].value.imag * r.value[0].value.real 
                + p.value[2].value.imag * q.value[1].value.real * r.value[0].value.imag 
                + p.value[2].value.real * q.value[1].value.imag * r.value[0].value.imag 
                - p.value[1].value.real * q.value[0].value.real * r.value[2].value.real 
                + p.value[1].value.imag * q.value[0].value.imag * r.value[2].value.real 
                + p.value[1].value.imag * q.value[0].value.real * r.value[2].value.imag 
                + p.value[1].value.real * q.value[0].value.imag * r.value[2].value.imag;

        var im= - p.value[0].value.imag * q.value[1].value.imag * r.value[2].value.imag 
                + p.value[0].value.imag * q.value[1].value.real * r.value[2].value.real 
                + p.value[0].value.real * q.value[1].value.real * r.value[2].value.imag 
                + p.value[0].value.real * q.value[1].value.imag * r.value[2].value.real 
                - p.value[2].value.imag * q.value[0].value.imag * r.value[1].value.imag 
                + p.value[2].value.imag * q.value[0].value.real * r.value[1].value.real 
                + p.value[2].value.real * q.value[0].value.real * r.value[1].value.imag 
                + p.value[2].value.real * q.value[0].value.imag * r.value[1].value.real 
                - p.value[1].value.imag * q.value[2].value.imag * r.value[0].value.imag 
                + p.value[1].value.imag * q.value[2].value.real * r.value[0].value.real 
                + p.value[1].value.real * q.value[2].value.real * r.value[0].value.imag 
                + p.value[1].value.real * q.value[2].value.imag * r.value[0].value.real
                + p.value[0].value.imag * q.value[2].value.imag * r.value[1].value.imag
                - p.value[0].value.imag * q.value[2].value.real * r.value[1].value.real 
                - p.value[0].value.real * q.value[2].value.real * r.value[1].value.imag
                - p.value[0].value.real * q.value[2].value.imag * r.value[1].value.real
                + p.value[2].value.imag * q.value[1].value.imag * r.value[0].value.imag
                - p.value[2].value.imag * q.value[1].value.real * r.value[0].value.real 
                - p.value[2].value.real * q.value[1].value.real * r.value[0].value.imag 
                - p.value[2].value.real * q.value[1].value.imag * r.value[0].value.real 
                + p.value[1].value.imag * q.value[0].value.imag * r.value[2].value.imag 
                - p.value[1].value.imag * q.value[0].value.real * r.value[2].value.real 
                - p.value[1].value.real * q.value[0].value.real * r.value[2].value.imag 
                - p.value[1].value.real * q.value[0].value.imag * r.value[2].value.real;


    return Number.complex(re,im);
}


List.clone=function(a){
    var erg=[];
    for(var i=0;i<a.value.length;i++){
        erg[erg.length]=evaluator.helper.clone(a.value[i]);
    }
    return {"ctype":"list" ,  "value":erg,"usage":a.usage}
}



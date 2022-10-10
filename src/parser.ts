// @ts-nocheck
import * as foo from './utils.ts';

function predictor(state_set,full_g,i,j,current_name,nullables){
    for(var k = 0;k< full_g.length;k++){
        var flag0=0,flag1=0;
        if(full_g[k].rule_name == current_name){
            var clone = structuredClone(full_g[k]);
            clone.curpo[1] = i;
            for(var m =0;m< (state_set[i]).length;m++){
                if( JSON.stringify(clone) === JSON.stringify(state_set[i][m]) ){
                    flag0 =1;
                    break;
                }
            }
            if(flag0 === 0){
                state_set[i].push(clone)
            }
            if(nullables.size!=0){
                if(nullables.has(full_g[k].rule_name)){
                    var exclone = structuredClone(state_set[i][j]);
                    exclone.curpo[0]=exclone.curpo[0]+1;
                    for(var mm =0;mm< (state_set[i]).length;mm++){
                        if( JSON.stringify(exclone) === JSON.stringify(state_set[i][mm]) ){
                            flag1 =1;
                            break;
                        }
                    }
                }
                if(flag1===0 && nullables.size!=0){
                    state_set[i].push(exclone)
                } 
                else{        
                }  
            }
        }
    }
    return state_set;
}

function scanner(state_set,full_g,i,j,current_name,inp){
        var curval = state_set[i][j].valbod[state_set[i][j].curpo[0]].val
         if(curval == inp[i]){
            if(typeof state_set[i+1] === "undefined"){
                var clone = structuredClone(state_set[i][j]);
                clone.curpo[0]=clone.curpo[0]+1;
                state_set[i+1] = new Array(0);
                state_set[i+1].push(clone);
            }
            else{
                var clone = structuredClone(state_set[i][j]);
                clone.curpo[0]=clone.curpo[0]+1;
                state_set[i+1].push(clone);
            }
         }
         return state_set;
}

function completion(state_set,full_g,i,j,current_name){
    var ins = state_set[i][j].curpo[1];
    if(state_set[i][j].valbod.length == 0){
        return state_set;
    }
    for(var k = 0;k< state_set[ins].length;k++){
        var flag0=0;
        try{
        if(state_set[ins][k].valbod[state_set[ins][k].curpo[0]].val == state_set[i][j].rule_name){
            var clone = structuredClone(state_set[ins][k]);
            clone.curpo[0]=clone.curpo[0]+1;
            for(var m =0;m< state_set[i].length;m++){
                if( JSON.stringify(clone) == JSON.stringify(state_set[i][m]) ){
                    flag0 =1;
                    break;
                }
             }
             if(flag0 === 0){
                state_set[i].push(clone);
             }
        }
    }
    catch(err){
        continue;
    }
    }
        return state_set;
}

export function parse(dir:string,son:string,start:string){
    var ind = Deno.readTextFileSync(dir);
    var so = JSON.parse(son);
    var full_g = so.grammar;
    var confirmed_nullable = new Set(so.nullable);
    var state_set=[[]]
    for(var i = 0;i<full_g.length;i++){
        if(full_g[i].rule_name == start){
            state_set[0].push(full_g[i]);
        }
    }
    for(var i = 0;i< state_set.length;i++){
        var current_subset = state_set[i];
        for(var j=0;j< current_subset.length;j++){
            try {
                if(current_subset[j].valbod[current_subset[j].curpo[0]].t_nt == 0){
                    state_set= predictor(state_set,full_g,i,j,current_subset[j].valbod[current_subset[j].curpo[0]].val,confirmed_nullable)
                    }
                else if(current_subset[j].valbod[current_subset[j].curpo[0]].t_nt == 1){
                    state_set=   scanner(state_set,full_g,i,j,current_subset[j].valbod[current_subset[j].curpo[0]].val,ind)
                    }
                }
            catch(err){
                state_set= completion(state_set,full_g,i,j,i)
                 continue;
                 }

        }
    }
    foo.print_set(state_set);
    foo.analyze(state_set,start);
}


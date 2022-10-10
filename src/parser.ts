// @ts-nocheck
import * as foo from './utils.ts';

function predictor(state_set,full_g,i,j,current_name){
    for(var k = 0;k< full_g.length;k++){
        var flag0=0,flag1;
        if(full_g[k].rule_name == current_name){
            var clone = structuredClone(full_g[k]);
            clone.curpo[1] = i;
            for(var m =0;m< (state_set[i]).length;m++){
                if( JSON.stringify(clone) == JSON.stringify(state_set[i][m]) ){
                    flag0 =1;
                    break;
                }
             }
            if(flag0 == 0){
                state_set[i].push(clone)
            }
        }
    }
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
}

function completion(state_set,full_g,i,j,current_name){
    var ins = state_set[i][j].curpo[1];
    for(var k = 0;k< state_set[ins].length;k++){
        var flag0=0;
        if(state_set[ins][k].valbod[state_set[ins][k].curpo[0]].val == state_set[i][j].rule_name){
            var clone = structuredClone(state_set[ins][k]);
            clone.curpo[0]=clone.curpo[0]+1;
            for(var m =0;m< state_set[i].length;m++){
                if( JSON.stringify(clone) == JSON.stringify(state_set[i][m]) ){
                    flag0 =1;
                    break;
                }
             }
             if(flag0 == 0){
                state_set[i].push(clone);
             }
        }
    }
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
                      predictor(state_set,full_g,i,j,current_subset[j].valbod[current_subset[j].curpo[0]].val)
                    }
                else if(current_subset[j].valbod[current_subset[j].curpo[0]].t_nt == 1){
                      scanner(state_set,full_g,i,j,current_subset[j].valbod[current_subset[j].curpo[0]].val,ind)
                    }
                }
            catch(err){
                 completion(state_set,full_g,i,j,i)
                 continue;
                      }
        }
    }
    foo.print_set(state_set);
    foo.analyze(state_set,start);
}
/*
        var p =0,p1=0;
        if(e == b[k].rule_name){
            var tt = structuredClone(b[k]);
            tt.curpo[1] = d;
            for(var m =0;m< a[d].length;m++){
                if( JSON.stringify(tt) == JSON.stringify(a[d][m]) ){
                    p =1;
                    break;
                }
             }
             if(f.size != 0){
                if(f.has(b[k].rule_name)){
                    var ttt = structuredClone(a[d][g]);
                    ttt.curpo[1] = d;
                    ttt.curpo[0] = ttt.curpo[0]+1;
                    for(var m =0;m< a[d].length;m++){
                       if(JSON.stringify(ttt) == JSON.stringify(a[d][m])){
                           p1=1;
                           break;
                       }
           
                   }
   
               }
             }


        if(p == 0){
            a[d].push(tt);
            //console.log("yee",tt)
        }
        if(f.size != 0){
        if(p1 == 0){
            //console.log("pp",ttt)
            a[d].push(ttt);
        }}
        }*/

        /*
            if(c == d[b]){
            //console.log(g,"bruh")
            if(typeof a[b+1] === "undefined"){
                var clon = structuredClone(g);
                clon.curpo[0]=clon.curpo[0]+1;
                //console.log(a[b+1])
                a[b+1] = new Array(0);
                //console.log("yes",a[b+1])
                //a[b+1].push(new Array(1));
                a[b+1].push(clon)
                //console.log("yes",a[b+1])
            }
            else{
                //console.log("wal")
                var clon = structuredClone(g);
                clon.curpo[0]=clon.curpo[0]+1;
                //console.log(a[b+1])
                a[b+1].push(clon); 
            }
    }

*/


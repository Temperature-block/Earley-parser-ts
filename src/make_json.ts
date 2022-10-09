// @ts-nocheck
export type rule_elem = {
    val:string;
    t_nt:number;
}
export type gram_rule = {
rule_name:string;
id:number;
valbod:rule_elem[];
curpo:number[];
}

export function read_file_init_(dir:string){
    var filtered = [];
    var content:any;
    content = Deno.readTextFileSync(dir);
    var nlrcontent = content.split('\n');
    for(var i=0;i<nlrcontent.length;i++){
    var k = nlrcontent[i];   
    
    k=k.split(" ")
    var arr = k.filter(arrayItem => arrayItem !== "");
    filtered.push(arr);
}
    var full_g:gram_rule[]=[];
    for(var i=0;i<filtered.length;i++){
        var m = filtered[i];
        var copy:rule_elem[]=[];
        for(var j=2;j<m.length;j++){
            if(m[j].includes("'")){
                var temp:rule_elem = {
                    val : m[j].replace("'",'').replace("'",''),
                    t_nt : 1
                }
                copy.push(temp);
            }
            else{
                var temp:rule_elem = {
                    val : m[j],
                    t_nt : 0
                }      
                copy.push(temp);    
            }
    }
    var tt:gram_rule = {
        rule_name:m[0],
        id:i,
        valbod:copy,
        curpo:[0,0]
    }
    full_g.push(tt);
}
var state_set = [[]]
state_set[0].push(full_g[0]);
var count = -1;
var encountered = new Set();
var pending=[],confirmed_nullable=new Set();
for(count =0 ; count<full_g.length;count++){
var temp = full_g[count];
encountered.add(temp.rule_name)
if(temp.valbod.length == 0){
    confirmed_nullable.add(temp.rule_name)
}
else{
    for(var io=0;io<temp.valbod.length;io++){
        if(temp.valbod[io].t_nt == 1){
            continue;
        }
        if(encountered.has(temp.valbod[io].val)  ){
            if(confirmed_nullable.has(temp.valbod[io].val)){
                confirmed_nullable.add(temp.rule_name);
                break;
            }
        } else{
            pending.push(temp);
            break;
        }
    }
}
}
for(var o=0;o<pending.length;o++){
var temp = pending[o];
for(var io=0;io<temp.valbod.length;io++){
    if(temp.valbod[io].t_nt == 1){
        continue;
    }
    if(encountered.has(temp.valbod[io].val)){
        if(confirmed_nullable.has(temp.valbod[io].val)){
            confirmed_nullable.add(temp.rule_name);
            break;
        }
    }
    else{
        break;
    }
}
}
var stuff = {
    grammar:full_g,
    nullable:Array.from(confirmed_nullable)
};
var s = JSON.stringify(stuff);
console.log(s)
return s;
}
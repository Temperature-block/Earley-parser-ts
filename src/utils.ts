export function print_set(a){
    //console.log(a.length)
for(var k=0;k<a.length;k++){
    console.log("--------------------------------------------------",k,"------------------------------------------------------------");
    //console.log(a.length)
    var now = a[k]
    for(var j=0;j<now.length;j++){
        var temp = now[j];
        var m = ""
        m = m+temp.rule_name+" = ";
        var dotp = temp.curpo[0];
        
        for(var p=0;p<temp.valbod.length;p++){
            if(p == dotp){
                m=m+"⚪"+temp.valbod[p].val;
            }
            else{
                m=m+temp.valbod[p].val;
            }
        }
        if(dotp>=temp.valbod.length){
            m=m+"⚪";
        }
        m=m+" "+"("+temp.curpo[1]+")"
        console.log(m);
    }
}
}
export function analyze(a,b){
var analy=a[a.length-1];
for(var k=0;k<analy.length;k++){
if(analy[k].rule_name == b && analy[k].curpo[1]==0 && analy[k].curpo[0]==analy[k].valbod.length){
console.log("sucessful parse!!");
return
}

}
console.log("error")
}
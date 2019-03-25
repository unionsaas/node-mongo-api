
function a() {
    this.a1 = 0
}
a.prototype.b1 = 'b1'
a.prototype.c = function(cc){
    console.log('cc---------------------' +cc)
    return cc
}
let ta = new a()


//console.log(ta.a1)
//console.log(ta['b1'])
console.log(ta['c']('123456'))

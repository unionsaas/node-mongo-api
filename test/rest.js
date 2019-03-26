

//数组长度不固定
let arr = ['a', 'b', 'c', 'd']

//函数不能改
function f(z1, z2, z3, z4, z5, z6) {
    console.log(z1, z2, z3, z4, z5, z6)
}

//调用函数 f，参数是arr，怎么分开放进去
f(...arr) //参数怎么写？

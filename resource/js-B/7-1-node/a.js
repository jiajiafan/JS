function fna1() {
    console.log("fna1");
}

function fna2() {
    console.log("fna2");
}

function fna3() {
    console.log("fna3");
}

//->导出三个供外面使用的方法
module.exports = {
    fna1: fna1,
    fna2: fna2,
    fna3: fna3
};

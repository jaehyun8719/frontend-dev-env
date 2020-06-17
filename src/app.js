import "./style.scss"
// import small from '../src/small.png';
//
// document.addEventListener('DOMContentLoaded', () => {
//     document.body.innerHTML = `
//         <img src="${small}" />
//     `
// })

// console.log(VERSION) // 'v.1.2.3'
// console.log(PRODUCTION) // true
// console.log(MAX_COUNT) // 999
// console.log(api.domain) // 'http://dev.api.domain.com'

// babel
const name = "jaehyun";
console.log(name);

// core-js
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo');
    }, 300);
});

promise1.then((value) => {
    console.log(value);
    // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]


import "./style.css"
import small from './small.png';

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
        <img src="${small}" />
    `
})

console.log(VERSION) // 'v.1.2.3'
console.log(PRODUCTION) // true
console.log(MAX_COUNT) // 999
console.log(api.domain) // 'http://dev.api.domain.com'
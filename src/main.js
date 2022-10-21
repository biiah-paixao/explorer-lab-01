import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg g g:nth-child(1) ellipse")
const ccBgColor02 = document.querySelector(".cc-bg svg g g:nth-child(2) path")
const ccBgColor03 = document.querySelector(".cc-bg svg g g:nth-child(3) ellipse")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")


function setCardType(type){
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    biiah: ["#BC31ED", "#5E38F5"],
    default: ["black","white"],
  }

ccBgColor01.setAttribute("fill", colors[type][0])
ccBgColor02.setAttribute("fill", colors[type][1])
ccBgColor03.setAttribute("fill", colors[type][0])

ccLogo.setAttribute("src", `/cc-${type}.svg`)
}
globalThis.setCardType = setCardType

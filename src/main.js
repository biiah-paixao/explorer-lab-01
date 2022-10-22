import "./css/index.css"
import IMask from 'imask'

const ccBgColor01 = document.querySelector(".cc-bg svg g g:nth-child(1) ellipse")
const ccBgColor02 = document.querySelector(".cc-bg svg g g:nth-child(2) path")
const ccBgColor03 = document.querySelector(".cc-bg svg g g:nth-child(3) ellipse")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")


const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)


const cardHolder = document.querySelector("#card-holder")
const cardHolderPattern = {
  mask: /[a-z]/,
}
const cardHolderMasked = IMask(cardHolder, cardHolderPattern)

let tt;
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^1\d{0,12}/,
      cardtype: "biiah",
    },

    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) => number.match(regex))
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

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

const addButton = document.querySelector('#add-card')
addButton.addEventListener('click', (e) => {
  alert('CARTÃO ADICIONADO')
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
})


cardHolderMasked.on("accept", () => {
  updateCardHolder(cardHolderMasked.value)
})
function updateCardHolder(name) {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText = name.length === 0 ? "FULANO DA SILVA" : name
}


cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})
function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})
function updateExpirationDate(date) {
const ccExpiration = document.querySelector(".cc-expiration .value")
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}


securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})
function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? '123' : code
}
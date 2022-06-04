
const txtOriginalLink = document.getElementById('txtOriginalLink')
const txtCustomAlias = document.getElementById('txtCustomAlias')
const btnMakeLink = document.getElementById('btnMakeLink')
const iconLoading = document.getElementById('iconLoading')
const divMainContainer = document.getElementById('divMainContainer')

let divResult
let txtNewLink
let btnCopyNewLink

function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i') // fragment locator
  return !!pattern.test(str)
}

function validateAndGenNewLink(e) {
  e.preventDefault()
  const originalUrl = txtOriginalLink.value
  if (!originalUrl) {
    return alert('Please enter your link!')
  }

  if (!validURL(originalUrl)) {
    return alert('Your link is not valid!')
  }

  const customAlias = txtCustomAlias.value
  beforeMakeLink()

  const params = {
    original_url: originalUrl,
    custom_alias: customAlias,
  }
  fetch('/api/v1/links', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params)
  }).then((res) => {
    res.json().then((data) => {
      if (data.code === 1001) {
        alert('Your custom alias is already exists! Please try another alias <3')
      } else if (data.code === 1000) {
        const link = data.data.shortened_link

        if (!divResult) {
          divResult = document.createElement('div')
          divResult.classList.add('w-4/5', 'max-w-xl', 'mt-8')
          divResult.innerHTML = `
            <span class="text-lg font-bold">Your new link: </span>
            <input readonly id="txtNewLink" class="max-w-full p-2 bg-white rounded text-[#023e8a]"/>
            <button id="btnCopyNewLink" class="rounded px-2 py-1.5 bg-[#b08968] text-white transition ease-in-out delay-150 duration-300"><i class="fa-solid fa-copy text-lg mr-2"></i>COPY</button>
          `
          divMainContainer.appendChild(divResult)
        }

        if (!txtNewLink) txtNewLink = document.getElementById('txtNewLink')
        txtNewLink.setAttribute('value', link)
        txtNewLink.addEventListener('click', function() {
          window.open(link)
          return false
        }, { once: true })
        txtNewLink.style.width = link.length + 'ch'
        if (!btnCopyNewLink) btnCopyNewLink = document.getElementById('btnCopyNewLink')
        btnCopyNewLink.addEventListener('click', copyNewLink)

        // <div class="w-4/5 max-w-xl mt-8">
        //   <span class="text-lg font-bold">Your new link: </span>
        //   <a id="anchorNewLink" class="p-2 bg-white rounded text-[#023e8a]" href="http://localhost:2404/haudeptrai" target="_blank">http://localhost:2404/haudeptrai</a>
        //   <button id="btnCopyNewLink" class="rounded px-2 py-1.5 bg-[#b08968] text-white transition ease-in-out delay-150 duration-300"><i class="fa-solid fa-copy text-lg mr-2"></i>COPY</button>
        // </div>
      }
    })
  }).catch((err) => {
    alert('Error: Can not create your link! please try again <3')
  }).finally(() => {
    afterMakeLink()
  })
  
}

function beforeMakeLink() {
  iconLoading.classList.remove('!hidden')
  iconLoading.classList.add('!inline-block')
  btnMakeLink.setAttribute('disabled', 'true')
  btnMakeLink.classList.add('bg-[#b08968]')
}

function afterMakeLink() {
  iconLoading.classList.remove('!inline-block')
  iconLoading.classList.add('!hidden')
  btnMakeLink.removeAttribute('disabled')
  btnMakeLink.classList.remove('bg-[#b08968]')
}

function copyNewLink() {
  txtNewLink.select()
  txtNewLink.setSelectionRange(0, 99999)
  document.execCommand('copy')
  btnCopyNewLink.classList.add('bg-[#52b69a]')
  btnCopyNewLink.childNodes[1].textContent = 'COPIED'
  setTimeout(() => {
    btnCopyNewLink.classList.remove('bg-[#52b69a]')
    btnCopyNewLink.childNodes[1].textContent = 'COPY'
  }, 900)
}

btnMakeLink.addEventListener('click', validateAndGenNewLink)

export const googleAnalytics = (gaID) => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
        'gtm.start': new Date(),
        event: 'gtm.js'
    })
    
    const script = document.getElementsByTagName('script')[0]
    const newScript = document.createElement('script')
    newScript.async = true
    newScript.src ='https://www.googletagmanager.com/gtm.js?id='+gaID
    script.parentNode.insertBefore(newScript, script)

    // insert body
    const bodyEl = document.getElementsByTagName('body')[0]
    const noscriptEl = document.createElement('noscript')
    const iframe = document.createElement('iframe')
    iframe.src= `https://www.googletagmanager.com/ns.html?id=${gaID}`
    iframe.height = 0
    iframe.width = 0
    iframe.style = "display:none;visibility:hidden"
    noscriptEl.appendChild(iframe)
    bodyEl.appendChild(noscriptEl)
}
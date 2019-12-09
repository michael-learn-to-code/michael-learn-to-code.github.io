export const googleAdsense = (pubId) => {
    const headEl = document.getElementsByTagName('head')[0]
    const newScript = document.createElement('script')
    newScript.async = true
    newScript.setAttribute('data-ad-client', pubId)
    newScript.src =`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`
    headEl.appendChild(newScript)
}
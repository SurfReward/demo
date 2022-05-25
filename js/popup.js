chrome.storage.local.get({enabled: true}, ({ enabled }) => {
    statusChanged(enabled)
})

const statusChanged = (enabled) => {
    if(enabled){
        document.querySelector('.start').classList.add('hidden')
        document.querySelector('.pause').classList.remove('hidden')
    }else{
        document.querySelector('.start').classList.remove('hidden')
        document.querySelector('.pause').classList.add('hidden')
    }
    document.querySelector('.status').innerText = enabled ? 'enabled' : 'disabled'
}

document.querySelector('.start').addEventListener('click', (e) => {
    chrome.storage.local.set({enabled: true})
    statusChanged(true)
    
    chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ['ruleset']
    })
})

document.querySelector('.pause').addEventListener('click', (e) => {
    chrome.storage.local.set({enabled: false})
    statusChanged(false)

    chrome.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ['ruleset']
    })
})
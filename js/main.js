// blockUrls.forEach((domain, index) => {
//   let id = index + 1;

//   chrome.declarativeNetRequest.updateDynamicRules({
//     addRules: [
//       {
//         id: id,
//         priority: 1,
//         action: { type: 'block' },
//         condition: { urlFilter: domain, resourceTypes: ['main_frame'] }
//       }
//     ],
//     removeRuleIds: [id]
//   });
// });

// fetch('https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt').then(async r => {
//     const text = await r.text()
//     const lines = text.split('\n')
//     const rule = []
//     lines.forEach(line => {
//         const m = line.match(/^0.0.0.0 (?<domain>.*)/)
//         const d = m.groups.domain
//         if(d.endsWith('.adroll.com')){
                
//         }
//         console.log(m)
//         adroll.com

//     });

// })
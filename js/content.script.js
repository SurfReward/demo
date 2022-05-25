let enabled = true

chrome.storage.local.get({enabled}, (res) => {
  enabled = res.enabled
})

const swapAd = el => {
  if(!enabled) {
    return
  }

  let box = el.getBoundingClientRect();
   
  if (box.width == 0 || box.height == 0) {
    // this el has no dimension yet
    resizeObserver.observe(el);
    return;
  }
  
  resizeObserver.unobserve(el);
  
  const container = document.createElement('div');
  container.style.width = box.width + 'px';
  container.style.height = box.height + 'px';
  container.style.backgroundColor = '#afffc2';
  container.style.display = 'inline-block';
  container.style.color = '#000'
  
  const img = document.createElement('img')
  img.src = chrome.runtime.getURL(`/images/ads/${box.width}x${box.height}.png`)

  img.onerror = () => {
    container.removeChild(img)
    
    const span = document.createElement('span')
    span.innerText = "A Google ad was here"
    span.style.fontSize = '24px'

    container.style.display = 'flex'
    container.style.justifyContent = 'center'
    container.style.alignItems = 'center'
    container.appendChild(span)
  }
  
  container.appendChild(img);
  el.parentElement.appendChild(container);
  el.parentElement.removeChild(el);
};

document.arrive('[data-google-av-cxn]', function() {
  swapAd(this);
});

document.arrive('iframe[id^="google_ads_iframe_"]', function() {
  swapAd(this);
});

document.arrive('ins.adsbygoogle', function() {
  swapAd(this);
});

document.arrive('ins > iframe', function() {
  swapAd(this);
});

const resizeObserver = new ResizeObserver(entries => {
  for (let index = 0; index < entries.length; index++) {
    const boxElement = entries[index];
    const { width, height } = boxElement.contentRect;
    
    if (width > 0 && height > 0) {
      swapAd(boxElement.target);
    }
  }
});
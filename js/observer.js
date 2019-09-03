const svgContainer = document.querySelectorAll('.svg-container');
const wgr = document.querySelector('.wgr-path');

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        console.log(entry);

        if (entry.intersectionRatio > 0) {
            wgr.style.animation = `write 5s linear`;
        }
        else {
            wgr.style.animation = 'none';
        }
    })
})

svgContainer.forEach(svgItem => {
    console.log(svgItem);
    
    observer.observe(svgItem)
})

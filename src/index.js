import './styles.css'

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
const imageImport = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg)$/));

let imgUrls = []

for (const key in imageImport) {
    imgUrls.push(imageImport[key]);
}

const slideManager = (() => {

    const slideCount = 3;
    let imgs = imgUrls
    let index = 0

    const listImgs = () => {
        let imgArr = []
    
        for (let i=0; i<slideCount; ++i) {
            imgArr[i] = imgs[index+i];
        }
    
        return imgArr
    }

    const getSlides = () => {

        let imgArr = listImgs();
        
        let slides = []

        for (let img of imgArr) {

            const slide = document.createElement('div');
                slide.classList.add('slide');

            const imgEl = document.createElement('img');
                imgEl.src = img

            slide.append(imgEl);
            slides.push(slide);
        }

        const midPoint = Math.floor(slides.length / 2);
        slides[midPoint].classList.add('focused');

        return slides
    }

    const transition = (imgs, indexStart, indexEnd) => {

    }

    return {
        listImgs,
        getSlides,
        transition,
    };
})();

const content = document.querySelector('#content');

    const slideshow = document.createElement('div');
        slideshow.classList.add('slideshow');

    const carousel = document.createElement('div');
        carousel.classList.add('carousel');

        for (let slide of slideManager.getSlides()) {
            carousel.append(slide);
        }

    const leftBtn = document.createElement('button');
    const rightBtn = document.createElement('button')

    slideshow.append(leftBtn, carousel, rightBtn);


const selector = document.createElement('div');

content.append(slideshow);

window.imageImport = imageImport;
window.imgUrls = imgUrls;
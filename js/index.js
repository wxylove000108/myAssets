let i = 0;
let article = document.querySelector('.article');
let wrapper = document.querySelector('.wrapper')
let width = document.body.offsetWidth;

let backImg = document.querySelector('.article-back-img')

// 引入touch.js 来绑定左滑和右滑手势
touch.on('.article', 'swipeleft', function() {
    const isOverOut = wrapper.scrollWidth - article.offsetWidth
    if (wrapper && wrapper.className !== 'wrapper') return false

    if (isOverOut < article.offsetWidth) {
        return vant.Toast({
            message: '已经是最后一页啦',
            icon: 'warning-o'
        });
    }

    isOut(1)
})
touch.on('.article', 'swiperight', function() {
    isOut(0)
})

function swiperRemove(status) {
    if (status === 1) {
        article.style.transform = `translateX(-${(width - 16) * i}px)`
    } else if (status === 0) {
        if ((width - 16) * i < 0) {
            return i = 0
        }
        article.style.transform = i === 0 ? 'unset' : `translateX(-${-Number(document.querySelector('#content').style.transform.replace(/[^[0-9]/ig, '')) + (width - 16) * i}px)`

    }
}


// 判断是否超出

function isOut(status) {
    let isAnchorPoint = article.getAttribute('data-isAnchorPoint')
    let distance = article.style.transform.replace(/[^\d]/g, '').replace(/\s*/g, "")
    if (isAnchorPoint && isAnchorPoint !== null) {
        // 位移距离
        i = Math.round(Number(distance) / (width - 16))
    }
    status === 1 ? i++ : i--
        swiperRemove(status)

    let distance_after = article.style.transform.replace(/[^\d]/g, '').replace(/\s*/g, "")

    distance_after ? backImg.style.display = 'none' : backImg.style.display = 'block'
}
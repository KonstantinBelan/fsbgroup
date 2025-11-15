gsap.registerPlugin(ScrollTrigger)

// Preloader functionality
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader')
  const logo = preloader.querySelector('.preloader-spinner')

  const minLoadingTime = 1

  const startTime = Date.now()

  function hidePreloader() {
    const elapsedTime = Date.now() - startTime
    const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

    setTimeout(() => {
      // preloader.classList.add('hidden')
      logo.classList.add('active')

      // Fancybox.bind('[data-fancybox]', {})

      setTimeout(() => {
        logo.classList.remove('active')
        setTimeout(() => {
          preloader.classList.add('hidden')

          gsap.utils.toArray('.section').forEach((servicesCards_item, index) => {
            gsap.to(servicesCards_item, {
              scrollTrigger: {
                trigger: servicesCards_item,
                toggleActions: 'play none none none',
                start: 'top bottom',
                once: true,
                // markers: true,
              },
              y: 0,
              duration: 0.6,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power2.out',
              delay: index * 0.02,
            })
          })

          gsap.utils.toArray('header.header, footer.footer').forEach((servicesCards_item, index) => {
            gsap.to(servicesCards_item, {
              scrollTrigger: {
                trigger: servicesCards_item,
                toggleActions: 'play none none none',
                start: 'top bottom',
                once: true,
                // markers: true,
              },
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: index * 0.02,
            })
          })

          setTimeout(() => {
            preloader.remove()
          }, 350)
        }, 400)
      }, 1500)
    }, remainingTime)
  }

  if (document.readyState === 'complete') {
    hidePreloader()
  } else {
    window.addEventListener('load', hidePreloader)
  }
})

// // Создание мозаичного фона
// function createMosaicBackground() {
//   const mosaicBackground = document.getElementById('mosaicBackground')
//   const containerWidth = window.innerWidth
//   const containerHeight = window.innerHeight

//   // Вычисляем количество плиток
//   const tilesX = Math.ceil(containerWidth / 4)
//   const tilesY = Math.ceil(containerHeight / 4)

//   // Создаем плитки
//   for (let i = 0; i < tilesX * tilesY; i++) {
//     const tile = document.createElement('div')
//     tile.className = 'mosaic-tile'

//     // Добавляем случайную задержку для анимации
//     const delay = Math.random() * 0.5
//     tile.style.transitionDelay = `${delay}s`

//     mosaicBackground.appendChild(tile)
//   }
// }

// // Функционал прелоадера
// window.addEventListener('load', function () {
//   const preloader = document.getElementById('preloader')
//   const logo = preloader.querySelector('.preloader-spinner')
//   const minLoadingTime = 1 // Минимальное время показа прелоадера в миллисекундах

//   const startTime = Date.now()

//   function hidePreloader() {
//     const elapsedTime = Date.now() - startTime
//     const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

//     logo.classList.add('active')

//     setTimeout(() => {
//       // Добавляем класс для запуска анимации исчезновения

//       preloader.classList.add('hidden')

//       // Удаляем прелоадер после завершения анимации
//       setTimeout(() => {
//         // preloader.remove()
//       }, 1000)
//     }, remainingTime)
//   }

//   if (document.readyState === 'complete') {
//     hidePreloader()
//   } else {
//     window.addEventListener('load', hidePreloader)
//   }
// })

// // Создаем мозаичный фон после загрузки DOM
// document.addEventListener('DOMContentLoaded', createMosaicBackground)

// Modal functionality
document.addEventListener('DOMContentLoaded', function () {
  const modalTriggers = document.querySelectorAll('[data-modal-target]')
  const modals = document.querySelectorAll('.modal')
  const modalCloses = document.querySelectorAll('.modal__close')

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault()

      const target = this.getAttribute('data-modal-target')
      const modal = document.getElementById(target)

      console.log('Modal trigger clicked', modal)
      if (modal) {
        modal.classList.add('active')
        document.body.style.overflow = 'hidden'
      }
    })
  })

  modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
      const modal = this.closest('.modal')
      modal.classList.remove('active')
      document.body.style.overflow = ''
    })
  })

  window.addEventListener('click', function (e) {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.classList.remove('active')
        document.body.style.overflow = ''
      }
    })
  })
})

// Scroll Button Functionality
class ScrollButton {
  constructor() {
    this.bottomBtn = document.querySelector('.bottom__btn')
    this.lastScrollY = window.scrollY
    this.scrollThreshold = 500
    this.bottomThreshold = 200
    this.isVisible = false

    this.init()
  }

  init() {
    if (!this.bottomBtn) return

    window.addEventListener('scroll', this.handleScroll.bind(this))
    this.handleScroll() // Initial check
  }

  handleScroll() {
    const currentScrollY = window.scrollY
    const documentHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight

    // Вычисляем расстояние до низа страницы
    const distanceFromBottom = documentHeight - (currentScrollY + windowHeight)

    // Не показываем кнопку в первых 200px и последних 200px
    const isInTopArea = currentScrollY < this.scrollThreshold
    const isInBottomArea = distanceFromBottom < this.bottomThreshold

    if (isInTopArea || isInBottomArea) {
      this.hideButton()
      this.lastScrollY = currentScrollY
      return
    }

    // Определяем направление скролла
    const isScrollingDown = currentScrollY > this.lastScrollY

    // if (isScrollingDown && !this.isVisible) {
    //   this.showButton()
    // } else if (!isScrollingDown && this.isVisible) {
    //   this.hideButton()
    // }
    this.showButton()

    this.lastScrollY = currentScrollY
  }

  showButton() {
    this.bottomBtn.classList.add('visible')
    this.isVisible = true
  }

  hideButton() {
    this.bottomBtn.classList.remove('visible')
    this.isVisible = false
  }
}

// Инициализация когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
  new ScrollButton()
})

export const fadeIn = {
  methods: {
    $_fadeIn (element, yStart = 0, xStart = 0, start = 'top+48', delay = 0, duration = 1) {
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')

      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: `${start} bottom`
        }
      })

      tl.from(element, {
        x: xStart,
        y: yStart,
        opacity: 0,
        duration,
        ease: 'customEaseOut',
        delay
      })
    }
  }
}

export const onScroll = {
  methods: {
    $_onScroll ({ going }) {
      if (going === 'in') {
        this.active = true
      }
    }
  }
}

export const removeFocus = {
  methods: {
    $_removeFocus () {
      document.activeElement.blur()
    }
  }
}

export const trapFocus = {
  methods: {
    $_trapFocus (element) {
      const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
      const firstFocusableEl = focusableEls[0]
      const lastFocusableEL = focusableEls[focusableEls.length - 1]

      element.style.outline = 'transparent'

      element.addEventListener('keydown', function (e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9)

        if (!isTabPressed) {
          return
        }

        /* eslint-disable */
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
              e.preventDefault()
            lastFocusableEL.focus()
          }
        } else {
          if (document.activeElement === lastFocusableEL) {
            e.preventDefault()
            firstFocusableEl.focus()
          }
        }
      })
      element.focus()
    }
  }
}

export const bodyScroll = {
  methods: {
    $_stopBodyScroll () {
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'
      document.body.style.overflowY = 'scroll'
      document.body.style.width = '100%'
    },
    $_resetBodyScroll () {
      const scrollPos = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollPos || '0') * -1)
    }
  }
}

export const debounce = {
  data: () => ({
    debounceLastTimeout: null
  }),
  methods: {
    debounce (func, args, wait, immediate) {
      const later = () => {
        this.debounceLastTimeout = null
        if (!immediate) {
          func(args)
        }
      }
      const callNow = immediate && !this.debounceLastTimeout
      clearTimeout(this.debounceLastTimeout)
      this.debounceLastTimeout = setTimeout(later, wait)
      if (callNow) {
        func(args)
      }
    }
  }
}

export const titleAnimation = {
  methods: {
    $_titleAnimation (element, delay = 0) {

      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')

      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: element,
          toggleActions: 'play none play none',
          start: `top+=100 bottom`
        }
      })

      tl.fromTo(element, {
        y: '24',
        opacity: 0
      }, {
        y: '0',
        opacity: 1,
        duration: 2,
        ease: 'customEaseOut'
      })
    }
  }
}

export const throttle = {
  methods: {
    throttle (func, args, limit) {
      if (!this.throttleLastRan) {
        func(args)
        this.throttleLastRan = Date.now()
      } else {
        clearTimeout(this.throttleLastTimeout)
        this.throttleLastTimeout = setTimeout(() => {
          if (Date.now() - this.throttleLastRan >= limit) {
            func(args)
            this.throttleLastRan = Date.now()
          }
        }, limit - (Date.now() - this.throttleLastRan))
      }
    }
  }
}

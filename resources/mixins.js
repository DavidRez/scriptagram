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

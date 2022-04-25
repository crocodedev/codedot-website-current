import { useCallback, useMemo } from 'react'
import { animateScroll, scroller } from 'react-scroll'

const DefOptions = {
  smooth: 'easeInOutQuart',
}

const useSmoothScrollTo = (anchorOrPosition, options = {}) => {
  const opts = useMemo(
    () => ({
      ...DefOptions,
      ...options,
    }),
    [options],
  )

  return useCallback(() => {
    switch (typeof anchorOrPosition) {
      case 'number':
      case 'bigint':
        animateScroll.scrollTo(anchorOrPosition, opts)
        break
      case 'string':
        scroller.scrollTo(anchorOrPosition, opts)
        break
      default:
        break
    }
  }, [anchorOrPosition, opts])
}

export default useSmoothScrollTo

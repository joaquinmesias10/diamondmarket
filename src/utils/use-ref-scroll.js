import { useRef, useCallback, useEffect } from 'react';
import { isClient } from './use-is-client';
 

function scrollToPercent(
  el,
  {
    container,
    percentOfElement,
    offsetPX,
    direction,
    percentOfContainer
  } 
) {
  const rect = el.current.getClientRects()[0];
  const isVertical = direction === 'Vertical';
  const refSize = isVertical ? rect.height : rect.width;
  const elemScroll = isVertical ? rect.y : rect.x;

  const scrollSize =
    container === window
      ? isVertical
        ? container.innerHeight
        : container.innerWidth
      : isVertical
      ? container.scrollHeight
      : container.scrollWidth;

  let addOffset = (refSize * percentOfElement) / 100;
  if (offsetPX) {
    addOffset += offsetPX;
  }

  const containerScroll = isVertical ? container.scrollY : container.scrollX;
  const newScroll =
    containerScroll +
    elemScroll +
    ((scrollSize * percentOfContainer) / 100 + addOffset);

  const scrollObj = isVertical ? { top: newScroll } : { left: newScroll };

  window.scrollTo({
    ...scrollObj,
    behavior: 'smooth'
  });
}


export function useRefScroll({
  percentOfElement = 50,
  offsetPX = 0,
  onMount = false,
  container = isClient ? window : null,
  percentOfContainer = 50,
  direction = ScrollDirections.Vertical
} ) {
  const elRef = useRef(null);

  const scroll = useCallback(() => {
    if (elRef.current) {
      scrollToPercent(elRef, {
        percentOfElement,
        offsetPX,
        container,
        percentOfContainer,
        direction
      });
    }
  }, [elRef.current]);

  useEffect(() => {
    if (onMount) {
      scroll();
    }
  }, []);

  return { elRef, scroll };
}

// function MyComponent() {
//   // using the hook without arguments will scroll the element to the center of the
//   // window's viewport
//   // alias elRef to myDiv for easier usage if having multiple elements
//   // in the same component

//   const { elRef: myDiv, scroll } = useRefScroller();

//   return (
//     <div>
//       <button onClick={scroll}>Scroll</button>

//       <div ref={myDiv}>
//         `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, massa vitae consectetur egestas, justo magna
//         facilisis arcu, non accumsan lacus ipsum sit amet nisl.`
//       </div>
//     </div>
//   );
// }

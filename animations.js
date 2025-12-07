// Scroll Animations using Intersection Observer API
document.addEventListener('DOMContentLoaded', () => {
  // Elements to animate on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  // Animation options
  const animationOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // 15% of the element must be visible
  };
  
  // Callback function when elements intersect viewport
  const animationCallback = (entries, observer) => {
    entries.forEach(entry => {
      // Get the element for this entry (safe in both branches)
      const element = entry.target;

      if (entry.isIntersecting) {
        // Add the animation class based on data attribute
        const animationType = element.dataset.animation || 'fade-in';
        element.classList.add(animationType);

        // Optional: Stop observing after animation
        if (element.dataset.once === 'true') {
          observer.unobserve(element);
        }
      } else {
        // Remove animation class if element is not in view and not set to animate once
        if (element.dataset.once !== 'true') {
          const animationType = element.dataset.animation || 'fade-in';
          element.classList.remove(animationType);
        }
      }
    });
  };
  
  // Create the observer
  const animationObserver = new IntersectionObserver(animationCallback, animationOptions);
  
  // Observe all elements with animate-on-scroll class
  animateElements.forEach(element => {
    animationObserver.observe(element);
  });
  
  // Staggered animations for groups of elements
  const staggeredGroups = document.querySelectorAll('[data-stagger-group]');
  
  staggeredGroups.forEach(group => {
    const children = group.querySelectorAll('.stagger-item');
    
    children.forEach((child, index) => {
      // Add delay based on index
      child.style.animationDelay = `${index * 0.1}s`;
    });
  });
});

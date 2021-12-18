


// blocco dello scroll horizontale----------------

var scrollEventHandler = function()
{
  window.scroll(0, window.pageYOffset)
}

window.addEventListener("scroll", scrollEventHandler, false);

// REVEAL FUNCTION---------------------------------------------

// usage:
batch(".rivela", {
    interval: 0.1, // time window (in seconds) for batching to occur. The first callback that occurs (of its type) will start the timer, and when it elapses, any other similar callbacks for other targets will be batched into an array and fed to the callback. Default is 0.1
    batchMax: 3,   // maximum batch size (targets)
    onEnter: batch => gsap.to(batch, {autoAlpha: 1, stagger: 0.15, overwrite: true}),
    onLeave: batch => gsap.set(batch, {autoAlpha: 0, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {autoAlpha: 1, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {autoAlpha: 0, overwrite: true})
    // you can also define things like start, end, etc.
  });
  
  
  
  
  // the magical helper function (no longer necessary in GSAP 3.3.1 because it was added as ScrollTrigger.batch())...
  function batch(targets, vars) {
    let varsCopy = {},
        interval = vars.interval || 0.1,
        proxyCallback = (type, callback) => {
          let batch = [],
              delay = gsap.delayedCall(interval, () => {callback(batch); batch.length = 0;}).pause();
          return self => {
            batch.length || delay.restart(true);
            batch.push(self.trigger);
            vars.batchMax && vars.batchMax <= batch.length && delay.progress(1);
          };
        },
        p;
    for (p in vars) {
      varsCopy[p] = (~p.indexOf("Enter") || ~p.indexOf("Leave")) ? proxyCallback(p, vars[p]) : vars[p];
    }
    gsap.utils.toArray(targets).forEach(target => {
      let config = {};
      for (p in varsCopy) {
        config[p] = varsCopy[p];
      }
      config.trigger = target;
      ScrollTrigger.create(config);
    });
  }


// SINGLE SECTION HORIZONTAL SCROLLING-------------------------------------------

const horizontalSections = gsap.utils.toArray('section.horizontal')

horizontalSections.forEach(function (sec, i) {	
  
  var thisPinWrap = sec.querySelector('.pin-wrap');
  var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');
  
  var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 

  gsap.fromTo(thisAnimWrap, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue() 
  }, { 
    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0, 
    ease: "none",
    scrollTrigger: {
      trigger: sec,		
      start: "top top",
      end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      //anticipatePin: 1,
      scrub: true,
      //markers: true,
    }
  });

});

// reveal ------------------------------
function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});

// Parallax------------------------------------

gsap.to(".pContent", {
  yPercent: -100,
  ease: "none",
  scrollTrigger: {
    trigger: ".pSection",
    // start: "top bottom", // the default values
    // end: "bottom top",
    scrub: true
  }, 
});

gsap.to(".pImage", {
  yPercent: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".pSection",
    // start: "top bottom", // the default values
    // end: "bottom top",
    scrub: true
  }, 
});

// scroll indicator-----------------------
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.height = scrolled + "%";
}

// mouse cirlular---------------------------_
$(document).mousemove(function (e) {
  $(".pointer").css({ left: e.pageX, top: e.pageY });
});


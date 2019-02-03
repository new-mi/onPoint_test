let   screen = 0,
      wrap = document.getElementsByClassName('main')[0],
      pages = document.getElementsByClassName('page'),
      nav = document.getElementById('navbar'),
      point = document.getElementsByClassName('point'),
      parallax = document.getElementsByClassName('parallax')[0],
      delayParallax = 30,
      scrollDown = document.getElementsByClassName('scroll_down')[0],
      delayScrollDown = 500;

// touch
let   startingY = 0,
      change = 0;

// slider
let   slideCount = 0,
      rangeSlide = document.getElementsByClassName('slides-range')[0],
      slides = document.getElementsByClassName('slides')[0],
      slidesItem = document.getElementsByClassName('slides-item'),
      myRange = document.getElementById('myRange'),
      xSize,
      arrSlide = [],
      slidesLenght = slidesItem.length,
      arrHelp = [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//slides-range
let   years = [];

init()

function init() {
  navPoint(pages, nav);

  slideInit(slidesItem);

  navPointSlide(years, rangeSlide);

  xSize = (100/(years.length-1));
  
  creatArrSlide(arrSlide, slidesLenght);

  point[0].classList.add('active');
  parallax.style.backgroundSize = "100% " + (100*pages.length) +"%";
  
  myRange.addEventListener('touchmove', handlerChangeRange);
  myRange.addEventListener('touchend', handlerChangeRangeEnd);
  
  myRange.addEventListener('mousemove', handlerChangeRange);
  myRange.addEventListener('mouseup', handlerChangeRangeEnd);


  document.body.addEventListener('wheel', handlerScreenScroll);


  document.body.addEventListener('touchstart', handlerTouchStart);
  document.body.addEventListener('touchmove', handlerTouchMove);
  document.body.addEventListener('touchend', handlerTouchEnd);

}

// INITIALIZATION VERTICAL SLIDER
// p1 - {HTMLCollection} slides
// return new {array}

function slideInit(p1) {
  let year;

  for (let i = 0; i < p1.length; i++){
    p1[i].classList.remove('active');
    
    p1[i].setAttribute('data-id', i+1);

    year = p1[i].getAttribute('data-year');

    years.push(parseInt(year));
  }

  slideCount = p1.length-1;

  slides.style.marginLeft = -(slideCount * 100) + '%';
  slides.style.width = ((slideCount+1) * 100) + '%';

  p1[slideCount].classList.add('active');

  return years;
}

// CREATE ARRAY SEGMENT-SLIDE
// param - {array} empty
// param2 - {number} amount slides
// return {array}
function creatArrSlide(param, param2) {
  let count = 1;
  let newArr = param2+arrHelp[param2];

  for (let i = 0; i < newArr; i++) {
    

    if (i == 0) {param.push(0); continue;};

    param.push(count);

    count = i+1-count;
  }

  return param;
}

// HANDLERS SLIDER RANGE
function handlerChangeRange(e) {
  let x = Math.floor(parseInt(e.target.value)/(xSize/2));
  slides.style.marginLeft =  -(arrSlide[x]*100) + "%";
}
function handlerChangeRangeEnd(e) {
  let x = Math.floor(parseInt(e.target.value)/(xSize/2));

  if ((e.target.value) == 100) {x = x - 1};

  myRange.value = arrSlide[x] * xSize;
}
// END HANDLERS SLIDER RANGE


// HANDLERS TOUCH
function handlerTouchStart(e) {
  startingY = e.touches[0].clientY;
}

function handlerTouchMove(e) {
  let touch = e.touches[0];
  return change = (startingY - touch.clientY);

}

function handlerTouchEnd(e) {

  for(let i = 0; i < point.length; i++){
    point[i].classList.remove('active');
  }

  if (change < -150) {
    if (screen > 0) {
      screen--;
      change = 0;
    }
  } else if(change > 150) {
    if (screen < pages.length-1) {
      screen++;
      change = 0;
    }
  }

  let position = (-screen * 100) + '%';
  wrap.style.top = position;

  point[screen].classList.add('active');

  if (screen != 0) {
    scrollDown.style.opacity = 0;
  } else {
    setTimeout(function() {
      scrollDown.style.opacity = 1;
    }, delayScrollDown);
  };

  setTimeout(function() {
    parallax.style.backgroundPositionY = ((100/(pages.length-1)) * screen) + '%';
  }, delayParallax);

  return screen;
}
// END HANDLERS TOUCH



// HANDLER SCROLL PC
function handlerScreenScroll(e) {
  for(let i = 0; i < point.length; i++){
    point[i].classList.remove('active');
  }


  if (e.deltaY > 0) {
      if (screen > 0) {
        screen--;
      }
  } else {
    if (screen < pages.length-1) {
      screen++;
    }
  }

  let position = (-screen * 100) + '%';
  wrap.style.top = position;

  point[screen].classList.add('active');

  if (screen != 0) {
    scrollDown.style.opacity = 0;
  } else {
    setTimeout(function() {
      scrollDown.style.opacity = 1;
    }, delayScrollDown);
  };

  setTimeout(function() {
    parallax.style.backgroundPositionY = ((100/(pages.length-1)) * screen) + '%';
  }, delayParallax);
}

// CREATE PAGINATION
// prop1 - {HTMLCollection} pages
// prop2 - {Parent element} enter a list
// not return
function navPoint(prop1, prop2) {

  let ul = document.createElement('ul');

  for (let i = 0; i < prop1.length; i++) {
    let a = document.createElement('li');
    a.classList.add('point');
    a.setAttribute('data-id', i);
    addHandlerPoint(a);
    addHandlerPointTouch(a);
    ul.appendChild(a);
  }

  prop2.appendChild(ul);
}


// HANDLERS TOUCH and CLICK POINT PAGINATION
// prop1 - {element} pages
// not return
function addHandlerPoint(elem) {
  elem.addEventListener('click', function(e) {
    let count = e.target.getAttribute('data-id');

    for(let i = 0; i < point.length; i++){
      point[i].classList.remove('active');
    }

    screen = count;

    let position = (-screen * 100) + '%';
    wrap.style.top = position;

    if (screen != 0) {
      scrollDown.style.opacity = 0;
    } else {
      setTimeout(function() {
        scrollDown.style.opacity = 1;
      }, 1000);
    };
    
    point[screen].classList.add('active');

    setTimeout(function() {
      parallax.style.backgroundPositionY = ((100/(pages.length-1)) * screen) + '%';
    }, delayParallax);

  });
}

function addHandlerPointTouch(elem) {
  elem.addEventListener('touchend', function(e) {
    let count = e.target.getAttribute('data-id');

    for(let i = 0; i < point.length; i++){
      point[i].classList.remove('active');
    }

    screen = count;

    let position = (-screen * 100) + '%';
    wrap.style.top = position;

    if (screen != 0) {
      scrollDown.style.opacity = 0;
    } else {
      setTimeout(function() {
        scrollDown.style.opacity = 1;
      }, 1000);
    };
    
    point[screen].classList.add('active');

    setTimeout(function() {
      parallax.style.backgroundPositionY = ((100/(pages.length-1)) * screen) + '%';
    }, delayParallax);
  });
}

// HANDLERS TOUCH and CLICK POINT PAGINATION
// prop1 - {array} slides or {HTMLCollection} slides
// prop2 - {Parent element} enter a list
// not return
function navPointSlide(prop1, prop2) {
  let x;

  let ul = document.createElement('ul');

  for (let i = 0; i < prop1.length; i++) {
    let a = document.createElement('li');
    a.classList.add('point');
    a.innerHTML = prop1[i];

    // if (i == 0) {
    //   x = 2;
    // } else {
    //   if ( i == prop1.length-1) {
    //     x = 90;
    //   } else {
    //     x = (100/prop1.length)*i + (100/prop1.length)*i/prop1.length;
    //   }
    // }

    x = ((90/(prop1.length-1))*i);
    

    a.style.marginLeft = x + '%';

    ul.appendChild(a);
  }

  prop2.appendChild(ul);
}





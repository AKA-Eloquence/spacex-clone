"use strict"

// **************************
// Get Elements
// ************************** 
const innerLeftElms = document.querySelectorAll(".section-inner");
const body = document.querySelector("body");
const fadeMeOut = document.querySelector(".fade-me-out");
const sections = document.querySelector(".section");
const headerContainer = document.querySelector(".header-container");
const headerAnimation = document.querySelector(".header-container.hover-animation");

// **************************
// All the preload stuff 
// **************************
setTimeout(()=>{
// To remove scroll bar while class .fade is in document
    body.classList.remove("vh-100");
// to remove class .fade from page
    body.classList.add("loaded");
    // to remove class .fade class from document so navbar works properly
    setTimeout(() => {
        fadeMeOut.classList.remove("fade");
    }, 250);
}, 400);

// **************************
// start page from top on refresh
// **************************
window.onbeforeunload = (event) => {
    document.querySelectorAll("html").style.backgroundColor = "black";
    body.style.display = "none";
    window.scrollTo({top:0});
  };

// **************************
// Intersection observer for section animation
// first time using this intersection thing real pain
// ************************** 
const options = {
    root: null,
    threshhold: 0,
    rootMargin: "0px",
 };

// **************************
// Internection Observer for sections to header animation
// ************************** 
const myOptions = {};
const obsForSections = new IntersectionObserver ((entries, observer) => {
// if first section is visible on the view port
    if(entries[0].isIntersecting === true) {
        window.onscroll = function(e){
            setTimeout((e) => {
                headerAnimation.style.setProperty("--height0", "0px")
            }, 100);
        };
    }
    // if first section is NOT visible on the view port 
    else {
        // See if scrolling down or up
        let newValue = 0
        let oldValue = 0
        window.onscroll = function(e){
            newValue = window.pageYOffset;
            if (oldValue < newValue) {
                headerAnimation.style.setProperty("--height0", "0px");
            } else if (oldValue > newValue) {
                headerAnimation.style.setProperty("--height0", "100px");
            };
            oldValue = newValue;
        };
        // 
    };
}, myOptions);
// Observe section with obsForSections
obsForSections.observe(sections);


// **************************
// Internection Observer for inner div
// ************************** 
const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            return
        }
        const isAnima = document.querySelectorAll(".is-anima");

        // **************************
        // Internection Observer for innner div's Contnet
        // ************************** 
        const newObs = new IntersectionObserver((entrys, obser)=> {
            entrys.forEach(ent => {
                if(!ent.isIntersecting) {
                    return
                };
                if (!body.classList.contains("loaded")) {
                    setTimeout(() => {
                        ent.target.classList.add("animateFromBottom");
                    }, 500);
                } else {
                    ent.target.classList.add("animateFromBottom")
                };
            });
        }, options);

        isAnima.forEach((isAnim) => {
            newObs.observe(isAnim);
        });


        });
    }, options);

innerLeftElms.forEach( innerLeftElm => {
    obs.observe(innerLeftElm);
});

"use strict"

const innerLeftElms = document.querySelectorAll(".section-inner");
const body = document.querySelector("body");
const fadeMeOut = document.querySelector(".fade-me-out");

// **************************
// All the preload stuff 
// **************************

setTimeout(()=>{
    body.classList.remove("vh-100");
    body.classList.add("loaded");
    setTimeout(() => {
        fadeMeOut.classList.remove("fade");
    }, 250);
}, 400);

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
// Observer for inner div
// ************************** 
const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            return
        }
        const isAnima = document.querySelectorAll(".is-anima");

        // **************************
        // Observer for innner div's Contnet
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

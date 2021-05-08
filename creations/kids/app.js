
"use strict";

const PlayBox = (function(){
    const state = new Map();

    (function(){
        const containerStyle = document.createElement('style');
        const imageBoxStyle = document.createElement('style');
        containerStyle.innerHTML = ` 
            .playbox *, .playboximage *{
                margin:0px;
                border:0px;
                padding:0px;
                box-sizing:border-box;
            }

            .playbox , .playboximage{
                position:fixed; 
                top:0;
                left:0;
                width:100%;
                height:100%;
                z-index:1000;
                overflow:auto;
                background-color:rgba(0,0,0,.6);
                display:none;
            }
                        
            .playbox .exit, .playboximage .exit{
                position:absolute;
                top:10px;
                right:10px;
                font-size:2.5rem;
                color:#FFF;
                width:40px;
                height:40px;
                overflow:hidden;
                cursor:pointer;
                text-align:center;
                line-height:40px;
                font-family: "Times New Roman", Times, serif;
                z-index:10;
            }

            .playbox .exit::selection, .playboximage .exit::selection{
                color: none;
                background: none;
            }
                        
            .playbox .container, .playboximage .container{
                position:relative;
                top:100px;
                width:95%;
                min-height:200px;
                background-color:#FFF;
                box-shadow:0 0 5px rgba(0,0,0,.5);
                margin:0 auto 50px;
                max-width:800px;
                padding:30px 20px;
                border-radius:4px;
            }
                        
            @media (max-width:700px){
                .playbox .container, .playboximage .container{
                    top:65px;
                    width:92%;
                }
            
                .playbox .exit, .playboximage .exit{
                    top:8px;
                    right:8px;
                    width:30px;
                    height:30px;
                    font-size:2rem;
                    line-height:28px;
                }
            }

            @keyframes slideIn{
                0% {transform:translateY(-50px);}
                100%{transform:translateY(0);}
            }

            @keyframes slideOut{
                0% {transform:translateY(0);}
                100%{transform:translateY(-50px);}
            }

            @keyframes fadeIn{
                0% {opacity:0;}
                100%{opacity:1;}
            }
                        
            @keyframes fadeOut{
                0% {opacity:1;}
                100%{opacity:0;}
            }
        `;

        imageBoxStyle.innerHTML = `
            .playboximage .container{
                border-radius: 0 !important;
                padding:0px !important;
                top:60px !important;
                background-color: rgba(0, 0, 0, 0) !important;
                box-shadow: none !important;
                width: 750px !important;
                height: 500px !important;
            }
            
            
            
            /* New Element Styling in the Container */
            .playboximage .bgImage{
                width:auto;
                height: 100%;
            }
            
            .playboximage .arrow{
                padding:6px 16px;
                top:50%;
                color:#DDD;
                font-weight: bold;
                display: inline-block;
                font-size: 2.5rem;
                position: absolute;
                z-index: 102;
                border-radius: 100%;
                transform: translateY(-50%);
                cursor: pointer;
            }
            
            .playboximage .leftarrow{
                left:-55px;
            }
            
            .playboximage .rightarrow{
                right:-55px;
            }
            
            .playboximage .imageList{
                position: fixed;
                width: 100%;
                height:100px;
                overflow-x: auto;
                box-shadow: 0 0 6px rgba(0, 0, 0, .6);
                background-color: rgba(0, 0, 0, .4);
                bottom:0;
                display: flex;
                padding:5px;
                max-width: 50rem;
            }
            
            .playboximage .imageList img{
                width:100px;
                height: 80px;
                margin-right:10px;
                cursor: pointer;
                filter: grayscale(100%);
                position: absolute;
            }
            
            .playboximage .active{
                transition:all .2s ease;
                border:none !important;
                box-shadow: 0 0 7px rgba(255, 255, 255, .7) !important;
                filter: grayscale(0%)!important;
            }
            
            @media (max-width:800px){
                .playboximage .container{
                    top:20% !important;
                    width: 95% !important;
                    height: 350px !important;
                }
                .playboximage .arrow{
                    top:50%;
                    transform: translateY(-50%);
                }
            
                .playboximage .arrow:active {
                    transition: all .2s ease;
                    background-color: rgba(124, 124, 124, 0.836);
                }
                
                .playboximage .leftarrow{
                    left:20px;
                }
                
                .playboximage .rightarrow{
                    right:20px;
                }
            
                .playboximage .imageList{
                    height:150px;
                    overflow-x: auto;
                    box-shadow: 0 0 4px rgba(0, 0, 0, .6);
                    padding:10px;
                    
                }
            
                .playboximage .imageList img{
                    width:100px;
                    margin-right:8px;
                    height: 110px;
                }

                .wingarrow{
                    display: none!important;
                }
            }
        `;
        document.getElementsByTagName('head')[0].appendChild(containerStyle);
        document.getElementsByTagName('head')[0].appendChild(imageBoxStyle);
    })();
    
    var getElement = function(element){
        if(!(element instanceof Element) && !(element instanceof NodeList)){
            return document.querySelector(element);
        }
        return element;
    }

    var getElements = function(element){
        if(!(element instanceof Element)  && !(element instanceof NodeList)){
            return Array.from(document.querySelectorAll(element));
        }
        return Array.from(element);
    }

    var children = function(element){
        element = getElement(element);
        return element.querySelectorAll(":scope > *");
    }

    var fadeIn = function(element, duration=100, myfun=()=>{}){
        element = getElement(element);
        element.setAttribute("style", `display:block;`);
        setTimeout(function(){
            myfun();
        },duration);
    }

    var fadeOut = function(element, duration=100, myfun=()=>{}){
        element = getElement(element);
        element.setAttribute("style", `display:block; opacity:0; animation:fadeOut ${duration}ms ease`);
        setTimeout(function(){
            element.setAttribute("style", "display:none;");
            myfun();
        },duration);
        
    }

    var fadeSlideIn = function(element, duration=100, myfun=()=>{}){
        element = getElement(element);
        element.setAttribute("style", `display:block; animation: fadeIn ${duration}ms ease;`);
        element.querySelector('.container').setAttribute("style", `animation: slideIn ${duration}ms ease;`);
        setTimeout(function(){
            myfun();
        },duration);
        var el = document.getElementById('imageList');
        var ell = document.getElementsByClassName("scroll");
        for( var i = 0; i < ell.length; i++){
            if(ell[i].getAttribute('class')=="scroll active"){
                el.scrollLeft = 100*i;
            }
        }
    }

    var fadeSlideOut = function(element, duration, myfun=()=>{}){
        element = getElement(element);
        element.setAttribute("style", `display:block; opacity:0; animation:fadeOut ${duration}ms ease`);
        element.querySelector('.container').setAttribute("style", `animation: slideOut ${duration}ms ease;`);
        setTimeout(function(){
            element.setAttribute("style", "display:none;");
            myfun();
        },duration);
    }
    
    var click = function(element, clickFunction){
        element  = getElement(element);
        element.addEventListener('click',clickFunction);
    }

    var append = function(element, html){
        element  = getElement(element);
        element.insertAdjacentHTML('beforeend',html);
    }

    var prepend = function(element, html){
        element  = getElement(element);
        element.insertAdjacentHTML('afterbegin',html);
    }

    var hasClass = function(element, classname){
        return getElement(element).classList.contains(classname);
    }

    var is = function(element, tag){
        element = getElement(element);
        return element.tagName === tag.toUpperCase();
    }

    var index = function(child){
        child = getElement(child);
        const element = Array.from(children(child.parentNode));
        return element.indexOf(child);
    }

    const loadBox = function(boxButton, boxTarget, enter, exit){
        prepend(boxTarget, '<div class="exit">&times;</div>')
        
        // Open PlayBox
        click(boxButton, function(event){
            fadeSlideIn(boxTarget, enter);
            event.preventDefault();
        });
        
        
        // Add Event handlers to the PlayBox
        click(boxTarget, function(event){
            if(hasClass(event.target, 'exit')){
                fadeSlideOut(boxTarget, exit);
            }
        });
    };

    // state.set(boxTarget+'active', 0);


    return {
        // PlayBox Open
        open : function(boxButton, boxTarget, enter=300, exit=300){
            loadBox(boxButton,boxTarget, enter, exit);
        },

        getactivebg : function(src){
            // console.log(src);
        },

        // PlayBox Image Slider 
        imageOpen : function(boxButton, boxTarget, imageList=[], enter=300, exit=300,i=0){
            prepend(boxTarget, `<div class="container containerbg">
                                    <span class="leftarrow arrow">&lt;</span>
                                    <img id="bgImage" class="bgImage">
                                    <span class="rightarrow arrow">&gt;</span>
                                </div>
                                <div class="container">
                                    <span class="leftarrow arrow wingarrow">&lt;</span>
                                    <span><div id="imageList" class="imageList"></div></span>
                                    <span class="rightarrow arrow wingarrow">&gt;</span>
                                </div>`)
            loadBox(boxButton,boxTarget, enter, exit);

            // State Managment throught HashMap
            // const state = new Map();
            state.set(boxTarget+'active', 0);
            
            // Active Image : boxTarget+'active'
            const imgListElement = getElement(boxTarget +' .imageList');
            console.log(imgListElement);
            
            // adding Image to the list
            imageList.forEach((item,index)=>{
                append(imgListElement ,`<img style="left: ${index*100}px" class="scroll" id="${index}scroll" src="${item}">`);
            });
            
            const imgList = children(imgListElement);
            
            // Active Image
            const setActive = function (index){
                imgList[state.get(boxTarget+'active')].classList.remove('active');
                imgList[index].classList.add('active');
                
                const image = getElement(boxTarget +' .bgImage');
                fadeOut(image, 100, function(){
                    image.setAttribute("src", imageList[index]);
                    fadeIn(image,1000);
                })
                const element = document.getElementById("imageList");
                element.scrollLeft = 100*index;
                state.set(boxTarget+'active', index);
            }
            setActive(i);
            
            // Item List Arrow Click Handler function
            click(boxTarget, function(event){
                const target = event.target;
                const animationleftright = document.getElementById("bgImage");
                animationleftright.classList.remove('w3-animate-right');
                if(hasClass(target, 'leftarrow')){
                    animationleftright.classList.add('w3-animate-left');
                    if(state.get(boxTarget+'active')-1 < 0){
                        setActive(imageList.length-1);
                    }else{
                        setActive(state.get(boxTarget+'active')-1);
                    }
                }else if(hasClass(target, 'rightarrow')){
                    animationleftright.classList.add('w3-animate-right');
                    if(state.get(boxTarget+'active')+1 >= imageList.length){
                        setActive(0);
                    }else{
                        setActive(state.get(boxTarget+'active')+1);
                    }
                }

            });

            //Item List Click Handler
            click(imgListElement, function(event){
                console.log(event);
                const target = event.target;
                if(is(target, 'img')){
                    setActive(index(target));
                }
            });
            //Item List Click Handler
            var imagell = getElement(' .gallery-trigger');
            click(imagell, function(event){
                const target = event.target;
                if(is(target, 'img')){
                    setActive(index(target));
                    console.log(index(target));
                }
            });
        },
        
        // Polyfilled Similar jQuery Functions available to use from PlayBox
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        getElement: getElement,
        getElements: getElements,
        children: children,
        append: append,
        prepend: prepend,
        hasClass: hasClass,
        is: is,
        index: index,
        click: click,
    }
})();

var activebg = function(src){
    var x = document.getElementsByClassName("gallery-trigger1");
    for (var i = 0; i < x.length; i++) {
        if(x[i].getAttribute('src')==src){
            PlayBox.getactivebg(i);
        }
    }
}
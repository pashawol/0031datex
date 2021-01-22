
const $ = jQuery;
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		function modalClose(){
			document.querySelector('body').classList.remove('fixed');
			document.querySelector('html').classList.remove('fixed');
			$(".modal-win").removeClass('active');
			$.fn.fullpage.setAllowScrolling(true);
		}
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".modal-win.active"); // (1)
			if (!container) {
				modalClose()
			}
		}, { passive: true });
		$('[data-fancybox-close], .menu-item a ').click(function(){
			modalClose()
		})
		 
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', (e) => {
					e.preventDefault();
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;
					modal.classList.toggle('active');
					$.fn.fullpage.setAllowScrolling(false);
					document.querySelector('body').classList.add('fixed');
					document.querySelector('html').classList.add('fixed');
					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.modal-title');
					setValue(data.text, '.modal-title-sub');
					// setValue(data.btn, '.btn');
					setValue(data.title, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.tabs__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.tabs__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.tabs__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.tabs__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.tabs__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', "  .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};


function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = 'main.jpg';
	if (screenName && x === "localhost:3000") {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	function whenResize() {
		// const topH = document.querySelector("header ").offsetHeight;
		// if ($(window).scrollTop() > topH) {
		// 	document.querySelector('.top-nav  ').classList.add('fixed');
		// } else {
		// 	document.querySelector('.top-nav  ').classList.remove('fixed');
		// }

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true, 
	
		// pagination: {
		// 	el: ' .swiper-pagination',
		// 	type: 'bullets',
		// 	clickable: true,
		// 	// renderBullet: function (index, className) {
		// 	// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// 	// }
		// },
	}

	const swiper4 = new Swiper('.sRew__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1, 
		spaceBetween: 20,
		slideToClickedSlide: true,
		
		navigation: {
			nextEl: '.sRew .swiper-button-next',
			prevEl: '.sRew .swiper-button-prev',
		},
				pagination: {
			el: '.sRew .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		breakpoints: { 
			768: {
				slidesPerView: 4,
				spaceBetween: 30
			}, 
			992: {
				slidesPerView: 4,
				spaceBetween: 60
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 110
			}
		}
	});
	// modal window

	const swiper5 = new Swiper('.slider-faq--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1, 
		spaceBetween: 20,
		loop: true,
		navigation: {
			nextEl: '.control-wrap .swiper-button-next',
			prevEl: '.control-wrap .swiper-button-prev',
		}
	});
	// modal window

$(document).on('click',  ".sFaq__item" , function(){
	let i = $(this).parent().index(); 
		swiper5.slideTo(i); 
})

var wow = new WOW({
	// mobile: false,
	animateClass: 'animate__animated',
	live: true
});
	
	$('#fullpage').fullpage({
		scrollingSpeed: 800,
		loopHorizontal: true,
		responsiveWidth: 1200, 
		// responsiveHeight: 600,
		// responsiveHeight: 600,
		// responsiveHeight: 1200,
		animateAnchor: true,
		navigation: true,
		navigationPosition: 'right',
		recordHistory: false,
		css3:true,
		scrollBar: true,
		// verticalCentered: false,
		// fixedElements: '.top-nav',
		anchors: ['header','sBase','sProf' ,'sCorp','sWhy','sStart','sTeam',"sDemo",'sRew', 'sGift', 'sLogo', 'sGift2','sFaq','sApplication'],
		menu: '.menu'	,
		// scrollBar: true,
		parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
		onLeave: function(origin, destination, direction){
			var loadedSection = destination.item;
			// console.log(this);
			if(loadedSection.classList.contains('section--dark') ) {
				document.querySelector('body').classList.add('body-dark')  
			} else{
				document.querySelector('body').classList.remove('body-dark') 
				 
			}
			
		},
		// continuousVertical: true,
		// autoScrolling: true,
		// scrollOverflow: true,
		// scrollOverflowReset: true,
		// scrollOverflowReset: true,
		afterRender: function () {
			wow.init();
			// var rellax = new Rellax('.rellax', {});
			// wow.init();
	
		

		},
	});


	$('img.img-svg, .menu-image').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			} // Remove any invalid XML tags as per http://validator.w3.org


			$svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			} // Replace image with new SVG


			$img.replaceWith($svg);
		}, 'xml');
	});  

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
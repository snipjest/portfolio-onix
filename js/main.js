let unlock = true;

function body_lock_remove(delay) {
    let body = document.querySelector("html");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("lock");
        }, delay);

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, delay);
    }
}

function body_lock_add(delay) {
    let body = document.querySelector("html");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        body.classList.add("lock");

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, delay);
    }
}

//Popups
let popup_link = document.querySelectorAll('.popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index];
    el.addEventListener('click', function(e) {
        if (unlock) {
            let item = el.getAttribute('href').replace('#', '');
            let video = el.getAttribute('data-video');
            //bodyFixPosition()
            popup_open(item, video);
        }
        e.preventDefault();
    })
}
for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener("click", function(e) {
        if (!e.target.closest('.popup__wrap')) {
            //bodyUnfixPosition()
            popup_close(e.target.closest('.popup'));
        }
    });
}

function popup_open(item, video = '') {
    let activePopup = document.querySelectorAll('.popup.active');
    if (activePopup.length > 0) {
        popup_close('', false);
    }
    let curent_popup = document.getElementById(item);
    if (curent_popup && unlock) {
        if (video != '' && video != null) {
            let popup_video = document.querySelector('.popup_video');
            popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
        if (!document.querySelector('.menu__body.active')) {
            body_lock_add(0);
        }
        curent_popup.classList.add('active');
        history.pushState('', '', '#' + item);
    }
}

function popup_close(item, bodyUnlock = true) {
    if (unlock) {
        if (!item) {
            for (let index = 0; index < popups.length; index++) {
                const popup = popups[index];
                let video = popup.querySelector('.popup__video');
                if (video) {
                    video.innerHTML = '';
                }
                popup.classList.remove('active');
            }
        } else {
            let video = item.querySelector('.popup__video');
            if (video) {
                video.innerHTML = '';
            }
            item.classList.remove('active');
        }
        if (!document.querySelector('.menu__body.active') && bodyUnlock) {
            body_lock_remove(0);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
    }
}
// function bodyFixPosition() {
// 	setTimeout(function () {
// 		/* Ставим необходимую задержку, чтобы не было «конфликта» в случае, если функция фиксации вызывается сразу после расфиксации (расфиксация отменяет действия расфиксации из-за одновременного действия) */
// 		if (!document.body.hasAttribute('data-body-scroll-fix')) {
// 			// Получаем позицию прокрутки
// 			let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
// 			// Ставим нужные стили
// 			document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
// 			document.body.style.overflow = 'hidden';
// 			document.body.style.position = 'fixed';
// 			document.body.style.top = '-' + scrollPosition + 'px';
// 			document.body.style.left = '0';
// 			document.body.style.width = '100%';
// 		}
// 	}, 15);
// }

// // 2. Расфиксация <body>
// function bodyUnfixPosition() {
// 	if (document.body.hasAttribute('data-body-scroll-fix')) {
// 		// Получаем позицию прокрутки из атрибута
// 		let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
// 		// Удаляем атрибут
// 		document.body.removeAttribute('data-body-scroll-fix');
// 		// Удаляем ненужные стили
// 		document.body.style.overflow = '';
// 		document.body.style.position = '';
// 		document.body.style.top = '';
// 		document.body.style.left = '';
// 		document.body.style.width = '';
// 		// Прокручиваем страницу на полученное из атрибута значение
// 		window.scroll(0, scrollPosition);
// 	}
// }
let popup_close_icon = document.querySelectorAll('.popup__close');
if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
        const el = popup_close_icon[index];
        el.addEventListener('click', function() {
            popup_close(el.closest('.popup'));
        })
    }
}
document.addEventListener('keydown', function(e) {
    if (e.code === 'Escape') {
        if ($('.popup').hasClass('active') && $('.popup__back').hasClass('show')) {
            $('.popup__back').click()
        } else {
            popup_close();
        }
    }
});
//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
    selects_init();
}

function selects_init() {
    for (let index = 0; index < selects.length; index++) {
        const select = selects[index];
        select_init(select);
    }
    //select_callback();
    document.addEventListener('click', function(e) {
        selects_close(e);
    });
    document.addEventListener('keydown', function(e) {
        if (e.which == 27) {
            selects_close(e);
        }
    });
}

function selects_close(e) {
    const selects = document.querySelectorAll('.select');
    if (!e.target.closest('.select')) {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            const select_body_options = select.querySelector('.select__options');
            select.classList.remove('_active');
            _slideUp(select_body_options, 100);
        }
    }
}

function select_init(select) {
    const select_parent = select.parentElement;
    const select_modifikator = select.getAttribute('class');
    const select_selected_option = select.querySelector('option:checked');
    select.setAttribute('data-default', select_selected_option.value);
    select.style.display = 'none';

    select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

    let new_select = select.parentElement.querySelector('.select');
    new_select.appendChild(select);
    select_item(select);
}

function select_item(select) {
    const select_parent = select.parentElement;
    const select_items = select_parent.querySelector('.select__item');
    const select_options = select.querySelectorAll('option');
    const select_selected_option = select.querySelector('option:checked');
    const select_selected_text = select_selected_option.text;
    const select_type = select.getAttribute('data-type');

    if (select_items) {
        select_items.remove();
    }

    let select_type_content = '';
    if (select_type == 'input') {
        select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
    } else {
        select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
    }

    select_parent.insertAdjacentHTML('beforeend',
        '<div class="select__item">' +
        '<div class="select__title">' + select_type_content + '</div>' +
        '<div class="select__options">' + select_get_options(select_options) + '</div>' +
        '</div></div>');

    select_actions(select, select_parent);
}

function select_actions(original, select) {
    const select_item = select.querySelector('.select__item');
    const select_body_options = select.querySelector('.select__options');
    const select_options = select.querySelectorAll('.select__option');
    const select_type = original.getAttribute('data-type');
    const select_input = select.querySelector('.select__input');

    select_item.addEventListener('click', function() {
        let selects = document.querySelectorAll('.select');
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            const select_body_options = select.querySelector('.select__options');
            if (select != select_item.closest('.select')) {
                select.classList.remove('_active');
                _slideUp(select_body_options, 100);
            }
        }
        _slideToggle(select_body_options, 100);
        select.classList.toggle('_active');
    });

    for (let index = 0; index < select_options.length; index++) {
        const select_option = select_options[index];
        const select_option_value = select_option.getAttribute('data-value');
        const select_option_text = select_option.innerHTML;

        if (select_type == 'input') {
            select_input.addEventListener('keyup', select_search);
        } else {
            if (select_option.getAttribute('data-value') == original.value) {
                // select_option.style.display = 'none';
                select_option.classList.add('active')
            }
        }
        select_option.addEventListener('click', function() {
            for (let index = 0; index < select_options.length; index++) {
                const el = select_options[index];
                el.style.display = 'block';
                const select_option = select_options[index];
                select_option.classList.remove('active')
            }
            if (select_type == 'input') {
                select_input.value = select_option_text;
                original.value = select_option_value;
            } else {
                select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
                original.value = select_option_value;
                //select_option.style.display = 'none';
                select_option.classList.add('active')
                console.log(2342)
            }
        });
    }
}

function select_get_options(select_options) {
    if (select_options) {
        let select_options_content = '';
        for (let index = 0; index < select_options.length; index++) {
            const select_option = select_options[index];
            const select_option_value = select_option.value;
            if (select_option_value != '') {
                const select_option_text = select_option.text;
                select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
            }
        }
        return select_options_content;
    }
}

function select_search(e) {
    let select_block = e.target.closest('.select ').querySelector('.select__options');
    let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
    let select_search_text = e.target.value.toUpperCase();

    for (let i = 0; i < select_options.length; i++) {
        let select_option = select_options[i];
        let select_txt_value = select_option.textContent || select_option.innerText;
        if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
            select_option.style.display = "";
        } else {
            select_option.style.display = "none";
        }
    }
}

function selects_update_all() {
    let selects = document.querySelectorAll('select');
    if (selects) {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            select_item(select);
        }
    }
}


let _slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
    }, duration);
}
let _slideDown = (target, duration = 500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none')
        display = 'block';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
    }, duration);
}
let _slideToggle = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (window.getComputedStyle(target).display === 'none') {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    }
}
/**
 * @popperjs/core v2.4.0 - MIT License
 */

"use strict";
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Popper = {})
}(this, (function(e) {
    function t(e) {
        return {
            width: (e = e.getBoundingClientRect()).width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top
        }
    }

    function n(e) {
        return "[object Window]" !== e.toString() ? (e = e.ownerDocument) ? e.defaultView : window : e
    }

    function r(e) {
        return {
            scrollLeft: (e = n(e)).pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function o(e) {
        return e instanceof n(e).Element || e instanceof Element
    }

    function i(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement
    }

    function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function s(e) {
        return (o(e) ? e.ownerDocument : e.document).documentElement
    }

    function f(e) {
        return t(s(e)).left + r(e).scrollLeft
    }

    function p(e) {
        return n(e).getComputedStyle(e)
    }

    function c(e) {
        return e = p(e), /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX)
    }

    function u(e, o, p) {
        void 0 === p && (p = !1);
        var u = s(o);
        e = t(e);
        var d = {
                scrollLeft: 0,
                scrollTop: 0
            },
            l = {
                x: 0,
                y: 0
            };
        return p || (("body" !== a(o) || c(u)) && (d = o !== n(o) && i(o) ? {
            scrollLeft: o.scrollLeft,
            scrollTop: o.scrollTop
        } : r(o)), i(o) ? ((l = t(o)).x += o.clientLeft, l.y += o.clientTop) : u && (l.x = f(u))), {
            x: e.left + d.scrollLeft - l.x,
            y: e.top + d.scrollTop - l.y,
            width: e.width,
            height: e.height
        }
    }

    function d(e) {
        return {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }

    function l(e) {
        return "html" === a(e) ? e : e.assignedSlot || e.parentNode || e.host || s(e)
    }

    function m(e, t) {
        void 0 === t && (t = []);
        var r = function e(t) {
            return 0 <= ["html", "body", "#document"].indexOf(a(t)) ? t.ownerDocument.body : i(t) && c(t) ? t : e(l(t))
        }(e);
        e = "body" === a(r);
        var o = n(r);
        return r = e ? [o].concat(o.visualViewport || [], c(r) ? r : []) : r, t = t.concat(r), e ? t : t.concat(m(l(r)))
    }

    function h(e) {
        return i(e) && "fixed" !== p(e).position ? e.offsetParent : null
    }

    function v(e) {
        var t = n(e);
        for (e = h(e); e && 0 <= ["table", "td", "th"].indexOf(a(e));) e = h(e);
        return e && "body" === a(e) && "static" === p(e).position ? t : e || t
    }

    function g(e) {
        var t = new Map,
            n = new Set,
            r = [];
        return e.forEach((function(e) {
            t.set(e.name, e)
        })), e.forEach((function(e) {
            n.has(e.name) || function e(o) {
                n.add(o.name), [].concat(o.requires || [], o.requiresIfExists || []).forEach((function(r) {
                    n.has(r) || (r = t.get(r)) && e(r)
                })), r.push(o)
            }(e)
        })), r
    }

    function b(e) {
        var t;
        return function() {
            return t || (t = new Promise((function(n) {
                Promise.resolve().then((function() {
                    t = void 0, n(e())
                }))
            }))), t
        }
    }

    function y(e) {
        return e.split("-")[0]
    }

    function x() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function w(e) {
        void 0 === e && (e = {});
        var t = e.defaultModifiers,
            n = void 0 === t ? [] : t,
            r = void 0 === (e = e.defaultOptions) ? N : e;
        return function(e, t, i) {
            function a() {
                f.forEach((function(e) {
                    return e()
                })), f = []
            }
            void 0 === i && (i = r);
            var s = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, N, {}, r),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                },
                f = [],
                p = !1,
                c = {
                    state: s,
                    setOptions: function(i) {
                        return a(), s.options = Object.assign({}, r, {}, s.options, {}, i), s.scrollParents = {
                            reference: o(e) ? m(e) : e.contextElement ? m(e.contextElement) : [],
                            popper: m(t)
                        }, i = function(e) {
                            var t = g(e);
                            return F.reduce((function(e, n) {
                                return e.concat(t.filter((function(e) {
                                    return e.phase === n
                                })))
                            }), [])
                        }(function(e) {
                            var t = e.reduce((function(e, t) {
                                var n = e[t.name];
                                return e[t.name] = n ? Object.assign({}, n, {}, t, {
                                    options: Object.assign({}, n.options, {}, t.options),
                                    data: Object.assign({}, n.data, {}, t.data)
                                }) : t, e
                            }), {});
                            return Object.keys(t).map((function(e) {
                                return t[e]
                            }))
                        }([].concat(n, s.options.modifiers))), s.orderedModifiers = i.filter((function(e) {
                            return e.enabled
                        })), s.orderedModifiers.forEach((function(e) {
                            var t = e.name,
                                n = e.options;
                            n = void 0 === n ? {} : n, "function" == typeof(e = e.effect) && (t = e({
                                state: s,
                                name: t,
                                instance: c,
                                options: n
                            }), f.push(t || function() {}))
                        })), c.update()
                    },
                    forceUpdate: function() {
                        if (!p) {
                            var e = s.elements,
                                t = e.reference;
                            if (x(t, e = e.popper))
                                for (s.rects = {
                                        reference: u(t, v(e), "fixed" === s.options.strategy),
                                        popper: d(e)
                                    }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                                        return s.modifiersData[e.name] = Object.assign({}, e.data)
                                    })), t = 0; t < s.orderedModifiers.length; t++)
                                    if (!0 === s.reset) s.reset = !1, t = -1;
                                    else {
                                        var n = s.orderedModifiers[t];
                                        e = n.fn;
                                        var r = n.options;
                                        r = void 0 === r ? {} : r, n = n.name, "function" == typeof e && (s = e({
                                            state: s,
                                            options: r,
                                            name: n,
                                            instance: c
                                        }) || s)
                                    }
                        }
                    },
                    update: b((function() {
                        return new Promise((function(e) {
                            c.forceUpdate(), e(s)
                        }))
                    })),
                    destroy: function() {
                        a(), p = !0
                    }
                };
            return x(e, t) ? (c.setOptions(i).then((function(e) {
                !p && i.onFirstUpdate && i.onFirstUpdate(e)
            })), c) : c
        }
    }

    function O(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
    }

    function M(e) {
        var t = e.reference,
            n = e.element,
            r = (e = e.placement) ? y(e) : null;
        e = e ? e.split("-")[1] : null;
        var o = t.x + t.width / 2 - n.width / 2,
            i = t.y + t.height / 2 - n.height / 2;
        switch (r) {
            case "top":
                o = {
                    x: o,
                    y: t.y - n.height
                };
                break;
            case "bottom":
                o = {
                    x: o,
                    y: t.y + t.height
                };
                break;
            case "right":
                o = {
                    x: t.x + t.width,
                    y: i
                };
                break;
            case "left":
                o = {
                    x: t.x - n.width,
                    y: i
                };
                break;
            default:
                o = {
                    x: t.x,
                    y: t.y
                }
        }
        if (null != (r = r ? O(r) : null)) switch (i = "y" === r ? "height" : "width", e) {
            case "start":
                o[r] = Math.floor(o[r]) - Math.floor(t[i] / 2 - n[i] / 2);
                break;
            case "end":
                o[r] = Math.floor(o[r]) + Math.ceil(t[i] / 2 - n[i] / 2)
        }
        return o
    }

    function j(e) {
        var t, r = e.popper,
            o = e.popperRect,
            i = e.placement,
            a = e.offsets,
            f = e.position,
            p = e.gpuAcceleration,
            c = e.adaptive,
            u = window.devicePixelRatio || 1;
        e = Math.round(a.x * u) / u || 0, u = Math.round(a.y * u) / u || 0;
        var d = a.hasOwnProperty("x");
        a = a.hasOwnProperty("y");
        var l, m = "left",
            h = "top",
            g = window;
        if (c) {
            var b = v(r);
            b === n(r) && (b = s(r)), "top" === i && (h = "bottom", u -= b.clientHeight - o.height, u *= p ? 1 : -1), "left" === i && (m = "right", e -= b.clientWidth - o.width, e *= p ? 1 : -1)
        }
        return r = Object.assign({
            position: f
        }, c && I), p ? Object.assign({}, r, ((l = {})[h] = a ? "0" : "", l[m] = d ? "0" : "", l.transform = 2 > (g.devicePixelRatio || 1) ? "translate(" + e + "px, " + u + "px)" : "translate3d(" + e + "px, " + u + "px, 0)", l)) : Object.assign({}, r, ((t = {})[h] = a ? u + "px" : "", t[m] = d ? e + "px" : "", t.transform = "", t))
    }

    function E(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return _[e]
        }))
    }

    function D(e) {
        return e.replace(/start|end/g, (function(e) {
            return U[e]
        }))
    }

    function P(e, t) {
        var n = !(!t.getRootNode || !t.getRootNode().host);
        if (e.contains(t)) return !0;
        if (n)
            do {
                if (t && e.isSameNode(t)) return !0;
                t = t.parentNode || t.host
            } while (t);
        return !1
    }

    function L(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function k(e, o) {
        if ("viewport" === o) {
            var a = n(e);
            e = a.visualViewport, o = a.innerWidth, a = a.innerHeight, e && /iPhone|iPod|iPad/.test(navigator.platform) && (o = e.width, a = e.height), e = L({
                width: o,
                height: a,
                x: 0,
                y: 0
            })
        } else i(o) ? e = t(o) : (e = n(a = s(e)), o = r(a), (a = u(s(a), e)).height = Math.max(a.height, e.innerHeight), a.width = Math.max(a.width, e.innerWidth), a.x = -o.scrollLeft, a.y = -o.scrollTop, e = L(a));
        return e
    }

    function B(e, t, r) {
        return t = "clippingParents" === t ? function(e) {
            var t = m(e),
                n = 0 <= ["absolute", "fixed"].indexOf(p(e).position) && i(e) ? v(e) : e;
            return o(n) ? t.filter((function(e) {
                return o(e) && P(e, n)
            })) : []
        }(e) : [].concat(t), (r = (r = [].concat(t, [r])).reduce((function(t, r) {
            var o = k(e, r),
                c = n(r = i(r) ? r : s(e)),
                u = i(r) ? p(r) : {};
            parseFloat(u.borderTopWidth);
            var d = parseFloat(u.borderRightWidth) || 0,
                l = parseFloat(u.borderBottomWidth) || 0,
                m = parseFloat(u.borderLeftWidth) || 0;
            u = "html" === a(r);
            var h = f(r),
                v = r.clientWidth + d,
                g = r.clientHeight + l;
            return u && 50 < c.innerHeight - r.clientHeight && (g = c.innerHeight - l), l = u ? 0 : r.clientTop, d = r.clientLeft > m ? d : u ? c.innerWidth - v - h : r.offsetWidth - v, c = u ? c.innerHeight - g : r.offsetHeight - g, r = u ? h : r.clientLeft, t.top = Math.max(o.top + l, t.top), t.right = Math.min(o.right - d, t.right), t.bottom = Math.min(o.bottom - c, t.bottom), t.left = Math.max(o.left + r, t.left), t
        }), k(e, r[0]))).width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r
    }

    function W(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, {}, e)
    }

    function A(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e, t
        }), {})
    }

    function H(e, n) {
        void 0 === n && (n = {});
        var r = n;
        n = void 0 === (n = r.placement) ? e.placement : n;
        var i = r.boundary,
            a = void 0 === i ? "clippingParents" : i,
            f = void 0 === (i = r.rootBoundary) ? "viewport" : i;
        i = void 0 === (i = r.elementContext) ? "popper" : i;
        var p = r.altBoundary,
            c = void 0 !== p && p;
        r = W("number" != typeof(r = void 0 === (r = r.padding) ? 0 : r) ? r : A(r, q));
        var u = e.elements.reference;
        p = e.rects.popper, a = B(o(c = e.elements[c ? "popper" === i ? "reference" : "popper" : i]) ? c : c.contextElement || s(e.elements.popper), a, f), c = M({
            reference: f = t(u),
            element: p,
            strategy: "absolute",
            placement: n
        }), p = L(Object.assign({}, p, {}, c)), f = "popper" === i ? p : f;
        var d = {
            top: a.top - f.top + r.top,
            bottom: f.bottom - a.bottom + r.bottom,
            left: a.left - f.left + r.left,
            right: f.right - a.right + r.right
        };
        if (e = e.modifiersData.offset, "popper" === i && e) {
            var l = e[n];
            Object.keys(d).forEach((function(e) {
                var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1,
                    n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x";
                d[e] += l[n] * t
            }))
        }
        return d
    }

    function T(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }

    function R(e) {
        return ["top", "right", "bottom", "left"].some((function(t) {
            return 0 <= e[t]
        }))
    }
    var q = ["top", "bottom", "right", "left"],
        S = q.reduce((function(e, t) {
            return e.concat([t + "-start", t + "-end"])
        }), []),
        C = [].concat(q, ["auto"]).reduce((function(e, t) {
            return e.concat([t, t + "-start", t + "-end"])
        }), []),
        F = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "),
        N = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        },
        V = {
            passive: !0
        },
        I = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        },
        _ = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        },
        U = {
            start: "end",
            end: "start"
        },
        z = [{
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var t = e.state,
                    r = e.instance,
                    o = (e = e.options).scroll,
                    i = void 0 === o || o,
                    a = void 0 === (e = e.resize) || e,
                    s = n(t.elements.popper),
                    f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return i && f.forEach((function(e) {
                        e.addEventListener("scroll", r.update, V)
                    })), a && s.addEventListener("resize", r.update, V),
                    function() {
                        i && f.forEach((function(e) {
                            e.removeEventListener("scroll", r.update, V)
                        })), a && s.removeEventListener("resize", r.update, V)
                    }
            },
            data: {}
        }, {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state;
                t.modifiersData[e.name] = M({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        }, {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                e = void 0 === (e = n.gpuAcceleration) || e, n = void 0 === (n = n.adaptive) || n, e = {
                    placement: y(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: e
                }, null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, {}, j(Object.assign({}, e, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: n
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, {}, j(Object.assign({}, e, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1
                })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        }, {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function(e) {
                    var n = t.styles[e] || {},
                        r = t.attributes[e] || {},
                        o = t.elements[e];
                    i(o) && a(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function(e) {
                        var t = r[e];
                        !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            },
            effect: function(e) {
                var t = e.state,
                    n = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                    function() {
                        Object.keys(t.elements).forEach((function(e) {
                            var r = t.elements[e],
                                o = t.attributes[e] || {};
                            e = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                                return e[t] = "", e
                            }), {}), i(r) && a(r) && (Object.assign(r.style, e), Object.keys(o).forEach((function(e) {
                                r.removeAttribute(e)
                            })))
                        }))
                    }
            },
            requires: ["computeStyles"]
        }, {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state,
                    n = e.name,
                    r = void 0 === (e = e.options.offset) ? [0, 0] : e,
                    o = (e = C.reduce((function(e, n) {
                        var o = t.rects,
                            i = y(n),
                            a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
                            s = "function" == typeof r ? r(Object.assign({}, o, {
                                placement: n
                            })) : r;
                        return o = (o = s[0]) || 0, s = ((s = s[1]) || 0) * a, i = 0 <= ["left", "right"].indexOf(i) ? {
                            x: s,
                            y: o
                        } : {
                            x: o,
                            y: s
                        }, e[n] = i, e
                    }), {}))[t.placement],
                    i = o.x;
                o = o.y, null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += o), t.modifiersData[n] = e
            }
        }, {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                if (e = e.name, !t.modifiersData[e]._skip) {
                    var r = n.mainAxis;
                    r = void 0 === r || r;
                    var o = n.altAxis;
                    o = void 0 === o || o;
                    var i = n.fallbackPlacements,
                        a = n.padding,
                        s = n.boundary,
                        f = n.rootBoundary,
                        p = n.altBoundary,
                        c = n.flipVariations,
                        u = void 0 === c || c,
                        d = n.allowedAutoPlacements;
                    c = y(n = t.options.placement), i = i || (c !== n && u ? function(e) {
                        if ("auto" === y(e)) return [];
                        var t = E(e);
                        return [D(e), t, D(t)]
                    }(n) : [E(n)]);
                    var l = [n].concat(i).reduce((function(e, n) {
                        return e.concat("auto" === y(n) ? function(e, t) {
                            void 0 === t && (t = {});
                            var n = t.boundary,
                                r = t.rootBoundary,
                                o = t.padding,
                                i = t.flipVariations,
                                a = t.allowedAutoPlacements,
                                s = void 0 === a ? C : a,
                                f = t.placement.split("-")[1],
                                p = (f ? i ? S : S.filter((function(e) {
                                    return e.split("-")[1] === f
                                })) : q).filter((function(e) {
                                    return 0 <= s.indexOf(e)
                                })).reduce((function(t, i) {
                                    return t[i] = H(e, {
                                        placement: i,
                                        boundary: n,
                                        rootBoundary: r,
                                        padding: o
                                    })[y(i)], t
                                }), {});
                            return Object.keys(p).sort((function(e, t) {
                                return p[e] - p[t]
                            }))
                        }(t, {
                            placement: n,
                            boundary: s,
                            rootBoundary: f,
                            padding: a,
                            flipVariations: u,
                            allowedAutoPlacements: d
                        }) : n)
                    }), []);
                    n = t.rects.reference, i = t.rects.popper;
                    var m = new Map;
                    c = !0;
                    for (var h = l[0], v = 0; v < l.length; v++) {
                        var g = l[v],
                            b = y(g),
                            x = "start" === g.split("-")[1],
                            w = 0 <= ["top", "bottom"].indexOf(b),
                            O = w ? "width" : "height",
                            M = H(t, {
                                placement: g,
                                boundary: s,
                                rootBoundary: f,
                                altBoundary: p,
                                padding: a
                            });
                        if (x = w ? x ? "right" : "left" : x ? "bottom" : "top", n[O] > i[O] && (x = E(x)), O = E(x), w = [], r && w.push(0 >= M[b]), o && w.push(0 >= M[x], 0 >= M[O]), w.every((function(e) {
                                return e
                            }))) {
                            h = g, c = !1;
                            break
                        }
                        m.set(g, w)
                    }
                    if (c)
                        for (r = function(e) {
                                var t = l.find((function(t) {
                                    if (t = m.get(t)) return t.slice(0, e).every((function(e) {
                                        return e
                                    }))
                                }));
                                if (t) return h = t, "break"
                            }, o = u ? 3 : 1; 0 < o && "break" !== r(o); o--);
                    t.placement !== h && (t.modifiersData[e]._skip = !0, t.placement = h, t.reset = !0)
                }
            },
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        }, {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.mainAxis,
                    o = void 0 === r || r;
                r = void 0 !== (r = n.altAxis) && r;
                var i = n.tether;
                i = void 0 === i || i;
                var a = n.tetherOffset,
                    s = void 0 === a ? 0 : a;
                n = H(t, {
                    boundary: n.boundary,
                    rootBoundary: n.rootBoundary,
                    padding: n.padding,
                    altBoundary: n.altBoundary
                }), a = y(t.placement);
                var f = t.placement.split("-")[1],
                    p = !f,
                    c = O(a);
                a = "x" === c ? "y" : "x";
                var u = t.modifiersData.popperOffsets,
                    l = t.rects.reference,
                    m = t.rects.popper,
                    h = "function" == typeof s ? s(Object.assign({}, t.rects, {
                        placement: t.placement
                    })) : s;
                if (s = {
                        x: 0,
                        y: 0
                    }, u) {
                    if (o) {
                        var g = "y" === c ? "top" : "left",
                            b = "y" === c ? "bottom" : "right",
                            x = "y" === c ? "height" : "width";
                        o = u[c];
                        var w = u[c] + n[g],
                            M = u[c] - n[b],
                            j = i ? -m[x] / 2 : 0,
                            E = "start" === f ? l[x] : m[x];
                        f = "start" === f ? -m[x] : -l[x], m = t.elements.arrow, m = i && m ? d(m) : {
                            width: 0,
                            height: 0
                        };
                        var D = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        };
                        g = D[g], b = D[b], m = Math.max(0, Math.min(l[x], m[x])), E = p ? l[x] / 2 - j - m - g - h : E - m - g - h, p = p ? -l[x] / 2 + j + m + b + h : f + m + b + h, h = t.elements.arrow && v(t.elements.arrow), l = t.modifiersData.offset ? t.modifiersData.offset[t.placement][c] : 0, h = u[c] + E - l - (h ? "y" === c ? h.clientTop || 0 : h.clientLeft || 0 : 0), p = u[c] + p - l, i = Math.max(i ? Math.min(w, h) : w, Math.min(o, i ? Math.max(M, p) : M)), u[c] = i, s[c] = i - o
                    }
                    r && (r = u[a], i = Math.max(r + n["x" === c ? "top" : "left"], Math.min(r, r - n["x" === c ? "bottom" : "right"])), u[a] = i, s[a] = i - r), t.modifiersData[e] = s
                }
            },
            requiresIfExists: ["offset"]
        }, {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, n = e.state;
                e = e.name;
                var r = n.elements.arrow,
                    o = n.modifiersData.popperOffsets,
                    i = y(n.placement),
                    a = O(i);
                if (i = 0 <= ["left", "right"].indexOf(i) ? "height" : "width", r && o) {
                    var s = n.modifiersData[e + "#persistent"].padding,
                        f = d(r),
                        p = "y" === a ? "top" : "left",
                        c = "y" === a ? "bottom" : "right",
                        u = n.rects.reference[i] + n.rects.reference[a] - o[a] - n.rects.popper[i];
                    o = o[a] - n.rects.reference[a], u = (r = (r = v(r)) ? "y" === a ? r.clientHeight || 0 : r.clientWidth || 0 : 0) / 2 - f[i] / 2 + (u / 2 - o / 2), i = Math.max(s[p], Math.min(u, r - f[i] - s[c])), n.modifiersData[e] = ((t = {})[a] = i, t.centerOffset = i - u, t)
                }
            },
            effect: function(e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.element;
                if (r = void 0 === r ? "[data-popper-arrow]" : r, n = void 0 === (n = n.padding) ? 0 : n, null != r) {
                    if ("string" == typeof r && !(r = t.elements.popper.querySelector(r))) return;
                    P(t.elements.popper, r) && (t.elements.arrow = r, t.modifiersData[e + "#persistent"] = {
                        padding: W("number" != typeof n ? n : A(n, q))
                    })
                }
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        }, {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state;
                e = e.name;
                var n = t.rects.reference,
                    r = t.rects.popper,
                    o = t.modifiersData.preventOverflow,
                    i = H(t, {
                        elementContext: "reference"
                    }),
                    a = H(t, {
                        altBoundary: !0
                    });
                n = T(i, n), r = T(a, r, o), o = R(n), a = R(r), t.modifiersData[e] = {
                    referenceClippingOffsets: n,
                    popperEscapeOffsets: r,
                    isReferenceHidden: o,
                    hasPopperEscaped: a
                }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-reference-hidden": o,
                    "data-popper-escaped": a
                })
            }
        }],
        X = w({
            defaultModifiers: z
        });
    e.createPopper = X, e.defaultModifiers = z, e.detectOverflow = H, e.popperGenerator = w, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}));


! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], e) : (t = t || self).tippy = e(t.Popper)
}(this, (function(t) {
    "use strict";
    var e = "undefined" != typeof window && "undefined" != typeof document,
        n = e ? navigator.userAgent : "",
        i = /MSIE |Trident\//.test(n),
        r = {
            passive: !0,
            capture: !0
        };

    function o(t, e, n) {
        if (Array.isArray(t)) {
            var i = t[e];
            return null == i ? Array.isArray(n) ? n[e] : n : i
        }
        return t
    }

    function a(t, e) {
        var n = {}.toString.call(t);
        return 0 === n.indexOf("[object") && n.indexOf(e + "]") > -1
    }

    function s(t, e) {
        return "function" == typeof t ? t.apply(void 0, e) : t
    }

    function p(t, e) {
        return 0 === e ? t : function(i) {
            clearTimeout(n), n = setTimeout((function() {
                t(i)
            }), e)
        };
        var n
    }

    function u(t, e) {
        var n = Object.assign({}, t);
        return e.forEach((function(t) {
            delete n[t]
        })), n
    }

    function c(t) {
        return [].concat(t)
    }

    function f(t, e) {
        -1 === t.indexOf(e) && t.push(e)
    }

    function l(t) {
        return t.split("-")[0]
    }

    function d(t) {
        return [].slice.call(t)
    }

    function v() {
        return document.createElement("div")
    }

    function m(t) {
        return ["Element", "Fragment"].some((function(e) {
            return a(t, e)
        }))
    }

    function g(t) {
        return a(t, "MouseEvent")
    }

    function h(t) {
        return !(!t || !t._tippy || t._tippy.reference !== t)
    }

    function b(t) {
        return m(t) ? [t] : function(t) {
            return a(t, "NodeList")
        }(t) ? d(t) : Array.isArray(t) ? t : d(document.querySelectorAll(t))
    }

    function y(t, e) {
        t.forEach((function(t) {
            t && (t.style.transitionDuration = e + "ms")
        }))
    }

    function x(t, e) {
        t.forEach((function(t) {
            t && t.setAttribute("data-state", e)
        }))
    }

    function w(t) {
        var e = c(t)[0];
        return e && e.ownerDocument || document
    }

    function E(t, e, n) {
        var i = e + "EventListener";
        ["transitionend", "webkitTransitionEnd"].forEach((function(e) {
            t[i](e, n)
        }))
    }
    var T = {
            isTouch: !1
        },
        A = 0;

    function C() {
        T.isTouch || (T.isTouch = !0, window.performance && document.addEventListener("mousemove", O))
    }

    function O() {
        var t = performance.now();
        t - A < 20 && (T.isTouch = !1, document.removeEventListener("mousemove", O)), A = t
    }

    function L() {
        var t = document.activeElement;
        if (h(t)) {
            var e = t._tippy;
            t.blur && !e.state.isVisible && t.blur()
        }
    }
    var D = Object.assign({
            appendTo: function() {
                return document.body
            },
            aria: {
                content: "auto",
                expanded: "auto"
            },
            delay: 0,
            duration: [300, 250],
            getReferenceClientRect: null,
            hideOnClick: !0,
            ignoreAttributes: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [0, 10],
            onAfterUpdate: function() {},
            onBeforeUpdate: function() {},
            onCreate: function() {},
            onDestroy: function() {},
            onHidden: function() {},
            onHide: function() {},
            onMount: function() {},
            onShow: function() {},
            onShown: function() {},
            onTrigger: function() {},
            onUntrigger: function() {},
            onClickOutside: function() {},
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: !1,
            touch: !0,
            trigger: "mouseenter focus",
            triggerTarget: null
        }, {
            animateFill: !1,
            followCursor: !1,
            inlinePositioning: !1,
            sticky: !1
        }, {}, {
            allowHTML: !1,
            animation: "fade",
            arrow: !0,
            content: "",
            inertia: !1,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999
        }),
        k = Object.keys(D);

    function M(t) {
        var e = (t.plugins || []).reduce((function(e, n) {
            var i = n.name,
                r = n.defaultValue;
            return i && (e[i] = void 0 !== t[i] ? t[i] : r), e
        }), {});
        return Object.assign({}, t, {}, e)
    }

    function V(t, e) {
        var n = Object.assign({}, e, {
            content: s(e.content, [t])
        }, e.ignoreAttributes ? {} : function(t, e) {
            return (e ? Object.keys(M(Object.assign({}, D, {
                plugins: e
            }))) : k).reduce((function(e, n) {
                var i = (t.getAttribute("data-tippy-" + n) || "").trim();
                if (!i) return e;
                if ("content" === n) e[n] = i;
                else try {
                    e[n] = JSON.parse(i)
                } catch (t) {
                    e[n] = i
                }
                return e
            }), {})
        }(t, e.plugins));
        return n.aria = Object.assign({}, D.aria, {}, n.aria), n.aria = {
            expanded: "auto" === n.aria.expanded ? e.interactive : n.aria.expanded,
            content: "auto" === n.aria.content ? e.interactive ? null : "describedby" : n.aria.content
        }, n
    }

    function R(t, e) {
        t.innerHTML = e
    }

    function j(t) {
        var e = v();
        return !0 === t ? e.className = "tippy-arrow" : (e.className = "tippy-svg-arrow", m(t) ? e.appendChild(t) : R(e, t)), e
    }

    function P(t, e) {
        m(e.content) ? (R(t, ""), t.appendChild(e.content)) : "function" != typeof e.content && (e.allowHTML ? R(t, e.content) : t.textContent = e.content)
    }

    function I(t) {
        var e = t.firstElementChild,
            n = d(e.children);
        return {
            box: e,
            content: n.find((function(t) {
                return t.classList.contains("tippy-content")
            })),
            arrow: n.find((function(t) {
                return t.classList.contains("tippy-arrow") || t.classList.contains("tippy-svg-arrow")
            })),
            backdrop: n.find((function(t) {
                return t.classList.contains("tippy-backdrop")
            }))
        }
    }

    function S(t) {
        var e = v(),
            n = v();
        n.className = "tippy-box", n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
        var i = v();

        function r(n, i) {
            var r = I(e),
                o = r.box,
                a = r.content,
                s = r.arrow;
            i.theme ? o.setAttribute("data-theme", i.theme) : o.removeAttribute("data-theme"), "string" == typeof i.animation ? o.setAttribute("data-animation", i.animation) : o.removeAttribute("data-animation"), i.inertia ? o.setAttribute("data-inertia", "") : o.removeAttribute("data-inertia"), o.style.maxWidth = "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth, i.role ? o.setAttribute("role", i.role) : o.removeAttribute("role"), n.content === i.content && n.allowHTML === i.allowHTML || P(a, t.props), i.arrow ? s ? n.arrow !== i.arrow && (o.removeChild(s), o.appendChild(j(i.arrow))) : o.appendChild(j(i.arrow)) : s && o.removeChild(s)
        }
        return i.className = "tippy-content", i.setAttribute("data-state", "hidden"), P(i, t.props), e.appendChild(n), n.appendChild(i), r(t.props, t.props), {
            popper: e,
            onUpdate: r
        }
    }
    S.$$tippy = !0;
    var B = 1,
        H = [],
        U = [];

    function N(e, n) {
        var a, u, m, h, b, A, C, O, L = V(e, Object.assign({}, D, {}, M(n))),
            k = !1,
            R = !1,
            j = !1,
            P = !1,
            S = [],
            N = p(ht, L.interactiveDebounce),
            X = w(L.triggerTarget || e),
            Y = B++,
            _ = (O = L.plugins).filter((function(t, e) {
                return O.indexOf(t) === e
            })),
            z = {
                id: Y,
                reference: e,
                popper: v(),
                popperInstance: null,
                props: L,
                state: {
                    isEnabled: !0,
                    isVisible: !1,
                    isDestroyed: !1,
                    isMounted: !1,
                    isShown: !1
                },
                plugins: _,
                clearDelayTimeouts: function() {
                    clearTimeout(a), clearTimeout(u), cancelAnimationFrame(m)
                },
                setProps: function(t) {
                    if (z.state.isDestroyed) return;
                    it("onBeforeUpdate", [z, t]), mt();
                    var n = z.props,
                        i = V(e, Object.assign({}, z.props, {}, t, {
                            ignoreAttributes: !0
                        }));
                    z.props = i, vt(), n.interactiveDebounce !== i.interactiveDebounce && (at(), N = p(ht, i.interactiveDebounce));
                    n.triggerTarget && !i.triggerTarget ? c(n.triggerTarget).forEach((function(t) {
                        t.removeAttribute("aria-expanded")
                    })) : i.triggerTarget && e.removeAttribute("aria-expanded");
                    ot(), nt(), q && q(n, i);
                    z.popperInstance && (wt(), Tt().forEach((function(t) {
                        requestAnimationFrame(t._tippy.popperInstance.forceUpdate)
                    })));
                    it("onAfterUpdate", [z, t])
                },
                setContent: function(t) {
                    z.setProps({
                        content: t
                    })
                },
                show: function() {
                    var t = z.state.isVisible,
                        e = z.state.isDestroyed,
                        n = !z.state.isEnabled,
                        i = T.isTouch && !z.props.touch,
                        r = o(z.props.duration, 0, D.duration);
                    if (t || e || n || i) return;
                    if (Z().hasAttribute("disabled")) return;
                    if (it("onShow", [z], !1), !1 === z.props.onShow(z)) return;
                    z.state.isVisible = !0, Q() && (W.style.visibility = "visible");
                    nt(), ct(), z.state.isMounted || (W.style.transition = "none");
                    if (Q()) {
                        var a = tt(),
                            p = a.box,
                            u = a.content;
                        y([p, u], 0)
                    }
                    A = function() {
                            if (z.state.isVisible && !P) {
                                if (P = !0, W.offsetHeight, W.style.transition = z.props.moveTransition, Q() && z.props.animation) {
                                    var t = tt(),
                                        e = t.box,
                                        n = t.content;
                                    y([e, n], r), x([e, n], "visible")
                                }
                                rt(), ot(), f(U, z), z.state.isMounted = !0, it("onMount", [z]), z.props.animation && Q() && function(t, e) {
                                    lt(t, e)
                                }(r, (function() {
                                    z.state.isShown = !0, it("onShown", [z])
                                }))
                            }
                        },
                        function() {
                            var t, e = z.props.appendTo,
                                n = Z();
                            t = z.props.interactive && e === D.appendTo || "parent" === e ? n.parentNode : s(e, [n]);
                            t.contains(W) || t.appendChild(W);
                            wt()
                        }()
                },
                hide: function() {
                    var t = !z.state.isVisible,
                        e = z.state.isDestroyed,
                        n = !z.state.isEnabled,
                        i = o(z.props.duration, 1, D.duration);
                    if (t || e || n) return;
                    if (it("onHide", [z], !1), !1 === z.props.onHide(z)) return;
                    z.state.isVisible = !1, z.state.isShown = !1, P = !1, Q() && (W.style.visibility = "hidden");
                    if (at(), ft(), nt(), Q()) {
                        var r = tt(),
                            a = r.box,
                            s = r.content;
                        z.props.animation && (y([a, s], i), x([a, s], "hidden"))
                    }
                    rt(), ot(), z.props.animation ? Q() && function(t, e) {
                        lt(t, (function() {
                            !z.state.isVisible && W.parentNode && W.parentNode.contains(W) && e()
                        }))
                    }(i, z.unmount) : z.unmount()
                },
                hideWithInteractivity: function(t) {
                    X.body.addEventListener("mouseleave", Ct), X.addEventListener("mousemove", N), f(H, N), N(t)
                },
                enable: function() {
                    z.state.isEnabled = !0
                },
                disable: function() {
                    z.hide(), z.state.isEnabled = !1
                },
                unmount: function() {
                    z.state.isVisible && z.hide();
                    if (!z.state.isMounted) return;
                    Et(), Tt().forEach((function(t) {
                        t._tippy.unmount()
                    })), W.parentNode && W.parentNode.removeChild(W);
                    U = U.filter((function(t) {
                        return t !== z
                    })), z.state.isMounted = !1, it("onHidden", [z])
                },
                destroy: function() {
                    if (z.state.isDestroyed) return;
                    z.clearDelayTimeouts(), z.unmount(), mt(), delete e._tippy, z.state.isDestroyed = !0, it("onDestroy", [z])
                }
            };
        if (!L.render) return z;
        var F = L.render(z),
            W = F.popper,
            q = F.onUpdate;
        W.setAttribute("data-tippy-root", ""), W.id = "tippy-" + z.id, z.popper = W, e._tippy = z, W._tippy = z;
        var $ = _.map((function(t) {
                return t.fn(z)
            })),
            J = e.hasAttribute("aria-expanded");
        return vt(), ot(), nt(), it("onCreate", [z]), L.showOnCreate && At(), W.addEventListener("mouseenter", (function() {
            z.props.interactive && z.state.isVisible && z.clearDelayTimeouts()
        })), W.addEventListener("mouseleave", (function(t) {
            z.props.interactive && z.props.trigger.indexOf("mouseenter") >= 0 && (X.addEventListener("mousemove", N), N(t))
        })), z;

        function G() {
            var t = z.props.touch;
            return Array.isArray(t) ? t : [t, 0]
        }

        function K() {
            return "hold" === G()[0]
        }

        function Q() {
            var t;
            return !!(null == (t = z.props.render) ? void 0 : t.$$tippy)
        }

        function Z() {
            return C || e
        }

        function tt() {
            return I(W)
        }

        function et(t) {
            return z.state.isMounted && !z.state.isVisible || T.isTouch || h && "focus" === h.type ? 0 : o(z.props.delay, t ? 0 : 1, D.delay)
        }

        function nt() {
            W.style.pointerEvents = z.props.interactive && z.state.isVisible ? "" : "none", W.style.zIndex = "" + z.props.zIndex
        }

        function it(t, e, n) {
            var i;
            (void 0 === n && (n = !0), $.forEach((function(n) {
                n[t] && n[t].apply(void 0, e)
            })), n) && (i = z.props)[t].apply(i, e)
        }

        function rt() {
            var t = z.props.aria;
            if (t.content) {
                var n = "aria-" + t.content,
                    i = W.id;
                c(z.props.triggerTarget || e).forEach((function(t) {
                    var e = t.getAttribute(n);
                    if (z.state.isVisible) t.setAttribute(n, e ? e + " " + i : i);
                    else {
                        var r = e && e.replace(i, "").trim();
                        r ? t.setAttribute(n, r) : t.removeAttribute(n)
                    }
                }))
            }
        }

        function ot() {
            !J && z.props.aria.expanded && c(z.props.triggerTarget || e).forEach((function(t) {
                z.props.interactive ? t.setAttribute("aria-expanded", z.state.isVisible && t === Z() ? "true" : "false") : t.removeAttribute("aria-expanded")
            }))
        }

        function at() {
            X.body.removeEventListener("mouseleave", Ct), X.removeEventListener("mousemove", N), H = H.filter((function(t) {
                return t !== N
            }))
        }

        function st(t) {
            if (!(T.isTouch && (j || "mousedown" === t.type) || z.props.interactive && W.contains(t.target))) {
                if (Z().contains(t.target)) {
                    if (T.isTouch) return;
                    if (z.state.isVisible && z.props.trigger.indexOf("click") >= 0) return
                } else it("onClickOutside", [z, t]);
                !0 === z.props.hideOnClick && (k = !1, z.clearDelayTimeouts(), z.hide(), R = !0, setTimeout((function() {
                    R = !1
                })), z.state.isMounted || ft())
            }
        }

        function pt() {
            j = !0
        }

        function ut() {
            j = !1
        }

        function ct() {
            X.addEventListener("mousedown", st, !0), X.addEventListener("touchend", st, r), X.addEventListener("touchstart", ut, r), X.addEventListener("touchmove", pt, r)
        }

        function ft() {
            X.removeEventListener("mousedown", st, !0), X.removeEventListener("touchend", st, r), X.removeEventListener("touchstart", ut, r), X.removeEventListener("touchmove", pt, r)
        }

        function lt(t, e) {
            var n = tt().box;

            function i(t) {
                t.target === n && (E(n, "remove", i), e())
            }
            if (0 === t) return e();
            E(n, "remove", b), E(n, "add", i), b = i
        }

        function dt(t, n, i) {
            void 0 === i && (i = !1), c(z.props.triggerTarget || e).forEach((function(e) {
                e.addEventListener(t, n, i), S.push({
                    node: e,
                    eventType: t,
                    handler: n,
                    options: i
                })
            }))
        }

        function vt() {
            var t;
            K() && (dt("touchstart", gt, {
                passive: !0
            }), dt("touchend", bt, {
                passive: !0
            })), (t = z.props.trigger, t.split(/\s+/).filter(Boolean)).forEach((function(t) {
                if ("manual" !== t) switch (dt(t, gt), t) {
                    case "mouseenter":
                        dt("mouseleave", bt);
                        break;
                    case "focus":
                        dt(i ? "focusout" : "blur", yt);
                        break;
                    case "focusin":
                        dt("focusout", yt)
                }
            }))
        }

        function mt() {
            S.forEach((function(t) {
                var e = t.node,
                    n = t.eventType,
                    i = t.handler,
                    r = t.options;
                e.removeEventListener(n, i, r)
            })), S = []
        }

        function gt(t) {
            var e, n = !1;
            if (z.state.isEnabled && !xt(t) && !R) {
                var i = "focus" === (null == (e = h) ? void 0 : e.type);
                h = t, C = t.currentTarget, ot(), !z.state.isVisible && g(t) && H.forEach((function(e) {
                    return e(t)
                })), "click" === t.type && (z.props.trigger.indexOf("mouseenter") < 0 || k) && !1 !== z.props.hideOnClick && z.state.isVisible ? n = !0 : At(t), "click" === t.type && (k = !n), n && !i && Ct(t)
            }
        }

        function ht(t) {
            var n = t.target,
                i = e.contains(n) || W.contains(n);
            "mousemove" === t.type && i || function(t, e) {
                var n = e.clientX,
                    i = e.clientY;
                return t.every((function(t) {
                    var e = t.popperRect,
                        r = t.popperState,
                        o = t.props.interactiveBorder,
                        a = l(r.placement),
                        s = r.modifiersData.offset;
                    if (!s) return !0;
                    var p = "bottom" === a ? s.top.y : 0,
                        u = "top" === a ? s.bottom.y : 0,
                        c = "right" === a ? s.left.x : 0,
                        f = "left" === a ? s.right.x : 0,
                        d = e.top - i + p > o,
                        v = i - e.bottom - u > o,
                        m = e.left - n + c > o,
                        g = n - e.right - f > o;
                    return d || v || m || g
                }))
            }(Tt().concat(W).map((function(t) {
                var e, n = null == (e = t._tippy.popperInstance) ? void 0 : e.state;
                return n ? {
                    popperRect: t.getBoundingClientRect(),
                    popperState: n,
                    props: L
                } : null
            })).filter(Boolean), t) && (at(), Ct(t))
        }

        function bt(t) {
            xt(t) || z.props.trigger.indexOf("click") >= 0 && k || (z.props.interactive ? z.hideWithInteractivity(t) : Ct(t))
        }

        function yt(t) {
            z.props.trigger.indexOf("focusin") < 0 && t.target !== Z() || z.props.interactive && t.relatedTarget && W.contains(t.relatedTarget) || Ct(t)
        }

        function xt(t) {
            return !!T.isTouch && K() !== t.type.indexOf("touch") >= 0
        }

        function wt() {
            Et();
            var n = z.props,
                i = n.popperOptions,
                r = n.placement,
                o = n.offset,
                a = n.getReferenceClientRect,
                s = n.moveTransition,
                p = Q() ? I(W).arrow : null,
                u = a ? {
                    getBoundingClientRect: a,
                    contextElement: a.contextElement || Z()
                } : e,
                c = [{
                    name: "offset",
                    options: {
                        offset: o
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        padding: {
                            top: 2,
                            bottom: 2,
                            left: 5,
                            right: 5
                        }
                    }
                }, {
                    name: "flip",
                    options: {
                        padding: 5
                    }
                }, {
                    name: "computeStyles",
                    options: {
                        adaptive: !s
                    }
                }, {
                    name: "$$tippy",
                    enabled: !0,
                    phase: "beforeWrite",
                    requires: ["computeStyles"],
                    fn: function(t) {
                        var e = t.state;
                        if (Q()) {
                            var n = tt().box;
                            ["placement", "reference-hidden", "escaped"].forEach((function(t) {
                                "placement" === t ? n.setAttribute("data-placement", e.placement) : e.attributes.popper["data-popper-" + t] ? n.setAttribute("data-" + t, "") : n.removeAttribute("data-" + t)
                            })), e.attributes.popper = {}
                        }
                    }
                }];
            Q() && p && c.push({
                name: "arrow",
                options: {
                    element: p,
                    padding: 3
                }
            }), c.push.apply(c, (null == i ? void 0 : i.modifiers) || []), z.popperInstance = t.createPopper(u, W, Object.assign({}, i, {
                placement: r,
                onFirstUpdate: A,
                modifiers: c
            }))
        }

        function Et() {
            z.popperInstance && (z.popperInstance.destroy(), z.popperInstance = null)
        }

        function Tt() {
            return d(W.querySelectorAll("[data-tippy-root]"))
        }

        function At(t) {
            z.clearDelayTimeouts(), t && it("onTrigger", [z, t]), ct();
            var e = et(!0),
                n = G(),
                i = n[0],
                r = n[1];
            T.isTouch && "hold" === i && r && (e = r), e ? a = setTimeout((function() {
                z.show()
            }), e) : z.show()
        }

        function Ct(t) {
            if (z.clearDelayTimeouts(), it("onUntrigger", [z, t]), z.state.isVisible) {
                if (!(z.props.trigger.indexOf("mouseenter") >= 0 && z.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(t.type) >= 0 && k)) {
                    var e = et(!1);
                    e ? u = setTimeout((function() {
                        z.state.isVisible && z.hide()
                    }), e) : m = requestAnimationFrame((function() {
                        z.hide()
                    }))
                }
            } else ft()
        }
    }

    function X(t, e) {
        void 0 === e && (e = {});
        var n = D.plugins.concat(e.plugins || []);
        document.addEventListener("touchstart", C, r), window.addEventListener("blur", L);
        var i = Object.assign({}, e, {
                plugins: n
            }),
            o = b(t).reduce((function(t, e) {
                var n = e && N(e, i);
                return n && t.push(n), t
            }), []);
        return m(t) ? o[0] : o
    }
    X.defaultProps = D, X.setDefaultProps = function(t) {
        Object.keys(t).forEach((function(e) {
            D[e] = t[e]
        }))
    }, X.currentInput = T;
    var Y = {
        mouseover: "mouseenter",
        focusin: "focus",
        click: "click"
    };
    var _ = {
        name: "animateFill",
        defaultValue: !1,
        fn: function(t) {
            var e;
            if (!(null == (e = t.props.render) ? void 0 : e.$$tippy)) return {};
            var n = I(t.popper),
                i = n.box,
                r = n.content,
                o = t.props.animateFill ? function() {
                    var t = v();
                    return t.className = "tippy-backdrop", x([t], "hidden"), t
                }() : null;
            return {
                onCreate: function() {
                    o && (i.insertBefore(o, i.firstElementChild), i.setAttribute("data-animatefill", ""), i.style.overflow = "hidden", t.setProps({
                        arrow: !1,
                        animation: "shift-away"
                    }))
                },
                onMount: function() {
                    if (o) {
                        var t = i.style.transitionDuration,
                            e = Number(t.replace("ms", ""));
                        r.style.transitionDelay = Math.round(e / 10) + "ms", o.style.transitionDuration = t, x([o], "visible")
                    }
                },
                onShow: function() {
                    o && (o.style.transitionDuration = "0ms")
                },
                onHide: function() {
                    o && x([o], "hidden")
                }
            }
        }
    };
    var z = {
        name: "followCursor",
        defaultValue: !1,
        fn: function(t) {
            var e = t.reference,
                n = w(t.props.triggerTarget || e),
                i = null;

            function r() {
                return "manual" === t.props.trigger.trim()
            }

            function o() {
                var e = !!r() || null !== i && !(0 === i.clientX && 0 === i.clientY);
                return t.props.followCursor && e
            }

            function a(e) {
                e && t.setProps({
                    getReferenceClientRect: null
                })
            }

            function s() {
                o() ? n.addEventListener("mousemove", u) : a(t.props.followCursor)
            }

            function p() {
                n.removeEventListener("mousemove", u)
            }

            function u(n) {
                i = {
                    clientX: n.clientX,
                    clientY: n.clientY
                };
                var r = !n.target || e.contains(n.target),
                    o = t.props.followCursor,
                    a = n.clientX,
                    s = n.clientY,
                    u = e.getBoundingClientRect(),
                    c = a - u.left,
                    f = s - u.top;
                !r && t.props.interactive || t.setProps({
                    getReferenceClientRect: function() {
                        var t = e.getBoundingClientRect(),
                            n = a,
                            i = s;
                        "initial" === o && (n = t.left + c, i = t.top + f);
                        var r = "horizontal" === o ? t.top : i,
                            p = "vertical" === o ? t.right : n,
                            u = "horizontal" === o ? t.bottom : i,
                            l = "vertical" === o ? t.left : n;
                        return {
                            width: p - l,
                            height: u - r,
                            top: r,
                            right: p,
                            bottom: u,
                            left: l
                        }
                    }
                }), (T.isTouch || "initial" === t.props.followCursor && t.state.isVisible) && p()
            }
            return {
                onAfterUpdate: function(t, e) {
                    var n = e.followCursor;
                    void 0 === n || n || a(!0)
                },
                onMount: function() {
                    o() && u(i)
                },
                onShow: function() {
                    r() && (i = {
                        clientX: 0,
                        clientY: 0
                    }, s())
                },
                onTrigger: function(t, e) {
                    i || (g(e) && (i = {
                        clientX: e.clientX,
                        clientY: e.clientY
                    }), s())
                },
                onUntrigger: function() {
                    t.state.isVisible || (p(), i = null)
                },
                onHidden: function() {
                    p(), i = null
                }
            }
        }
    };
    var F = {
        name: "inlinePositioning",
        defaultValue: !1,
        fn: function(t) {
            var e, n = t.reference;
            var i = -1,
                r = !1,
                o = {
                    name: "tippyInlinePositioning",
                    enabled: !0,
                    phase: "afterWrite",
                    fn: function(r) {
                        var o = r.state;
                        t.props.inlinePositioning && (e !== o.placement && t.setProps({
                            getReferenceClientRect: function() {
                                return function(t) {
                                    return function(t, e, n, i) {
                                        if (n.length < 2 || null === t) return e;
                                        if (2 === n.length && i >= 0 && n[0].left > n[1].right) return n[i] || e;
                                        switch (t) {
                                            case "top":
                                            case "bottom":
                                                var r = n[0],
                                                    o = n[n.length - 1],
                                                    a = "top" === t,
                                                    s = r.top,
                                                    p = o.bottom,
                                                    u = a ? r.left : o.left,
                                                    c = a ? r.right : o.right;
                                                return {
                                                    top: s, bottom: p, left: u, right: c, width: c - u, height: p - s
                                                };
                                            case "left":
                                            case "right":
                                                var f = Math.min.apply(Math, n.map((function(t) {
                                                        return t.left
                                                    }))),
                                                    l = Math.max.apply(Math, n.map((function(t) {
                                                        return t.right
                                                    }))),
                                                    d = n.filter((function(e) {
                                                        return "left" === t ? e.left === f : e.right === l
                                                    })),
                                                    v = d[0].top,
                                                    m = d[d.length - 1].bottom;
                                                return {
                                                    top: v, bottom: m, left: f, right: l, width: l - f, height: m - v
                                                };
                                            default:
                                                return e
                                        }
                                    }(l(t), n.getBoundingClientRect(), d(n.getClientRects()), i)
                                }(o.placement)
                            }
                        }), e = o.placement)
                    }
                };

            function a() {
                var e;
                r || (e = function(t, e) {
                    var n;
                    return {
                        popperOptions: Object.assign({}, t.popperOptions, {
                            modifiers: [].concat(((null == (n = t.popperOptions) ? void 0 : n.modifiers) || []).filter((function(t) {
                                return t.name !== e.name
                            })), [e])
                        })
                    }
                }(t.props, o), r = !0, t.setProps(e), r = !1)
            }
            return {
                onCreate: a,
                onAfterUpdate: a,
                onTrigger: function(e, n) {
                    if (g(n)) {
                        var r = d(t.reference.getClientRects()),
                            o = r.find((function(t) {
                                return t.left - 2 <= n.clientX && t.right + 2 >= n.clientX && t.top - 2 <= n.clientY && t.bottom + 2 >= n.clientY
                            }));
                        i = r.indexOf(o)
                    }
                },
                onUntrigger: function() {
                    i = -1
                }
            }
        }
    };
    var W = {
        name: "sticky",
        defaultValue: !1,
        fn: function(t) {
            var e = t.reference,
                n = t.popper;

            function i(e) {
                return !0 === t.props.sticky || t.props.sticky === e
            }
            var r = null,
                o = null;

            function a() {
                var s = i("reference") ? (t.popperInstance ? t.popperInstance.state.elements.reference : e).getBoundingClientRect() : null,
                    p = i("popper") ? n.getBoundingClientRect() : null;
                (s && q(r, s) || p && q(o, p)) && t.popperInstance && t.popperInstance.update(), r = s, o = p, t.state.isMounted && requestAnimationFrame(a)
            }
            return {
                onMount: function() {
                    t.props.sticky && a()
                }
            }
        }
    };

    function q(t, e) {
        return !t || !e || (t.top !== e.top || t.right !== e.right || t.bottom !== e.bottom || t.left !== e.left)
    }
    return e && function(t) {
        var e = document.createElement("style");
        e.textContent = t, e.setAttribute("data-tippy-stylesheet", "");
        var n = document.head,
            i = document.querySelector("head>style,head>link");
        i ? n.insertBefore(e, i) : n.appendChild(e)
    }('.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}'), X.setDefaultProps({
        plugins: [_, z, F, W],
        render: S
    }), X.createSingleton = function(t, e) {
        void 0 === e && (e = {});
        var n, i = t,
            r = [],
            o = e.overrides;

        function a() {
            r = i.map((function(t) {
                return t.reference
            }))
        }

        function s(t) {
            i.forEach((function(e) {
                t ? e.enable() : e.disable()
            }))
        }
        s(!1), a();
        var p = {
                fn: function() {
                    return {
                        onDestroy: function() {
                            s(!0)
                        },
                        onTrigger: function(t, e) {
                            var a = e.currentTarget,
                                s = r.indexOf(a);
                            if (a !== n) {
                                n = a;
                                var p = (o || []).concat("content").reduce((function(t, e) {
                                    return t[e] = i[s].props[e], t
                                }), {});
                                t.setProps(Object.assign({}, p, {
                                    getReferenceClientRect: function() {
                                        return a.getBoundingClientRect()
                                    }
                                }))
                            }
                        }
                    }
                }
            },
            c = X(v(), Object.assign({}, u(e, ["overrides"]), {
                plugins: [p].concat(e.plugins || []),
                triggerTarget: r
            })),
            f = c.setProps;
        return c.setProps = function(t) {
            o = t.overrides || o, f(t)
        }, c.setInstances = function(t) {
            s(!0), i = t, s(!1), a(), c.setProps({
                triggerTarget: r
            })
        }, c
    }, X.delegate = function(t, e) {
        var n = [],
            i = [],
            r = e.target,
            o = u(e, ["target"]),
            a = Object.assign({}, o, {
                trigger: "manual",
                touch: !1
            }),
            s = Object.assign({}, o, {
                showOnCreate: !0
            }),
            p = X(t, a);

        function f(t) {
            if (t.target) {
                var n = t.target.closest(r);
                if (n) {
                    var o = n.getAttribute("data-tippy-trigger") || e.trigger || D.trigger;
                    if (!n._tippy && !("touchstart" === t.type && "boolean" == typeof s.touch || "touchstart" !== t.type && o.indexOf(Y[t.type]))) {
                        var a = X(n, s);
                        a && (i = i.concat(a))
                    }
                }
            }
        }

        function l(t, e, i, r) {
            void 0 === r && (r = !1), t.addEventListener(e, i, r), n.push({
                node: t,
                eventType: e,
                handler: i,
                options: r
            })
        }
        return c(p).forEach((function(t) {
            var e = t.destroy;
            t.destroy = function(t) {
                    void 0 === t && (t = !0), t && i.forEach((function(t) {
                        t.destroy()
                    })), i = [], n.forEach((function(t) {
                        var e = t.node,
                            n = t.eventType,
                            i = t.handler,
                            r = t.options;
                        e.removeEventListener(n, i, r)
                    })), n = [], e()
                },
                function(t) {
                    var e = t.reference;
                    l(e, "touchstart", f), l(e, "mouseover", f), l(e, "focusin", f), l(e, "click", f)
                }(t)
        })), p
    }, X.hideAll = function(t) {
        var e = void 0 === t ? {} : t,
            n = e.exclude,
            i = e.duration;
        U.forEach((function(t) {
            var e = !1;
            if (n && (e = h(n) ? t.reference === n : t.popper === n.popper), !e) {
                var r = t.props.duration;
                t.setProps({
                    duration: i
                }), t.hide(), t.state.isDestroyed || t.setProps({
                    duration: r
                })
            }
        }))
    }, X.roundArrow = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>', X
}));
//# sourceMappingURL=tippy-bundle.umd.min.js.map

$(function() {


    // Выбор города в шапке
    $('.selectCity').on('click', function() {
        $(this).toggleClass('active')
    })
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.selectCity').length) {
            $('.selectCity').removeClass('active')
        }
    })


    // Переключение вида карточек в каталоге
    $('.view__item').on('click', function() {
        $('.view__item').removeClass('active')
        $(this).addClass('active')
        if ($(this).hasClass('view__horizontal')) {
            $('.products').addClass('horizontal')
        } else {
            $('.products').removeClass('horizontal')
        }
    })
    $(window).on('resize', function() {
        if ($(window).width() < 990) {
            $('.products').removeClass('horizontal')
            $('.view__item').removeClass('active')
            $('.view__tile').addClass('active')
        }
    })


    // Overlay при hover menu
    if ($(window).width() > 990) {
        $('.menu').on('mouseenter', function() {
            $('.menuOverlay').addClass('active')
        })
        $('.menu').on('mouseleave', function() {
            $('.menuOverlay').removeClass('active')
        })
    }


    // Подстановка заголовков в окна
    // $('.popup-link').on('click', function () {
    // 	let text = $(this).parents('.productCard__body').find('.productCard__title').text()
    // 	if (text.length >= 1) {
    // 		$('.popup__title').show()
    // 		$('.popup__title').text(text)
    // 	} else {
    // 		$('.popup__title').hide()
    // 	}
    // })

    // Подстановка цвета/материала в окне
    $(document).on('click', '.color__availability .availability', function() {
        let text = $(this).parents('.color__item').find('.color__feature-item .color__feature-text')
        if (text.length) {
            for (let i = 0; i < text.length; i++) {
                let textWhiteSpace = ' 𐤟 ' + $(text[i]).text()
                $(this).parents('.popup').find('.popup__head .popup__desc').append(textWhiteSpace)
            }
        }
    })
    $(".popup__back").on("click", function() {
        let text = $(this).parents('.popup').find('.popup__desc')
        let textReplace = text.text().replace(/𐤟.*/, '')
        text.text(textReplace)
    })


    // Фильтр цветов
    $(".filterHor__button").on('click', function() {
        $(".filterHor__button").removeClass("active")
        $(this).addClass("active")
        var btnData = $(this).attr("data-filter")
        var elem = $(".filter-elem")
        if (btnData == "all") {
            $(elem).fadeIn("100")
        } else {
            $(elem).not('[data-filter="' + btnData + '"]').fadeOut(100, function() {
                $(elem).filter('[data-filter="' + btnData + '"]').fadeIn(100)
            })
        }
    })


    // Переключение Цвет/Наличие
    $(".color__availability .availability").on("click", function() {
        $('.popup__conJS').hide("500")
        $('.popup__store').show("500")
        $('.popup__back').addClass("show")
        $('#productColor .popup__title').hide()
        $('#productColor .filterPop-btns').hide()
    })
    $(".popup__back").on("click", function() {
        $('.popup__conJS').show("500")
        $('.popup__store').hide("500")
        $('.popup__back').removeClass("show")
        $('#productColor .popup__title').show()
        $('#productColor .filterPop-btns').show()
    })


    // Мобильное меню
    $(document).on('click', '.burger', function() {
        $(this).toggleClass('active')
        $('.headContacts').toggleClass('active')
        $('html').toggleClass('lock')
    })


    // Мобильный каталог
    $(document).on('click', '.jsCatalog', function() {
        if ($('.category').hasClass('active')) {
            mobClose()
        } else {
            $('.footerMob__link').removeClass('active')
            $(this).addClass('active')
            $('html').addClass('lock')
            $('.category').addClass('active')
        }
    })
    $(document).on('click', '.category__close', function() {
        mobClose()
    })
    $(document).on('click', '.submenu__close', function() {
        mobClose()
    })

    function mobClose() {
        $('.category').removeClass('active')
        $('html').removeClass('lock')
    }


    // Открытие окна при фокусе на поле поиска
    $('.header__search .search__input').on("change keyup input click", function() {
        const val = $(this).val()
        if (val.length > 0) {
            $(this).siblings('.search__clear').show()
        } else {
            $(this).siblings('.search__clear').hide()
        }
        if (val.length >= 3) {
            $(this).parents('.search').addClass('open')
            $('.overlay').addClass('active-search')
        } else {
            $(this).parents('.search').removeClass('open')
            $('.overlay').removeClass('active-search')
        }
    })
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search').length) {
            $('.search').removeClass('open')
            $('.overlay').removeClass('active-search')
        }
    })


    // Очистка поля поиска
    $(document).on('click', '.search__clear', function() {
        $(this).siblings('.search__input').val('')
        $(this).parents('.search').removeClass('open')
        $('.overlay').removeClass('active-search')
        $(this).hide()
    })


    // Мобильный поиск
    $(document).on('focus', '.search__input', function() {
        $('.category__search').addClass('focus')
    })
    $(document).on('click', '.category__searchBack', function() {
        $('.category__search').removeClass('focus')
    })




    // Многоуровневое мобильное меню
    $('.menu__arrow').on('click', function() {
        let submenu = $(this).parent('.menu__item').find('.submenu')
        let title = $(this).parent('.menu__item').find('.menu__text').html()
        submenu.addClass('active')
        submenu.find('.submenu__name').html(title)
        $('.menu__list').addClass('lock')
    })

    $(document).on('click', '.submenu__back', function() {
        $('.submenu').removeClass('active')
        $('.menu__list').removeClass('lock')
    })

    $('.submenu__more').on('click', function() {
        $(this).parents('.submenu__list').find('.submenu__children').slideToggle(200)
        $(this).toggleClass('active')
    })


    // Главный слайдер на главной странице
    const homeSlider = new Swiper('.homeSlider .swiper', {
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
        },
        navigation: {
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    })


    // Слайдер с товарами
    const tovarSlider = new Swiper('.tovarSlider .swiper', {
        slidesPerView: 6,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
        },
        // pagination: {
        // 	el: '.swiper-pagination',
        // 	clickable: true,
        // },
        breakpoints: {
            // when window width is >= 320px
            0: {
                slidesPerView: 1
            },
            480: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            1140: {
                slidesPerView: 4
            },
            1300: {
                slidesPerView: 5
            },
            1700: {
                slidesPerView: 6
            }

        }
    })


    // Слайдер готовых решений
    const readyMadeSlider = new Swiper('.readyMadeSlider .swiper', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px
            0: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            360: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20
            },
        }
    })


    // Слайдер карточки товара
    const productSliderThumbs = new Swiper('.productSliderThumbs .swiper', {
        spaceBetween: 20,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        on: {
            init: function(sw) {
                if (sw.slides.length <= 4) {
                    $('.productSliderThumbs .swiper-wrapper').addClass('center')
                }
            },
        },
    });
    const productSlider = new Swiper('.productSlider .swiper', {
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
        },
        thumbs: {
            swiper: productSliderThumbs,
        },
    });


    // Добавить в избранное
    $('.favorites').on('click', function() {
        let text = $(this).find('.favorites__text')
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            if (text) {
                text.text('Добавить в избранное')
            }
        } else {
            $(this).addClass('active')
            if (text) {
                text.text('В избранном')
            }
        }
    })


    // Plus/Minus
    $('.amount__plus').on('click', function() {
        let num = +$(this).parents('.amount').find('input').val()
        $(this).parents('.amount').find('input').val(num + 1)
    })
    $('.amount__minus').on('click', function() {
        let num = +$(this).parents('.amount').find('input').val()
        const dataValue = $(this).parents('.amount').find('input').attr('data-value')
        if (dataValue == 0) {
            if (num > 0) $(this).parents('.amount').find('input').val(num - 1)
        } else {
            if (num > 1) $(this).parents('.amount').find('input').val(num - 1)
        }
    })
    // Следим за изменениями в input Plus/Minus
    $('.amount__btn').on('click', function() {
        $(this).siblings('.amount__input').change()
    })
    // Валидация input Plus/Minus
    $('.amount__input').on("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '')
        }
        const dataValue = $(this).attr('data-value')
        if (dataValue >= 1) {
            if (this.value == '' || this.value == 0) {
                this.value = 1
            }
        } else {
            if (this.value == '') {
                this.value = 0
            }
        }
    })


    // Замена картики в стеллажах, в зависимости от доп. секций.
    $('.picture-js .amount__input').on('change', function() {
        let val = $(this).val()
        if (val == 0) {
            const dataJpg = $('.dynamic-image').attr('data-jpg-1')
            const dataWebp = $('.dynamic-image').attr('data-webp-1')
            $('.dynamic-image img').attr('src', dataJpg)
            $('.dynamic-image source').attr('srcset', dataWebp)
            $('.dynamic-image').parents('.swiper-slide').attr('href', dataJpg)
            refreshGallery()
        } else {
            const dataJpg = $('.dynamic-image').attr('data-jpg-2')
            const dataWebp = $('.dynamic-image').attr('data-webp-2')
            $('.dynamic-image img').attr('src', dataJpg)
            $('.dynamic-image source').attr('srcset', dataWebp)
            $('.dynamic-image').parents('.swiper-slide').attr('href', dataJpg)
            refreshGallery()
        }
    })


    // Выбор чекбоксов в корзине
    $(".checkAll").on("change", function() {
        var groupId = $(this).data('id');
        $('.checkItem[data-id="' + groupId + '"]').prop("checked", this.checked).trigger("change");
    });
    $(".checkItem").on("change", function() {
        var groupId = $(this).data('id');
        var allChecked = $('.checkItem[data-id="' + groupId + '"]:not(:checked)').length == 0;
        $('.checkAll[data-id="' + groupId + '"]').prop("checked", allChecked);
    });

    // "Выбрать все" в корзине
    $('.basket__checkedBtn').on("click", function() {
        let chekboxBtn = document.querySelector('.checkAll');
        chekboxBtn.checked = true;
        chekboxBtn.dispatchEvent(new Event('change'));
    });

    // Скрытие блока с кнопкой "Выбра всё" и отображение блока с ценой товара
    $('.checkItem').on('change', function() {
        if ($('.checkItem').is(':checked')) {
            $('.basket__itemChecked').hide();
            $('.basket__total').show();
        } else {
            $('.basket__total').hide();
            $('.basket__itemChecked').show()
        }
    });


    // Калькуляция предварительной корзины
    const previewItem = $('.preview__item')
    if (previewItem.length) {
        $('.preview__item .amount__input').on('change', function() {
            calcTotalPrice()
        })
    }

    calcTotalPrice()

    //Функция посчета Итого
    function calcTotalPrice() {
        let total = 0
        let count = 0
        const previewTotal = $('.preview__total .price')
        const basketCount = $('.basketBtn__count')
        document.querySelectorAll('.preview__body .preview__item').forEach(
            item => {
                let cnt = parseFloat(item.querySelector('.amount__input').value)
                if (cnt > 0) {
                    let price = parseFloat(item.querySelector('.price').textContent.replace(/\s/, ''))
                    total += price * cnt
                    count += cnt
                }
            })
        previewTotal.html(validatePrice(total))
        basketCount.html(count)
    }


    // Калькуляция цены в карточке товара, в зависимости от количества.
    $('.checkout__item .amount__input').on('change', function() {
        let val = $(this).val()
        const priceMain = $(this).parents('.checkout').find('.price')
        const priceOld = $(this).parents('.checkout').find('.priceOld')
        const wholesaleBlock = $('.wholesale')
        if (wholesaleBlock.length) {
            wholesale(val)
        } else {
            const dataPriceMain = priceMain.attr('data-price').replace(/\s+/g, '')
            const priceSumMain = val * dataPriceMain
            priceMain.html(validatePrice(priceSumMain))

            if (priceOld.length) {
                const dataPriceOld = priceOld.attr('data-price').replace(/\s+/g, '')
                const priceSumOld = val * dataPriceOld
                priceOld.find('span').html(validatePrice(priceSumOld))
            }
        }
    })


    // Функция калькуляции оптовых цен
    function wholesale(quantity) {
        let priceMain = $('.checkout__price').find('.price')
        let val = parseInt(quantity)
        let wholesaleItem = $('.wholesale__item')
        wholesaleItem.removeClass('active')
        for (let elm of wholesaleItem) {
            let from = parseFloat(elm.dataset.from)
            let to = parseFloat(elm.dataset.to)
            if (val >= from && val <= to) {
                elm.classList.add('active')
                priceMain.html(validatePrice(elm.dataset.price * quantity))
            }
        }
    }


    // Валидация цены - деление на рязряды и отображение копеек, если они есть.
    function validatePrice(price) {
        const length = price.toString().match(/\.(\d+)/)?.[1].length
        if (length > 0) {
            return String(price.toFixed(2)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
        }
        return String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ")
    }


    // Маска телефона
    $('.phone-mask').mask('+7 (999) 9999999', {
        autoclear: false
    })

    // Валидация телефона
    function isValidPhone(phone) {
        var pattern = new RegExp(/\+\d{1}\(\d{3}\)\d{3}-\d{4}/g)
        return pattern.test(phone)
    }

    //Валидация Email
    function isValidEmailAddress(email) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
        return pattern.test(email)
    }


    // Таймер в окне авторизации на повторное отправление кода
    var timer2 = "1:00"
    var interval = setInterval(function() {
        var timer = timer2.split(':')
        //by parsing integer, I avoid all extra string processing
        var minutes = parseInt(timer[0], 10)
        var seconds = parseInt(timer[1], 10)
            --seconds
        minutes = (seconds < 0) ? --minutes : minutes
        if (minutes < 0) clearInterval(interval)
        seconds = (seconds < 0) ? 59 : seconds
        seconds = (seconds < 10) ? '0' + seconds : seconds
        //minutes = (minutes < 10) ?  minutes : minutes
        $('.form__сountdown span').html(minutes + ':' + seconds)
        timer2 = minutes + ':' + seconds
    }, 1000)


    // Свернуть/Развернуть в фильтре
    $('.filter__arrow').on('click', function() {
        $(this).parents('.filter__item').toggleClass('hide')
    })


    // Выбор цвета в фильтре
    $('.filter__color').on('click', function() {
        $(this).toggleClass('active')
        changeRangeSlider(this)
    })


    // Показать/Скрыть фильтр
    $('.filter__hide').on('click', function() {
        $('.filter').addClass('hide')
        $('.viewFilter').addClass('show')
        $('.catalog').addClass('no-filter')
        $('html').removeClass('lock')
        $('.filter').removeClass('active')
    })
    $('.viewFilter').on('click', function() {
        $('.filter').removeClass('hide')
        $('.viewFilter').removeClass('show')
        $('.catalog').removeClass('no-filter')
    })


    // Показать/Скрыть фильтр на мобильном
    if ($(window).width() < 990) {
        $('.viewFilter').on('click', function() {
            $('.filter').addClass('active')
            $('html').addClass('lock')
        })
    }


    // Сворачивание .rolled
    $('.rolled__btn').on('click', function() {
        $(this).toggleClass('active')
        $(this).parent('.rolled').find('.rolled__content').slideToggle(200)
    })


    // Tooltip
    tippy('[data-tippy-content]');


    // Tooltip цены
    // const tippyPrice = document.getElementsByClassName('fire')
    // if (tippyPrice) {
    // 	for (let i = 0; i < tippyPrice.length; i++) {
    // 		const tippyItem = tippyPrice[i]
    // 		//const clubPrice = tippyItem.getAttribute('data-club-price')
    // 		const mainPrice = tippyItem.getAttribute('data-main-price')
    // 		tippy(tippyItem, {
    // 			interactive: true,
    // 			content: '<div class="tippyPrice"><div class="tippyPrice__item"><div class="tippyPrice__name">Обычная цена:</div><div class="tippyPrice__text">' + mainPrice + ' ₽</div></div><div class="tippyPrice__item"><a class="tippyPrice__name" href="onix-club.html">Ваша клубная цена:</a></div></div>',
    // 			allowHTML: true,
    // 		})
    // 	}
    // }

    //Tooltip подсказки цены onix club
    // const tippyPriceClub = document.querySelectorAll('.priceClub')
    // if (tippyPriceClub) {
    // 	tippy(tippyPriceClub, {
    // 		interactive: true,
    // 		content: '<a class="tippyPriceClub" href="onix-club.html">Ваша специальная цена по клубной карте</a>',
    // 		allowHTML: true,
    // 	})
    // }


    // Tooltip цены
    const tippyColor = document.getElementsByClassName('custom__list-item-color')
    if (tippyColor) {
        for (let i = 0; i < tippyColor.length; i++) {
            const tippyItem = tippyColor[i]
            const dataColor = tippyItem.getAttribute('data-color')
            let status = ''
            if (tippyItem.classList.contains('none')) {
                status = 'На заказ'
            } else {
                status = 'В наличии'
            }
            tippy(tippyItem, {
                interactive: true,
                content: '<div class="tippyColor"><div class="tippyColor__color">' + dataColor + '</div><div class="tippyColor__status">' + status + '</div></div>',
                allowHTML: true,
            })
        }
    }


    //Tooltip подсказки в фильтре
    const tippyFilter = document.querySelectorAll('.tippyFilter')
    if (tippyFilter) {
        let position = 'left'
        if (window.matchMedia('(max-width: 991px)').matches) {
            position = 'top'
        }
        tippy(tippyFilter, {
            maxWidth: 500,
            theme: 'light-500',
            trigger: 'click',
            placement: position,
            interactive: true,
            content: '<div class="tooltipFilter"><div class="tooltipFilter__title">Регулировка</div><div class="tooltipFilter__text">Функция <b>регулировки высоты подлокотников</b> - благодаря ей можно отрегулировать высоту подлокотников таким образом, чтобы угол локтевого сгиба пользователя составлял рекомендуемые 90 градусов. <br><br> <b>Регулировка высоты подголовника</b> - позволяет настроить подголовник кресла под рост пользователя. <br><br> <b>Регулировка высоты поясничного упора</b> - актуальна для моделей с поясничным упором, позволяет настроить высоту поясничного упора под рост пользователя. <br><br> <b>Регулировка высоты сиденья и спинки</b> - позволяет настроить высоту сиденья и спинки кресла в соответствии с ростом пользователя.<br><br> <b>Регулировка глубины положения подлокотников</b> - данная опция позволяет размещать подлокотники ближе или дальше от спинки кресла.<br><br> <b>Регулировка жесткости качания</b> - позволяет регулировать жесткость качания кресла с учетом веса и предпочтений пользователя.<br><br> <b>Регулировка расстояния между правым и левым подлокотником</b> - возможность раздвигать подлокотники (для людей крупной комплекции) или, наоборот, размещать их ближе к сидящему.<br><br> <b>Регулировка угла подлокотников</b> - по умолчанию подлокотники параллельны друг другу. Регулировка угла подлокотников позволяет поворачивать один или оба подлокотника так, чтобы пользователь мог занимать удобное естественное положение.<br><br></div></div>',
            allowHTML: true,
            //zIndex: 10
        })
    }


    // Табы
    const tabs = $(".tabs")
    let observer = new MutationObserver(mutationRecords => {
        getTabs()
    })
    const tabsContent = $('.tabs__content li')
    for (let element of tabsContent) {
        if (!element) {
            return
        }
        observer.observe(element, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }
    if (tabs.length) {
        getTabs()
        $(".tabs__btns > li").on("click", function() {
            if (!$(this).hasClass('active')) {
                $(this).siblings("li").removeClass("active")
                $(this).addClass("active")
                const contentActive = $(this).parents('.tabs').find(".tabs__content li.active")
                contentActive.fadeOut(100, function() {
                    $(this).parents('.tabs__content').find("li").removeClass("active")
                    const btnActiveIndex = $(this).parents('.tabs').find(".tabs__btns .active").index()
                    $(this).parents('.tabs__content').find("li").eq(btnActiveIndex).addClass("active")

                    const contentActiveHeight = $(this).parents('.tabs').find(".tabs__content li.active").outerHeight()
                    const wrapper = $(this).parents('.tabs').find(".tabs__content")
                    wrapper.stop().delay(50).animate({
                        height: contentActiveHeight
                    }, 150, function() {
                        $(this).parents('.tabs').find(".tabs__content li.active").delay(50).fadeIn(100)
                    })
                })
            }
        })
        $(window).on('resize', function() {
            getTabs()
        })
    }

    function getTabs() {
        for (let element of tabs) {
            const wrapper = $(element).find(".tabs__content")
            const contentActive = wrapper.find("li.active")
            const contentActiveHeight = contentActive.outerHeight()
            wrapper.height(contentActiveHeight)
            contentActive.show()
        }
    }


    // Плавный скролл до якоря
    $(".anchor").on('click', function() {
        var offsetHeight = 0
        var nav = $('.scrollPanel')
        if (nav.length) {
            var header = $('.header')
            var offsetHeight = nav.outerHeight() + header.outerHeight()
            window.addEventListener('orientationchange', function() {
                offsetHeight = nav.outerHeight() + header.outerHeight()
            }, false)
        }
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top - offsetHeight + 1
        $('html,body').animate({
            scrollTop: destination
        }, 1100)
        return false
    })


    // Scroll панель категорий
    const nav = $('.scrollPanel')
    if (nav.length) {
        const section = $('.scrollSection')
        const header = $('.header')
        const offsetHeight = nav.outerHeight() + header.outerHeight()
        // поворот экрана 
        window.addEventListener('orientationchange', function() {
            offsetHeight = nav.outerHeight() + header.outerHeight()
        }, false);

        $(window).on('scroll', function() {
            const position = $(this).scrollTop()
            section.each(function() {
                const top = $(this).offset().top - offsetHeight
                const bottom = top + $(this).outerHeight();

                if (position >= top && position <= bottom) {
                    nav.find('a').removeClass('active')
                    section.removeClass('active')

                    $(this).addClass('active')
                    nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active')
                }
            })
        })

        // Фиксирование панели табов при прокрутке
        var StickyElement = function(node) {
            var fixed = false,
                anchor = node.find('.scrollPanel__anchor'),
                content = node.find('.scrollPanel__list');
            var onScroll = function(e) {
                var docTop = $(document).scrollTop(),
                    anchorTop = anchor.offset().top;
                if (docTop > anchorTop) {
                    if (!fixed) {
                        anchor.height(content.outerHeight());
                        content.addClass('fixed');
                        fixed = true;
                    }
                } else {
                    if (fixed) {
                        anchor.height(0);
                        content.removeClass('fixed');
                        fixed = false;
                    }
                }
            };
            $(window).on('scroll', onScroll);
        };
        var sticky = new StickyElement($('.scrollPanel'));
    }


    // File upload
    var filesExt = ['jpg', 'jpeg', 'pdf', 'png']
    $(document).on('change', '#input-file', function() {
        var parts = $(this).val().split('.')
        var uploadText = $(this).parents('.file').find('.file__info')
        if (filesExt.join().search(parts[parts.length - 1]) != -1) {
            var fileSize = $(this)[0].files[0].size
            if (fileSize > 5097152) {
                uploadText.html('Размер файла не более 5Mb')
                uploadText.css('color', '#FF6767')
            } else {
                uploadText.html($(this).val().replace(/.*\\/, ""))
                uploadText.css('color', '#a3a3a3')
            }
        } else {
            uploadText.html('Недопустимый формат. Только jpg, jpeg, pdf, png')
            uploadText.css('color', '#FF6767')
        }
    })


    // File upload ordering card
    var filesExtCard = ['jpg', 'jpeg', 'pdf', 'png', 'doc', 'docx', 'rtf', 'xls', 'xlsx', 'xlsm', 'xlsb']
    $(document).on('change', '#input-file-card', function() {
        var parts = $(this).val().split('.')
        var fileCard = $(this).parents('.file-card')
        var error = $(this).parents('.file-card').find('.file-card__error')
        var name = $(this).parents('.file-card').find('.file-card__text')
        var label = $(this).parents('.file-card').find('.file-card__label')
        if (filesExtCard.join().search(parts[parts.length - 1]) != -1) {
            var fileSize = $(this)[0].files[0].size
            if (fileSize > 2097152) {
                error.html('Размер файла не более 2Mb')
            } else {
                error.html('')
                name.html($(this).val().replace(/.*\\/, ""))
                name.attr('title', $(this).val().replace(/.*\\/, ""))
                label.css('color', '#333')
                fileCard.addClass('done')
                $('.ordering__inn-data-inner input').prop('disabled', true)
                $('#in-address').val('')
                $('#copy-address').prop('checked', false)
            }
        } else {
            error.html('Недопустимый формат')
        }
    })
    // очистить
    $(document).on('click', '.file-card__delete', function() {
        $('#input-file-card').val('')
        $(this).parents('.file-card').find('.file-card__error').html('')
        $(this).parents('.file-card').find('.file-card__text').html('Прикрепить карточку организации')
        $(this).parents('.file-card').find('.file-card__text').attr('title', '')
        $(this).parents('.file-card').find('.file-card__label').css('color', '#a3a3a3')
        $(this).parents('.file-card').removeClass('done')
        $('.ordering__inn-data-inner input').not('.required').prop('disabled', false)
    })


    // Ограничение количества ввода символов ИНН
    $(document).on('input', '#inn', function() {
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }
    })


    // Если ИНН коректный, показываем остальные поля
    $(document).on('change keyup input', '#inn', function() {
        if ($(this).val().length == 10) {
            $('.required').prop('disabled', true)
            if ($('.ordering').length) {
                $('.ordering__inn-data').show()
            }
        } else {
            if ($('.ordering').length) {
                $('.ordering__inn-data').hide()
            }
            $('.required').prop('disabled', false)
        }
    })


    // Подстановка юр. адреса
    $(document).on('change', '#copy-address', function() {
        if ($(this).is(':checked')) {
            console.log(1212);
            $('#in-address').val($('#from-address').val())
        } else {
            $('#in-address').val('')
        }
    })



    // Калькуляция рейтинга
    {
        const numReviews = $('.reviewsRating__numReviews')
        var sum = 0;
        var total = 0;
        numReviews.each(function() {
            sum += parseFloat($(this).text())
        })
        $('.reviewsRating__text span').text(sum)
        $('.reviewsRating__amount').each(function() {
            // подсчет ширины statusbar
            const starCount = $(this).parents('.reviewsRating__item').find(numReviews).text()
            const starPercent = Math.round(100 / (sum / starCount))
            const barWidth = $(this).parents('.reviewsRating__item').find('.reviewsRating__bar span').css('width', starPercent + '%')
            // подсчет средней оценки из 5
            const dataStar = $(this).attr('data-star')
            total += dataStar * starCount / sum
        })
        $('.reviewsRating__number').text(total.toFixed(1))
    }


    // Галерея
    const lightGalleryMain = document.getElementById('lightgallery')
    const lightGa = lightGallery(lightGalleryMain, {
        //dynamic: true,
        plugins: [lgThumbnail],
        closeOnTap: false,
        mobileSettings: {
            controls: true
        }
    })

    function refreshGallery() {
        lightGa.refresh()
    }


    // Добавление кастомного scrollbar от 900px и выше
    if (window.matchMedia('(min-width: 991px)').matches) {
        document.querySelectorAll('.simplebar').forEach(el => {
            new SimpleBar(el)
        })
    }


    // КАРТА
    if ($('.map').length) {
        ymaps.ready(initMap);

        function initMap() {

            // Пенза магазин
            var penzaScore = new ymaps.Map('penzaShop', {
                center: [53.205711, 45.000323],
                zoom: 18
            });
            penzaScore.geoObjects.add(new ymaps.Placemark([53.205711, 45.000323]))

            // Пенза склад
            var penzaWarehouse = new ymaps.Map('penzaWarehouse', {
                center: [53.243540, 45.022134],
                zoom: 18
            });
            penzaWarehouse.geoObjects.add(new ymaps.Placemark([53.243540, 45.022134]))

            // Ульяновск
            var ulyanovsk = new ymaps.Map('ulyanovsk', {
                center: [54.319743, 48.398110],
                zoom: 18
            });
            ulyanovsk.geoObjects.add(new ymaps.Placemark([54.319743, 48.398110]))

            // Саранск
            var saransk = new ymaps.Map('saransk', {
                center: [54.195171, 45.169143],
                zoom: 18
            });
            saransk.geoObjects.add(new ymaps.Placemark([54.195171, 45.169143]))

            // Саратов
            var saratov = new ymaps.Map('saratov', {
                center: [54.195171, 45.169143],
                zoom: 18
            });
            saratov.geoObjects.add(new ymaps.Placemark([54.195171, 45.169143]))

        }
    }


    // Подстановка картинки схемы проезда в модальное окно
    $('.scheme').on('click', function() {
        const data = $(this).attr('data-img')
        $('#scheme img').attr('src', data)
    })


    // Показать/Скрыть поле ввода подарочной карты
    $('.giftcard__text span').on('click', function() {
        const giftcard = $(this).parents('.giftcard')
        giftcard.toggleClass('close')
        if (giftcard.hasClass('close')) {
            giftcard.find('.giftcard__text span').html('Активировать')
        } else {
            giftcard.find('.giftcard__text span').html('Скрыть')
        }
    })


    // Progress Bar status
    const status = $('.status')
    if (status.length) {
        const stepNumber = document.querySelectorAll('.status__step')
        const progressSuccess = document.querySelector('.status__progress--success')
        const aciveSteps = document.querySelectorAll('.status__step.active')
        const progressPercent = ((aciveSteps.length - 1) / (stepNumber.length - 1)) * 100 + '%'
        progressSuccess.style.width = progressPercent
    }


    // Копирование реферальной ссылки
    $('.profile__referral-copy').on('click', function() {
        const copyText = $('.profile__referral-input').val()
        navigator.clipboard.writeText(copyText)
        $(this).parents('.profile__referral').append('<div class="referral-done">Скопировано</div>')
        $('.referral-done').delay(1000).fadeOut(100)
    })


    // Dropmore
    $('.dropmore__icon').on('click', function() {
        $(this).parents('.dropmore__item').toggleClass('open')
    })


    // Показать/Скрть настройки контрагента
    $('.profile__persona-setup').on('click', function() {
        $(this).toggleClass('active')
        if ($(this).hasClass('active')) {
            $(this).html('Скрыть')
            $('.persona-setup').show()
        } else {
            $(this).html('Изменить контрагента')
            $('.persona-setup').hide()

        }
    })


    // Показать/скрыть детали заказа
    $('.orders__arrow').on('click', function() {
        $(this).parents('.orders__item').toggleClass('open')
    })


    // Показать/Скрыть textarea при выборе "другое" в окне "пожаловаться на информацтю о товаре"
    $(document).on('change', '#report .radio__input', function() {
        if ($('#radio-other').prop("checked")) {
            $('.popup__radio textarea').show()
        } else {
            $('.popup__radio textarea').hide()
        }
    })

    // Ограничение количества доп. аксессуаров в карточке товара
    let btnMore = $('.productInfo__more')
    if (btnMore.length > 0) {
        let item = btnMore.parents('.productInfo__content').find('.productInfo__item')
        if (item.length > 3) {
            item.slice(3).hide()
            btnMore.addClass('show')
            $('.productInfo__more span').html(item.length - 3)
        } else {
            btnMore.removeClass('show')
        }
        btnMore.on('click', function() {
            $(this).parents('.productInfo__content').find('.productInfo__item').show()
            $(this).hide()
        })
    }

    // Добавление в корзину c выбором количества
    $(document).on('click', '.addToBasket', function() {
        if ($(this).siblings('.addToCount__tooltip').length) {
            console.log($(this));
            let input = $(this).siblings('.addToCount__tooltip').find('.amount__input')
            let val = +input.val()
            if (val == 0) {
                input.val(val + 1)
            }
            $(this).siblings('.addToCount__tooltip').show()
        }
    })
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.addToCount').length) {
            $('.addToCount__tooltip').hide()
        }
    })


    // Уведомление зарегистрироваться
    if (localStorage.getItem('auth') === null) {
        console.log(111);
        setTimeout(function() {
            $('.auth-notification').show()
        }, 1000)
    }
    $(document).on('click', '.auth-notification__info a', function() {
        $('.auth-notification').hide()
        localStorage.setItem('auth', 'yes');
    })
    $(document).on('click', '.auth-notification__close', function() {
        $('.auth-notification').hide()
        localStorage.setItem('auth', 'yes');
    })


    // Переключатель доставки
    $(document).on('click', '.ordering__check-delivery input', function() {
        let orderingInputs = $(this).parents('.ordering__transportation').find('.ordering__inputs')
        $(orderingInputs).removeClass('show')
        $($(this).attr('data-id')).addClass('show')
    })


    // Скрытие части характеристик
    {
        let specifications = $('.specifications')
        if (specifications.length > 0) {
            for (let i = 0; i < specifications.length; i++) {
                const element = specifications[i];

                let item = $(element).find('.specifications__item')
                if (item.length > 6) {
                    item.slice(6).hide()
                    $(element).append('<div class="btnMore">Показать все</div>')
                } else {
                    $(element).find('.btnMore').hide()
                }
                let btn = $(element).find('.btnMore')
                btn.on('click', function() {
                    $(this).parents('.specifications').find('.specifications__item').show()
                    $(this).hide()
                })
            }
        }
    }


    // Скрытие части отзывов
    {
        let reviewsList = $('.reviews__list')
        if (reviewsList.length > 0) {
            for (let i = 0; i < reviewsList.length; i++) {
                const element = reviewsList[i];

                let item = $(element).find('.reviews__item')
                if (item.length > 1) {
                    item.slice(1).hide()
                    $(element).append('<div class="btnMore">Показать все отзывы</div>')
                } else {
                    $(element).find('.btnMore').hide()
                }
                let btn = $(element).find('.btnMore')
                btn.on('click', function() {
                    $(this).parents('.reviews__list').find('.reviews__item').show()
                    $(this).hide()
                })
            }
        }
    }



    // Скрытие части описания
    {
        let sliceText = $('.sliceText')
        if (sliceText.length > 0) {
            for (let i = 0; i < sliceText.length; i++) {
                const element = sliceText[i];

                let contentText = $(element).find('.sliceText__content')
                let textText = contentText.text()
                let textCount = textText.length
                if (textCount > 800) {
                    contentText.text(textText.slice(0, 800) + ' ...')
                    $(element).append('<div class="btnMore">Показать полностью</div>')
                } else {
                    $(element).find('.btnMore').hide()
                }
                let btn = $(element).find('.btnMore')
                btn.on('click', function() {
                    $(this).parents('.sliceText').find('.sliceText__content').text(textText)
                    $(this).hide()
                })
            }
        }

    }


    // Функция положения тултипа в фильтре
    function changeRangeSlider(index) {
        let filter = $('.filter').offset().top
        let elem = $(index).parent().offset().top
        let top = elem - filter
        let heigthParent = $(index).parent().height()
        $('.filter__tooltip').css('top', top + heigthParent / 2)
        $('.filter__tooltip').addClass('active')
    }

    $('.filter__item .checkbox__input').on('change, click', function() {
        changeRangeSlider(this)
    })

    $('.filter__item .radio__input').on('change, click', function() {
        changeRangeSlider(this)
    })


    // Ползунок фильтра
    const range = document.getElementsByClassName('range')
    if (range) {
        for (let i = 0; i < range.length; i++) {
            const item = range[i]
            const rangeSlider = item.querySelector('.range__slider')
            const inputMin = item.querySelector('.inputMin')
            const inputMax = item.querySelector('.inputMax')
            const inputMinVal = Number(inputMin.getAttribute('placeholder'))
            const inputMaxVal = Number(inputMax.getAttribute('placeholder'))
            const inputs = [inputMin, inputMax]

            noUiSlider.create(rangeSlider, {
                start: [inputMinVal, inputMaxVal],
                connect: true,
                step: 1,
                //tooltips: true,
                range: {
                    'min': inputMinVal,
                    'max': inputMaxVal
                }
            })

            rangeSlider.noUiSlider.on('update', function(values, handle) {
                inputs[handle].value = Math.round(values[handle])
            })

            rangeSlider.noUiSlider.on('set', function() {
                changeRangeSlider(inputMin)
            });

            const setRangeSlider = (i, value) => {
                let arr = [null, null]
                arr[i] = value
                rangeSlider.noUiSlider.set(arr)
            }

            inputs.forEach((el, index) => {
                el.addEventListener('change', (e) => {
                    setRangeSlider(index, e.currentTarget.value)
                })
            })
        }
    }


})



// var seconds = $('.form__сountdown span').text(),
// 	int
// int = setInterval(function () { // запускаем интервал
// 	if (seconds > 0) {
// 		seconds-- // вычитаем 1
// 		$('.form__сountdown span').text(seconds) // выводим получившееся значение в блок
// 	} else {
// 		clearInterval(int) // очищаем интервал, чтобы он не продолжал работу при seconds = 0
// 		alert('End!')
// 	}
// }, 1000)





// Скрытие шапки при скролле на моб
// {
// 	if ($(window).width() <= 990) {
// 		var header = $('.headerBottom'),
// 			scrollPrev = 0
// 		$(window).on('scroll', function () {
// 			var scrolled = $(window).scrollTop()
// 			if (scrolled > 100 && scrolled > scrollPrev) {
// 				header.addClass('hide')
// 				$('.search').removeClass('active')
// 				$('.overlay').removeClass('active-search')
// 			} else {
// 				header.removeClass('hide')
// 			}
// 			scrollPrev = scrolled
// 		})
// 	}
// 	$(window).on('resize', function () {
// 		if ($(window).width() >= 990) {
// 			if (header.hasClass('hide')) {
// 				header.removeClass('hide')
// 			}
// 		}
// 	})
// }
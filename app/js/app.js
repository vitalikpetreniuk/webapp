// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import flatpickr from "flatpickr";
import 'flot';

document.addEventListener('DOMContentLoaded', () => {

	$('.mounthly-calc__list .title').on('click', function () {
		$(this).toggleClass('active')
		if ($(this).hasClass('active')) {
			$(this).next().toggleClass('active')
		} else {
			$(this).next().removeClass('active')
		}
	})
	
	flatpickr($('#datepicker'), {
		mode: "range",
		minDate: "today",
		dateFormat: "d.m.Y",
		defaultDate: ["today", "31.12.2021"],
		showMonths: 3,
	})
	
	$('#revenue').click(() => {
		$('#modal-revenue, .modal-overlay').addClass('active')
		$('html, body').addClass('_over-hidden')
	})
	$('#expenses').click(() => {
		$('#modal-expenses, .modal-overlay').addClass('active')
		$('html, body').addClass('_over-hidden')
	})
	
	
	$('.modal__close, .modal-overlay').click(() => {
		$('.modal, .modal-overlay').removeClass('active')
		$('html, body').removeClass('_over-hidden')
	})
	
	
	
	// select

	$('.select').on('click', '.select__head', function () {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).next().fadeOut();
		} else {
			$('.select__head').removeClass('open');
			$('.select__list').fadeOut();
			$(this).addClass('open');
			$(this).next().fadeIn();
		}
	});

	$('.select').on('click', '.select__item', function () {
		$('.select__head').removeClass('open');
		$(this).parent().fadeOut();
		$(this).parent().prev().text($(this).text());
		$(this).parent().prev().prev().val($(this).text());
	});

	$(document).click(function (e) {
		if (!$(e.target).closest('.select').length) {
			$('.select__head').removeClass('open');
			$('.select__list').fadeOut();
		}
	});
	
	if ($('#analyze').length) {
		$.plot($('#analyze'), [
				[ [1, 3], [2, 14.01], [3.5, 3.14], [4, 6], [5, 12] ]
			],
			{
				yaxis: {
					max: 1,
				},
			})
	}

})

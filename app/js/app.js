// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import flatpickr from "flatpickr";
import 'flot';

document.addEventListener('DOMContentLoaded', () => {

	const datepicker = document.getElementById('datepicker')

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
		defaultDate: ["today", "today"],
		showMonths: 3,
	})
	
	if (datepicker.value.length === 0) {
		$('.datepicker__icon').css({
				'left': '0'
			})
	} else if (datepicker.value.length <= 10) {
		$('.datepicker__icon').css({
			'left': '85px'
		})
	} else {
		$('.datepicker__icon').css({
			'left': '180px'
		})
	}
	
	datepicker.oninput = function () {
		let lengthInput = datepicker.value.length
		
		if (lengthInput <= 10) {
			$('.datepicker__icon').css({
				'left': '85px'
			})
		} else {
			$('.datepicker__icon').css({
				'left': '180px'
			})
		}
		datepicker.value = datepicker.value.replace('to', '-')
	}
	
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

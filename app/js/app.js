// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import flatpickr from "flatpickr";
import 'flot';
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index.js";

document.addEventListener('DOMContentLoaded', () => {

	// const $form = $('.drag-drop');
	const $revenueForm = $('#revenueForm')
	const $revenueFile = document.querySelector('#revenueFile')
	const $revenueSelected = document.querySelector('#revenueForm .drag-drop__selected')
	
	const $expensesForm = $('#expensesForm')
	const $expensesFile = document.querySelector('#expensesFile')
	const $expensesSelected = document.querySelector('#expensesForm .drag-drop__selected')
	
	let droppedFiles = false;
	
	function handleChangeFile (form, input, selected) {
		form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
			e.preventDefault();
			e.stopPropagation();
		})
			.on('dragover dragenter', function() {
				form.addClass('is-dragover');
			})
			.on('dragleave dragend drop', function() {
				form.removeClass('is-dragover');
			})
			.on('drop', function(e) {
				console.log('drop')
				droppedFiles = e.originalEvent.dataTransfer.files;
				selected.classList.add('active')
			});
		

		if (input) {
			selected.addEventListener('click', function () {
				input.value = ''
				selected.classList.remove('active')
			})
			
			input.addEventListener('change', function () {
				if (this.value) {
					console.log('файл был выбран', this.value)
					selected.classList.add('active')
				} else {
					selected.classList.remove('active')
					console.log('Файл не был выбран')
				}
			})
		}
			
	}

	handleChangeFile($revenueForm, $revenueFile, $revenueSelected)
	handleChangeFile($expensesForm, $expensesFile, $expensesSelected)

	
	
	

	const datepicker = document.getElementById('datepicker')
	const datepickerModal = document.getElementById('datepicker-modal')

	$('.mounthly-calc__list .title').on('click', function () {
		$(this).toggleClass('active')
		if ($(this).hasClass('active')) {
			$(this).next().toggleClass('active')
		} else {
			$(this).next().removeClass('active')
		}
	})
	
	flatpickr($('#datepicker, #datepicker-modal'), {
		mode: "range",
		minDate: "today",
		dateFormat: "d.m.Y",
		defaultDate: ["today", "today"],
		showMonths: 3,
	})
	
	flatpickr($('#monthpicker'), {
		defaultDate: new Date(),
		plugins: [
			new monthSelectPlugin({
				shorthand: true, //defaults to false
				dateFormat: "m.y", //defaults to "F Y"
				altFormat: "F Y", //defaults to "F Y"
				theme: "dark", // defaults to "light"
			})
		]
	})

	// if (datepicker.value.length === 0) {
	// 	$(`.datepicker .datepicker__icon`).css({
	// 		'left': '0'
	// 	})
	// } else if (datepicker.value.length <= 10) {
	// 	$(`.datepicker .datepicker__icon`).css({
	// 		'left': '85px'
	// 	})
	// } else {
	// 	$(`.datepicker .datepicker__icon`).css({
	// 		'left': '180px'
	// 	})
	// }

	// datepicker.oninput = function () {
	// 	let lengthInput = datepicker.value.length
	//
	// 	if (lengthInput <= 10) {
	// 		$(`.datepicker .datepicker__icon`).css({
	// 			'left': '85px'
	// 		})
	// 	} else {
	// 		$(`.datepicker .datepicker__icon`).css({
	// 			'left': '180px'
	// 		})
	// 	}
	// 	datepicker.value = datepicker.value.replace('to', '-')
	// }
	
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

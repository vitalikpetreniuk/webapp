// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

import 'flot';
import autoComplete from "@tarekraafat/autocomplete.js/dist/autoComplete.min.js";
import 'bootstrap';

jQuery(function ($) {

	// const $form = $('.drag-drop');
	const $revenueForm = $('#revenueForm')
	const $revenueFile = document.querySelector('#revenueFile')
	const $revenueSelected = document.querySelector('#revenueForm .drag-drop__selected')
	const $revenueTextLabel = document.querySelector('#revenueForm .drag-drop__selected .filename')
	
	const $expensesForm = $('#expensesForm')
	const $expensesFile = document.querySelector('#expensesFile')
	const $expensesSelected = document.querySelector('#expensesForm .drag-drop__selected')
	const $expensesTextLabel = document.querySelector('#expensesForm .drag-drop__selected .filename')




	if ($('.autoComplete').length) {
		const autoCompleteJS = new autoComplete({
			selector: "#autoFill",
			data: {
				src: async () => {
					try {
						// Loading placeholder text
						document
							.getElementById("autoFill")
							.setAttribute("placeholder", "Loading...");
						// Fetch External Data Source
						const source = await fetch(
							"https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json"
						);
						const data = await source.json();
						// Post Loading placeholder text
						document
							.getElementById("autoFill")
							.setAttribute("placeholder", autoCompleteJS.placeHolder);
						// Returns Fetched data
						return data;
					} catch (error) {
						return error;
					}
				},
				keys: ["food", "cities", "animals"],
				cache: true,
				filter: (list) => {
					// Filter duplicates
					// incase of multiple data keys usage
					const filteredResults = Array.from(
						new Set(list.map((value) => value.match))
					).map((food) => {
						return list.find((value) => value.match === food);
					});

					return filteredResults;
				}
			},
			placeHolder: "Source",
			resultsList: {
				element: (list, data) => {
					const info = document.createElement("p");
					if (data.results.length > 0) {
						info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
					} else {
						info.innerHTML = `Создать категорию <strong>"${data.query}"</strong>`;
					}
					list.prepend(info);
				},
				noResults: true,
				maxResults: 15,
				tabSelect: true
			},
			resultItem: {
				element: (item, data) => {
					// Modify Results Item Style
					item.style = "display: flex; justify-content: space-between;";
					// Modify Results Item Content
					item.innerHTML = `
      <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}
      </span>
      <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
        ${data.key}
      </span>`;
				},
				highlight: true
			},
			events: {
				input: {
					focus: () => {
						if (autoCompleteJS.input.value.length) autoCompleteJS.start();
					}
				}
			}
		});



		autoCompleteJS.input.addEventListener("selection", function (event) {
			const feedback = event.detail;
			autoCompleteJS.input.blur();
			// Prepare User's Selected Value
			const selection = feedback.selection.value[feedback.selection.key];
			// Render selected choice to selection div
			document.querySelector(".selection").innerHTML = selection;
			// Replace Input value with the selected value
			autoCompleteJS.input.value = selection;
			// Console log autoComplete data feedback
			console.log(feedback);
		});
	}
		
		
	const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.',]
	let $listMonths = document.querySelectorAll('#listMonths li')
	
	$listMonths.forEach((month, idx) => {
		month.textContent = months[idx]
	})
	
	
	let droppedFiles = false;
	
	function handleChangeFile (form, input, selected, textLabel) {
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
				
				if (droppedFiles) {
					console.log('файл был выбран', droppedFiles[0].name)
					selected.classList.add('active')
					textLabel.textContent = droppedFiles[0].name
				} else {
					selected.classList.remove('active')
					console.log('Файл не был выбран')
				}
				
				console.log(droppedFiles.length)
				console.log(input.files)
				selected.classList.add('active')
			});
		

		if (input) {
			selected.addEventListener('click', function () {
				input.value = ''
				selected.classList.remove('active')
			})
			
			input.addEventListener('change', function () {
				let filename = $(this).val().replace(/.*\\/, "");
				if (this.value) {
					console.log('файл был выбран', this.value)
					console.log(this.files)
					selected.classList.add('active')
					textLabel.textContent = filename
				} else {
					selected.classList.remove('active')
					console.log('Файл не был выбран')
				}
			})
		}
			
	}

	handleChangeFile($revenueForm, $revenueFile, $revenueSelected, $revenueTextLabel)
	handleChangeFile($expensesForm, $expensesFile, $expensesSelected, $expensesTextLabel)

	
	
	

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

	if (datepicker) {
		datepicker.oninput = function () {
			datepicker.value = datepicker.value.replace('to', '-')
		}
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
		$(this).parent().prev().prev().val($(this)[0].dataset.prop).trigger('change');
	});

	$(document).click(function (e) {
		if (!$(e.target).closest('.select').length) {
			$('.select__head').removeClass('open');
			$('.select__list').fadeOut();
		}
	});
	
	$('.btn__edit').click(function (event) {
		event.preventDefault()
		event.stopPropagation()
		let popup_id = $('#' + $(this).attr("rel"))
		console.log(popup_id)
		$(popup_id).addClass('active')
		$('html, body').addClass('_over-hidden')
		$('.modal-overlay').addClass('active')
		$('.modal__close, .modal-overlay').click(() => {
			$('.modal, .modal-overlay').removeClass('active')
			$('html, body').removeClass('_over-hidden')
		})
	})
	
	$('#formForExpenses').on('submit', function (e) {
		e.preventDefault()
	})



	
	



	// monthpicker
	var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	
	const currentDate = new Date()

	
	$('.mrp-lowerMonth').text(`${currentDate.toLocaleString('eng', { month: 'short' })} ${currentDate.getFullYear()}`)
	$('.mrp-upperMonth').text(`${currentDate.toLocaleString('eng', { month: 'short' })} ${currentDate.getFullYear() + 1}`)
	
	let startMonth,
		startYear,
		endMonth,
		endYear,
		fiscalMonth,
		startDate,
		endDate,
		content,
		calendarCount,
		$month,
		fm,
		cm,
		efm,
		cDate

	$(function () {
		startMonth = currentDate.getMonth() + 1;
		startYear = currentDate.getFullYear();
		endMonth = currentDate.getMonth() + 1;
		endYear = currentDate.getFullYear() + 1;
		fiscalMonth = 7;
		if(startMonth < 10)
			startDate = parseInt("" + startYear + '0' + startMonth + "");
		else
			startDate = parseInt("" + startYear  + startMonth + "");
		if(endMonth < 10)
			endDate = parseInt("" + endYear + '0' + endMonth + "");
		else
			endDate = parseInt("" + endYear + endMonth + "");

		content = '<div class="row mpr-calendarholder">';
		calendarCount = endYear - startYear;
		if(calendarCount == 0)
			calendarCount++;
		var d = new Date();
		for(let y = 0; y < 2; y++){
			content += '<div class="col-xs-6" ><div class="mpr-calendar row" id="mpr-calendar-' + (y+1) + '">'
				+ '<h5 class="col-xs-12"><i class="mpr-yeardown fa fa-chevron-circle-left"></i><span>' + (startYear + y).toString() + '</span><i class="mpr-yearup fa fa-chevron-circle-right"></i></h5><div class="mpr-monthsContainer"><div class="mpr-MonthsWrapper">';
			for(let m = 0; m < 12; m++){
				var monthval;
				if((m+1) < 10)
					monthval = "0" + (m+1);
				else
					monthval = "" + (m+1);
				content += '<span data-month="' + monthval  + '" class="col-xs-3 mpr-month">' + MONTHS[m] + '</span>';
			}
			content += '</div></div></div></div>';
		}

		$(document).on('click','.mpr-month',function(e){
			e.stopPropagation();
			$month = $(this);
			var monthnum = $month.data('month');
			var year = $month.parents('.mpr-calendar').children('h5').children('span').html();

			if($month.parents('#mpr-calendar-1').length > 0){
				//Start Date
				startDate = parseInt("" + year + monthnum);
				if(startDate > endDate){

					if(year != parseInt(endDate/100))
						$('.mpr-calendar:last h5 span').html(year);
					endDate = startDate;
				}
			}else{
				//End Date
				endDate = parseInt("" + year + monthnum);
				if(startDate > endDate){
					if(year != parseInt(startDate/100))
						$('.mpr-calendar:first h5 span').html(year);
					startDate = endDate;
				}
			}

			paintMonths();
		});


		$(document).on('click','.mpr-yearup',function(e){
			e.stopPropagation();
			var year = parseInt($(this).prev().html());
			year++;
			$(this).prev().html(""+year);
			$(this).parents('.mpr-calendar').find('.mpr-MonthsWrapper').fadeOut(175,function(){
				paintMonths();
				$(this).parents('.mpr-calendar').find('.mpr-MonthsWrapper').fadeIn(175);
			});
		});

		$(document).on('click','.mpr-yeardown',function(e){
			e.stopPropagation();
			var year = parseInt($(this).next().html());
			year--;
			$(this).next().html(""+year);
			//paintMonths();
			$(this).parents('.mpr-calendar').find('.mpr-MonthsWrapper').fadeOut(175,function(){
				paintMonths();
				$(this).parents('.mpr-calendar').find('.mpr-MonthsWrapper').fadeIn(175);
			});
		});

		$(document).on('click','.mpr-ytd', function(e){
			e.stopPropagation();
			var d = new Date();
			startDate = parseInt(d.getFullYear() + "01");
			var month = d.getMonth() + 1;
			if(month < 9)
				month = "0" + month;
			endDate = parseInt("" + d.getFullYear() + month);
			$('.mpr-calendar').each(function(){
				var $cal = $(this);
				var year = $('h5 span',$cal).html(d.getFullYear());
			});
			$('.mpr-calendar').find('.mpr-MonthsWrapper').fadeOut(175,function(){
				paintMonths();
				$('.mpr-calendar').find('.mpr-MonthsWrapper').fadeIn(175);
			});
		});

		$(document).on('click','.mpr-prev-year', function(e){
			e.stopPropagation();
			var d = new Date();
			var year = d.getFullYear()-1;
			startDate = parseInt(year + "01");
			endDate = parseInt(year + "12");
			$('.mpr-calendar').each(function(){
				var $cal = $(this);
				$('h5 span',$cal).html(year);
			});
			$('.mpr-calendar').find('.mpr-MonthsWrapper').fadeOut(175,function(){
				paintMonths();
				$('.mpr-calendar').find('.mpr-MonthsWrapper').fadeIn(175);
			});
		});

		$(document).on('click','.mpr-fiscal-ytd', function(e){
			e.stopPropagation();
			var d = new Date();
			var year;
			if((d.getMonth()+1) < fiscalMonth)
				year = d.getFullYear() - 1;
			else
				year = d.getFullYear();
			if(fiscalMonth < 10)
				fm = "0" + fiscalMonth;
			else
				fm = fiscalMonth;
			if(d.getMonth()+1 < 10)
				cm = "0" + (d.getMonth()+1);
			else
				cm = (d.getMonth()+1);
			startDate = parseInt("" + year + fm);
			endDate = parseInt("" + d.getFullYear() + cm);
			$('.mpr-calendar').each(function(i){
				var $cal = $(this);
				if(i == 0)
					$('h5 span',$cal).html(year);
				else
					$('h5 span',$cal).html(d.getFullYear());
			});
			$('.mpr-calendar').find('.mpr-MonthsWrapper').fadeOut(175,function(){
				paintMonths();
				$('.mpr-calendar').find('.mpr-MonthsWrapper').fadeIn(175);
			});
		});

		$(document).on('click','.mpr-prev-fiscal', function(){
			var d = new Date();
			var year;
			if((d.getMonth()+1) < fiscalMonth)
				year = d.getFullYear() - 2;
			else
				year = d.getFullYear() - 1;
			if(fiscalMonth < 10)
				fm = "0" + fiscalMonth;
			else
				fm = fiscalMonth;
			if(fiscalMonth -1 < 10)
				efm = "0" + (fiscalMonth-1);
			else
				efm = (fiscalMonth-1);
			startDate = parseInt("" + year + fm);
			endDate = parseInt("" + (d.getFullYear() - 1) + efm);
			$('.mpr-calendar').each(function(i){
				var $cal = $(this);
				if(i == 0)
					$('h5 span',$cal).html(year);
				else
					$('h5 span',$cal).html(d.getFullYear()-1);
			});
			$('.mpr-calendar').find('.mpr-MonthsWrapper').fadeOut(175,function(){
				paintMonths();
				$('.mpr-calendar').find('.mpr-MonthsWrapper').fadeIn(175);
			});
		});

		var mprVisible = false;
		var mprpopover = $('.mrp-container').popover({
			container: "body",
			placement: "bottom",
			html: true,
			content: content
		}).on('show.bs.popover', function () {
			$('.popover').remove();
			var waiter = setInterval(function(){
				if($('.popover').length > 0){
					clearInterval(waiter);
					setViewToCurrentYears();
					paintMonths();
				}
			},50);
		}).on('shown.bs.popover', function(){
			mprVisible = true;
		}).on('hidden.bs.popover', function(){
			mprVisible = false;
		});

		$(document).on('click','.mpr-calendarholder',function(e){
			e.preventDefault();
			e.stopPropagation();
		});
		$(document).on("click",".mrp-container",function(e){
			if(mprVisible){
				e.preventDefault();
				e.stopPropagation();
				mprVisible = false;
			}
		});
		$(document).on("click",function(e){
			if(mprVisible){
				$('.mpr-calendarholder').parents('.popover').fadeOut(200,function(){
					$('.mpr-calendarholder').parents('.popover').remove();
					$('.mrp-container').trigger('click');
				});
				mprVisible = false;
			}
		});
	});

	function setViewToCurrentYears(){
		var startyear = parseInt(startDate / 100);
		var endyear = parseInt(endDate / 100);
		$('.mpr-calendar h5 span').eq(0).html(startyear);
		$('.mpr-calendar h5 span').eq(1).html(endyear);
	}

	function paintMonths(){
		$('.mpr-calendar').each(function(){
			var $cal = $(this);
			var year = $('h5 span',$cal).html();
			$('.mpr-month',$cal).each(function(i){
				if((i+1) > 9)
					cDate = parseInt("" + year + (i+1));
				else
					cDate = parseInt("" + year+ '0' + (i+1));
				if(cDate >= startDate && cDate <= endDate){
					$(this).addClass('mpr-selected');
				}else{
					$(this).removeClass('mpr-selected');
				}
			});
		});
		$('.mpr-calendar .mpr-month').css("background","");
		//Write Text
		var startyear = parseInt(startDate / 100);
		var startmonth = parseInt(safeRound((startDate / 100 - startyear)) * 100);
		var endyear = parseInt(endDate / 100);
		var endmonth = parseInt(safeRound((endDate / 100 - endyear)) * 100);
		$('.mrp-monthdisplay .mrp-lowerMonth').html(MONTHS[startmonth - 1] + " " + startyear);
		$('.mrp-monthdisplay .mrp-upperMonth').html(MONTHS[endmonth - 1] + " " + endyear);
		$('.mpr-lowerDate').val(startDate);
		$('.mpr-upperDate').val(endDate);
		if(startyear == parseInt($('.mpr-calendar:first h5 span').html()))
			$('.mpr-calendar:first .mpr-selected:first').css("background","#5971e9");
		if(endyear == parseInt($('.mpr-calendar:last h5 span').html()))
			$('.mpr-calendar:last .mpr-selected:last').css("background","#5971e9");
	}

	function safeRound(val){
		return Math.round(((val)+ 0.00001) * 100) / 100;
	}
	
	
	

})

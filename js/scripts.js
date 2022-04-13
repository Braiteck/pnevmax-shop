$(function(){
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 20,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		nav: true,
		dots: false
	})


	// Личный кабинет - заказы
    $('.lk_orders .order .head').click(function(e) {
    	e.preventDefault()

    	let parent = $(this).closest('.order')

    	if( parent.hasClass('active') ) {
			parent.removeClass('active')
			parent.find('.data').slideUp(300)
		} else {
			parent.addClass('active')
			parent.find('.data').slideDown(300)
		}
	})


	// Регистрация
	$('.form .type label').click(function() {
	    let content = $(this).data('content')

	    $('.form .type_content').hide()
	    $('.form .type_content' + content).fadeIn(300)
	})


	// Оформление заказа
	$('.checkout .form .links .next').click(function(e) {
		e.preventDefault()

	    let parent = $(this).closest('.block')

	    parent.hide().next().fadeIn(300)

	    if( $(this).hasClass('finish') ) {
	    	$('.checkout .form .submit').fadeIn(300)
	    }
	})

	$('.checkout .form .links .prev').click(function(e) {
		e.preventDefault()

	    let parent = $(this).closest('.block')

	    parent.hide().prev().fadeIn(300)
	    $('.checkout .form .submit').hide()
	})


	// Карточка товара
	$('.product_info .images .slider').owlCarousel({
		items: 1,
		margin: 0,
		loop: true,
		smartSpeed: 500,
		nav: true,
		dots: false
	})


	// Фильтр
	$('body').on('click', 'aside .filter .title', function(e) {
    	e.preventDefault()

    	if( $(window).width() < 1024 ){
    		if( $(this).hasClass('active') ) {
				$(this).removeClass('active').next().slideUp(300)
			} else {
				$(this).addClass('active').next().slideDown(300)
			}
    	}
	})


	$('body').on('click', '.filter .item .name', function(e) {
		e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')
			$(this).next().slideUp(300)
		} else {
			$(this).addClass('active')
			$(this).next().slideDown(300)
		}
	})


	$priceRange = $('.filter #price_range').ionRangeSlider({
        type     : 'double',
        min      : 0,
        max      : 500,
        from     : 150,
        to       : 180,
        step     : 1,
        onChange : function (data) {
            $('.filter .price_range input.ot').val( data.from )
            $('.filter .price_range input.do').val( data.to )
        }
    }).data("ionRangeSlider")

    $('.filter .price_range .input').keyup(function() {
        $priceRange.update({
            from : parseInt( $('.filter .price_range input.ot').val() ),
            to : parseInt( $('.filter .price_range input.do').val() )
        })
    })


    // Изменение вида отображения товаров в категории
	$('.products .view .grid_link').click(function(e){
	    e.preventDefault()

	    let parent = $(this).closest('.products')

	    $('.products .view > *').removeClass('active')
	    $(this).addClass('active')

	    parent.find('.list').addClass('flex')
	    parent.find('.list').removeClass('list')
	})

	$('.products .view .list_link').click(function(e){
	    e.preventDefault()

	    let parent = $(this).closest('.products')

	    $('.products .view > *').removeClass('active')
	    $(this).addClass('active')

	    parent.find('.flex').addClass('list')
	    parent.find('.flex').removeClass('flex')
	})


	if( $(window).width() < 768 ) {
		$('.products .list').addClass('flex')
	    $('.products .list').removeClass('list')
	}



	// Отзывы
	$('.reviews .slider').owlCarousel({
		nav: true,
		dots: false,
		loop: false,
		smartSpeed: 500,
		responsive: {
	        0:{
	            items: 1,
				margin: 15
	        },
	        414:{
	            items: 2,
				margin: 15
	        },
	        768:{
	            items: 3,
				margin: 20
	        },
	        1200:{
	            items: 4,
				margin: 20
	        }
		}
	})
})



$(window).load(function(){
	// Выравнивание в товарах
	$('.products .flex').each(function(){
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(function(){
	// Выравнивание в товарах
	$('.products .flex').each(function(){
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Изменение вида отображения товаров в категории
	if( $(window).width() < 768 ) {
		$('.products .list').addClass('flex back_list')
	    $('.products .list').removeClass('list')
	} else {
		$('.products .back_list').addClass('list')
	    $('.products .back_list').removeClass('flex back_list')
	}
})



// Выравнивание в товарах
function productHeight(context, step){
	let start = 0
	let finish = step
	let products = context.find('.product')

	products.find('.head').height('auto')
	products.find('.front').height('auto')
	products.find('.back').height('auto')

	for( let i = 0; i < products.length; i++ ){
		let obj = products.slice(start, finish).find('.head')
		let obj2 = products.slice(start, finish).find('.front').add(products.slice(start, finish).find('.back'))

		setHeight( obj )
		setHeight( obj2 )

		start = start+step
		finish = finish+step
	}
}
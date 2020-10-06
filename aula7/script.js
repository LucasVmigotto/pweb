
$(".menu").css("width", "250px")
$('#menu-2').slideUp(1000)
$('#menu-3').slideUp(1000)
$('#menu-4').slideUp(1000)

$('#cont-2').toggle()
$('#cont-3').toggle()

$('#opc-1').mouseenter(() => {
	$('#menu-2').slideDown(1000)
})
$('#opc-1').mouseleave(() => {
	$('#menu-2').slideUp(1000)
})
$('#opc-2').mouseenter(() => {
	$('#menu-3').slideDown(1000)
})
$('#opc-2').mouseleave(() => {
	$('#menu-3').slideUp(1000)
})
$('#opc-3').mouseenter(() => {
	$('#menu-4').slideDown(1000)
})
$('#opc-3').mouseleave(() => {
	$('#menu-4').slideUp(1000)
})

$('#nav-1').on('click', e => {
	e.preventDefault()
	$('#nav-1').addClass('active')
	$('#nav-2').removeClass('active')
	$('#nav-3').removeClass('active')
	$('#cont-1').show(1000)
	$('#cont-2').hide(1000)
	$('#cont-3').hide(1000)
})
$('#nav-2').on('click', e => {
	e.preventDefault()
	$('#nav-2').addClass('active')
	$('#nav-1').removeClass('active')
	$('#nav-3').removeClass('active')
	$('#cont-2').show(1000)
	$('#cont-1').hide(1000)
	$('#cont-3').hide(1000)
})
$('#nav-3').on('click', e => {
	e.preventDefault()
	$('#nav-3').addClass('active')
	$('#nav-1').removeClass('active')
	$('#nav-2').removeClass('active')
	$('#cont-3').show(1000)
	$('#cont-1').hide(1000)
	$('#cont-2').hide(1000)
})
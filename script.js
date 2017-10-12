$(document).ready(function(){
	$("#start").css({display: "none"});
	var gameStarted = false;
	var firstCardDivId = "";
	var firstCardName = "";
	var firstCardFlipped = false;
	var secondCardDivId = "";
	var secondCardName = "";
	var secondCardFlipped = false;
	var flippedCards = 0;

	var images =
  ["img/ferro.jpg", "img/ferro.jpg", "img/flash.jpg",
   "img/flash.jpg", "img/aranha.jpg", "img/aranha.jpg",
	 "img/homem.jpg", "img/homem.jpg", "img/thor.jpg",
   "img/thor.jpg", "img/morcego.jpg", "img/morcego.jpg",
	 "img/maravilha.jpg", "img/maravilha.jpg", "img/viuva.jpg",
   "img/viuva.jpg"];

	shuffler(images);
	$(".btn").click(startGame);
	$("#tabuleiro").css({display: "none"});
	for (var i = 0; i < images.length; i++)
		$("#tabuleiro").append(`<div id="card${i}" data-name="${images[i]}">
									<div class="front">
										<img src="${images[i]}">
									</div>
									<div class="back">
										<img src="img/vs.jpg">
									 </div>
								</div>`);
	$("#tabuleiro").children('div').each(function() {
		$(this).flip({axis: 'y'});
		$(this).css("pointer-events", "none");
	});
    function startGame()
    {
    	$("#tabuleiro").css({display: "flex"});
    	setTimeout(function() {
    		$("#tabuleiro").children('div').each(function() {
			$(this).css("pointer-events", "auto");
			});
    	}, 6000);

		//---------- FIGURAS DE INICIO ----------
		setTimeout(function() {
			$("#tabuleiro").children('div').each(function() {
				$(this).flip('toggle');});
    		}, 2000);
		setTimeout(function() {
    		$("#start").css({display: "flex"});
    		$("#start").addClass("animated fadeInUp");
		}, 3000);
		setTimeout(function() {
			$("#start").addClass("animated fadeOut");
			setTimeout(function() {
				$("#start").css({display: "none"});
			}, 1000);
		}, 4500);
		setTimeout(function() {
			$("#tabuleiro").children('div').each(function() {
				$(this).on('flip:done', function() {
		//---------- AO VIRAR CARTAS ----------
					if( !($($(this)[0].firstElementChild).css("z-index") == 0) )
					{
						if (!firstCardFlipped)
						{
	 //---------- RELACIONADO AO VIRAR PRIMEIRA CARTA ----------
							firstCardFlipped = true;
							firstCardName = $(this).attr("data-name");
							firstCardDivId = $(this).attr("id");
							$(`#${firstCardDivId}`).css("pointer-events", "none");
						}
						else
						{
	 //---------- RELACIONADO AO VIRAR SEGUNDA CARTA ----------
							secondCardFlipped = true;
							secondCardName = $(this).attr("data-name");
							secondCardDivId = $(this).attr("id");
							if (firstCardName === secondCardName)
							{
								firstCardFlipped = false;
								secondCardFlipped = false;
								firstCardName = "";
								secondCardName = "";
								$(`#${secondCardDivId}`).css("pointer-events", "none");
								firstCardDivId = "";
								secondCardDivId = "";
								flippedCards += 2;
								console.log(flippedCards);
								if (flippedCards === 16)
								{
									alert("PARABÉNS, VOCÊ GANHOU!");
									location.reload(true);
								}
							}
							else
							{
								firstCardFlipped = false;
								secondCardFlipped = false;
								firstCardName = "";
								secondCardName = "";
								$(`#${firstCardDivId}`).css("pointer-events", "auto");
								$(`#${firstCardDivId}, #${secondCardDivId}`).each(function() {
									$(this).flip('false');
								});
								firstCardDivId = "";
								secondCardDivId = "";
							}
						}
					}
				});
			});
		}, 3000);
	}
	function shuffler(arr)
	{
        for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
        return arr;
    }
});

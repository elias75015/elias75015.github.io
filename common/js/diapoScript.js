// on charge le contenu du menu de gauche
$('#diapoMenu').load('./../menuDiapo.html', function () {
    $('#dl-menu').dlmenu({
        animationClasses: {
            classin: 'dl-animate-in-4',
            classout: 'dl-animate-out-4'
        }
    });
    // fix pour que l'image du diaporama se redimensionne
    // bien en hauteur lorsque le menu de gauche se replie
    $("button.dl-trigger").click(function () {
        $("div.ps-current").css('height', '100%');
    });

    // bug - on ouvre et on referme le menu au chargement de la page diapo
    $('button.dl-trigger').click();
    $('button.dl-trigger').click();
});
// Une fois le document chargé
$(document).ready(function () {
    // 1 - on initialise le diaporama
    $('.pgwSlider').pgwSlider({
        displayList: false,
        transitionEffect: "sliding",
        adaptiveHeight: true,
        displayControls: true,
        autoSlide: false
    });

    // 2 - surcharge pour déclencher clic next/previous au clic sur la partie droite ou gauche de l'image
    $("li > img").click(function (e) {
        let center = $(this).width() / 2;
        if (e.offsetX > center) {
            $(".ps-next").click();
        } else {
            $(".ps-prev").click();
        }
    });

});

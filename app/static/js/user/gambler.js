(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(sellAsset);
  });

  function sellAsset(){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).children('.name').text(),
        type  = 'delete',
        url   = '/gamblers/' + id + '/assets/' + asset;

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $gambler = $('.gambler[data-gambler-id='+data.id+']');
      $gambler.find('.money').text('$' + data.money.toFixed(2));
      var $asset = $gambler.find('.info').children('.name:contains('+data.name+')').closest('.asset');
      $asset.fadeOut();
      setTimeout(function(){$asset.remove();}, 2000);

      if(data.isDivorced){
        var $spouse = $gambler.find('.spouse');
        $spouse.fadeOut();
        setTimeout(function(){$spouse.remove();}, 2000);
      }
    }});
  }
})();

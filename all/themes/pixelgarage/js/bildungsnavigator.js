(function ($) {
  $(document).ready(function() {
    var fnResize = function() {
      var wrapp = $('#bildungsnavigator_wrapper');
      var w = wrapp.width();
      var o_w = 940;
      var o_h = 573;
      var h = o_h * (w / o_w);
      wrapp.find('img').mapster('resize', w, h,0);
    }
    Drupal.current_course_key = false;

    $('#bildungsnavigator_witercho').on('click', function() {
      $(this).hide();
    });

    $('a.witercho_link').on('click', function() {
      // show bildungsweg
      var _s = $(this),
          key = _s.attr('data-key');
      show_witercho(key);
      // hide popup
      _s.parents('#bildungsnavigator_witercho').hide();
      return false;
    });

    $('.witercho_breadcrumb a:first').on('click', function() {
      // NOT USED ANYMORE
      $(this).nextAll().remove();
      Drupal.current_course_key = false;
      //$('.view.view-segment-selector').css({visibility: 'visible'});
      $('#bildungsnavigator_witercho_details').hide();
    });

    $('#bildungsnavigator_wrapper img').mapster({
      mapKey: 'data-key',
      mapScale: true,
      showToolTip: true,
      areas: [ {
        key: 'all',
        toolTip: true
      }],
      isSelectable: false,
      onConfigured: function() {
        // this: mapster bound image
        $(window).resize(fnResize);
        fnResize();
      },
      onClick: function(data) {
        //this = area element clicked
        //data = {e: jQuery eventObject, listTarget: $(item) from boundList, key: mapKey for this area,  selected: true | false};
        if (Drupal.bildungsnavigator_items[data.key]) {
          // reset selected bildungsweg, if any and hide tooltip
          $('#map_tooltip').hide();
          $('.view-segment-selector .views-row a[rel*="all"]').click();

          var _c = Drupal.bildungsnavigator_items[data.key],
              $witercho = $('#bildungsnavigator_witercho');

          $witercho.find('.course_item').removeClass().addClass('course_item tid_' + _c.segment_id);
          $witercho.find('.title').html(_c.title);
          $witercho.find('.description').html(_c.description);
          $witercho.find('.witercho_link').attr('data-key', data.key);
          $witercho.find('.details_link').attr('href', _c.link);
          $witercho.show();
        }
        return false;
      },
      render_highlight: {
        fillOpacity: 0.3,
        fillColor: 'FFFFFF'
      },
      render_select: {
        fillOpacity: 0.6,
        fillColor: 'FFFFFF'
      },
      toolTipContainer: '<div id="map_tooltip" style="border: 1px solid #f3f3f2; margin: 4px;"></div>',
      onShowToolTip: function(data) {
        // this = area element bound to the tooltip
        // data = { toolTip: jQuery object of the tooltip container,
        //          areaOptions: { area_options },
        //          key: map key for this area,
        //          selected: true | false - current state of the area};
        var r_w = $('#bildungsnavigator_wrapper img').width();
        var _coords = $(this).attr('coords').split(',');
        for (var i = 0; i < _coords.length; i++) {
          _coords[i] = parseInt(_coords[i], 10) * (1300 / r_w);
        }
        var _img = $('#bildungsnavigator_tooltip img').clone();
        _img.css({
          position: 'absolute',
          top: -(_coords[1]),
          left: -(_coords[0])
        });
        data.toolTip.css({
          width: _coords[2] - _coords[0],
          height: _coords[3] - _coords[1],
          overflow: 'hidden'
        }).empty().append(_img);
      }
    });

    $('#bildungs_map area').on('mousemove', function(e) {
      $('#map_tooltip').css({
        top: e.pageY + 10,
        left: e.pageX + 10
      });
    });

    var _segments = ['segment_1', 'segment_2', 'segment_3', 'segment_4', 'segment_107'];
    var _current_segment = $.inArray(location.hash.substr(1), _segments) ? location.hash.substr(1) : 'all';

    $('.view-segment-selector .views-row a').on('click', function() {
      $('#bildungsnavigator_pin').hide();
      $('.view-segment-selector .views-row a').removeClass('active');
      var _group = $(this).addClass('active').attr('rel');
      var _bild_wrapper = $('#bildungsnavigator_wrapper img');
      _bild_wrapper.mapster('set', false, Drupal.bildungsnavigator_items_ids.join(','));
      if (_group != 'all') {
        $.each(_segments, function(index, value) {
          if (value != _group) {
            _bild_wrapper.mapster('set', true, Drupal.bildungsnavigator_items_ids_by_segment[value].join(','));
          }
        });
      }
    }).filter('[rel=' + _current_segment + ']').click();

  });  // document ready


  var show_witercho = function(key) {
    if (Drupal.bildungsnavigator_items[key] && Drupal.current_course_key != key) {
      var _c = Drupal.bildungsnavigator_items[key];
      var _bild_wrapper = $('#bildungsnavigator_wrapper img');
      _bild_wrapper.mapster('set', true, Drupal.bildungsnavigator_items_ids.join(','));
      var _pp = _c.related_ids;
      _pp.push(key);
      _bild_wrapper.mapster('set', false, _pp.join(','));
      var current_area = $('#bildungs_map area[data-key^="' + key + ',"]');
      var _coords = current_area.attr('coords').split(',');
      for (var i = 0; i < _coords.length; i++) {
        _coords[i] = parseInt(_coords[i], 10);
      }
      var _pin = $('#bildungsnavigator_pin');
      _pin.css({
        left: _coords[0] + ((_coords[2] - _coords[0] - _pin.width()) / 2),
        top: _coords[1] + ((_coords[3] - _coords[1] - _pin.height()) / 2),
      }).show();
      return;
      Drupal.current_course_key = key;
      var _w = $('#bildungsnavigator_witercho_details');
      _w.find('.witercho_breadcrumb').append(' <span>&gt;</span> <a href="javascript:void(0);" class="witercho_link" data-key="' + key + '">' + _c.title + '</a>');
      _w.find('h2').html(_c.title);
      _w.find('.details').html(_c.description);
      _w.find('.links').html(_c.links);
      _w.find('.course_item').removeClass('tid_1').removeClass('tid_2').removeClass('tid_3').removeClass('tid_4').addClass('tid_' + _c.segment_id);
      var _wr = _w.find('#witercho_related').empty();
      if (_c.related_ids.length > 0) {
        var _ul = $('<ul>');
        $.each(_c.related_ids, function(index, value) {
          var _cc = Drupal.bildungsnavigator_items[value];
          if (_cc) {
            _ul.append('<li><div class="course_item tid_' + _cc.segment_id + '"><h2>' + _cc.title + '</h2><p>' + _cc.description + '</p><a class="witercho_link" data-key="' + value + '" href="javascript:void(0);">Witercho</a></div></li>');
          }
        });
        _wr.append(_ul);
      }
      if (_c.related_ids.length <= 2) {
        _wr.css({ paddingTop: 0, paddingBottom: 0 });
        _wr.find('>ul').css({ paddingTop: 0 });
      } else {
        _wr.css({ paddingTop: 45, paddingBottom: 45 });
        _wr.find('>ul').css({ paddingTop: 45 });
        _wr.append('<a class="related_browse up" href="javascript:void(0);" /><a class="related_browse down" href="javascript:void(0);" />');
        _wr.find('.related_browse').click(function() {
          var _s = $(this);
          var _d = _s.hasClass('up') ? 310 : -310;
          var _ul = _s.parent().find('>ul');
          var _currentTop = parseInt(_ul.css('top'), 10);
          var _h = _ul.height();
          if ((_d > 0 && _currentTop < 0) || (_d < 0 && _h + _currentTop + _d + _d > 0)) {
            _ul.css({ top: _currentTop + _d });
          }
        });
      }
      _w.show();
    }
  }  // show witercho function

})(jQuery);

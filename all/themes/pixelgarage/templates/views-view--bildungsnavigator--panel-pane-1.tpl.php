<?php
	drupal_add_js(drupal_get_path('theme', 'pixelgarage') .'/js/jquery.imagemapster.js', 'file');
	drupal_add_js(drupal_get_path('theme', 'pixelgarage') .'/js/bildungsnavigator.js', 'file');
	$items = array();
	$internal_ids = array();
	$segments_ids = array();
	foreach ($view->result as $n) {
		$item = new StdClass();
		$item->nid = $n->nid;
		$item->link = url('node/' . $n->nid);
		$item->title = $n->field_field_bn_title[0]['rendered']['#markup'];
		$item->description = !empty($n->field_field_bn_description) ? $n->field_field_bn_description[0]['rendered']['#markup'] : '';
		$item->related_ids = empty($n->field_field_bn_related_ids) ? array() : array_map('trim', explode(',', $n->field_field_bn_related_ids[0]['raw']['value']));
		$item->links = '';
		foreach($n->field_field_banner_links as $link) {
			$item->links .= render($link);
		}
		$item->segment_id = $n->field_field_segment[0]['raw']['tid'];
    $segment_key = 'segment_' . $item->segment_id;
    $intl_id = $n->field_field_internal_id[0]['raw']['value'];
    if ($intl_id) {
      if (!array_key_exists($segment_key, $segments_ids)) $segments_ids[$segment_key] = array();
      $segments_ids[$segment_key][] = $intl_id;
      $items[$intl_id] = $item;
      $internal_ids[] = $intl_id;

      // language special link to segment
      if ($intl_id == -50000) {
        $item->link = url('segments/sprachen');
      }
    }
	}
?>
<script type="text/javascript">
	Drupal.bildungsnavigator_items = <?php print json_encode($items); ?>;
	Drupal.bildungsnavigator_items_ids = <?php print json_encode($internal_ids); ?>;
	Drupal.bildungsnavigator_items_ids_by_segment = <?php print json_encode($segments_ids); ?>;
</script>
<div id="bildungsnavigator_main_wrapper">
	<div id="bildungsnavigator_wrapper">
		<img src="<?php print base_path(); ?>sites/all/themes/pixelgarage/images/bildungsnavigator_940.jpg" alt="" usemap="#bildungsmap" />
		<div id="bildungsnavigator_pin"></div>
	</div>
	<div id="bildungsnavigator_tooltip" style="display: none;">
		<img src="<?php print base_path(); ?>sites/all/themes/pixelgarage/images/bildungsnavigator.jpg" alt="" />
	</div>
	<div id="bildungsnavigator_witercho">
    <div class="course_item">
      <h2 class="title"></h2>
      <p class="description"></p>
      <div class="links">
        <a class="witercho_link" href="javascript:void(0);">Aufstieg</a>
        <a class="details_link" href="javascript:void(0);">Details</a>
      </div>
    </div>
  </div>
	<div id="bildungsnavigator_witercho_details" class="clearfix">
		<div id="witercho_related"></div>
		<div id="witercho_details">
			<div class="witercho_breadcrumb">
				<a class="first"> href="javascript:void(0);">Bildungsnavigator</a>
        <a class="last">Details</a>
			</div>
			<div class="legend">
				Mit ihrem einmaligen, durchgehend aufeinander abgestimmten Programm macht die HSO den Bildungsweg frei,
				von der kaufm&#228;nnischen Grundbildung bis zum betriebswirtschaftlichen Doktorat.
			</div>
			<div class="legend2">Ihr gew&#228;hlter Lehrgang</div>
			<div class="course_item">
				<h2></h2>
				<p class="details"></p>
				<div class="links"></div>
			</div>
		</div>
	</div>
</div>
<map id="bildungs_map" name="bildungsmap">
	<area href="#" shape="rect" alt="" title="EMBA"     coords="0,0,960,51"      data-key="-40001,all,segment_4" />
	<area href="#" shape="rect" alt="" title="FH"       coords="0,69,105,396"    data-key="-30016,all,segment_3" />
	<area href="#" shape="rect" alt="" title="HFW"      coords="106,127,208,250" data-key="176,all,segment_3" />
  <area href="#" shape="rect" alt="" title="HWD"      coords="106,246,208,396" data-key="162,all,segment_3" />
	<area href="#" shape="rect" alt="" title="NDS-BWL"  coords="208,127,363,214" data-key="184,all,segment_3" />
  <area href="#" shape="rect" alt="" title="NDS-MVL"  coords="363,127,520,214" data-key="-100000,all,segment_3" />
	<area href="#" shape="rect" alt="" title="ML"       coords="521,127,675,214" data-key="-30013,all,segment_3" />
	<area href="#" shape="rect" alt="" title="VL"       coords="676,127,832,214" data-key="-30012,all,segment_3" />
  <area href="#" shape="rect" alt="" title="FF"       coords="208,247,312,320" data-key="-30010,all,segment_3" />
  <area href="#" shape="rect" alt="" title="LES"      coords="208,321,312,393" data-key="-30009,all,segment_3" />
	<area href="#" shape="rect" alt="" title="TK"       coords="313,247,415,393" data-key="-30008,all,segment_3" />
  <area href="#" shape="rect" alt="" title="HR"       coords="416,247,520,320" data-key="-30007,all,segment_3" />
  <area href="#" shape="rect" alt="" title="SB-HR"    coords="415,321,520,393" data-key="-30006,all,segment_3" />
  <area href="#" shape="rect" alt="" title="MF"       coords="521,247,623,320" data-key="-30005,all,segment_3" />
  <area href="#" shape="rect" alt="" title="VF"       coords="625,247,728,320" data-key="-30004,all,segment_3" />
  <area href="#" shape="rect" alt="" title="MARKOM"   coords="521,321,728,393" data-key="-30003,all,segment_3" />
  <area href="#" shape="rect" alt="" title="AU"       coords="729,247,832,320" data-key="-30002,all,segment_3" />
  <area href="#" shape="rect" alt="" title="SVEB"     coords="729,321,832,393" data-key="-30001,all,segment_3" />
  <area href="#" shape="rect" alt="" title="SPR"      coords="838,128,940,570" data-key="-50000,all,segment_107" />
  <area href="#" shape="rect" alt="" title="HD-HS"    coords="0,412,235,492"   data-key="-20002,all,segment_2" />
  <area href="#" shape="rect" alt="" title="BFD"      coords="0,493,235,570"   data-key="-20001,all,segment_2" />
	<area href="#" shape="rect" alt="" title="ECDL"     coords="236,412,363,570" data-key="166,all,segment_2" />
	<area href="#" shape="rect" alt="" title="LU"       coords="365,412,469,570" data-key="-100000,all,segment_2" />
  <area href="#" shape="rect" alt="" title="KV"       coords="470,412,832,464" data-key="-10003,all,segment_1" />
  <area href="#" shape="rect" alt="" title="HD-KV"    coords="470,465,832,517" data-key="-10002,all,segment_1" />
  <area href="#" shape="rect" alt="" title="BFD-KV"   coords="470,518,832,570" data-key="-10001,all,segment_1" />
</map>

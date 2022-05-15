<script>
	
	import { onMount } from 'svelte';
  	import {map, currentBaseLayer} from './store'
  	import L from 'leaflet';
	let idmap = "id_map";
   	onMount(() => {
		
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/leaflet@1.8.0/dist/leaflet.css';
		link.onload = () => {
          map.set(L.map('id_map', { zoomControl: false }).setView({lon: -55, lat: -15}, 4));
          $currentBaseLayer.addTo($map);
          // show the scale bar on the lower left corner
          L.control.scale({imperial: false, metric: true}).addTo($map);
          //show a marker on the map
         // L.marker({lon: -43, lat: -19}).bindPopup('The center of the world').addTo($map);
		  
        };
		document.head.appendChild(link);	        	
	});
</script>
<div  id="id_map" class="mapol"></div>
<style>
  	.mapol { position: fixed; width: 100%; height: 100% ; border: px solid #cccccc; z-index: 0; }
</style>
import { writable } from 'svelte/store';
import { osmTileLayer } from './components/base_tile_layer/baseTiles'
export let currentBaseLayer = writable(osmTileLayer);
export let map = writable(null);
export let selectedLayers = writable([]);
<script>
 import {selectedLayers}  from './../../store'
 import SelectedLayer from './SelectedLayer.svelte'
    
</script>

{#each $selectedLayers as layer}
    <SelectedLayer layer={layer}></SelectedLayer>
{/each}    
<style>
	
</style>
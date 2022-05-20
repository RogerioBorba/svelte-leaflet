<script>
    import {map } from '../../store'
    import L from 'leaflet'
    import leafletWMS from 'leaflet.wms'
    import { selectedLayers } from './../../store'
    export let wmsLayer;
    export let capabilitiesUrl;
    let source = null;
    let sourceLayer = null;
    let display = ''
    var CustomLeafletWMSSource = leafletWMS.Source.extend({
        'getFeatureInfo': function(point, latlng, layers, callback) {
        // Request WMS GetFeatureInfo and call callback with results
        // (split from identify() to faciliate use outside of map events)
        var params = this.getFeatureInfoParams(point, layers),
            url = this._url + L.Util.getParamString(params, this._url);
        this.showWaiting();
        this.ajax(url, done);
        function featureInfo(result){
            let texts = result.split(/\r?\n/)
            return texts.map(a_text => `${a_text}<br> `)
        }
        function done(result) {
            this.hideWaiting();
            var text = this.parseFeatureInfo(result, url);
            callback.call(this, latlng, text);
        }
    }
    });
        
    function btnClearClicked() {
        alert("remover")
        sourceLayer.remove()
    }
    
    function btnAddLayerClicked() {
        let size = capabilitiesUrl.indexOf('?') 
        if (size == -1)
            size = capabilitiesUrl.length
        let url = capabilitiesUrl.substring(0, size)
        source = new CustomLeafletWMSSource(url, {'transparent': true, 'format': 'image/png'}); 
        sourceLayer = source.getLayer(wmsLayer.name())
        sourceLayer.addTo($map)
        wmsLayer.sourceLayer = sourceLayer
        $selectedLayers = [...$selectedLayers, wmsLayer]
        display='hidden'
    }
    
       
</script>
<div class="flex mt-1 relative {display} text-gray-700">
    <p class="flex-grow text-grey-darkest hover:bg-red truncate text-left text-xs" title="{wmsLayer.title()}">{wmsLayer.title()}</p>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnClearClicked} title="Funcionalidades e atributos">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </button>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnAddLayerClicked} title="Adicionar camada">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" viewBox="0 0 24 24" fill="gray">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
        </svg>
        
    </button>
        
</div>


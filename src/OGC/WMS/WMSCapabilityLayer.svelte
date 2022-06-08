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
        
    async function btnMetadadoClicked() {
        if (!wmsLayer.metadataURL())
            return alert("A camada não está associada a metadados.")
        let link = wmsLayer.metadataURL().link()
        console.log(link)
        const res = await fetch(link);
        if (!res.ok) 
		    throw new Error('Falha na requisição do endereço.')
        const text = await res.text()
        console.log(text)
        
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
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnMetadadoClicked} title="Metadados">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
    </button>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnAddLayerClicked} title="Adicionar camada">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" viewBox="0 0 24 24" fill="gray">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
        </svg>
        
    </button>
        
</div>


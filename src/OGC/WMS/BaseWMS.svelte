<script>
    import { onMount } from 'svelte';
    import {WMSLayer} from './WMSLayer';
    import {xml2json} from './../xml2Json.js'
    import WMSCapabilityLayer from './WMSCapabilityLayer.svelte'
    import WMSCapabilities from './WMSCapabilities'
    let arr_name_url = []
    let promise = null
    let selected = { id: 1, text: "Selecione um", iri: '' }
	let iriArray = [
        selected,
		{ id: 2, text: "IBGE", iri: 'https://geoservicos.ibge.gov.br/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities' },
		{ id: 3, text: "Base vetorial do OpenStreetMap de 2017", iri: 'http://127.0.0.1:8000/eco-edif-agropec-ext-vegetal-pesca-p-list'},
		
	];
    let wmsLayers = []
	let answer = '';
    function dataFromEntryPointGet(name_and_url_json_obj) {
        return Object.entries(name_and_url_json_obj).forEach((entry) => {
            const [key, value] = entry;
       });
    }
        
    async function fetchListWMSLayer() {
        const res = await fetch(selected.iri);
        if (!res.ok) 
		    throw new Error('Falha na requisição do endereço.')
		
        const parser = new DOMParser();
        let xml = parser.parseFromString(await res.text(), "application/xml");
        const xmlObject = xml2json(xml)
        let wms_capabilities =  new WMSCapabilities(xmlObject)
        let layers = await wms_capabilities.layerObjects()
        wmsLayers = layers.map(layer => new WMSLayer(layer))
        return 1
    }

    async function btnSearchClicked() {
        if(!selected.iri) {
            let msg = "Escolha o endereço (URL) ou informe um WMS Capabilities de uma instituição."
            console.log(msg)
            alert(msg)
            return 
        }    
        promise = fetchListWMSLayer()        
    }

    function btnClearClicked() {
        selected = selected = { id: 1, text: "Selecione um", iri: '' }
        promise = 1
        wmsLayers = []
    }

	function handleSubmit() {
		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	}

    function onChange(value) {
        console.log(value)
        console.log(selected)
    }

    onMount(async () => {
        try {
            const res = await fetch('https://inde.gov.br/api/catalogo/get');
		let j = await res.json();
        console.log(j)    
        } catch (error) {
            alert(error.message)
        }
		
	});
</script>

<div class="pt-4 pb-2 text-lg text-justify font-sans md:font-serif">URLs de Entrada</div>
<p class="text-justify text-blue-600 text-xs">Catálogos de serviços mais utilizados</p>
<form class="relative" on:submit|preventDefault={handleSubmit}>
	<select class="border-b-2 shadow-2xl w-full bg-gray-100 border-blue-500 focus:outline-none" bind:value={selected} on:change={onChange}>
		{#each iriArray as iri}
			<option value={iri}>
				{iri.text}
			</option>
		{/each}
	</select>
    
    <div class="flex mt-4 relative text-gray-700">
        <input class="w-full h-8 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus: outline-none" type="text" bind:value={selected.iri} title={selected.iri}>
        
        <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-100" on:click|preventDefault={btnSearchClicked} title="Buscar camadas">
            <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="16" height="16" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
        </button>
        
        <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-100" on:click|preventDefault={btnClearClicked} title="Limpar camadas">
            <svg style="width:16px;height:16px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
            </svg>
            
        </button>
        
      </div>
      
      {#await promise}
        <p class = "text-xl text-center text-blue-600 animate-pulse">...aguarde</p>
      {:then layers}
        {#each wmsLayers as layer}
            <WMSCapabilityLayer wmsLayerCapability={layer} capabilitiesUrl= {selected.iri}></WMSCapabilityLayer>
        {/each}    
        {:catch error}
        <p style="color: red">{error.message}</p>
       {/await} 
</form>

<style>
	
</style>
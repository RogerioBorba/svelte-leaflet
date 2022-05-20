<script>
    import { selectedLayers } from './../../store'
    export let layer;
  
    function btnClearClicked() {
        $selectedLayers = $selectedLayers.filter(t => t.oid !== layer.oid)
        layer.remove()
    }
    
    function btnAddLayerClicked() {
    }
    
       
</script>
<div class="flex mt-1 relative text-gray-700">
    <p class="flex-grow text-grey-darkest hover:bg-red truncate text-left text-xs" title="{layer.title()}">{layer.title()}</p>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnClearClicked} title="Remover camada">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
    </button>
    <button class="focus:outline-none bg-grey-light hover:bg-grey text-grey-darkest font-bold py-1 px-1 rounded inline-flex items-center hover:bg-gray-200" on:click|preventDefault={btnAddLayerClicked} title="Adicionar camada">
        <svg xmlns="http://www.w3.org/2000/svg" style="width:16px;height:16px" viewBox="0 0 24 24" fill="gray">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
        </svg>
        
    </button>
        
</div>


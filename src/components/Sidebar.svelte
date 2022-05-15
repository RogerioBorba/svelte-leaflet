<script>
    let width = 'w-1/4'
    let displayOpenNav = 'hidden'
    
    function closeNav() {
        width = 'w-0'
        displayOpenNav = 'block'
    }
    function openNav() {
        width = 'w-1/4'
        displayOpenNav = 'hidden'
    }

</script>

<div class = "relative">
    <div class="ml-2 text-2xl text-left cursor-pointer {displayOpenNav} "  on:click={openNav} >{@html '&#9776;'}</div>    
    <div class=" bg-white border-gray-300 border-2 h-full {width} fixed z-10 top-0 left-0 overflow-x-hidden pt-10">
        <span class="text-2xl cursor-pointer ml-auto text-right top-0 right-2 absolute" on:click={closeNav}>{@html '&times;'}</span>
        <slot>
        </slot>
    </div>
    
</div>
<style style lang="postcss">
</style>
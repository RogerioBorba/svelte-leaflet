export class Layer {
    constructor(sourceLayer, layerCapability) {
        this.sourceLayer = sourceLayer
        this.layerCapability = layerCapability
        this.oid = Date.now()
    }
 
    remove() {
        this.sourceLayer.remove()
    }
 
    title() {
        return this.layerCapability.title()
    }
    
    
}
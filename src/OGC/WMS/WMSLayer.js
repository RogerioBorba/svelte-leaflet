function nodeValue(node) {
    return node['#text'] || node['#cdata-section']
}
class MetadataURL {
    constructor(metadataObject) {
        this.metadataObject = metadataObject
    }
    
    type() {
        return this.metadataObject['@attributes']['type']
    }

    contentType() {
        return nodeValue(this.metadataObject['Format'])
    }

    link() {
        return this.metadataObject['OnlineResource']['@attributes']['xlink:href']
    }

    linkType() {
        return this.metadataObject['OnlineResource']['@attributes']['xlink:type']
    }

}

class EXGeographicBoundingBox{
    constructor(exGeographicBoundingBoxObject) {
        this.exGeographicBoundingBoxObject = exGeographicBoundingBoxObject
    }

    westBoundLongitude() {
        return parseFloat(nodeValue(this.exGeographicBoundingBoxObject['westBoundLongitude']))
    }

    eastBoundLongitude() {
        return parseFloat(nodeValue(this.exGeographicBoundingBoxObject['eastBoundLongitude']))
    }
    
    southBoundLatitude() {
        return parseFloat(nodeValue(this.exGeographicBoundingBoxObject['southBoundLatitude']))
    }

    northBoundLatitude() {
        return parseFloat(nodeValue(this.exGeographicBoundingBoxObject['northBoundLatitude']))
    }
}
class Style {
    constructor(styleObject) {
        this.styleObject = styleObject
    }
    
    objCapability(propertyName) {
        let obj = this.styleObject[propertyName]
        const isEmpty = Object.keys(obj).length === 0;
        if (isEmpty)
            return ''
        return obj['#text']
    }

    name() {
        return this.objCapability('Name')
    }

    title() {
        return this.objCapability('Title')
    }

    abstract() {
        return this.objCapability('Abstract')
    }

    legendGraphic() {
        return new LegendGraphic(this.styleObject['LegendURL'])
    }
}


class LegendGraphic {
    constructor(legendGraphicObject) {
        this.legendGraphicObject = legendGraphicObject
    }

    width() {
        return parseInt(this.legendGraphicObject['@attributes']['width'])
    }

    height() {
        return parseInt(this.legendGraphicObject['@attributes']['height'])
    }

    contentType() {
        return nodeValue(this.legendGraphicObject['Format'])
    }

    link() {
        return this.legendGraphicObject['OnlineResource']['@attributes']['xlink:href']
    }

    linkType() {
        return this.legendGraphicObject['OnlineResource']['@attributes']['xlink:type']
    }

    linkNamespace() {
        return this.legendGraphicObject['OnlineResource']['@attributes']['xmlns:xlink']
    }

}

export class WMSLayer {
    constructor(wmsLayerCapability, oid = null, sourceLayer = null) {
        this.wmsLayerCapability = wmsLayerCapability
        this.sourceLayer = sourceLayer
        this.oid = oid?oid:Date.now()
        
    }
    
    remove() {
        if (this.sourceLayer)
            this.sourceLayer.remove()
    }
    objCapability(propertyName) {
        let obj = this.wmsLayerCapability[propertyName]
        if (obj)
            return nodeValue(obj)
        return null    
    }
    
    name(){
        return this.objCapability('Name')   
    }
    
    title(){
        return this.objCapability('Title')
    }

    abstractLayer(){
        return this.objCapability('Abstract')
    }
    
    keywords(){
        let keywords = this.wmsLayerCapability['KeywordList']['Keyword']
        if (keywords)
            return keywords.map(keyword => keyword['#text'] || keyword['cdata-section'] )
        return []
    }
    
    crss() {
        let crsObj = this.wmsLayerCapability['CRS']
        if (Array.isArray(crsObj))
            return crsObj.map(cObj => nodeValue(cObj))
        return [nodeValue(crsObj)]
    }
    
    exGeographicBoundingBox(){
        return new EXGeographicBoundingBox(this.wmsLayerCapability['EX_GeographicBoundingBox'])
    }
    
    boundingBoxes(){
        let bboxes = this.wmsLayerCapability['BoundingBox']
        if (bboxes)
            return bboxes.map(bbox => bbox['@attributes'])
        return []
    }
    
    style(){
        return new Style(this.wmsLayerCapability['Style'])
    }

    metadataURL() {
        let metadataObj = this.wmsLayerCapability['MetadataURL']
        if (metadataObj)
            return new MetadataURL(metadataObj)
        return null
    }
}
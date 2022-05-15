/*
WMS_Capabilities
    Service
        Name
        Title
        Abstract
        KeywordList
    Capability
*/

class WMSCapabilities {
    constructor(xmlObject) {
        this.xmlObject = xmlObject
    }
   
     filterObject (obj, filterKey, filterValue) { 
        return Object.keys(obj).reduce((acc, val) => 
                (obj[val][filterKey] !== filterValue ? acc : {...acc,[val]: obj[val]}                                        
        ), {})
    }
     convertToXmlObject(xmlString) {
               
        if (!this.xmlObject['WMS_Capabilities']) {
            if (this.xmlObject['ServiceExceptionReport']){
                console.log(this.xmlObject['ServiceExceptionReport'])
                console.log('Url ou caminho: ', this.url)
                this.xmlObject = null
                throw Error("Houve uma exceção. O xml lido não tem o formato do WMS getCapabilities!")
            }
            throw Error("O xml lido não tem o formato do WMS getCapabilities!")
            return null
        }
        return this.xmlObject
    }
      
    isURL(anUrlOrFileNameWithPath){
        const urlOrFileNameWithPath = anUrlOrFileNameWithPath.toLowerCase()
        return urlOrFileNameWithPath.search(/(http:|https:)/) > -1
    }
    getXmlObject() {
        return this.xmlObject
            
    }
     wmsCapabilities() {
        const xmlObj = this.getXmlObject()
        if(!xmlObj)
            return null
        return xmlObj['WMS_Capabilities']
    }
    version() {
        const wmsCapabilitiesObj = this.wmsCapabilities()
        if(!wmsCapabilitiesObj)
            return null
        let obj = wmsCapabilitiesObj['@attributes']
        return obj['version']
    }
    //Service is a element providing general metadata for the server as a whole.
    service() {
        const xmlObj = this.getXmlObject()
        if (!xmlObj)
            return null
        return xmlObj['WMS_Capabilities']['Service']
    }
    //The Name is a text string used for machine-to-machine communication 
    serviceName() {
        const serv = this.service()
        return serv['Name']['#text']
    }
    //Tthe Title is for the benefit of humans communication 
    serviceTitle() {
        const serv = this.service()
        return serv['Title']['#text']
    }
    //Optional service metadata
    serviceAbstract() {
        const serv = this.service()
        return serv['Abstract']['#text']
    }
    //Optional service metadata
    serviceKeywords() {
        const serv = this.service()
        const keyWords = serv['KeywordList']
        if (keyWords) {
           const keys = keyWords['Keyword']['#text']
           return keys.map(element => { element['#text']});
        }
        return []
    }
     serviceOnlineResource() {
        const serv = this.service()
        return serv['OnlineResource'][0]['$']
    }
    serviceContactInformation() {
        let serv = this.service()
        serv = serv['ContactInformation']
        if (!serv)
            return null
        
        return serv[0]
    }
    serviceMaxWidth() {
        const serv = this.service()
        if (!serv)
            return null
        const maxWidth = serv['MaxWidth']
        if (!maxWidth)
            return null
        return maxWidth[0]
    }
    serviceMaxHeight() {
        const serv = this.service()
        if (!serv)
            return null
        const maxHeight = serv['MaxHeight']
        if (!maxHeight)
            return null
        return maxHeight[0]
    }
     serviceContactInformationPerson() {
        let serv =  this.serviceContactInformation()
        serv =  serv['ContactPersonPrimary']
        if (!serv)
           return null
        serv =  serv[0]
        return serv['ContactPerson'][0]
    }
     serviceContactInformationOrganization() {
        let serv =  this.serviceContactInformation()
        serv =  serv['ContactPersonPrimary']
        if (!serv)
           return null
        serv =  serv[0]
        return serv['ContactOrganization'][0]
    }
     serviceContactInformationPosition() {
        let serv =  this.serviceContactInformation()
        return serv['ContactPosition'][0]
    }
     serviceContactInformationAdress() {
        let serv =  this.serviceContactInformation()
        return serv['ContactAddress'][0]
    }
     serviceContactInformationTelefone() {
        let serv =  this.serviceContactInformation()
        return serv['ContactVoiceTelephone']
    }
     serviceContactInformationFax() {
        let serv =  this.serviceContactInformation()
        return serv['ContactFacsimileTelephone']
    } 
     serviceContactInformationeMail() {
        let serv =  this.serviceContactInformation()
        return serv['ContactElectronicMailAddress']
    }
     serviceFees() {
        let serv =  this.service()
        return serv['Fees']
    }
     serviceAccessConstraints() {
        let serv =  this.service()
        return serv['AccessConstraints']
    }
    //names the actual operations that are supported by the server
    capability() {
        const xmlObj = this.getXmlObject()
        
        if (!xmlObj)
            return null
        return xmlObj['WMS_Capabilities']['Capability']
    }
    capabilityRequest() {
        const request = this.capability()
        return request['Request'][0]
    }
    capabilityGetCapabilities() {
        const operations =  this.capabilityRequest()
        return operations['GetCapabilities']
    }
    
    capabilityGetCapabilities() {
        const operations =  this.capabilityRequest()
        return  operations['GetCapabilities']
    }

     capabilityGetMap() {
        const operations =   this.capabilityRequest()
        return  operations['GetMap']
    }
     capabilityGetFeatureInfo() {
        const operations =   this.capabilityRequest()
        return  operations['GetFeatureInfo']
    }
     capabilityException() {
        const operations =   this.capability()
        return  operations['Exception']
    }
    capabilityParentLayer() {
        const operations =  this.capability()
        return operations['Layer']
        
    }
     parentLayerTitle() {
        const cl =   this.capabilityParentLayer()
        return  cl['Title']
    }
     parentLayerAbstract() {
        const cl =   this.capabilityLayer()
        return  cl['Abstract']['#text']
    }
     parentLayerCRSs() {
        const cl =   this.capabilityParentLayer()
        const crss =  cl['CRS']
        return crss
    }
    /* EX_GeographicBoundingBox is to facilitate geographic searches without requiring coordinate
    transformations by the search engine */
     parentLayerGeographicBoundingBox() {
        const cl =   this.capabilityParentLayer()
        const crss =  cl['EX_GeographicBoundingBox']
        return  crss[0]
    }
     parentLayerBoundingBox() {
        const cl =   this.capabilityParentLayer()
        return  cl['BoundingBox']
        
    }
     layerObjects() {
        const cl =   this.capabilityParentLayer()
        let lays =  cl['Layer']
        return lays
    }
     lenLayerObjects() {
        const ls =  this.layerObjects()
        if (!ls)
            return 0
        return  Object.keys(ls).length
    }
     layerObjectsBy(field_name, field_value) {
        let layers_objects =  this.lenLayerObjects()
        return  layers_objects.filter(
            (layerObj) => { return layerObj[field_name][0] === field_value})
    }
     layerObjectsByName(a_name) {
        return  this.layerObjectsBy('Name', a_name)
    }
     layerObjectsByTitle(a_title) {
        return  this.layerObjectsBy('Title', a_title)
    }
     layerObjectsByCRS(a_crs_str) {
        return  this.layerObjectsBy('CRS', a_crs_str)
    }
     lenLayersNameNotEqualTitleObjects() {
        const layers =  this.layerObjects()
        const filteredLayers =  layers.filter((layerObj) => {
           return layerObj['Name'] != layerObj['Title']
        })
        return filteredLayers.length
    } 
     layersNameNotEqualTitleObjects() {
        const layers =  this.layerObjects()
        const filteredLayers =  layers.filter((layerObj) => {
           return layerObj['Name'] != layerObj['Title']
        })
        return filteredLayers.map( layrObject => layrObject['Name'] )
    }
    //A server should use one or more <MetadataURL>
     metadataURLObjects() {
        const layers =  this.layerObjects()
        const metadataObjects =  layers.map((layerObj) => {
           return layerObj['MetadataURL']
        })
        return metadataObjects
    }
     layerObjectsWithoutMetadata() {
        const layers =  this.layerObjects()
        const layerObjects =  layers.filter((layerObj) => {
           return !layerObj['MetadataURL']
        })
        return layerObjects
    }
     layerNamesWithoutMetadata() {
        const layerObjects =  this.layerObjectsWithoutMetadata()
        const arr_metadados =  layerObjects.map((layerObj) => { return layerObj['Name']})
        return arr_metadados.join(',')
    }
     layerTitlesWithoutMetadata() {
        const layerObjects =  this.layerObjectsWithoutMetadata()
        const arr_metadados =  layerObjects.map((layerObj) => { return layerObj['Title']})
        return arr_metadados.join(',')
    }
    

     lenLayerObjectsWithoutMetadata(){
        const layerObjects =  this.layerObjectsWithoutMetadata()
        return  layerObjects.length
    }

     lenMetadataURL() {
        const metadados =  this.metadataURLObjects()
        const arr =  metadados.filter(metadata => {return metadata} )
        return arr.length
    }
     layerCRSObjects() {
        const layers =  this.layerObjects()
        const crsObjects =  layers.map((layerObj) => {
           return layerObj['CRS']
        })
        return crsObjects
    }
}
module.exports=WMSCapabilities

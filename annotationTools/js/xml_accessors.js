/** @file This file contains functions for reading attributes of an xml. 
*/

/** Gets a field for an object from an xml. If frame value is provided, it gives the field at the given.
  * @param {string} xml - The xml containing the annotations
  * @param {int} ind_object - Index to the object to be displayed
  * @param {string} name - name of the field to return.
  * @param {int} frame - frame of interest
*/
// TO DO: Perhaps call this function "LMgetObjectField"...
function LMgetfield(xml,ind_object, name, frame) {
	var obj = $(xml).children("annotation").children("object").eq(ind_object);
	if (obj.length == 0) return null;
	if (name == 'name' || name == 'deleted'){
		return obj.children(name).text();
	}
	if (name == 'x' || name == 'y'){
		if (frame){
			var framestamps = (obj.children("polygon").children("t").text()).split(',')
          	for(var ti=0; ti<framestamps.length; ti++) { framestamps[ti] = parseInt(framestamps[ti], 10); } 
          	var objectind = framestamps.indexOf(frame);
            if (objectind == -1) return null;
			var coords = ((obj.children("polygon").children(name).text()).split(';')[objectind]).split(',');
			for(var ti=0; ti<coords.length; ti++) { coords[ti] = parseInt(coords[ti], 10); }
			return coords;	

		}
		else {
			var pt_elts = obj.children("polygon")[0].getElementsByTagName("pt");
			if (pt_elts){
				var coord = Array(pt_elts.length);
				for (var ii=0; ii < coord.length; ii++){

					coord[ii] = parseInt(pt_elts[ii].getElementsByTagName(name)[0].firstChild.nodeValue);
				} 
				return coord;
			}
		}
	}
	return null;


}

/** Returns number of LabelMe objects. */
function LMnumberOfObjects(xml) {
    return xml.getElementsByTagName('object').length;
}

// TO DO: This function should be replaced with the top one above.  
// Maybe call the top one above "LMgetObjectField".
// Access LabelMe object field.
// i - object index
// fieldname - object field name, e.g. "name", "deleted"
function LMgetObjectField(xml,i,fieldname) {
  if(!xml.getElementsByTagName('object')[i] || !xml.getElementsByTagName('object')[i].getElementsByTagName(fieldname)[0]) return "";
  return xml.getElementsByTagName('object')[i].getElementsByTagName(fieldname)[0].innerHTML;
}


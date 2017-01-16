/**
 * Created by dharmendra on 16-Jan-17.
 */
export function sortByKeysNumericDesc(obj){
    let keys = Object.keys(obj);
    keys.sort(function(a, b){return b-a});
    return keys;
}

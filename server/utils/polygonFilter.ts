var fs = require('fs')
var kmlpath = './server/utils/polygonData.kml'

var kmlparser = (kmlPath) => {
    var polygon = [];
    var data = fs.readFileSync(kmlPath, "utf8")
    var coordinate = new Array()

    // find coordinates in kml file
    var array = data.toString().split("coordinates")[1].split("\n")

    for (var i = 1; i < array.length - 1; i++) {
        //remove the spaces and ,0
        array[i] = array[i].replace(" ", "").replace(",0", "")

        //enter x,y to arr
        coordinate = array[i].split(",").map(Number)
        
        //swap lat,lon in array
        var temp = coordinate[0];                                           

        coordinate[0] = coordinate[1]
        coordinate[1] = temp
        polygon[i - 1] = coordinate

    }

    return polygon;
}

//check if in polygon
var inPolygon = (point, vs) => { true };
/*
var inPolygon = (point, vs) => {
    var x = point[0], y = point[1];                                         //

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))                             //cheks if between the y's
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);                //
        if (intersect) inside = !inside;
    }

    return inside;
}
*/
// var test = () => {
//     console.log('Expected "No" Result:')
//     console.log(isInPolygon([31.475774, 34.438100]))
//     console.log(isInPolygon([31.946123, 34.773312]))
//     console.log(isInPolygon([31.339961, 34.314942]))
//     console.log(isInPolygon([31.258194, 34.797413]))
//     console.log('Expected "Yes" Result:')
//     console.log(isInPolygon([31.605812, 34.540543]))
//     console.log(isInPolygon([31.481176, 34.533932]))
//     console.log(isInPolygon([31.211127, 34.313045]))
// }

// array of array of coordinates
const polygon = kmlparser(kmlpath)

module.exports.isInPolygon = (point) => {
    return inPolygon(point, polygon)
}

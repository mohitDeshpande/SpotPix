/**
 * Created by DELL on 3/26/2017.
 */



var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
xmlhttp.open("get","data/locations.xml",false);
xmlhttp.send(null);


var xmlDoc = xmlhttp.responseXML;

var locate = xmlDoc.documentElement;
traverse(locate);

function traverse(tree) {
    if (tree.hasChildNodes()) {
        document.write('<ul><li>');
        document.write('<b>' + tree.tagName + ' : </b>');
        var nodes = tree.childNodes.length;
        for (var i = 0; i < nodes; i++) {
            traverse(tree.childNodes[i]);
        }
        document.write('</li></ul>');
    } else document.write(tree.nodeValue);
}


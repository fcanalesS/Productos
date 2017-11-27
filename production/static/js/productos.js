$(document).ready(function () {
    $.get("/tree", function (data) {
        console.log(data);
        var table = "";
        for (i = 0; i < data.length; i++) {
            table = table + "<table id='folder-" + i + "' class='table table-condensed'>";
            table = table + "<thead>";
            table = table + "<tr><th class='text-center'>" + data[i].text + "</th><th></th><th class='text-center'></th></tr>";
            table = table + "</thead>";

            table = table + "<tbody>";
            nodes = data[i].nodes;
            for (j = 0; j < nodes.length; j++) {
                table += "<tr><td></td><td class='text-center'>" + nodes[j].text + "</td><td class='text-center'>" +
                    "<input style='margin-right: 5em' type='checkbox' name='chkFile-" + j + "' class='' value='1' id='chkFileCorrecto" + Math.floor((Math.random() * 1000000) + 1) + "' >" +
                    "</td></tr>"
            }
            table = table + "</tbody></table>";
        }

        table = table + "</table>";
        $("#tabla").html(table)
    });

    // $.get("/tree-faltantes", function (data){
    //     console.log("tree faltantes")
    //     console.log(data)
    //     var table = "<table id='tree-view2' class='table table-condensed'> <tr>";
    //     table = table + "<thead></thead>"
    //     table = table + "<tr><th></th><th></th><th class='text-center'>Archivos</th>";
    //     for (i = 0; i < data.length; i++) {
    //         console.log(data[i].text);
    //         table = table + "<tr class='folders'>";
    //         table = table + "<th id='dir" + i + "'>" + data[i].text + "</th><th></th>" +
    //             "<th class='text-center'>" +
    //             "<input hidden type='radio' name='folder' value='" + data[i].text + "'>" +
    //             "</th>" +
    //             "</tr>";
    //         nodes = data[i].nodes;
    //
    //         for (j = 0; j < nodes.length; j++) {
    //             console.log(nodes[j]);
    //             table = table + "<tbody><tr id='files-" + j + "'>";
    //             table = table + "<td> </td>"
    //             table = table + "<td>" + nodes[j].text + "</td>";
    //             table = table + "<td class='text-center'> " +
    //                 "<input type='checkbox' name='files-faltantes-" + j + "' id='chkFaltantes-" + j + "' value='' > </td>"
    //
    //
    //         }
    //         table = table + "</tr></tbody>";
    //
    //
    //     }
    //     table = table + "</table>";
    //     $("#tabla-faltantes").html(table)
    // });
});


$("#grabar").on("click", function () {
    var tables = $("#tabla").find("table");
    var jsonString = [];
    var dictFiles = {};
    var Archivos = [];
    for (t = 0; t < tables.length; t++) {
        var tAux = tables[t].id;
        var tHeadText = $("#" + tAux + "> thead");
        var tBody = $("#" + tAux + " > tbody > tr > td");
        // console.log(tAux)
        // console.log(tHeadText[0].textContent);


        // console.log(tBody)
        console.log("FOLDER: " + tHeadText[0].textContent);
        dictFiles = {folder: tHeadText[0].textContent, files: []};
        for (b = 0; b < tBody.length; b++) {
            var nodes = tBody[b].childNodes;
            if (nodes.length !== 0) {
                for (j = 0; j < nodes.length; j++) {
                    // console.log(nodes[j].textContent);
                    var fileName = nodes[j].textContent;
                    if (fileName){
                        // console.log(fileName)
                        var dict = {fileName: fileName, status: ""}
                        dictFiles.files.push(dict)
                    }else{
                        // console.log(nodes[j])
                        if ($("#" + nodes[j].id).is(":checked")){
                            dict.status = "ACEPTADO"
                        }else{
                            dict.status = "NO_ACEPTADO"
                        }
                    }
                }

            }
        }
        console.log(Archivos);
        jsonString.push(dictFiles)


    }

    console.log(JSON.stringify(jsonString))
    console.log(jsonString)
    $.post("/test-result", {treeView: JSON.stringify(jsonString)}, function(data){
        console.log(data)
    });

});
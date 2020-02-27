"use strict"

/**
 * Title of application: JSON Reader
 * Description: This application format the JSON data provided by API from internet services,
 * from string to format readable by human.
 * Author: Pamento
 * Date: 27.02.2020
 * @function isJSON check if input.value is valid JSON data
 * @function output dysplay message and JSON data on the Html page in the browser
 * @function syntaxHighlight add colors to the elements of the JSON data
 * @var obj preformat JSON form input.value to JSON
 * @var str format JSON to string
 * @var isJSON keep the resultat of the isJSON function
 */

let inputV = document.getElementById("jison"),
    preSection = document.querySelector("#preSection"),
    p = document.querySelector('.message'),
    obj,
    str,
    isJSON;

function isJson(str) {
    try {
        obj = JSON.parse(str);
        console.log(obj);
    } catch (e) {
        isJSON = false;
        return false;
    }
    isJSON = true;
    return true;
}
function output(inp) {
    if (preSection.childNodes.length == 0) {
        preSection.appendChild(document.createElement('pre')).innerHTML = inp;
    } else {
        preSection.firstChild.innerHTML = inp;
    }
    if (isJSON) {
        preSection.firstChild.style.background = "#2c303a";
        preSection.firstChild.style.color = "#ffffff";
    } else {
        preSection.firstChild.style.background = "#FFEECB";
        preSection.firstChild.style.color = "#000000";
    }
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

inputV.addEventListener('input', function (evt) {
    if (isJson(this.value)) {
        str = JSON.stringify(obj, undefined, 4);
        p.innerHTML = "Output :";
        p.style.color = "black";
        output(syntaxHighlight(str));
    } else if (this.value == "") {
        p.innerHTML = "Output :";
        p.style.color = "black";
        output(`When You want, we can start <b>;)</b>`);
    }
    else {
        p.innerHTML = "Warning !";
        p.style.color = "red";
        output(`Input data are an <i>Invalid Value!</i>`);
    }
});
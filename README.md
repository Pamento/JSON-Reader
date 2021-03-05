# Description
JSON Reader licenced under the [MIT license](LICENSE)
This is the solution of pretty format of JSON value (basicaly).
And modify valid Json input into text output in nested numbered list format.
The last one is the DOM based list of p tag with span nested in.

# Resource:
## synthax color of JSON:
```http
https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
```
```javascript
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
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
```
## favicon
```http
https://www.favicon.cc/?action=icon&file_id=942731
``` 

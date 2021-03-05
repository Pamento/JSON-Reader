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
 * @var convType about type of output: a for colored Json, b for txt format
 * @var checkboxes is about all checkboxes in options section
 * @var divElement contain response of txt convert output
 */

let inputV = document.getElementById("jison"),
	preSection = document.querySelector("#preSection"),
	p = document.querySelector('.message'),
	input,
	obj,
	str,
	isJSON,
	convType = '',
	checkboxes = document.getElementsByName('check'),
	divElement;

(function checkDefault() {
	checkboxes.forEach((i) => {
		if (i.checked) convType = i.value;
	});
	if (inputV.value.length !== 0) inputV.value = '';
})();

function onlyOne(checkbox) {
	checkboxes.forEach((item) => {
		if (item !== checkbox) item.checked = false
	});
	convType = checkbox.value;
	if (typeof input === 'undefined' || input.length == 0) {
		return;
	} else {
		initConvert(input);
	}
}

function isElement(o) {
	return (
		typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
			o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
	);
}

function isJson(str) {
	try {
		obj = JSON.parse(str);
	} catch (e) {
		isJSON = false;
		return false;
	}
	isJSON = true;
	return true;
}

function applyJSONStyle(b, c) {
	preSection.firstChild.style.background = b;
	preSection.firstChild.style.color = c;
}

function outputJSON(inp) {
	let pre = document.createElement('pre');
	pre.innerHTML = inp;
	if (preSection.childNodes.length == 0) {
		preSection.appendChild(pre);
	} else {
		let re = preSection.firstChild;
		preSection.replaceChild(pre, re);
	}
	isJSON ? applyJSONStyle("#2c303a", "#ffffff") :
		applyJSONStyle("#FFEECB", "#000000");
}

function outputDOM(el) {
	if (preSection.childNodes.length == 0) {
		preSection.appendChild(el)
	} else {
		let re = preSection.firstChild;
		preSection.replaceChild(el, re);
	}
	preSection.firstChild.classList.add("docFormat");
}

function switchOutput(op) {
	isElement(op) ? outputDOM(op) : outputJSON(op);
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

function toEntries(json) {
	return Object.entries(json);
}

function toNumeredList() {
	styleMsg('i');
	let arAl = [];
	let ol = [];

	if (typeof obj !== 'undefined' && Object.keys(obj).length > 0) level(obj);

	function level(o) {
		o === -1 ? arAl.pop() : arAl.push(toEntries(o));
		arAl.length === 0 ? exit() : iterEach(arAl[arAl.length - 1]);
	}

	function levelUp(l) {
		setOrder(0, 1);
		level(l);
	}

	function iterEach(s) {
		s.forEach((i, ix) => {
			setOrder(ix + 1, 0);
			typeof i[1] === 'string' ? addP(i[1]) : Object.keys(i[1]).length > 0 ? levelUp(i[1]) : addP(i[1].toString());
		});
		setOrder(0, -1);
	}

	function setOrder(i, sup) {
		let oli = ol.length;
		switch (sup) {
			case 0:
				oli === 0 ? ol.push(i) : ol[oli - 1] = i;
				break;
			case 1:
				ol.push(0);
				break;
			case -1:
				ol.pop();
				break;
			default:
				break;
		}
	}

	function addP(text) {
		let lineP = document.createElement("p");
		let or = getOrder();
		lineP.innerHTML = "<span>" + or + "</span>&nbsp;" + text;
		divElement.appendChild(lineP);
	}

	function getOrder() {
		let or = '';
		ol.forEach(i => {
			or === '' ? or = '' + i : or = or + '.' + i;
		});
		return or;
	}

	function exit() {
		return;
	}
	switchOutput(divElement);
}

function styleMsg(ps) {
	p.innerHTML = ps === 'i' ? "Output :" : "Warning !";
	p.style.color = ps === 'i' ? "black" : "red";
}

function jsonColorOutput() {
	str = JSON.stringify(obj, undefined, 4);
	styleMsg('i');
	outputJSON(syntaxHighlight(str));
}

function resetDOM() {
	if (preSection.childNodes.length != 0) {
		do {
			preSection.removeChild(preSection.childNodes[0]);
		} while (preSection.hasChildNodes())
	}
}

function iVar() {
	divElement = document.createElement('div');
	resetDOM();
	obj = null;
	str = '';
}

function initConvert(input) {
	iVar();
	if (isJson(input)) {
		convType === 'b' ? toNumeredList() : jsonColorOutput();
	} else if (input == "") {
		styleMsg('i');
		outputJSON(`When You want, we can start <b>;)</b>`);
	} else {
		styleMsg('w');
		outputJSON(`Input data are an <i>Invalid Value!</i>`);
	}
}

inputV.addEventListener('input', function () {
	input = this.value;
	initConvert(this.value);
});

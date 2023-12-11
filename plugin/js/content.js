chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.message === "copyText") {
			copyToTheClipboard(request.textToCopy);
			sendResponse({
				text: "Copying code ran"
			});
		}
		else if (request.message === "injectText") {
			injectIntoActiveElement(request.textToInject);
			sendResponse({
				text: "Injection code ran"
			});
		}
	}
);

async function copyToTheClipboard(textToCopy) {
	const el = document.createElement('textarea');
	el.value = textToCopy;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

async function injectIntoActiveElement(textToInject) {
	var elem = document.activeElement;
	if (elem) {
		var start = elem.selectionStart;
		var end = elem.selectionEnd;
		elem.value = elem.value.slice(0, start) + textToInject + elem.value.substr(end);

		elem.selectionStart = start + textToInject.length;
		elem.selectionEnd = elem.selectionStart;
	}
}
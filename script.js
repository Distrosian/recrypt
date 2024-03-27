
function toggleTheme() {
    var body = document.body;
    body.classList.toggle("dark-theme");
    var title = document.getElementById("title");
    if (body.classList.contains("dark-theme")) {
        title.style.color = "white";
    } else {
        title.style.color = "black";
    }
}


function encrypt() {
    var fileInput = document.getElementById('fileInput');
    var keyInput = document.getElementById('keyInput');
    var outputTextarea = document.getElementById('output');
    var encryptButton = document.getElementById('encryptButton');
    var decryptButton = document.getElementById('decryptButton');
    var message = document.getElementById('message');

    
    if (!fileInput.files[0] || !keyInput.value) {
        alert('Please select a file and enter a key.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var plaintext = event.target.result;
        var key = keyInput.value;
        var encryptedText = skavianEncrypt(plaintext, key);
        outputTextarea.value = encryptedText;
        encryptButton.style.display = 'none';
        decryptButton.style.display = 'none';
        outputTextarea.setAttribute('readonly', true);
        message.innerHTML = 'A file can be operated only once per session';
    };

    reader.readAsText(file);
}


function decrypt() {
    var fileInput = document.getElementById('fileInput');
    var keyInput = document.getElementById('keyInput');
    var outputTextarea = document.getElementById('output');
    var encryptButton = document.getElementById('encryptButton');
    var decryptButton = document.getElementById('decryptButton');
    var message = document.getElementById('message');

   
    if (!fileInput.files[0] || !keyInput.value) {
        alert('Please select a file and enter a key.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var ciphertext = event.target.result;
        var key = keyInput.value;
        var decryptedText = skavianDecrypt(ciphertext, key);
        outputTextarea.value = decryptedText;
        encryptButton.style.display = 'none';
        decryptButton.style.display = 'none';
        outputTextarea.setAttribute('readonly', true); 
        message.innerHTML = 'A file can be operated only once per session'; 
    };

    reader.readAsText(file);
}

function downloadContents() {
    var outputTextarea = document.getElementById('output');
    var content = outputTextarea.value;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'skivian_contents.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


function skavianEncrypt(plaintext, key) {

    var encryptedText = "";


    for (var i = 0; i < plaintext.length; i++) {
        var char = plaintext[i];
        var index = key.indexOf(char);
        if (index !== -1) {
            var encryptedCharIndex = (index + 1) % key.length;
            encryptedText += key[encryptedCharIndex];
        } else {
            
            encryptedText += char;
        }
    }

    return encryptedText;
}

function skavianDecrypt(ciphertext, key) {

    var decryptedText = "";

  
    for (var i = 0; i < ciphertext.length; i++) {
        var char = ciphertext[i];
        var index = key.indexOf(char);
        if (index !== -1) {
            var decryptedCharIndex = (index - 1 + key.length) % key.length;
            decryptedText += key[decryptedCharIndex];
        } else {
           
            decryptedText += char;
        }
    }

   
    return decryptedText;
}

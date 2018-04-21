var onFileLoaded = function(event) {
    // Get file content
    var content = event.target.result;
    // Get the file hash of the PDF
    var hash = CerttifyFileBundle.hashPDF(content);
    // Get the Certtify header from the PDF
    var header = CerttifyFileBundle.readTag(content);
    // Update the read.html
    document.getElementById("hash").innerText = hash;
    if (header) {
        // Header found
        document.getElementById("header").innerText = header;
    }
    else {
        // Header not found
        document.getElementById("header").innerText = "NOT FOUND";
    }
}
    

var submitFile = function(event) {
    // Prevent further propagation
    event.preventDefault();
    // Get file field in the form
    var fileInput = document.getElementById("file");
    // Get the file selected
    var file = fileInput.files[0];
    if (file) {
        // File selected
        // Create FileReader specified in File API
        var reader = new FileReader();
        // Attach onload listener to the reader
        reader.onload = onFileLoaded;
        // Read file content as binary
        reader.readAsArrayBuffer(file);
    }
    else {
        // No file selected
    }
}

// Attach onclick listener to the submit button upon loading is completed
window.onload = function() {
    var submit = document.getElementById("submit");
    submit.onclick = submitFile;
}
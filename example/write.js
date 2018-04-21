var onFileLoaded = function(event) {
    // Get file content
    var content = event.target.result;
    // Get the tag to be written to the file
    var tag = document.getElementById("tag").value;
    // Add the tag to the PDF
    var pdfTagAdded = CerttifyFileBundle.writeTag(content, tag);
    // Trigger a download
    var a  = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([pdfTagAdded], { type: 'application/octet-stream' }));
    a.download = 'cert_tag_added.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
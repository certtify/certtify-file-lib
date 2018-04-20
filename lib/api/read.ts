import { PDF } from '../file';

/**
 * Read Certtify-related tag from the given PDF and return those tag
 * @param {ArrayBuffer} pdf Binary of the PDF file to be read
 */
function readPDFTag(pdf: ArrayBuffer) : any {
    console.log(PDF.fromArrayBuffer(pdf).getFileHash());
}

export default readPDFTag;
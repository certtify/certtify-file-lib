/**
 * @module API
 */ /** */

import { PDF } from '../file';

/**
 * Write Certtify tag to the given PDF and returns an ArrayBuffer that represent the modified PDF
 * @param {ArrayBuffer} pdf Binary of the PDF file to be read
 * @param {string} tag Tag to be written into the PDF file
 * @return {ArrayBuffer} PDF with the tag added
 */
function writeTag(pdf: ArrayBuffer, tag: string) : ArrayBuffer {
    // Call the API to handle the conversion
    let pdfInstance = PDF.fromArrayBuffer(pdf);
    let pdfTagged = pdfInstance.writeCerttifyHeader(tag).buffer;
    return pdfTagged;
}

export default writeTag;
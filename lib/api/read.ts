/**
 * @module API
 */ /** */

import { PDF } from '../file';

/**
 * Read Certtify-related tag from the given PDF and return those tag
 * @param {ArrayBuffer} pdf Binary of the PDF file to be read
 * @return {string} Certtify tag inside the PDF
 */
function readTag(pdf: ArrayBuffer) : string {
    return PDF.fromArrayBuffer(pdf).getCerttifyHeader();
}

export default readTag;
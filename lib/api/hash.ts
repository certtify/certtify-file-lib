/**
 * @module API
 */ /** */

import { PDF } from '../file';

/**
 * Compute the file hash for the given PDF
 * @param {ArrayBuffer} pdf Binary of the PDF file to be read
 * @return {string} Hash of the PDF
 */
function hashPDF(pdf: ArrayBuffer) : any {
    return PDF.fromArrayBuffer(pdf).getFileHash();
}

export default hashPDF;
/**
 * @module File
 */ /** */

import * as crypto from 'crypto';

/** Represent a signed/unsigned Certtify PDF file */
class PDF {

    /**
     * Buffer storing the content of the pdf
     */
    private pdf: Buffer;

    /**
     * Initiator byte for PDF comment
     */
    private readonly initiator: Buffer = Buffer.from("25", "hex");
    /**
     * Header of the Certtify tag in signed PDF file
     */
    private readonly certtifyHeader: Buffer = Buffer.from("CERTTIFY_PDF_HEADER", 'utf8');
    /**
     * Terminator byte for PDF comment
     */
    private readonly terminator: Buffer = Buffer.from("0D", "hex");

    /**
     * Construct PDF instance based on a buffer that represent the PDF binary data
     * @param {Buffer} buffer Buffer that contain the binary data of the PDF
     */
    constructor(buffer: Buffer) {
        this.pdf = buffer;
    }

    /**
     * Convenient method for generating PDF instance based on JS ArrayBuffer object
     * @param {ArrayBuffer} buffer JS ArrayBuffer that contains the binary data of the PDF
     * @return {PDF} PDF instance constructed
     */
    public static fromArrayBuffer(buffer: ArrayBuffer) : PDF {
        return new PDF(Buffer.from(buffer));
    }

    /**
     * Compute the file hash of this PDF file
     * @return {string} Base64 encoded SHA512 hash
     */
    public getFileHash() : string {
        // Trim any Certtify header before hashing
        let noHeaderPDF = this.trimCerttifyHeader();
        // Hash the binary content
        return this.calculateHash(noHeaderPDF);
    }

    /**
     * Extract the Certtify header inside the PDF
     * @return {string} Certtify header inside the PDF, or null if no header is found
     */
    public getCerttifyHeader(): string {
        // Look for location of Certtify header in the file
        let headerPos = this.pdf.indexOf(this.certtifyHeader);
        if (headerPos != -1) {
            // Certtify header found
            let endingPos = this.pdf.indexOf(this.terminator, headerPos);
            // Extract Certtify header from headerPos + header_length to endingPos <0D>
            let header = this.pdf.slice(headerPos + this.certtifyHeader.length, endingPos);
            // Return the header
            return header.toString('utf8');
        }
        else {
            // No Certtify header found
            return null;
        }
    }

    /**
     * Remove the Certtify header (if any) from this file and return the trimmed buffer
     * @return {Buffer} Trimmed buffer without Certtify header
     */
    private trimCerttifyHeader() : Buffer {
        // Look for location of Certtify header in the file
        let headerPos = this.pdf.indexOf(this.certtifyHeader);
        if (headerPos != -1) {
            // Certtify header found
            let endingPos = this.pdf.indexOf(this.terminator, headerPos);
            // Trim Certtify header from headerPos-1 (including the initiator <25>) to endingPos <0D>
            let beforeHeader = this.pdf.slice(0, headerPos - 1);
            let afterHeader = this.pdf.slice(endingPos + 1);
            // Combine and return the trimmed buffer
            return Buffer.concat([beforeHeader, afterHeader]);
        }
        else {
            // No Certtify header found
            return this.pdf;
        }
    }

    /**
     * Compute the hash of the given buffer
     * @param {Buffer} buffer Binary content to be hashed
     * @return {string} Base64 encoded SHA512 hash
     */
    private calculateHash(buffer: Buffer) : string {
        let hasher = crypto.createHash('SHA512');
        hasher.update(buffer);
        return hasher.digest('base64');
    }

}

export default PDF;
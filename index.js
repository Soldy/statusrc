'use strict';

/*
 * @param {string} modeIn
 * @prototype
 */
 
exports.statusrc=function(modeIn){
    /*
     * @param {object} res
     * @public
     * @return {integer}
     */
    this.ok = function(res){
         return ok(res);
    };
    /*
     * @param {object} res
     * @public
     * @return {integer}
     */
    this.notExist = function(res){
         return notExist(res);
    };
    /*
     * @param {object} res
     * @public
     * @return {integer}
     */
    this.notAllowedMethod = function(res){
         return notAllowedMethod(res);
    };
    /*
     * @param {object} res
     * @public
     * @return {integer}
     */
    this.badRequest = function(res){
        return badRequest(res);
    };
    /*
     * @param {object} res
     * @param {integer} code
     * @param {object} message
     * @public
     * @return {integer}
     */
    this.end = function(res, code, message){
        return end(res, code, message);
    };
    /*
     * @param {object} res 
     * @param {integer} code
     * @public
     * @return {integer}
     */
    this.shortEnd = function(res, code){
        return shortEnd(res, code);
    };
    /*
     * @private
     * @var {string}
     */
    let mode = 'api';
    /*
     * @private
     * @constant {array}
     */
    const modes = ['api'];
    /*
     * @private
     * @constant {dictonary}
     */
    const codes = {
        '100' : 'Continue',
        '101' : 'Switching Protocols',
        '102' : 'Processing',
        '103' : 'Early Hints',
        '200' : 'OK',
        '201' : 'Created',
        '202' : 'Accepted',
        '203' : 'Non-Authoritative Information',
        '204' : 'No Content',
        '205' : 'Reset Content',
        '206' : 'Partial Content',
        '207' : 'Multi-Status',
        '208' : 'Already Reported',
        '226' : 'IM Used',
        '300' : 'Multiple Choices',
        '301' : 'Moved Permanently',
        '302' : 'Found',
        '303' : 'See Other',
        '304' : 'Not Modified',
        '305' : 'Use Proxy',
        '306' : '(Unused)',
        '307' : 'Temporary Redirect',
        '308' : 'Permanent Redirect',
        '400' : 'Bad Request',
        '401' : 'Unauthorized',
        '402' : 'Payment Required',
        '403' : 'Forbidden',
        '404' : 'Not Found',
        '405' : 'Method Not Allowed',
        '406' : 'Not Acceptable',
        '407' : 'Proxy Authentication Required',
        '408' : 'Request Timeout',
        '409' : 'Conflict',
        '410' : 'Gone',
        '411' : 'Length Required',
        '412' : 'Precondition Failed',
        '413' : 'Payload Too Large',
        '414' : 'URI Too Long',
        '415' : 'Unsupported Media Type',
        '416' : 'Range Not Satisfiable',
        '417' : 'Expectation Failed',
        '421' : 'Misdirected Request',
        '422' : 'Unprocessable Entity',
        '423' : 'Locked',
        '424' : 'Failed Dependency',
        '425' : 'Too Early',
        '426' : 'Upgrade Required',
        '427' : 'Unassigned',
        '428' : 'Precondition Required',
        '429' : 'Too Many Requests',
        '430' : 'Unassigned',
        '431' : 'Request Header Fields Too Large',
        '451' : 'Unavailable For Legal Reasons',
        '500' : 'Internal Server Error',
        '501' : 'Not Implemented',
        '502' : 'Bad Gateway',
        '503' : 'Service Unavailable',
        '504' : 'Gateway Timeout',
        '505' : 'HTTP Version Not Supported',
        '506' : 'Variant Also Negotiates',
        '507' : 'Insufficient Storage',
        '508' : 'Loop Detected',
        '509' : 'System Need Love',
        '510' : 'Not Extended',
        '511' : 'Network Authentication Required'
    };
    /*
     * @param {integer} code
     * @private
     * @return {integer}
     */
    const codeFix = function(code){
        if(typeof codes[code] === 'undefined')
            code = '500';
        code = code.toString();
        return code;
    };
    /*
     * @param {object} res 
     * @param {integer} code
     * @private
     * @return {integer}
     */
    const apiShortEnd = function(res, code){
        code = codeFix(code);
        res.writeHead(code);
        res.write(
            JSON.stringify({
                'result':codes[code]
            })
        );
        return res.end();
    };
    /*
     * @param {object} res 
     * @param {integer} code
     * @private
     * @return {integer}
     */
    const shortEnd = function(res, code){
        if(mode === 'api')
            return apiShortEnd(res, code);
        return apiShortEnd(res, code);
    };
    /*
     * @param {object} res
     * @private
     * @return {integer}
     */
    const ok = function(res){
        return shortEnd(res, 200);
    };
    /*
     * @param {object} res
     * @private
     * @return {integer}
     */
    const notExist = function(res){
        return shortEnd(res, 404);
    };
    /*
     * @param {object} res
     * @private
     * @return {integer}
     */
    const notAllowedMethod = function(res){
        return shortEnd(res, 405);
    };
    /*
     * @param {object} res
     * @private
     * @return {integer}
     */
    const badRequest = function(res){
        return shortEnd(res, 400);
    };
    /*
     * @param {object} res 
     * @param {integer} code
     * @param {object} message
     * @private
     * @return {integer}
     */
    const apiEnd = function(res, code, message){
        code = codeFix(code);
        res.writeHead(code);
        res.write(
            JSON.stringify(message)
        );
        return res.end();
    };
    /*
     * @param {object} res 
     * @param {integer} code
     * @param {object} message
     * @private
     * @return {integer}
     */
    const end = function(res, code, message){
        if(mode === 'api')
            return apiEnd(res, code, message);
        return apiEnd(res, code, message);
    };
    /*
     * constructor
    */
    if(typeof modeIn === 'undefined')
        modeIn = 'api';
    if(modes.indexOf(modeIn) > -1 )
        mode = modes[modes.indexOf(modeIn)];

};


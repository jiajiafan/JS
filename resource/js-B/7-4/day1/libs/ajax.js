(function () {

    /*
     ?????§Ò?:
     {
     url: '',// ?????¡¤??
     data: '', // ????????
     dataType: 'text',// ??????????????????????????????
     headers: {},// ????????????
     method: 'get',//?????http method ????
     success: function () {

     },// ajax??????§Ö????
     error: function () {

     },// ajax??????§Ö????
     async: true,//??????????
     cache: false// ?????????
     }*/


    /**
     * ajax??????
     * @param {Object} options ?????§Ò?
     */
    var ajax = function (options) {
        // ???§Ø????????????
        if (!tools.getType(options, 'Object')) {
            throw new TypeError('???????????');
        }

        // ajax ????? ???ajax????
        var xhr = tools.getXHR();

        var isGET = /^(get|head|delete)$/ig.test(options.method);
        // ????§Ó???,????????????
        if (options.data) {
            options.data = tools.encodeToURIString(options.data, isGET);
        }

        // ?????get????? ???data????url?????
        if (isGET) {
            //case 1: url => /getInfo  data => a=1&b=2  ???? => /getInfo?a=1&b=2
            //case 2: url => /getInfo?type=1  data => a=1&b=2  ???? =>  /getInfo?type=1&a=1&b=2
            options.url = tools.padStringToURL(options.url, options.data);
        }

        // ?????? ??url????????????????
        if (options.cache === false) {
            var random = Math.random();
            // url=> /getInfo?a=1&b=2 random => _=0.123445 ???? =>  /getInfo?a=1&b=2&_=0.123445
            options.url = tools.padStringToURL(options.url, '_=' + random);
        }

        // ajax ????? ????open????
        xhr.open(options.method, options.url, options.async);

        // ???????????
        if (xhr.setRequestHeader && tools.getType(options.headers, 'Object')) {
            for (var n in options.headers) {
                if (!options.headers.hasOwnProperty(n)) continue;
                xhr.setRequestHeader(n, options.headers[n]);
            }
        }

        // ??????
        xhr.onreadystatechange = function () {
            // ?§Ø?http??????????
            if (xhr.readyState === 4) {
                // ?§Ø??????????
                if (/^2\d{2}$/.test(xhr.status)) {
                    // ??????????
                    var responseText = xhr.responseText;
                    // ?§Ø?dataType????json ????json???????????????????json????
                    if (responseText && /json/ig.test(options.dataType)) {
                        // ??????json????????JSONParse????
                        try {
                            responseText = tools.JSONParse(responseText);
                        } catch (ex) {
                            // ??????????error????,??return
                            options.error(ex);
                            return;
                        }
                    }
                    options.success(responseText);
                } else if (/^(4|5)\d{2}$/.test(xhr.status)) {
                    options.error(xhr.status);
                }
            }
        };

        //????ajax????
        xhr.send(options.data);

        return xhr;
    };


    // ????????
    var tools = {
        /**
         * ???ajax????
         */
        getXHR: (function () {
            var list = [function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }, function () {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }, function () {
                return new ActiveXObject('Msxml3.XMLHTTP');
            }];
            var xhr = null;
            while (xhr = list.shift()) {
                try {
                    xhr();
                    break;
                } catch (ex) {
                    xhr = null;
                    continue;
                }
            }
            if (xhr === null) {
                throw new Error('?????????????ajax????')
            }
            return xhr;
        })(),
        /**
         * ?§Ø????????????
         * @param {*} data ????§Ø?????????
         * @param {string} type ????????
         * @return {boolean} ???????????????
         */
        getType: function (data, type) {
            return Object.prototype.toString.call(data) === '[object ' + type + ']';
        },
        // {a:1,b:2,??:??} => a=1&b=2
        /**
         * ??????????????URIString???
         * @param {*} data ?????????????
         * @return {string} ?????????????????
         */
        encodeToURIString: function (data, encodeZH) {
            if (!data) {
                return '';
            }
            if (tools.getType(data, 'String')) {
                return data;
            }
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                if (encodeZH) {
                    arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
                } else {
                    arr.push(n + '=' + data[n]);
                }

            }
            // arr => ['a=1','b=2']
            return arr.join('&'); // => a=1&b=2
        },
        /**
         * ??url??????????
         * @param {string} url url
         * @param {*} param ?????url???????????
         * @return {string} ??????????url
         */
        padStringToURL: function (url, param) {
            if (!param) {
                return url;
            }
            var data = tools.encodeToURIString(param);
            var hasSearch = /\?/.test(url);
            return url + (hasSearch ? '&' : '?') + data;

        },
        /**
         * ?????json???????????json????
         * @param {string} jsonString ??????????json?????
         * @return {Object} ??????????json????
         */
        JSONParse: function (jsonString) {
            if (tools.getType(jsonString, 'Object')) {
                return jsonString;
            }
            if (window.JSON) {
                return JSON.parse(jsonString);
            }
            return eval('(' + jsonString + ')');
        }
    };


    this.ajax = ajax;
})();
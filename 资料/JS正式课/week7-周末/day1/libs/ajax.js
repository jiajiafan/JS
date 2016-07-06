(function () {

    /*
     �����б�:
     {
     url: '',// �����·��
     data: '', // ���͵Ĳ���
     dataType: 'text',// ����ָ����ʽ��ʽ�����������ص�����
     headers: {},// �Զ��������ײ�
     method: 'get',//��ָ��http method ����
     success: function () {

     },// ajax�ɹ�ʱִ�еĺ���
     error: function () {

     },// ajaxʧ��ʱִ�еĺ���
     async: true,//�Ƿ�Ϊ�첽����
     cache: false// �Ƿ񻺴������
     }*/


    /**
     * ajaxִ���߼�
     * @param {Object} options �����б�
     */
    var ajax = function (options) {
        // ���жϲ����Ƿ�Ϊ����
        if (!tools.getType(options, 'Object')) {
            throw new TypeError('�������ʹ���');
        }

        // ajax ��һ�� ��ȡajax����
        var xhr = tools.getXHR();

        var isGET = /^(get|head|delete)$/ig.test(options.method);
        // ����в���,��Ҫ��ʽ������
        if (options.data) {
            options.data = tools.encodeToURIString(options.data, isGET);
        }

        // �����getϵ���� ���dataƴ�ӵ�url�ĺ���
        if (isGET) {
            //case 1: url => /getInfo  data => a=1&b=2  ƴ�Ӻ� => /getInfo?a=1&b=2
            //case 2: url => /getInfo?type=1  data => a=1&b=2  ƴ�Ӻ� =>  /getInfo?type=1&a=1&b=2
            options.url = tools.padStringToURL(options.url, options.data);
        }

        // ������ ��url�ĺ���ƴ��һ�������
        if (options.cache === false) {
            var random = Math.random();
            // url=> /getInfo?a=1&b=2 random => _=0.123445 ƴ�Ӻ� =>  /getInfo?a=1&b=2&_=0.123445
            options.url = tools.padStringToURL(options.url, '_=' + random);
        }

        // ajax �ڶ��� ����open����
        xhr.open(options.method, options.url, options.async);

        // ���������ײ�
        if (xhr.setRequestHeader && tools.getType(options.headers, 'Object')) {
            for (var n in options.headers) {
                if (!options.headers.hasOwnProperty(n)) continue;
                xhr.setRequestHeader(n, options.headers[n]);
            }
        }

        // ��ȡ��Ӧ
        xhr.onreadystatechange = function () {
            // �ж�http�����Ƿ����
            if (xhr.readyState === 4) {
                // �жϷ�����״̬��
                if (/^2\d{2}$/.test(xhr.status)) {
                    // ��ȡ��Ӧ����
                    var responseText = xhr.responseText;
                    // �ж�dataType�Ƿ�Ϊjson ���Ϊjson����Ҫ����Ӧ�����ʽ��Ϊjson����
                    if (responseText && /json/ig.test(options.dataType)) {
                        // ��Ϊ�Ƿ�json�ַ���ִ��JSONParse�ᱨ��
                        try {
                            responseText = tools.JSONParse(responseText);
                        } catch (ex) {
                            // ����ֱ��ִ��error����,��return
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

        //����ajax����
        xhr.send(options.data);

        return xhr;
    };


    // ��������
    var tools = {
        /**
         * ��ȡajax����
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
                throw new Error('��ǰ�������֧��ajax����')
            }
            return xhr;
        })(),
        /**
         * �ж��Ƿ�Ϊָ������
         * @param {*} data ��Ҫ�ж����͵Ĳ���
         * @param {string} type ��������
         * @return {boolean} �����Ƿ�Ϊָ������
         */
        getType: function (data, type) {
            return Object.prototype.toString.call(data) === '[object ' + type + ']';
        },
        // {a:1,b:2,��:��} => a=1&b=2
        /**
         * ��һ�������ʽ��ΪURIString��ʽ
         * @param {*} data ��Ҫ��ʽ���Ĳ���
         * @return {string} ��ʽ����ϵõ����ַ���
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
         * ��url��ƴ���ַ���
         * @param {string} url url
         * @param {*} param ��Ҫ��url����ƴ�ӵĲ���
         * @return {string} ƴ�����֮���url
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
         * ��һ��json�ַ�����ʽ��Ϊjson����
         * @param {string} jsonString ��Ҫ��ʽ����json�ַ���
         * @return {Object} ��ʽ���õ���json����
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
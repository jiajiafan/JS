(function () {
    /**
     * jsonp����
     * @param {string} url jsonp��ַ
     * @param {*} data ���͵�����
     * @param {string} jsonpcallback jsonpcallback
     * @param {Function} callback �ص�����
     */
    this.jsonp = function (url, data, jsonpcallback, callback) {
        // �ص�������
        var cbName = 'cb' + counter++; //cb1 cb2 cb3
        // ����ȫ�ֺ����� �ŵ�jsonpcallback�����
        var callbackName = 'window.jsonp.' + cbName;
        //window.jsonp.cb1
        //window.jsonp.cb2

        // ����ȫ�ֺ����� ����һ��ȫ�ֺ���
        window.jsonp[cbName] = function (data) {
            try {
                callback(data);
            } finally {
                script.parentNode.removeChild(script);
                delete window.jsonp[cbName];
            }
        };

        // ��url��ƴ�Ӳ���
        var src = tools.padStringToURL(url, data);

        // ��url��ƴ��jsonpcallback
        src = tools.padStringToURL(src, jsonpcallback + '=' + callbackName);

        // ��̬����script��ǩ����ӵ�html��
        var script = document.createElement('script');
        script.async = 'async';
        script.type = 'text/javascript';
        script.src = src;

        document.documentElement.appendChild(script);

    };

    // ������ ÿ�ε���jsonp���� ���ۼ�1
    var counter = 1;

    var tools = {
        padStringToURL: function (url, param) {
            param = this.encodeToURIString(param);
            if (!param) {
                return url;
            }
            return url + (/\?/.test(url) ? '&' : '?') + param;
        },
        encodeToURIString: function (data) {
            if (!data) {
                return '';
            }
            if (typeof data === 'string') {
                return data;
            }
            var arr = [];
            for (var n in data) {
                if (!data.hasOwnProperty(n)) continue;
                arr.push(encodeURIComponent(n) + '=' + encodeURIComponent(data[n]));
            }
            return arr.join('&');
        }
    }
})();
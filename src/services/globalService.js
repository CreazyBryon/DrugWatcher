
function HttpService(){
	var ret={};
    ret.query = function(config) {
        config = config || {};
        var params = formatParams(config.data);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var status = request.status;
                if (status >= 200 && status < 300) {
                    var res = JSON.parse(request.responseText);
                    config.success && config.success(res);
                } else {
                    return config.fail && config.fail(status);
                }
            }
        };
        request.open('GET', config.url + "?" + params, true);
        request.send(null);
    }

    ret.jsonp = function(config) {
        config = config || {};

        var params = formatParams(config.data);
        var Scrip=document.createElement('script');
        Scrip.src = config.url + "?" + params + '&callback=' + 'global.HttpService().jsonpCallback';
        this.callback = config.success;

        document.body.appendChild(Scrip);
    }

    ret.jsonpCallback = function(e) {
        this.callback(e);
    }

    ret.save = function(config) {
        config = config || {};

        var params = formatParams(config.data);
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var status = request.status;
                if (status >= 200 && status < 300) {
                    var res = JSON.parse(request.responseText);
                    console.log(res);
                    config.success && config.success(res);
                } else {
                    config.fail && config.fail(status);
                }
            }
        };
        request.open("POST", config.url, true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(params);
    }

    ret.uploadFile = function(cfg) {
        var config = cfg || {};
        var xhr;
        var fileObj = config.file; // js ��ȡ�ļ�����
        var url = config.url; // �����ϴ��ļ��ĺ�̨��ַ
        var form = new FormData(); // FormData ����
        form.append(config.name, fileObj); // �ļ�����
        xhr = new XMLHttpRequest();  // XMLHttpRequest ����
        xhr.open("post", url, true); //post��ʽ��urlΪ�����������ַ��true �ò����涨�����Ƿ��첽����
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    var res = JSON.parse(xhr.responseText);
                    console.log(res);
                    config.success && config.success(res);
                } else {
                    config.fail && config.fail(status);
                }
            }
        };
        xhr.send(form); //��ʼ�ϴ�������form����
    }

    var formatParams = function(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".", ""));
        return arr.join("&");
    }
	
	return ret;
}
 
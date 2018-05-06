'use strict';

let _userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/600.3.18 (KHTML, like Gecko) Version/8.0.3 Safari/600.3.18';
var _proxy = {
    Ip:null,
    Port:null,
    Login:null,
    Password:null
};

module.exports = class Globals{
    constructor(){}

    static GetUserAgent(){
        return _userAgent;
    }

    static SetUserAgent(value){
        _userAgent = value;
    }

    static GetProxy(){
        if(_proxy.Ip){
            return `https://${_proxy.Login}:${_proxy.Password}@${_proxy.Ip}:${_proxy.Port}`;
        }
        return null;
    }

    static SetProxy(value){
        _proxy = value;
    }
};
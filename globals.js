'use strict';

let _userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36';
let _proxy = {
    ip:null,
    port:null,
    login:null,
    password:null
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
            return `http://${_proxy.login ? _proxy.login : ''}:${_proxy.password ? _proxy.password : ''}@${_proxy.ip}:${_proxy.port}`;
        }
        return null;
    }

    static SetProxy(value){
        _proxy = value;
    }
};
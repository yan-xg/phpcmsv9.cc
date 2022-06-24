<!--
//xmlhttp鍜寈mldom瀵硅薄
var DedeXHTTP = null;
var DedeXDOM = null;
var DedeContainer = null;
var DedeShowError = false;
var DedeShowWait = false;
var DedeErrCon = "";
var DedeErrDisplay = "涓嬭浇鏁版嵁澶辫触";
var DedeWaitDisplay = "姝ｅ湪涓嬭浇鏁版嵁...";

//鑾峰彇鎸囧畾ID鐨勫厓绱�

function $DE(id) {
    return document.getElementById(id);
}

//gcontainer 鏄繚瀛樹笅杞藉畬鎴愮殑鍐呭鐨勫鍣�
//mShowError 鏄惁鎻愮ず閿欒淇℃伅
//DedeShowWait 鏄惁鎻愮ず绛夊緟淇℃伅
//mErrCon 鏈嶅姟鍣ㄨ繑鍥炰粈涔堝瓧绗︿覆瑙嗕负閿欒
//mErrDisplay 鍙戠敓閿欒鏃舵樉绀虹殑淇℃伅
//mWaitDisplay 绛夊緟鏃舵彁绀轰俊鎭�
//榛樿璋冪敤 DedeAjax('divid',false,false,'','','')

function DedeAjax(gcontainer,mShowError,mShowWait,mErrCon,mErrDisplay,mWaitDisplay)
{

    DedeContainer = gcontainer;
    DedeShowError = mShowError;
    DedeShowWait = mShowWait;
    if(mErrCon!="") DedeErrCon = mErrCon;
    if(mErrDisplay!="") DedeErrDisplay = mErrDisplay;
    if(mErrDisplay=="x") DedeErrDisplay = "";
    if(mWaitDisplay!="") DedeWaitDisplay = mWaitDisplay;


    //post鎴杇et鍙戦€佹暟鎹殑閿€煎
    this.keys = Array();
    this.values = Array();
    this.keyCount = -1;
    this.sendlang = 'gb2312';

    //璇锋眰澶寸被鍨�
    this.rtype = 'text';

    //鍒濆鍖杧mlhttp
    //IE6銆両E5
    if(window.ActiveXObject) {
        try { DedeXHTTP = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) { }
        if (DedeXHTTP == null) try { DedeXHTTP = new ActiveXObject("Microsoft.XMLHTTP");} catch (e) { }
    }
    else {
        DedeXHTTP = new XMLHttpRequest();
    }

    //澧炲姞涓€涓狿OST鎴朑ET閿€煎
    this.AddKeyN = function(skey,svalue) {
        if(this.sendlang=='utf-8') this.AddKeyUtf8(skey, svalue);
        else this.AddKey(skey, svalue);
    };
    
    this.AddKey = function(skey,svalue) {
        this.keyCount++;
        this.keys[this.keyCount] = skey;
        svalue = svalue+'';
        if(svalue != '') svalue = svalue.replace(/\+/g,'$#$');
        this.values[this.keyCount] = escape(svalue);
    };

    //澧炲姞涓€涓狿OST鎴朑ET閿€煎
    this.AddKeyUtf8 = function(skey,svalue) {
        this.keyCount++;
        this.keys[this.keyCount] = skey;
        svalue = svalue+'';
        if(svalue != '') svalue = svalue.replace(/\+/g,'$#$');
        this.values[this.keyCount] = encodeURI(svalue);
    };

    //澧炲姞涓€涓狧ttp璇锋眰澶撮敭鍊煎
    this.AddHead = function(skey,svalue) {
        this.rkeyCount++;
        this.rkeys[this.rkeyCount] = skey;
        this.rvalues[this.rkeyCount] = svalue;
    };

    //娓呴櫎褰撳墠瀵硅薄鐨勫搱甯岃〃鍙傛暟
    this.ClearSet = function() {
        this.keyCount = -1;
        this.keys = Array();
        this.values = Array();
        this.rkeyCount = -1;
        this.rkeys = Array();
        this.rvalues = Array();
    };


    DedeXHTTP.onreadystatechange = function() {
        //鍦↖E6涓笉绠￠樆鏂垨寮傛妯″紡閮戒細鎵ц杩欎釜浜嬩欢鐨�
        if(DedeXHTTP.readyState == 4){
            if(DedeXHTTP.status == 200)
            {
                if(DedeXHTTP.responseText!=DedeErrCon) {
                    DedeContainer.innerHTML = DedeXHTTP.responseText;
                }
                else {
                    if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay;
                }
                DedeXHTTP = null;
            }
            else { if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay; }
        }
        else { if(DedeShowWait) DedeContainer.innerHTML = DedeWaitDisplay; }
    };

    //妫€娴嬮樆鏂ā寮忕殑鐘舵€�
    this.BarrageStat = function() {
        if(DedeXHTTP==null) return;
        if(typeof(DedeXHTTP.status)!=undefined && DedeXHTTP.status == 200)
        {
            if(DedeXHTTP.responseText!=DedeErrCon) {
                DedeContainer.innerHTML = DedeXHTTP.responseText;
            }
            else {
                if(DedeShowError) DedeContainer.innerHTML = DedeErrDisplay;
            }
        }
    };

    //鍙戦€乭ttp璇锋眰澶�
    this.SendHead = function()
    {
        //鍙戦€佺敤鎴疯嚜琛岃瀹氱殑璇锋眰澶�
        if(this.rkeyCount!=-1)
        { 
            for(var i = 0;i<=this.rkeyCount;i++)
            {
                DedeXHTTP.setRequestHeader(this.rkeys[i],this.rvalues[i]);
            }
        }
        銆€if(this.rtype=='binary'){
        銆€DedeXHTTP.setRequestHeader("Content-Type","multipart/form-data");
    }else{
        DedeXHTTP.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
};

//鐢≒ost鏂瑰紡鍙戦€佹暟鎹�
this.SendPost = function(purl) {
    var pdata = "";
    var i=0;
    this.state = 0;
    DedeXHTTP.open("POST", purl, true);
    this.SendHead();
    //post鏁版嵁
    if(this.keyCount!=-1)
    {
        for(;i<=this.keyCount;i++)
        {
            if(pdata=="") pdata = this.keys[i]+'='+this.values[i];
            else pdata += "&"+this.keys[i]+'='+this.values[i];
        }
    }
    DedeXHTTP.send(pdata);
};

//鐢℅ET鏂瑰紡鍙戦€佹暟鎹�
this.SendGet = function(purl) {
    var gkey = "";
    var i=0;
    this.state = 0;
    //get鍙傛暟
    if(this.keyCount!=-1)
    { 
        for(;i<=this.keyCount;i++)
        {
            if(gkey=="") gkey = this.keys[i]+'='+this.values[i];
            else gkey += "&"+this.keys[i]+'='+this.values[i];
        }
        if(purl.indexOf('?')==-1) purl = purl + '?' + gkey;
        else  purl = purl + '&' + gkey;
    }
    DedeXHTTP.open("GET", purl, true);
    this.SendHead();
    DedeXHTTP.send(null);
};

//鐢℅ET鏂瑰紡鍙戦€佹暟鎹紝闃诲妯″紡
this.SendGet2 = function(purl) {
    var gkey = "";
    var i=0;
    this.state = 0;
    //get鍙傛暟
    if(this.keyCount!=-1)
    { 
        for(;i<=this.keyCount;i++)
        {
            if(gkey=="") gkey = this.keys[i]+'='+this.values[i];
            else gkey += "&"+this.keys[i]+'='+this.values[i];
        }
        if(purl.indexOf('?')==-1) purl = purl + '?' + gkey;
        else  purl = purl + '&' + gkey;
    }
    DedeXHTTP.open("GET", purl, false);
    this.SendHead();
    DedeXHTTP.send(null);
    //firefox涓洿鎺ユ娴媂HTTP鐘舵€�
    this.BarrageStat();
};

//鐢≒ost鏂瑰紡鍙戦€佹暟鎹�
this.SendPost2 = function(purl) {
    var pdata = "";
    var i=0;
    this.state = 0;
    DedeXHTTP.open("POST", purl, false);
    this.SendHead();
    //post鏁版嵁
    if(this.keyCount!=-1)
    {
        for(;i<=this.keyCount;i++)
        {
            if(pdata=="") pdata = this.keys[i]+'='+this.values[i];
            else pdata += "&"+this.keys[i]+'='+this.values[i];
        }
    }
    DedeXHTTP.send(pdata);
    //firefox涓洿鎺ユ娴媂HTTP鐘舵€�
    this.BarrageStat();
};


} // End Class DedeAjax

//鍒濆鍖杧mldom
function InitXDom() {
    if(DedeXDOM!=null) return;
    var obj = null;
    // Gecko銆丮ozilla銆丗irefox
    if (typeof(DOMParser) != "undefined") { 
        var parser = new DOMParser();
        obj = parser.parseFromString(xmlText, "text/xml");
    }
    // IE
    else { 
        try { obj = new ActiveXObject("MSXML2.DOMDocument");} catch (e) { }
        if (obj == null) try { obj = new ActiveXObject("Microsoft.XMLDOM"); } catch (e) { }
    }
    DedeXDOM = obj;
};



//璇诲啓cookie鍑芥暟
function GetCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end   = document.cookie.indexOf(";",c_start);
            if (c_end == -1)
            {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return null
}

function SetCookie(c_name,value,expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" +escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()); //浣胯缃殑鏈夋晥鏃堕棿姝ｇ‘銆傚鍔爐oGMTString()
}

-->
/****************************************************
 *  Local constants definition
 ****************************************************/
var LOCAL_CONSTANT = {
    IOT_HOST : 'thingspeak.com'
};

/****************************************************
 *  Local variables definition
 ****************************************************/
var Wifi_Module = require('wifi');
var Esp8266 = require('ESP8266');

/****************************************************
 *  Local functions definition
 ****************************************************/

/****************************************************
 *  Class definition
 ****************************************************/
function iot_wrapper(channel_id, channel_key, write_key, read_key, talkback_id, talkback_key) 
{
    this.channel_id     = channel_id || null;
    this.channel_key    = channel_key || null;
    this.write_key      = write_key || null;
    this.read_key       = read_key || null;
    this.talkback_id    = talkback_id || null;
    this.talkback_key   = talkback_key || null;
}

/****************************************************
 *  Exported constants definition
 ****************************************************/
iot_wrapper.prototype.err_code = {
    NO_ERR                  : 0,
    ERR_SSID_EMPTY          : -1,
    ERR_WIFI_CONN_FAILED    : -2,
}

/****************************************************
 *  Exported functions definition
 ****************************************************/

/****************************************************
 *  connWifi function definition
 ****************************************************/
iot_wrapper.prototype.connWifi = function (ssid, pass, callback) 
{
    /* This function is used to connect to AP for access internet
     * If the ssid is null -> return error code via callback then return false.
     * Is the ssid is valid -> try to connect to AP. return status via callback
     *      and return true if connecting successfully else return false.
     */
    var ret = true;

    if ((null == ssid) || ('' == ssid)) 
    {
        if (null != callback) 
        {
            callback(this.err_code.ERR_SSID_EMPTY);
        }
        ret = false;
    } 
    else /* ((null == ssid) || ('' == ssid)) */
    {
        Wifi_Module.connect(ssid, pass, null, callback);
    }

    return ret;
}

/****************************************************
 *  Export class with create function
 ****************************************************/
exports.create = function (channel_id, channel_key, write_key, read_key, talkback_id, talkback_key)
{
    return new iot_wrapper(channel_id, channel_key, write_key, read_key, talkback_id, talkback_key);
};
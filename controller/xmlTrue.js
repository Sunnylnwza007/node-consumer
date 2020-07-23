var xml2js = require("xml2js");
var builder = new xml2js.Builder({xmldec:{'version': '1.0', 'encoding': 'TIS-620'}});

exports.convertJSONToXML = (json)=>{
    return new Promise((resolve, reject) => {
        try {
          var message = {
            message: {
              sms: {$: {type: 'mt'},
                "service-id": "0302480001",
                destination: {
                  address: {
                    number: {
                      $: {
                        type: "international",
                      },
                      _: json.TO,
                    },
                  },
                },
                source: {
                  address: {
                    number: {
                      $: {
                        type: "abbreviated",
                      },
                      _: json.TO,
                    },
                    originate: {
                      $: {
                        type: "international",
                      },
                      _: json.TO,
                    },
                    sender: json.FROM,
                  },
                },
                ud: {
                  $: {
                    type: "text",
                    encoding: "TIS-620",
                  },
                },
                dro: true,
              },
            },
          };
          // var js2xml = new Js2Xml("message", message);
          var xml = builder.buildObject(message);
    
          resolve(xml);
        } catch (error) {
          reject(error);
        }
      });
}
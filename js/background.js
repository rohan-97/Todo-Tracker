chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.action == "authenticate")
        fetch("https://jira.protegrity.com:8443/rest/api/2/issue/createmeta",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Basic "+btoa("rohan.yadav:Hulk@1234"),
            }
        })
        .then(data=>{return data.json()})
        .then(data=>sendResponse({resp: data}));
        // $.get('https://jira.protegrity.com:8443/rest/api/2/issue/createmeta', {
        //     "Content-Type": "application/json"
        // }, function (data, textStatus, jqXHR) {
        // });

    });
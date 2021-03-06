var consentVersion = "1.2"

function processConsent() {
  var data = {
    analytics: document.querySelector('#consent_analytics').checked,
    ads: document.querySelector('#consent_ads').checked,
    onesignal: document.querySelector('#consent_onesignal').checked,
    vidpulse: document.querySelector('#consent_vidpulse').checked,
    thirdparty: document.querySelector('#consent_thirdparty').checked
  }
  localStorage.setItem("consent-v" + consentVersion, JSON.stringify(data));
  console.log(data);
  location.reload();
}

function ask4consent(callback, failback) {
  if (!localStorage.getItem("consent-v" + consentVersion) && !(location.search || location.hash || "").match(/settings|history|future|search|^$/g)) {
    failback();
    document.getElementsByTagName("body")[0].innerHTML += '<div id="consent" class="modal modal-fixed-footer"> <div class="modal-content"> <h3 class="header">Before you continue...</h3> <p class="flow-text">To comply with <a href="https://www.eugdpr.org/" target="_blank">EU\'s GDPR law</a>, We need to ask you for consent to use following services:</p> <ul class="collection"> <li class="collection-item avatar"> <i class="fas fa-archive circle yellow"></i> <span class="title">Cookies</span> <p>Allow us to save data between your sessions. (We need it to hide this message on your next visit 😊 ) <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank">What are cookies?</a></p> <a class="secondary-content"> <label> <input id="consent_cookie" type="checkbox" disabled="" checked=""> <span>Allow</span> </label></a> </li> <li class="collection-item avatar"> <i class="far fa-chart-bar circle green"></i> <span class="title">Google Analytics</span> <p>Gives us an insight into how users use the site. Data collected is 100% anonymous and is not used to target you. <a href="https://policies.google.com/privacy" target="_blank">Read the service Privacy Policy here.</a></p> <a href="#!" class="secondary-content"></a><a class="secondary-content"><label> <input id="consent_analytics" type="checkbox" checked=""> <span>Allow</span> </label></a> </li> <li class="collection-item avatar"> <i class="fab fa-google circle blue"></i> <span class="title">Google Ads</span> <p>Allows us to monetize the site content via 2 ad blocks. We are not using personalized ads. If you don\'t want it, consider supporting us on <a style="color:#F96854 !important" href="https://www.patreon.com/bePatron?u=3533463" target="_blank">Patreon!</a> <a href="https://policies.google.com/privacy" target="_blank">Read the service Privacy Policy here.</a></p> <a href="#!" class="secondary-content"></a><a class="secondary-content"> <label> <input id="consent_ads" type="checkbox" checked=""> <span>Allow</span> </label></a> </li> <li class="collection-item avatar"> <i class="far fa-bell circle red"></i> <span class="title">OneSignal</span> <p>Get launch notifications and updates about launches and spaceflight news right to your device. <a href="https://onesignal.com/privacy_policy" target="_blank">Read the service Privacy Policy here.</a></p> <a class="secondary-content"> <label> <input id="consent_onesignal" type="checkbox" checked=""> <span>Allow</span> </label></a> </li> <li class="collection-item avatar"> <i class="fas fa-video circle orange"></i> <span class="title">Vidpulse</span> <p>Video recomendations at the end of each launch videos - helps you find more great content! <a href="https://www.vidpulse.com/privacy.html" target="_blank">Read the service Privacy Policy here.</a></p> <a class="secondary-content"> <label> <input id="consent_vidpulse" type="checkbox" checked=""> <span>Allow</span> </label></a> </li> <li class="collection-item avatar"> <i class="fab fa-twitter circle yellow"></i> <span class="title"><a href="https://policies.google.com/privacy" target="_blank">YouTube</a>, <a href="https://twitter.com/en/privacy" target="_blank">Twitter</a>, <a href="https://widgetbot.io/legal/privacy-policy/" target="_blank">Widgetbot</a> and other embeds on this site.</span> <p>Embeds and widgets provide the core functionality of this site. 3rd pary scripts allow us to embed Twitter, Reddit and Discord feeds right on the site. </p> <a class="secondary-content"> <label> <input id="consent_thirdparty" type="checkbox" checked="" disabled=""> <span>Allow</span> </label></a> </li> </ul> <p class="flow-text">This site itself does not store nor process any user data. The services you give us consent to use help enrich your experience and give us insight into what we should improve on. If you have any questions, join our <a style="color:#7289DA !important" href="https://discord.io/rocketwatch" target="_blank">Discord server</a> or contact us <a href="mailto:contact@rocket.watch" target="_blank">via email</a>.</p> </div> <div class="modal-footer"> <a onclick="processConsent();" class="modal-action modal-close waves-effect waves-green btn-flat green-text">I Agree.</a> <a class="modal-action modal-close waves-effect waves-red btn-flat grey-text">I\'ll do it next time.</a></div> </div>';

    var instance = M.Modal.init(document.querySelector('#consent'));
    instance.open();

  } else {
    callback()
  }
}

if (typeof(Storage) !== "undefined") {
  if (localStorage.getItem("consent-v" + consentVersion)) {


    var data = JSON.parse(localStorage.getItem("consent-v" + consentVersion));
    if (data.analytics) {
      getScript(["https://rocket.watch/external/analytics.js"]).then(function() {
        console.log("Sent pageview: " + location.pathname + location.search + location.hash);
        ga("create", "UA-71778687-10", "auto");
        ga('send', 'pageview', {
          'page': location.pathname + location.search + location.hash,
          'hitCallback': function() {
            if (window.location.search.indexOf('utm_') != -1 && history.replaceState) {
              history.replaceState({}, '', window.location.toString().replace(/(\&|\?)utm([_a-z0-9=]+)/g, ""));
            }
          }
        });
        window.addEventListener("hashchange", function() {
          ga('send', 'pageview', {
            'page': location.pathname + location.search + location.hash,
            'hitCallback': function() {
              if (window.location.search.indexOf('utm_') != -1 && history.replaceState) {
                history.replaceState({}, '', window.location.toString().replace(/(\&|\?)utm([_a-z0-9=]+)/g, ""));
              }
            }
          });
          console.log("Sent pageview: " + location.pathname + location.search + location.hash);
        });
      });
    }

    if (data.ads) {
      getScript(["https://rocket.watch/external/promotion.js"]).then(function() {
        (adsbygoogle = window.adsbygoogle || []).push({});
        console.log("adsbygoogle");
      });
      (adsbygoogle = window.adsbygoogle || []).push({});
    }

    if (data.onesignal) {
      getScript(["https://rocket.watch/external/notifications.js"]).then(function() {
        OneSignal.push(function() {
          OneSignal.provideUserConsent(true)
          OneSignal.init({
            appId: "d15cb12b-085c-4f0b-a40a-45dbdcba9e7c",
            autoRegister: true
          })

          if (localStorage.getItem("rocketwatch.Settings")) {
            OneSignal.isPushNotificationsEnabled(function(isEnabled) {
              var $settings = JSON.parse(localStorage.getItem("rocketwatch.Settings"));
              if ($settings && isEnabled) {
                OneSignal.sendTags(Object.assign($settings, data)).then(function(tagsSent) {
                  console.log("[Settings] Tags synchronised");
                  console.log(tagsSent);
                });
              }
            });
          }
        });
      })
    }

    if (data.vidpulse) {
      getScript(["https://rocket.watch/external/vidpulse.js"]).then(function() {
        vidpulse('create', 'vp_G2wrV4');
        console.log("vidpulse");
      });
    }

    if (data.thirdparty) {
      getScript(["https://platform.twitter.com/widgets.js", "https://crate.widgetbot.io/v2"]).then(function() {
        twttr.widgets.load();

        document.querySelector("#widgetbot").src = "https://cl2.widgetbot.io/channels/150674920869724161/350212847436955649/";

        window.discordcrate = new Crate({
          server: '150674920869724161',
          channel: '350214871276716032',
          notifications: {
            toasts: {
              enable: false
            }
          }
        });
        document.getElementById("discordopen").removeAttribute("href");
        document.getElementById("discordopen").onclick = function() {
          window.discordcrate.toggle(true);
          document.querySelector(".crate-toggle").style.display = "unset";
        };
      });
    }

    function getScript(scripts) {
      return scripts.reduce(function(currentPromise, scriptUrl) {
        return currentPromise.then(function() {
          return new Promise(function(resolve, reject) {
            if (!document.getElementById(scriptUrl.split("://")[1].split(".js")[0])) {
              var script = document.createElement('script');
              script.async = true;
              script.src = scriptUrl;
              script.id = scriptUrl.split("://")[1].split(".js")[0]
              script.onload = function() {
                resolve()
              };
              document.getElementsByTagName('head')[0].appendChild(script);
            } else {
              resolve()
            }
          });
        });
      }, Promise.resolve());
    };
  }
}

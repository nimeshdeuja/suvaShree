// Older Version of Firebase is 3.5.2
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/firebase/8.8.1/firebase-app.min.js"
);
importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/firebase/8.8.1/firebase-messaging-sw.min.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBn5QPn8TYayEIz_WcuyIIceHpKwecjp54",
  authDomain: "shopkeeper-19a1a.firebaseapp.com",
  projectId: "shopkeeper-19a1a",
  storageBucket: "shopkeeper-19a1a.appspot.com",
  messagingSenderId: "615752045079",
  appId: "1:615752045079:web:b453542e3dfe94c21dc252",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    logo: "https://unprint.pt/static/media/logo.4af0ed03.png",
    data: {
      url: "https://client.unprint.pt/invoices",
    },
    actions: [
      {
        action: "open_url",
        title: payload.notification.title,
      },
    ],
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == "/" && "focus" in client) {
            client.focus();
            break;
          }
        }
        if (clients.openWindow)
          return clients.openWindow("https://client.unprint.pt/invoices");
      })
  );
});

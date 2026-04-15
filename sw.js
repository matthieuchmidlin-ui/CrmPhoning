// Commercial Pro — Service Worker
const CACHE = 'commercial-pro-v1';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(clients.claim());
});

// Réception d'un message depuis l'app
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFS') {
    // Stocker les données dans le SW
    self.cpData = e.data.payload;
  }
});

// Alarm check toutes les minutes via periodic sync ou fetch trick
self.addEventListener('periodicsync', function(e) {
  if (e.tag === 'check-relances') {
    e.waitUntil(checkAndNotify());
  }
});

// Fallback : push event si serveur push disponible
self.addEventListener('push', function(e) {
  var data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || '📞 Commercial Pro', {
      body: data.body || '',
      icon: '/commercial-pro/icon-192.png',
      badge: '/commercial-pro/icon-192.png',
      tag: data.tag || 'cp-notif',
      requireInteraction: true,
      data: data
    })
  );
});

// Clic sur notification → ouvrir l'app
self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      for (var c of list) {
        if (c.url.includes('commercial-pro') && 'focus' in c) return c.focus();
      }
      return clients.openWindow('/commercial-pro/');
    })
  );
});

async function checkAndNotify() {
  // Lire données depuis IndexedDB ou message précédent
  var data = self.cpData;
  if (!data) return;

  var today = toDateStr(new Date());
  var now = new Date();
  var nowH = now.getHours(), nowM = now.getMinutes();

  // Relances
  (data.calls || []).forEach(function(call) {
    if (!call.followup || call.status === 'Clôturé' || call.status === 'Effectué') return;
    var key = 'notif_' + call.id + '_' + call.followup;
    if (call.followup <= today) {
      self.registration.showNotification('📞 Relance — ' + (call.contact || call.company || ''), {
        body: call.followup < today ? '⚡ En retard !' : 'Relance prévue aujourd\'hui',
        tag: key, requireInteraction: true
      });
    }
  });

  // RDV dans 30 min
  (data.rdvs || []).forEach(function(r) {
    if (!r.time || r.date !== today) return;
    var parts = r.time.split(':'), rH = parseInt(parts[0]), rM = parseInt(parts[1]);
    var nH = rH, nM = rM - 30;
    if (nM < 0) { nM += 60; nH--; }
    if (nowH === nH && nowM === nM) {
      self.registration.showNotification('📅 RDV dans 30 min — ' + (r.contact || r.company), {
        body: '🕐 ' + r.time + (r.addr ? '\n📍 ' + r.addr : ''),
        tag: 'rdv_' + r.id, requireInteraction: true
      });
    }
  });
}

function toDateStr(d) {
  var pad = function(n) { return n < 10 ? '0' + n : '' + n; };
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

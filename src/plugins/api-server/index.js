const http = window.nw.require('http');
const cryptoNode = window.nw.require('crypto');

export default function init(sdk) {
  const { db, crypto, ui } = sdk;

  const getMasterToken = async () => {
    const session = await db.findOne({ type: 'session' });
    if (!session?.token) return null;
    return cryptoNode
      .createHash('sha256')
      .update(session.token.substring(0, 10))
      .digest('hex')
      .substring(0, 16);
  };

  const send = (res, data, code = 200) => {
    res.statusCode = code;
    res.end(JSON.stringify(typeof data === 'string' ? { error: data } : data));
  };

  const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') return send(res, null, 204);

    try {
      const masterToken = await getMasterToken();
      if (!masterToken) return send(res, 'Session not found', 500);

      const providedToken = req.headers.authorization?.split(' ')[1];
      if (providedToken !== masterToken) return send(res, 'Invalid API Token', 401);

      const url = new URL(req.url, `http://${req.headers.host}`);
      const siteQuery = url.searchParams.get('site');

      if (req.method === 'GET' && siteQuery) {
        const records = await db.find({
          type: 'password',
          site: new RegExp(siteQuery, 'i'),
        });
        const results = records.map((rec) => ({
          site: rec.site,
          login: rec.login,
          password: crypto.decrypt(rec.value),
        }));
        return send(res, results);
      }

      send(res, 'Not Found', 404);
    } catch (err) {
      send(res, err.message, 500);
    }
  });

  server.listen(64820, '127.0.0.1', async () => {
    const token = await getMasterToken();
    if (token) {
      ui.notify(`Server started`, 'success');
      setTimeout(() => {
        window.nw.Clipboard.get().set(token, 'text');
        ui.notify(`API Key: ${token} has been copied to clipboard.`, 'success');
      }, 2000);
    } else {
      ui.notify('Please sign in to start API server!', 'error');
    }
  });

  return () => {
    if (server.listening) {
      if (server.closeAllConnections) server.closeAllConnections();
      if (server.closeIdleConnections) server.closeIdleConnections();
      server.close();
      ui.notify('Server stopped', 'success');
    }
    server.unref();
  };
}

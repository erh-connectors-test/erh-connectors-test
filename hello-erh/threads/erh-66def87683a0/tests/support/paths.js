// Resolves index.html under test. Override with INDEX_HTML env var.
const path = require('path');
const fs = require('fs');
const candidates = [
  process.env.INDEX_HTML,
  path.resolve(__dirname, '../../../../impl/index.html'), // threads/<tid>/tests/support -> hello-erh/impl
  path.resolve(__dirname, '../../index.html'),            // impl/tests/support -> impl
].filter(Boolean);
const INDEX = candidates.find((p) => fs.existsSync(p)) || candidates[0];
module.exports = { INDEX, IMPL_DIR: path.dirname(INDEX), URL: 'file://' + INDEX };

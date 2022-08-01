'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PUBLIC_PATH: '"/"',
  VERSION: '"0.001.001"',
  PORT: 14500,

  // dev
  // BASE_API: '"http://data-hub-lb-9124673-c31a9b21fbe3.kr.lb.naverncp.com"',
  // AUTH_BASE_API: '"https://auth.echoss.net"',// STAG
  // CLIENT_ID: '"lab-t01"',
  // CLIENT_SECRET: "'OlxMRryGi96JK31Fc3A2B4R23wAJ4Chw7JYM294Ty53'",
  // EXPIRE_MIN: 30,

  // staging
  // BASE_API: '"http://api-smartfarm.echoss.com"',
  BASE_API: '"http://localhost:8080',
  AUTH_BASE_API: '"https://auth.echoss.net"',// STAG
  CLIENT_ID: '"lab-smartfarm"',
  CLIENT_SECRET: "'qLYBU46kR903RML2NxKtHz71EiZzP6rydg1xkylvj54'",
  EXPIRE_MIN: 30,

  // prod
  // BASE_API: '"http://data-hub-lb-9124673-c31a9b21fbe3.kr.lb.naverncp.com"',
  // AUTH_BASE_API: '"https://auth.echoss.net"',// STAG
  // CLIENT_ID: '"lab-t01"',
  // CLIENT_SECRET: "'OlxMRryGi96JK31Fc3A2B4R23wAJ4Chw7JYM294Ty53'",
  // EXPIRE_MIN: 30,

  ROUTER_MODE: '"history"'
})

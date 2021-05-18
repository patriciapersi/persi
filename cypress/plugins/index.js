/// <reference types="cypress" />
const runQuery = require('./run-query');
const reloadDB = require('./reload-db');
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile (file) {
  const pathToConfigFile = path.resolve('config', `${file}.json`)
  return fs.readJson(pathToConfigFile)
}

module.exports = (on, config) => {  
  
  // const file = config.env.configFile || 'prod'

  on('task', {
    query: runQuery(config),
    reloadDB: reloadDB(config)
  })
  // return getConfigurationByFile(file);
}

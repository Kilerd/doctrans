#!/usr/bin/env babel-node
import commander from 'commander';
import * as utils from './utils';
import { startServer } from './editserver';
import fs from 'fs';


commander
  .version('0.0.1')

commander
  .command('server')
  .option('-P --port [port]', 'the port listening')
  .action( async (options) => {
    let config = await utils.read('./.doctrans.json');
    let port = options.port || config.port || 4000;
    startServer(config, port);
  })
commander
  .command('init')
  .option("-S, --source <path>", "", './_doc')
  .option("-D, --dist <path>", "", './doc')
  .option('-L, --language [language]', '', 'en')
  .action(async (options) => {
    const config = {
      source: options.source,
      dist: options.dist,
      articles: {},
      defaultLanuage: options.language,
      languages: [options.language]
    }
    await utils.write('.doctrans.json', config);
    if (!fs.existsSync(utils.resolvePath(config.source))){
      fs.mkdirSync(utils.resolvePath(config.source));
  }
  })

commander
  .command('build')
  .option('-D --dist <path>', 'dist path')
  .action(async (options) => {
    const config = await utils.read(utils.resolvePath('.doctrans.json'));
    const dist = options.dis || config.dist;
    console.log(utils.resolvePath(dist))
  })
commander.parse(process.argv);

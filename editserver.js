import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import KoaBody from 'koa-body';
import fs from 'fs';
import { write, read, resolvePath, changeConfig } from './utils';

export const startServer = async (config, port) => {
  
  const app = new Koa();
  const router = new Router();

  app.use(cors());
  app.use(KoaBody());

  // load configuration
  router.get('/config', async (ctx, next) => {
    ctx.body = config;
  })

  // load article
  router.get('/articles/:file', async (ctx, next) => {
    try {
      const file = ctx.params.file;
      const data = await read(resolvePath(config.source, `${file}.json`));
      ctx.body = data;
    }catch(e){
      ctx.body = {
        'status': 'error'
      }
    }
  })

  // save article
  router.post('/articles', async (ctx, next) => {
    
    let { name, file, data } = ctx.request.body;
    console.log(name, file, data, name && file && data);
    if ((name && file && data) === undefined) {
      ctx.body = {
        status: 'missing parameter'
      }
    } else {
      try {
        const articleData = await read(resolvePath(config.source, `${file}.json`));
        articleData.markdown = data || '';
        await write(resolvePath(config.source, `${file}.json`), articleData);
        ctx.body = {
          'status': 'ok'
        }
      }catch (e) {
        try{
          await write(resolvePath(config.source, `${file}.json`), { markdown: data || '', translations: {} });
          ctx.body = {
            'status': 'ok'
          }
        } catch (e) {
          ctx.body = {
            'status': 'error'
          }
          return;
        }
      }
      config.articles[file] = name;
      await changeConfig(config);
    }
  })

  // delete article
  router.delete('/articles/:file', async (ctx, next) => {
    try {
      delete config.articles[ctx.params.file];
      await changeConfig(config);
      fs.unlinkSync(resolvePath(config.source, `${ctx.params.file}.json`));
      ctx.body = {
        'status': 'ok'
      }
    }catch (e) {
      ctx.body = {
        'status': 'error'
      }
    }
  })

  // add language
  router.post('/languages', async (ctx, next) => {

    let { language } = ctx.request.body;
    if ((language) == undefined) {
      ctx.body = {
        'status': 'missing parameter'
      }
    } else {
      if (!Array.isArray(language)){
        language = [language]
      }
      if (!language.includes(config.defaultLanguage)) {
        language.push(config.defaultLanguage)
      }
      config.languages = language
      console.log(config)
      await changeConfig(config)
      ctx.body = {
        'status': 'ok'
      }
    }

  })

  // add/change translation
  router.post('/articles/:file/translations', async (ctx, next) => {
    const file = ctx.params.file;
    const { version, language, content } = ctx.request.body;
    if ((version || language || content) == undefined) {
      ctx.body = {
        'status': 'missing parameter'
      }
    } else {
      try {
        let article = await read(resolvePath(config.source, `${file}.json`));
        if (!article.translations[version]) {
          article.translations[version] = {};
        }
        article.translations[version][language] = content;

        await write(resolvePath(config.source, `${file}.json`), article);
        ctx.body = {
          'status': 'ok'
        }
      }catch (e) {
        ctx.body = {
          'status': 'error'
        }
      }
      
    }
  })

  // delete translation
  router.delete('/articles/:file/translations', async (ctx, next) => {
    const { version } = ctx.request.body;
    if (version == undefined) {
      ctx.body = {
        'status': 'missing parameter'
      }
    } else {
      try {
        let article = await read(resolvePath(config.source, `${file}.json`));
        delete article.translations[version];
        await write(resolvePath(config.source, `${file}.json`), article);
        ctx.body = {
          'status': 'ok'
        }
      } catch (e) {
        ctx.body = {
          'status': 'error'
        }
      }
    }
  })

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(port);
}
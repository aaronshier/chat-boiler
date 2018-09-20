# Instalation
1. Upload `/chat_server` to your server
2. In the terminal on your server navigate to `/chat_server` and type `npm install`
3. As if Seo 18th Material UI requires your runtime helpers to be in a folder titled `/builtin` that you create yourself.  Instructions bellow in Bugs/Fixes
4. Open `/chat_server/src/config/index.js` and change `export const server = 'https://www.yourdomain.com/'` to your domain.  Do the same with `export const wsURL = 'ws://ohshutit.app/ws'`

## Bugs/Fixes
Material UI's current release has an issue with @babel/runtime that causes an error to be thrown saying files are missing.  They arent... they're just in a subfolder in the newest @babel/runtime. The easiest solution is to go to node_modules/@babel/runtime/helpers and create a folder called /builtin manually, then copy the contents of the /helpers folder to the helpers/builtin/ folder. *** Magical ***

more about this issue here:
https://stackoverflow.com/questions/51686071/babel-js-file-cant-resolve-babel-runtime-helpers-builtin-classcallcheck/51798775#51798775
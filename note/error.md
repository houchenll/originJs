
### SyntaxError: Cannot use import statement outside a module
reason: All of the JavaScript files, in which you use the ES6 modules syntax, have to be loaded with the type attribute 
set to module.
fix: 根目录下生成package.json，根节点下添加 "type": "module"

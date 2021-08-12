const path = require("path")

require('source-map-support').install();

const moduleAlias = require('module-alias')

moduleAlias.addAlias('@procs', path.join(__dirname, "/src/procs/index.ts"))

require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'es2020',
        esModuleInterop: true,
        sourceMap: true,
    },
})

require("dotenv").config({ path: ".env.development" })

module.exports = require('./gatsby-config.ts');

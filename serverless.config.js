const path = require('path');
const nodeExternals = require('webpack-node-externals');
const kebabCase = require('lodash.kebabcase');
const startCase = require('lodash.startcase');
const {
    name, 
    customServerlessConfig,
    dependencies,
} = require("./package.json");


const { profile, region, layer, functions } = customServerlessConfig;

const runtime = 'nodejs12.x';

const resourceName = startCase(kebabCase(name)).replace(/[\W]+/g,'');

const kebabName = kebabCase(name);

const lambdaLayerName = `${kebabName}-layer`;

const alias = {
    '@': path.resolve(__dirname),
    'src': path.resolve(__dirname, 'src'),
};

const dependencyKeys = Object.keys(dependencies);

const externals = [nodeExternals()];

dependencyKeys.forEach(depKey => {
    alias[depKey] = path.resolve(__dirname, `node_modules/${depKey}`);
});

console.log(alias);

const serverless = () => {
    
    const config = {
        service: kebabName,
        profile,
        runtime,
        region,
    };

    // console.log('serverless.config.js - serverless ', config);

    return config;
};

const serverlessLayer = () => {
    
    console.log({ functions });

    const config = {
        service: lambdaLayerName,
        profile,
        runtime,
        region,
        layers: {
            [resourceName]: {
                name: `${lambdaLayerName}-${process.env.SLS_STAGE}`,
                path: `.webpack/${lambdaLayerName}`,
                description: `${resourceName} Lambda Layer`,
                compatibleRuntimes: [
                    customServerlessConfig.runtime || runtime,
                ],
                retain: false
            }
        },
        functions,
    };
    
    // console.log('serverless.config.js - serverlessLayer ', config);
    
    return config;
}

const webpackConfig = () => {
    
    const config = {
        externals,
        resolve: {
            alias: {
                ...alias,
                [name]: path.resolve(__dirname, layer.entry)
            }
        }
    };

    console.log('serverless.config.js - webpackConfig ', config);

    return config;
};

const webpackLayerConfig = () => {

    const config = {
        entry: {
            [`${lambdaLayerName}/nodejs/node_modules/${kebabName}/index`]: `./${layer.entry}`
        },
        resolve: {
            alias,
        },
        copyPluginConfig: {
            patterns: dependencyKeys.map(key => ({
                from: `node_modules/${key}`, 
                to: `${lambdaLayerName}/nodejs/node_modules/${key}`
            })),
        },
    };

    console.log('serverless.config.js - webpackLayerConfig ', config);

    return config;
};

module.exports = {
    serverless,
    serverlessLayer,
    webpackConfig,
    webpackLayerConfig,
};
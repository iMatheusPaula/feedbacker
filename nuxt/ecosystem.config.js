module.exports = {
    apps: [
        {
            name: 'NuxtAppName',
            exec_mode: 'cluster', 
            instances: 'max',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            env: {
                NODE_ENV: "production",
                HOST: '47.254.124.113',
                PORT: 3000
            }
        }
    ]
}

module.exports = {
  apps: [
    {
      name: 'jaoweb-status-v2',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
    },
  ],
}

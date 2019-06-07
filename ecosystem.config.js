module.exports = {
  apps: [{
    name: 'average-joes',
    script: 'node ./bin/www'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-203-50-176.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/averagejoes.pem',
      ref: 'origin/master',
      repo: 'git@github.com:jfonta9/average-joes.git',
      path: '/home/ubuntu/average-joes',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
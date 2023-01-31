require('dotenv').config()
const development = {
    name:"development",
    asset_path:"/assets",
    db: 'studentdb_development',
    cluster_host:'Joyous',
    cluster_pass:process.env.CLUSTER_PASSWORD
}

const production = {
    name:"production",
    asset_path:"/assets",
    db: 'studentdb_production',
    cluster_host:'Joyous',
    cluster_pass:process.env.CLUSTER_PASSWORD
}


module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
import devConfig from './config.dev'
import prodConfig from './config.prod'

export default process.env.ENV === 'PROD' ? prodConfig : devConfig
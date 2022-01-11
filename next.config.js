const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    DB_LOCAL_URI: 'mongodb://localhost:27017/ecommerce',
    CLOUDINARY_CLOUD_NAME: 'sachin-essitco',
    CLOUDINARY_API_KEY: '554157717391829',
    CLOUDINARY_API_SECRET: 'HXMe887Klqof_Kq2IR6gdYVOJxA',
    NEXTAUTH_URL: 'https://example.com/'
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}
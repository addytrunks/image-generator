/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        esmExternals:'loose'
    },
    images:{
        domains:['res.cloudinary.com']
    }
}

module.exports = nextConfig

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // HTTP到HTTPS重定向配置
  async redirects() {
    return [
      // 强制所有HTTP流量重定向到HTTPS
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://daysfromtoday.tools/:path*',
        permanent: true,
      },
    ]
  },
  
  // 安全头配置
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  }
};

export default nextConfig;

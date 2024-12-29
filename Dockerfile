# 使用指定的 Node.js 版本
FROM docker.io/library/node:20-alpine

# 设置工作目录
WORKDIR /app

ENV NODE_ENV=development

# 复制当前目录内容到 /app 目录
COPY . /app

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN cd /app && rm -rf pnpm-lock.yaml .pnpm-store node_modules && pnpm --registry https://registry.npmmirror.com install

RUN cd /app && pnpm db:generate

# 构建项目
RUN pnpm build

RUN cd /app && pnpm --registry https://registry.npmmirror.com install
# 设置环境变量（可选，根据你的实际需求）
ENV NODE_ENV=production

# 暴露应用程序运行的端口（根据你的实际应用端口设置）
EXPOSE 3000

# 运行应用程序
CMD ["node", "apps/web/.output/server/index.mjs"]

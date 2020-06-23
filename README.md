## Project Structure
```
.
├── server.js                       * 项目启动
├── testServer.js                   * 测试项目启动
├── auth.js                         * 权限认证
├── .env                            * 环境配置文件（重要）
├── package.json
├── admin/
|   ├── handlers/                   
|   |   └── home.js                 * API接口文件
|   └── index.js                    * 客户端REST API
├── api/
|   ├── handlers/                   
|   |   └── home.js                 * API接口文件
|   └── index.js                    * 后台管理REST API
├── config/
|   └──  awsConfig.json             * aws配置文件
|   └──  config.js                  * 配置文件
|   └──  errorMsg.js                * 错误信息配置文件
|   └──  firebaseServiceAccount.js  * 错误信息配置文件
├── lib/
|   └──  email.js                   * 邮件工具
|   └──  sms.js                     * 短信工具
|   └──  string.js                  * 字符工具
|   └──  number.js                  * 数字工具
├── models/
|   └──  master_register.js         * 表master_register的Sequelize模型
├── plugins/
|   └──  logger.js                  * hapijs插件
├── service/
|   └──  master_register.js         * 账户服务层
└── test/
|   ├── service/                   
|   |   └── wallet.js               * 账户测试
```

## Prepare
> .env

## Start Project

### Install
```
npm i
```

### Start
```
pm2 start server.js --name project
```

### Restart
```
pm2 restart project
```

## 接口规范
````
- 列表查询： get    /source

- 实体创建： post   /source
- 实体查询： get    /source/:id
- 实体修改： post   /source/:id
- 实体删除： post   /source/:id/delete
- 实体操作： post   /source/:id/action

- 批量查询： get    /source/bulk
- 批量删除： post   /source/bulk/delete
- 批量操作： post   /source/bulk/:action
````



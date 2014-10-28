#[[clutter]](/#clutter) Http Status Code

##2xx 成功

200 正常；请求已完成。

201 正常；紧接 POST 命令。

202 正常；已接受用于处理，但处理尚未完成。

203 正常；部分信息 — 返回的信息只是一部分。

204 正常；无响应 — 已接收请求，但不存在要回送的信息。

##3xx 重定向

301 已移动 — 请求的数据具有新的位置且更改是永久的。

302 已找到 — 请求的数据临时具有不同 URI。

303 请参阅其它 — 可在另一 URI 下找到对请求的响应，且应使用 GET 方法检索此响应。

304 未修改 — 未按预期修改文档。

305 使用代理 — 必须通过位置字段中提供的代理来访问请求的资源。

306 未使用 — 不再使用；保留此代码以便将来使用。

##4xx 客户机中出现的错误

400 错误请求 — 请求中有语法问题，或不能满足请求。

401 未授权 — 未授权客户机访问数据。

402 需要付款 — 表示计费系统已有效。

403 禁止 — 即使有授权也不需要访问。

404 找不到 — 服务器找不到给定的资源；文档不存在。

407 代理认证请求 — 客户机首先必须使用代理认证自身。

415 介质类型不受支持 — 服务器拒绝服务请求，因为不支持请求实体的格式。

##5xx 服务器中出现的错误

500 内部错误 — 因为意外情况，服务器不能完成请求。

501 未执行 — 服务器不支持请求的工具。

502 错误网关 — 服务器接收到来自上游服务器的无效响应。

503 无法获得服务 — 由于临时过载或维护，服务器无法处理请求。

#Detail
400 – 请求无效

401.1 – 未授权：登录失败

401.2 – 未授权：服务器配置问题导致登录失败

401.3 – ACL 禁止访问资源

401.4 – 未授权：授权被筛选器拒绝

401.5 – 未授权：ISAPI 或 CGI 授权失败

403 – 禁止访问

403 – 对 Internet 服务管理器 (HTML) 的访问仅限于 Localhost

403.1 禁止访问：禁止可执行访问

403.2 – 禁止访问：禁止读访问

403.3 – 禁止访问：禁止写访问

403.4 – 禁止访问：要求 SSL

403.5 – 禁止访问：要求 SSL 128

403.6 – 禁止访问：IP 地址被拒绝

403.7 – 禁止访问：要求客户证书

403.8 – 禁止访问：禁止站点访问

403.9 – 禁止访问：连接的用户过多

403.10 – 禁止访问：配置无效

403.11 – 禁止访问：密码更改

403.12 – 禁止访问：映射器拒绝访问

403.13 – 禁止访问：客户证书已被吊销

403.15 – 禁止访问：客户访问许可过多

403.16 – 禁止访问：客户证书不可信或者无效

403.17 – 禁止访问：客户证书已经到期或者尚未生效

404.1 – 无法找到 Web 站点

404 – 无法找到文件

405 – 资源被禁止

406 – 无法接受

407 – 要求代理身份验证

410 – 永远不可用

412 – 先决条件失败

414 – 请求 – URI 太长

500 – 内部服务器错误

500.100 – 内部服务器错误 – ASP 错误

500-11 服务器关闭

500-12 应用程序重新启动

500-13 – 服务器太忙

500-14 – 应用程序无效

500-15 – 不允许请求 global.asa

501 – 未实现

502 – 网关错误
import type { CategoryContentMap, ToolContentMap } from "@/lib/tools/content-types";

export const cnCategoryContent: CategoryContentMap = {
  "generate": {
    "title": "在线生成",
    "description": "偏创作与产出类的小工具，适合快速生成结果并立即下载或复制。"
  },
  "image": {
    "title": "图片处理",
    "description": "围绕本地图片处理展开，尽量保持浏览器端完成，不上传文件。"
  },
  "encrypt": {
    "title": "加密编码",
    "description": "涵盖哈希、编码和常见对称加解密场景。"
  },
  "time": {
    "title": "日期时间",
    "description": "时间戳、日期计算和世界时区转换工具。"
  },
  "convert": {
    "title": "单位换算",
    "description": "集中处理常见单位、温度、字节和时间跨度之间的本地换算。"
  },
  "finance": {
    "title": "财务计算",
    "description": "围绕金额表达、列表汇总和贷款测算的轻量工作台。"
  },
  "text": {
    "title": "文本工具",
    "description": "适合编辑、转换、校验和排版优化的文本工作台。"
  },
  "dev": {
    "title": "开发工具",
    "description": "面向开发场景的格式化、转换和调试小工具集合。"
  }
};

export const cnToolContent: ToolContentMap = {
  "rand-password": {
    "title": "随机密码生成",
    "description": "按长度和字符集生成高强度随机密码，并保留本地历史。",
    "highlights": [
      "自定义长度",
      "大小写/数字/符号",
      "本地历史记录"
    ]
  },
  "qrcode": {
    "title": "二维码生成",
    "description": "将文本或链接即时生成二维码，可调整尺寸与前景背景色。",
    "highlights": [
      "尺寸控制",
      "颜色自定义",
      "图片下载"
    ]
  },
  "screen-record": {
    "title": "屏幕录制",
    "description": "调用浏览器录屏能力录制屏幕内容，并在本地导出视频。",
    "highlights": [
      "浏览器原生录屏",
      "即时预览",
      "本地下载"
    ]
  },
  "random-number": {
    "title": "区间随机数工坊",
    "description": "围绕取值区间、精度和唯一性批量产出随机数字，更适合抽样和测试数据场景。",
    "highlights": [
      "范围与精度",
      "唯一值开关",
      "多行结果"
    ]
  },
  "guid": {
    "title": "UUID 批量发生器",
    "description": "在浏览器里一次生成多条 UUID，适合接口联调、测试样本和占位数据。",
    "highlights": [
      "批量输出",
      "大小写切换",
      "文本导出"
    ]
  },
  "random-group": {
    "title": "随机分组与点名",
    "description": "把名单随机洗牌后按组数或每组人数切分，也可单独抽取一位幸运项。",
    "highlights": [
      "按组数或组员数",
      "单次点名",
      "固定分隔输入"
    ]
  },
  "watermark": {
    "title": "图片离线加水印",
    "description": "对本地图片批量铺设文字水印，不走服务器。",
    "highlights": [
      "透明度/角度调节",
      "本地渲染",
      "导出结果"
    ]
  },
  "image-compress": {
    "title": "图片压缩",
    "description": "在浏览器中压缩图片并对比前后体积与效果。",
    "highlights": [
      "质量控制",
      "压缩前后对比",
      "文件下载"
    ]
  },
  "qrcode-decode": {
    "title": "扫码内容读取",
    "description": "把本地二维码图片解析成可复制文本，适合核对链接、文案和 Wi-Fi 配置内容。",
    "highlights": [
      "离线识别",
      "图片预览",
      "复制结果"
    ]
  },
  "barcode": {
    "title": "条码画板",
    "description": "用多种编码标准绘制条码，并直接导出清晰的 SVG 结果。",
    "highlights": [
      "编码标准切换",
      "颜色与尺寸",
      "SVG 下载"
    ]
  },
  "md5": {
    "title": "文本 MD5 哈希",
    "description": "计算文本 MD5 值，并展示大小写两种结果。",
    "highlights": [
      "32 位输出",
      "大小写结果",
      "一键复制"
    ]
  },
  "file-md5": {
    "title": "文件 MD5 哈希",
    "description": "对本地文件进行分片计算，适合大文件 MD5 校验。",
    "highlights": [
      "本地文件",
      "分片计算",
      "适合大文件"
    ]
  },
  "hmac": {
    "title": "HMAC 哈希",
    "description": "基于密钥计算 MD5、SHA 系列 HMAC 哈希。",
    "highlights": [
      "多算法",
      "密钥参与",
      "Hex 输出"
    ]
  },
  "sha": {
    "title": "SHA 哈希",
    "description": "快速计算 SHA1、SHA256、SHA512 等常见哈希。",
    "highlights": [
      "SHA1/224/256/384/512",
      "即时计算",
      "Hex 输出"
    ]
  },
  "aes": {
    "title": "AES 加解密",
    "description": "支持常见模式和填充方式的 AES 加密与解密。",
    "highlights": [
      "ECB/CBC",
      "Hex/Base64",
      "自定义 IV"
    ]
  },
  "rabbit": {
    "title": "Rabbit 加解密",
    "description": "使用 Rabbit 流密码算法对文本进行加解密。",
    "highlights": [
      "轻量交互",
      "浏览器端处理",
      "快速复制"
    ]
  },
  "des": {
    "title": "DES/3DES",
    "description": "处理 DES 与 3DES 的常见文本加密解密需求。",
    "highlights": [
      "DES 与 3DES",
      "文本加解密",
      "Base64 输出"
    ]
  },
  "rc4": {
    "title": "RC4 加解密",
    "description": "对输入文本执行 RC4 加密或解密。",
    "highlights": [
      "经典算法",
      "快速操作",
      "本地完成"
    ]
  },
  "base64": {
    "title": "Base64 编解码",
    "description": "在文本与 Base64 编码之间快速切换。",
    "highlights": [
      "Unicode 兼容",
      "编码/解码",
      "复制结果"
    ]
  },
  "unicode": {
    "title": "Unicode 与中文转换",
    "description": "将中文转换为 Unicode 转义，或还原为可读文本。",
    "highlights": [
      "转义输出",
      "中文还原",
      "本地处理"
    ]
  },
  "url": {
    "title": "URL 编解码",
    "description": "对 URL 参数和值进行安全编码与解码。",
    "highlights": [
      "参数安全",
      "编码/解码",
      "即时结果"
    ]
  },
  "timestamp": {
    "title": "时间戳与格式化",
    "description": "显示当前时间戳，并支持时间字符串互转。",
    "highlights": [
      "秒/毫秒",
      "实时刷新",
      "双向转换"
    ]
  },
  "calculation": {
    "title": "日期加减与间隔",
    "description": "做日期加减和两个日期之间的间隔计算。",
    "highlights": [
      "加减天月年",
      "区间天数",
      "表单直观"
    ]
  },
  "world": {
    "title": "世界时间转换",
    "description": "基于选定时区查看各地当前或指定时间。",
    "highlights": [
      "多城市时区",
      "统一对照",
      "时区基准选择"
    ]
  },
  "working-day": {
    "title": "工作日偏移器",
    "description": "围绕排期与交付场景推算工作日偏移，并兼顾自定义假期与补班设置。",
    "highlights": [
      "排除周末",
      "自定义放假",
      "区间统计"
    ]
  },
  "batch-timestamp": {
    "title": "多行时间格式转换",
    "description": "把日志里的多行时间内容统一换成日期或时间戳，适合排查与清洗数据。",
    "highlights": [
      "自动识别方向",
      "秒与毫秒",
      "整批导出"
    ]
  },
  "unit-converter": {
    "title": "多单位换算台",
    "description": "把常见工程与日常单位收进一个工作台里，适合连看多种换算结果。",
    "highlights": [
      "按单位组切换",
      "目标单位直达",
      "整组结果表"
    ]
  },
  "english-amount": {
    "title": "英文票据金额",
    "description": "把数字金额整理成适合票据、合同和报价单的英文金额表达。",
    "highlights": [
      "标准写法",
      "大写写法",
      "票据场景"
    ]
  },
  "sum-list": {
    "title": "数字清单汇总",
    "description": "把零散数字清单整理成总和、均值与极值摘要，适合报销和预算草算。",
    "highlights": [
      "混合分隔输入",
      "均值与极值",
      "异常项提示"
    ]
  },
  "loan": {
    "title": "月供测算台",
    "description": "围绕本金、利率和年限快速预估月供压力与整体利息成本。",
    "highlights": [
      "月供预估",
      "总利息",
      "前 12 期预览"
    ]
  },
  "rmb": {
    "title": "人民币大写转换",
    "description": "把数字金额转换为人民币大写格式。",
    "highlights": [
      "财务书写",
      "整数与小数",
      "即时结果"
    ]
  },
  "text-dedupe": {
    "title": "列表去重整理",
    "description": "把重复项、大小写差异和多余空格统一清掉，输出更干净的名单或词表。",
    "highlights": [
      "按行/逗号/空白",
      "忽略大小写",
      "保留汇总"
    ]
  },
  "emoji-clean": {
    "title": "Emoji 清理器",
    "description": "从文案里快速剔除 Emoji 与表情符号，保留更适合正式场景的纯文本结果。",
    "highlights": [
      "保留纯文本",
      "统计移除数量",
      "适合表单文案"
    ]
  },
  "id-card-cn": {
    "title": "身份证核验卡",
    "description": "校验大陆 18 位身份证号的格式、生日、校验位，并提取年龄与性别信息。",
    "highlights": [
      "18 位校验",
      "生日与年龄",
      "地区前缀识别"
    ]
  },
  "simplified-traditional": {
    "title": "中文简繁切换",
    "description": "在简体与繁体之间快速切换，更适合文稿整理和多地区版本对照。",
    "highlights": [
      "双向切换",
      "离线字典",
      "长文本可用"
    ]
  },
  "pinyin": {
    "title": "拼音转写台",
    "description": "把中文句子转写成拼音，并补出首字母缩写，适合索引、检索和资料整理。",
    "highlights": [
      "音调/无调/数字调",
      "首字母输出",
      "本地完成"
    ]
  },
  "pluralize": {
    "title": "英文单复数转换",
    "description": "在英文单数与复数形式之间快速切换。",
    "highlights": [
      "单数/复数",
      "常见词形",
      "简洁输入"
    ]
  },
  "english-case": {
    "title": "英文大小写转换",
    "description": "统一转换为大写、小写、标题式或句首式。",
    "highlights": [
      "多种大小写",
      "适合文案整理",
      "快速复制"
    ]
  },
  "cn-en": {
    "title": "中英混排优化",
    "description": "自动优化中英文、数字与符号之间的排版间距。",
    "highlights": [
      "混排优化",
      "提升可读性",
      "一键修正"
    ]
  },
  "trim": {
    "title": "文本空格去除",
    "description": "去除整段或逐行首尾空白字符。",
    "highlights": [
      "整段 trim",
      "逐行 trim",
      "适合批量文本"
    ]
  },
  "regex": {
    "title": "正则表达式校验",
    "description": "输入模式和文本，快速验证是否匹配。",
    "highlights": [
      "支持 flags",
      "快速校验",
      "模板示例"
    ]
  },
  "md-html": {
    "title": "Markdown 转 HTML",
    "description": "将 Markdown 渲染为 HTML，并可切换预览。",
    "highlights": [
      "双栏模式",
      "HTML 输出",
      "预览切换"
    ]
  },
  "json": {
    "title": "JSON 解析/格式化",
    "description": "格式化、压缩并校验 JSON 内容。",
    "highlights": [
      "格式化",
      "压缩",
      "语法校验"
    ]
  },
  "json-to-types": {
    "title": "JSON 类型草稿",
    "description": "从样例 JSON 草拟 TypeScript 类型定义，方便再继续手工细修。",
    "highlights": [
      "根类型可改名",
      "层级保留",
      "Monaco 双栏"
    ]
  },
  "css": {
    "title": "CSS 格式化/压缩",
    "description": "对 CSS 代码进行格式化与基础压缩。",
    "highlights": [
      "Prettier 格式化",
      "压缩输出",
      "代码编辑区"
    ]
  },
  "js": {
    "title": "JavaScript 格式化/压缩",
    "description": "处理 JavaScript 代码的排版与精简。",
    "highlights": [
      "Prettier 格式化",
      "压缩输出",
      "复制结果"
    ]
  },
  "html": {
    "title": "HTML 格式化/压缩",
    "description": "整理 HTML 结构并输出更易读或更紧凑的版本。",
    "highlights": [
      "结构清晰",
      "压缩输出",
      "适合片段处理"
    ]
  },
  "sql": {
    "title": "SQL 格式化/压缩",
    "description": "快速整理 SQL 语句结构，便于阅读与复制。",
    "highlights": [
      "关键字大写",
      "压缩空格",
      "适合查询语句"
    ]
  },
  "crontab": {
    "title": "Crontab 执行时间",
    "description": "根据 cron 表达式预览接下来多次执行时间。",
    "highlights": [
      "未来 10 次",
      "表达式验证",
      "时间列表"
    ]
  },
  "naming-converter": {
    "title": "变量命名换挡",
    "description": "把自然语言或旧变量名重新拆词后，切换到常用的代码命名风格。",
    "highlights": [
      "自动拆词",
      "6 种命名格式",
      "即时结果"
    ]
  },
  "color-converter": {
    "title": "颜色格式桥",
    "description": "连接 HEX、RGB 和 HSL 三种表示法，并用实时色块帮助核对结果。",
    "highlights": [
      "三种格式互看",
      "颜色选择器",
      "实时预览"
    ]
  },
  "websocket": {
    "title": "WebSocket 在线测试",
    "description": "连接 WebSocket 地址，发送消息并查看实时日志。",
    "highlights": [
      "连接/关闭",
      "消息日志",
      "心跳配置"
    ]
  },
  "go-struct-json": {
    "title": "Go 结构体 / JSON 转换",
    "description": "在 Go struct 和 JSON 示例之间互相转换。",
    "highlights": [
      "双向转换",
      "保留层级",
      "开发常用"
    ]
  },
  "less2css": {
    "title": "Less 转 CSS",
    "description": "编译 Less 代码并输出生成后的 CSS。",
    "highlights": [
      "浏览器端编译",
      "双栏查看",
      "复制结果"
    ]
  },
  "binary": {
    "title": "计算机进制转换",
    "description": "把数字在二进制、八进制、十进制、十六进制等之间转换。",
    "highlights": [
      "2/8/10/16/32/36 进制",
      "即时表格",
      "开发常用"
    ]
  }
};

import type { CategoryContentMap, ToolContentMap } from "@/lib/tools/content-types";

export const twCategoryContent: CategoryContentMap = {
  "generate": {
    "title": "在線生成",
    "description": "偏創作與產出類的小工具，適合快速生成結果並立即下載或複製。"
  },
  "image": {
    "title": "圖片處理",
    "description": "圍繞本地圖片處理展開，儘量保持瀏覽器端完成，不上傳文件。"
  },
  "encrypt": {
    "title": "加密編碼",
    "description": "涵蓋哈希、編碼和常見對稱加解密場景。"
  },
  "time": {
    "title": "日期時間",
    "description": "時間戳、日期計算和世界時區轉換工具。"
  },
  "convert": {
    "title": "單位換算",
    "description": "集中處理常見單位、溫度、字節和時間跨度之間的本地換算。"
  },
  "finance": {
    "title": "財務計算",
    "description": "圍繞金額表達、列表彙總和貸款測算的輕量工作臺。"
  },
  "text": {
    "title": "文本工具",
    "description": "適合編輯、轉換、校驗和排版優化的文本工作臺。"
  },
  "dev": {
    "title": "開發工具",
    "description": "面向開發場景的格式化、轉換和調試小工具集合。"
  }
};

export const twToolContent: ToolContentMap = {
  "rand-password": {
    "title": "隨機密碼生成",
    "description": "按長度和字符集生成高強度隨機密碼，並保留本地歷史。",
    "highlights": [
      "自定義長度",
      "大小寫/數字/符號",
      "本地歷史記錄"
    ]
  },
  "qrcode": {
    "title": "二維碼生成",
    "description": "將文本或鏈接即時生成二維碼，可調整尺寸與前景背景色。",
    "highlights": [
      "尺寸控制",
      "顏色自定義",
      "圖片下載"
    ]
  },
  "screen-record": {
    "title": "屏幕錄製",
    "description": "調用瀏覽器錄屏能力錄製屏幕內容，並在本地導出視頻。",
    "highlights": [
      "瀏覽器原生錄屏",
      "即時預覽",
      "本地下載"
    ]
  },
  "random-number": {
    "title": "區間隨機數工坊",
    "description": "圍繞取值區間、精度和唯一性批量產出隨機數字，更適合抽樣和測試數據場景。",
    "highlights": [
      "範圍與精度",
      "唯一值開關",
      "多行結果"
    ]
  },
  "guid": {
    "title": "UUID 批量發生器",
    "description": "在瀏覽器裡一次生成多條 UUID，適合接口聯調、測試樣本和佔位數據。",
    "highlights": [
      "批量輸出",
      "大小寫切換",
      "文本導出"
    ]
  },
  "random-group": {
    "title": "隨機分組與點名",
    "description": "把名單隨機洗牌後按組數或每組人數切分，也可單獨抽取一位幸運項。",
    "highlights": [
      "按組數或組員數",
      "單次點名",
      "固定分隔輸入"
    ]
  },
  "watermark": {
    "title": "圖片離線加水印",
    "description": "對本地圖片批量鋪設文字水印，不走服務器。",
    "highlights": [
      "透明度/角度調節",
      "本地渲染",
      "導出結果"
    ]
  },
  "image-compress": {
    "title": "圖片壓縮",
    "description": "在瀏覽器中壓縮圖片並對比前後體積與效果。",
    "highlights": [
      "質量控制",
      "壓縮前後對比",
      "文件下載"
    ]
  },
  "qrcode-decode": {
    "title": "掃碼內容讀取",
    "description": "把本地二維碼圖片解析成可複製文本，適合核對鏈接、文案和 Wi-Fi 配置內容。",
    "highlights": [
      "離線識別",
      "圖片預覽",
      "複製結果"
    ]
  },
  "barcode": {
    "title": "條碼畫板",
    "description": "用多種編碼標準繪製條碼，並直接導出清晰的 SVG 結果。",
    "highlights": [
      "編碼標準切換",
      "顏色與尺寸",
      "SVG 下載"
    ]
  },
  "md5": {
    "title": "文本 MD5 哈希",
    "description": "計算文本 MD5 值，並展示大小寫兩種結果。",
    "highlights": [
      "32 位輸出",
      "大小寫結果",
      "一鍵複製"
    ]
  },
  "file-md5": {
    "title": "文件 MD5 哈希",
    "description": "對本地文件進行分片計算，適合大文件 MD5 校驗。",
    "highlights": [
      "本地文件",
      "分片計算",
      "適合大文件"
    ]
  },
  "hmac": {
    "title": "HMAC 哈希",
    "description": "基於密鑰計算 MD5、SHA 系列 HMAC 哈希。",
    "highlights": [
      "多算法",
      "密鑰參與",
      "Hex 輸出"
    ]
  },
  "sha": {
    "title": "SHA 哈希",
    "description": "快速計算 SHA1、SHA256、SHA512 等常見哈希。",
    "highlights": [
      "SHA1/224/256/384/512",
      "即時計算",
      "Hex 輸出"
    ]
  },
  "aes": {
    "title": "AES 加解密",
    "description": "支持常見模式和填充方式的 AES 加密與解密。",
    "highlights": [
      "ECB/CBC",
      "Hex/Base64",
      "自定義 IV"
    ]
  },
  "rabbit": {
    "title": "Rabbit 加解密",
    "description": "使用 Rabbit 流密碼算法對文本進行加解密。",
    "highlights": [
      "輕量交互",
      "瀏覽器端處理",
      "快速複製"
    ]
  },
  "des": {
    "title": "DES/3DES",
    "description": "處理 DES 與 3DES 的常見文本加密解密需求。",
    "highlights": [
      "DES 與 3DES",
      "文本加解密",
      "Base64 輸出"
    ]
  },
  "rc4": {
    "title": "RC4 加解密",
    "description": "對輸入文本執行 RC4 加密或解密。",
    "highlights": [
      "經典算法",
      "快速操作",
      "本地完成"
    ]
  },
  "base64": {
    "title": "Base64 編解碼",
    "description": "在文本與 Base64 編碼之間快速切換。",
    "highlights": [
      "Unicode 兼容",
      "編碼/解碼",
      "複製結果"
    ]
  },
  "unicode": {
    "title": "Unicode 與中文轉換",
    "description": "將中文轉換為 Unicode 轉義，或還原為可讀文本。",
    "highlights": [
      "轉義輸出",
      "中文還原",
      "本地處理"
    ]
  },
  "url": {
    "title": "URL 編解碼",
    "description": "對 URL 參數和值進行安全編碼與解碼。",
    "highlights": [
      "參數安全",
      "編碼/解碼",
      "即時結果"
    ]
  },
  "timestamp": {
    "title": "時間戳與格式化",
    "description": "顯示當前時間戳，並支持時間字符串互轉。",
    "highlights": [
      "秒/毫秒",
      "實時刷新",
      "雙向轉換"
    ]
  },
  "calculation": {
    "title": "日期加減與間隔",
    "description": "做日期加減和兩個日期之間的間隔計算。",
    "highlights": [
      "加減天月年",
      "區間天數",
      "表單直觀"
    ]
  },
  "world": {
    "title": "世界時間轉換",
    "description": "基於選定時區查看各地當前或指定時間。",
    "highlights": [
      "多城市時區",
      "統一對照",
      "時區基準選擇"
    ]
  },
  "working-day": {
    "title": "工作日偏移器",
    "description": "圍繞排期與交付場景推算工作日偏移，併兼顧自定義假期與補班設置。",
    "highlights": [
      "排除週末",
      "自定義放假",
      "區間統計"
    ]
  },
  "batch-timestamp": {
    "title": "多行時間格式轉換",
    "description": "把日誌裡的多行時間內容統一換成日期或時間戳，適合排查與清洗數據。",
    "highlights": [
      "自動識別方向",
      "秒與毫秒",
      "整批導出"
    ]
  },
  "unit-converter": {
    "title": "多單位換算臺",
    "description": "把常見工程與日常單位收進一個工作臺裡，適合連看多種換算結果。",
    "highlights": [
      "按單位組切換",
      "目標單位直達",
      "整組結果表"
    ]
  },
  "english-amount": {
    "title": "英文票據金額",
    "description": "把數字金額整理成適合票據、合同和報價單的英文金額表達。",
    "highlights": [
      "標準寫法",
      "大寫寫法",
      "票據場景"
    ]
  },
  "sum-list": {
    "title": "數字清單彙總",
    "description": "把零散數字清單整理成總和、均值與極值摘要，適合報銷和預算草算。",
    "highlights": [
      "混合分隔輸入",
      "均值與極值",
      "異常項提示"
    ]
  },
  "loan": {
    "title": "月供測算臺",
    "description": "圍繞本金、利率和年限快速預估月供壓力與整體利息成本。",
    "highlights": [
      "月供預估",
      "總利息",
      "前 12 期預覽"
    ]
  },
  "rmb": {
    "title": "人民幣大寫轉換",
    "description": "把數字金額轉換為人民幣大寫格式。",
    "highlights": [
      "財務書寫",
      "整數與小數",
      "即時結果"
    ]
  },
  "text-dedupe": {
    "title": "列表去重整理",
    "description": "把重複項、大小寫差異和多餘空格統一清掉，輸出更乾淨的名單或詞表。",
    "highlights": [
      "按行/逗號/空白",
      "忽略大小寫",
      "保留彙總"
    ]
  },
  "emoji-clean": {
    "title": "Emoji 清理器",
    "description": "從文案裡快速剔除 Emoji 與表情符號，保留更適合正式場景的純文本結果。",
    "highlights": [
      "保留純文本",
      "統計移除數量",
      "適合表單文案"
    ]
  },
  "id-card-cn": {
    "title": "身份證核驗卡",
    "description": "校驗大陸 18 位身份證號的格式、生日、校驗位，並提取年齡與性別信息。",
    "highlights": [
      "18 位校驗",
      "生日與年齡",
      "地區前綴識別"
    ]
  },
  "simplified-traditional": {
    "title": "中文簡繁切換",
    "description": "在簡體與繁體之間快速切換，更適合文稿整理和多地區版本對照。",
    "highlights": [
      "雙向切換",
      "離線字典",
      "長文本可用"
    ]
  },
  "pinyin": {
    "title": "拼音轉寫臺",
    "description": "把中文句子轉寫成拼音，並補出首字母縮寫，適合索引、檢索和資料整理。",
    "highlights": [
      "音調/無調/數字調",
      "首字母輸出",
      "本地完成"
    ]
  },
  "pluralize": {
    "title": "英文單複數轉換",
    "description": "在英文單數與複數形式之間快速切換。",
    "highlights": [
      "單數/複數",
      "常見詞形",
      "簡潔輸入"
    ]
  },
  "english-case": {
    "title": "英文大小寫轉換",
    "description": "統一轉換為大寫、小寫、標題式或句首式。",
    "highlights": [
      "多種大小寫",
      "適合文案整理",
      "快速複製"
    ]
  },
  "cn-en": {
    "title": "中英混排優化",
    "description": "自動優化中英文、數字與符號之間的排版間距。",
    "highlights": [
      "混排優化",
      "提升可讀性",
      "一鍵修正"
    ]
  },
  "trim": {
    "title": "文本空格去除",
    "description": "去除整段或逐行首尾空白字符。",
    "highlights": [
      "整段 trim",
      "逐行 trim",
      "適合批量文本"
    ]
  },
  "regex": {
    "title": "正則表達式校驗",
    "description": "輸入模式和文本，快速驗證是否匹配。",
    "highlights": [
      "支持 flags",
      "快速校驗",
      "模板示例"
    ]
  },
  "md-html": {
    "title": "Markdown 轉 HTML",
    "description": "將 Markdown 渲染為 HTML，並可切換預覽。",
    "highlights": [
      "雙欄模式",
      "HTML 輸出",
      "預覽切換"
    ]
  },
  "json": {
    "title": "JSON 解析/格式化",
    "description": "格式化、壓縮並校驗 JSON 內容。",
    "highlights": [
      "格式化",
      "壓縮",
      "語法校驗"
    ]
  },
  "json-to-types": {
    "title": "JSON 類型草稿",
    "description": "從樣例 JSON 草擬 TypeScript 類型定義，方便再繼續手工細修。",
    "highlights": [
      "根類型可改名",
      "層級保留",
      "Monaco 雙欄"
    ]
  },
  "css": {
    "title": "CSS 格式化/壓縮",
    "description": "對 CSS 代碼進行格式化與基礎壓縮。",
    "highlights": [
      "Prettier 格式化",
      "壓縮輸出",
      "代碼編輯區"
    ]
  },
  "js": {
    "title": "JavaScript 格式化/壓縮",
    "description": "處理 JavaScript 代碼的排版與精簡。",
    "highlights": [
      "Prettier 格式化",
      "壓縮輸出",
      "複製結果"
    ]
  },
  "html": {
    "title": "HTML 格式化/壓縮",
    "description": "整理 HTML 結構並輸出更易讀或更緊湊的版本。",
    "highlights": [
      "結構清晰",
      "壓縮輸出",
      "適合片段處理"
    ]
  },
  "sql": {
    "title": "SQL 格式化/壓縮",
    "description": "快速整理 SQL 語句結構，便於閱讀與複製。",
    "highlights": [
      "關鍵字大寫",
      "壓縮空格",
      "適合查詢語句"
    ]
  },
  "crontab": {
    "title": "Crontab 執行時間",
    "description": "根據 cron 表達式預覽接下來多次執行時間。",
    "highlights": [
      "未來 10 次",
      "表達式驗證",
      "時間列表"
    ]
  },
  "naming-converter": {
    "title": "變量命名換擋",
    "description": "把自然語言或舊變量名重新拆詞後，切換到常用的代碼命名風格。",
    "highlights": [
      "自動拆詞",
      "6 種命名格式",
      "即時結果"
    ]
  },
  "color-converter": {
    "title": "顏色格式橋",
    "description": "連接 HEX、RGB 和 HSL 三種表示法，並用實時色塊幫助核對結果。",
    "highlights": [
      "三種格式互看",
      "顏色選擇器",
      "實時預覽"
    ]
  },
  "websocket": {
    "title": "WebSocket 在線測試",
    "description": "連接 WebSocket 地址，發送消息並查看實時日誌。",
    "highlights": [
      "連接/關閉",
      "消息日誌",
      "心跳配置"
    ]
  },
  "go-struct-json": {
    "title": "Go 結構體 / JSON 轉換",
    "description": "在 Go struct 和 JSON 示例之間互相轉換。",
    "highlights": [
      "雙向轉換",
      "保留層級",
      "開發常用"
    ]
  },
  "less2css": {
    "title": "Less 轉 CSS",
    "description": "編譯 Less 代碼並輸出生成後的 CSS。",
    "highlights": [
      "瀏覽器端編譯",
      "雙欄查看",
      "複製結果"
    ]
  },
  "binary": {
    "title": "計算機進制轉換",
    "description": "把數字在二進制、八進制、十進制、十六進制等之間轉換。",
    "highlights": [
      "2/8/10/16/32/36 進制",
      "即時表格",
      "開發常用"
    ]
  }
};

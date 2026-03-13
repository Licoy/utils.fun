import type { CategoryContentMap, ToolContentMap } from "@/lib/tools/content-types";

export const jaCategoryContent: CategoryContentMap = {
  "generate": {
    "title": "生成する",
    "description": "すぐに使用できるアセットを生成するための高速作成ツール。"
  },
  "image": {
    "title": "画像",
    "description": "可能な限りブラウザ内でローカルに留まる画像ワークフロー。"
  },
  "encrypt": {
    "title": "暗号化する",
    "description": "ハッシュ、エンコード、および一般的な対称暗号化ヘルパー。"
  },
  "time": {
    "title": "時間",
    "description": "タイムスタンプ変換、日付計算、ワールドタイムツール。"
  },
  "convert": {
    "title": "変換する",
    "description": "一般的な単位、温度、データ サイズ、期間のローカル変換ツール。"
  },
  "finance": {
    "title": "ファイナンス",
    "description": "金額の文言、リストの合計、ローンの見積もりなどに役立つ実用的なツールです。"
  },
  "text": {
    "title": "文章",
    "description": "編集、変換、検証のための実用的なテキスト ワークベンチ。"
  },
  "dev": {
    "title": "開発者",
    "description": "開発者向けのフォーマット、変換、およびデバッグのヘルパー。"
  }
};

export const jaToolContent: ToolContentMap = {
  "rand-password": {
    "title": "ランダムなパスワード",
    "description": "ローカル履歴を使用して、長さと文字セットに基づいて強力なランダムなパスワードを生成します。",
    "highlights": [
      "カスタムの長さ",
      "大文字と小文字、数字、記号",
      "地元の歴史"
    ]
  },
  "qrcode": {
    "title": "QRコード",
    "description": "テキストまたは URL を、サイズと色を調整できる QR コードに変換します。",
    "highlights": [
      "サイズを調整する",
      "色のカスタマイズ",
      "画像をダウンロード"
    ]
  },
  "screen-record": {
    "title": "画面録画",
    "description": "ブラウザ API を使用して画面を記録し、結果をローカルにエクスポートします。",
    "highlights": [
      "ネイティブブラウザのキャプチャ",
      "インスタントプレビュー",
      "ローカル輸出"
    ]
  },
  "random-number": {
    "title": "範囲番号ラボ",
    "description": "サンプリングまたはテスト データの範囲、精度、一意性によってランダムな値をバッチ生成します。",
    "highlights": [
      "範囲と精度",
      "ユニークなトグル",
      "複数行出力"
    ]
  },
  "guid": {
    "title": "UUID バッチ フォージ",
    "description": "API テスト、フィクスチャ、プレースホルダ レコード用にブラウザ内で複数の UUID を作成します。",
    "highlights": [
      "バッチ出力",
      "ケースの切り替え",
      "テキストのエクスポート"
    ]
  },
  "random-group": {
    "title": "ランダムなグループ化",
    "description": "グループ数またはサイズに基づいて名簿をランダムなグループにシャッフルするか、単一の勝者を選択します。",
    "highlights": [
      "グループ数またはサイズ別",
      "シングルピックモード",
      "フレキシブルセパレーター"
    ]
  },
  "watermark": {
    "title": "オフラインウォーターマーク",
    "description": "ローカル画像をアップロードせずに、繰り返しのテキスト透かしを適用します。",
    "highlights": [
      "不透明度と角度",
      "ローカルレンダリング",
      "結果のエクスポート"
    ]
  },
  "image-compress": {
    "title": "画像圧縮",
    "description": "ブラウザで画像を圧縮し、前後の結果を比較します。",
    "highlights": [
      "品質管理",
      "前後の比較",
      "ファイルをダウンロードする"
    ]
  },
  "qrcode-decode": {
    "title": "QRコンテンツリーダー",
    "description": "ローカル QR 画像からコピー可能なテキストを抽出して、リンク、メモ、または Wi-Fi ペイロードを検査します。",
    "highlights": [
      "オフラインデコード",
      "画像プレビュー",
      "コピー結果"
    ]
  },
  "barcode": {
    "title": "バーコードキャンバス",
    "description": "複数の標準を使用してバーコードを作成し、鮮明な SVG アートワークをすぐにエクスポートします。",
    "highlights": [
      "スイッチ規格",
      "色とサイズ",
      "SVGのダウンロード"
    ]
  },
  "md5": {
    "title": "テキストMD5",
    "description": "テキストの MD5 ハッシュを計算し、小文字/大文字のバリエーションを表示します。",
    "highlights": [
      "32 文字の出力",
      "大文字/小文字",
      "すぐにコピーする"
    ]
  },
  "file-md5": {
    "title": "ファイルMD5",
    "description": "信頼性の高い MD5 検証を行うために、ローカル ファイルをチャンクに分けてハッシュします。",
    "highlights": [
      "ローカルファイル",
      "チャンク化されたハッシュ",
      "大きなファイルに優しい"
    ]
  },
  "hmac": {
    "title": "HMAC ハッシュ",
    "description": "MD5 および SHA バリアントのキー付き HMAC ハッシュを計算します。",
    "highlights": [
      "複数のアルゴリズム",
      "鍵付きハッシュ",
      "16 進出力"
    ]
  },
  "sha": {
    "title": "SHAハッシュ",
    "description": "SHA1、SHA256、SHA512、および関連するハッシュ値を計算します。",
    "highlights": [
      "SHA のバリアント",
      "高速ハッシュ",
      "16 進出力"
    ]
  },
  "aes": {
    "title": "AES暗号",
    "description": "共通モードとパディング オプションを使用して、AES で暗号化および復号化します。",
    "highlights": [
      "ECB/CBC",
      "Hex または Base64",
      "カスタムIV"
    ]
  },
  "rabbit": {
    "title": "ラビット暗号",
    "description": "Rabbit ストリーム暗号を使用してテキストを暗号化および復号化します。",
    "highlights": [
      "軽量",
      "ブラウザ側",
      "コピー結果"
    ]
  },
  "des": {
    "title": "DES / 3DES",
    "description": "DES および TripleDES テキストの暗号化と復号化を処理します。",
    "highlights": [
      "DES と 3DES",
      "テキストの暗号化",
      "Base64出力"
    ]
  },
  "rc4": {
    "title": "RC4暗号",
    "description": "入力テキストに対して RC4 暗号化または復号化を実行します。",
    "highlights": [
      "古典的な暗号",
      "素早いアクション",
      "ローカルのみ"
    ]
  },
  "base64": {
    "title": "Base64",
    "description": "プレーンテキストとBase64の間で迅速に変換します。",
    "highlights": [
      "Unicode セーフ",
      "エンコード/デコード",
      "コピー結果"
    ]
  },
  "unicode": {
    "title": "ユニコード変換",
    "description": "テキストを Unicode エスケープ シーケンスに変換したり、逆に変換したりします。",
    "highlights": [
      "エスケープ出力",
      "判読可能なテキストを復元する",
      "ローカル処理"
    ]
  },
  "url": {
    "title": "URLエンコード",
    "description": "URL 値を安全にエンコードおよびデコードして転送します。",
    "highlights": [
      "パラメータにとって安全",
      "エンコード/デコード",
      "即時結果"
    ]
  },
  "timestamp": {
    "title": "タイムスタンプ",
    "description": "現在のタイムスタンプを表示し、時間文字列とタイムスタンプの間で変換します。",
    "highlights": [
      "秒/ミリ秒",
      "ライブクロック",
      "双方向変換"
    ]
  },
  "calculation": {
    "title": "日付の計算",
    "description": "日付に時間を加算または減算し、日付間隔を測定します。",
    "highlights": [
      "日/月/年を追加する",
      "日間隔",
      "明確なフォーム"
    ]
  },
  "world": {
    "title": "ワールドタイム",
    "description": "世界の主要なタイムゾーンのセットで特定の瞬間を表示します。",
    "highlights": [
      "複数の都市",
      "横並びテーブル",
      "ベースゾーンを選択してください"
    ]
  },
  "working-day": {
    "title": "営業日のオフセット",
    "description": "オプションで休日や振替休日を上書きして、営業日ごとにスケジュールをシフトします。",
    "highlights": [
      "週末をスキップする",
      "カスタム休日リスト",
      "範囲カウント"
    ]
  },
  "batch-timestamp": {
    "title": "複数行の時間コンバータ",
    "description": "タイムスタンプの多いログを 1 行ずつ正規化し、読み取り可能な日付または生の Unix 値に変換します。",
    "highlights": [
      "自動方向",
      "秒とミリ秒",
      "バッチエクスポート"
    ]
  },
  "unit-converter": {
    "title": "ユニット配電盤",
    "description": "共通のエンジニアリング単位と日常単位を 1 か所に保管して、迅速に並べて変換できます。",
    "highlights": [
      "グループ化されたスイッチング",
      "直接のターゲットユニット",
      "グループ全体のテーブル"
    ]
  },
  "english-amount": {
    "title": "英国金額草案",
    "description": "金額の数値から、請求書に対応した英語の金額文言の草案を作成します。",
    "highlights": [
      "文例",
      "大文字のスタイル",
      "請求書の準備ができました"
    ]
  },
  "sum-list": {
    "title": "ナンバーシートの概要",
    "description": "緩やかな数値リストを合計、平均、最小/最大の要約に変換して、予算を迅速に立てることができます。",
    "highlights": [
      "混合セパレータ",
      "平均と極端",
      "無効なトークンのヒント"
    ]
  },
  "loan": {
    "title": "ローン支払いプランナー",
    "description": "お借入元金、金利、期間から月々の負担額と利息総額を見積ります。",
    "highlights": [
      "月々の見積もり",
      "利息総額",
      "最初の 12 か月間"
    ]
  },
  "rmb": {
    "title": "RMB 大文字",
    "description": "数字を大文字の中国人民元表記に変換します。",
    "highlights": [
      "財務上の文言",
      "整数と小数",
      "即時結果"
    ]
  },
  "text-dedupe": {
    "title": "リストのクリーンアップ",
    "description": "繰り返されるエントリ、大文字と小文字の違い、ノイズのあるスペースを整理してリストを整理します。",
    "highlights": [
      "行、カンマ、またはスペース",
      "大文字と小文字を無視する",
      "概要を保持"
    ]
  },
  "emoji-clean": {
    "title": "絵文字クリーナー",
    "description": "テキストから絵文字や絵文字記号を取り除き、よりクリーンでフォーマルなプレーンテキスト出力を実現します。",
    "highlights": [
      "プレーンテキスト出力",
      "削除された数",
      "形状に優しい"
    ]
  },
  "id-card-cn": {
    "title": "CN IDチェック",
    "description": "中国本土の 18 桁の ID 番号を検証し、誕生日、年齢、性別の詳細を抽出します。",
    "highlights": [
      "18桁の検証",
      "誕生日と年齢",
      "地域プレフィックス"
    ]
  },
  "simplified-traditional": {
    "title": "中国語スクリプトスイッチ",
    "description": "コピーのクリーンアップや地域別のバリエーションのために、簡体字中国語と繁体字中国語をすばやく切り替えます。",
    "highlights": [
      "双方向スイッチ",
      "オフライン辞書",
      "長文にも優しい"
    ]
  },
  "pinyin": {
    "title": "ピンイン転写者",
    "description": "中国語のテキストをピンインとイニシャルに書き写して、インデックス作成、検索、またはメモの整理を行います。",
    "highlights": [
      "マーク付き、プレーン、または数値",
      "イニシャル出力",
      "ローカルのみ"
    ]
  },
  "pluralize": {
    "title": "複数化する",
    "description": "英語の名詞の単数形と複数形をすばやく切り替えます。",
    "highlights": [
      "単数/複数",
      "一般的な語形",
      "簡単入力"
    ]
  },
  "english-case": {
    "title": "英語の場合",
    "description": "テキストを大文字、小文字、タイトル、または文の大文字と小文字に変換します。",
    "highlights": [
      "いくつかのケーススタイル",
      "清書",
      "すぐにコピーする"
    ]
  },
  "cn-en": {
    "title": "CN/EN間隔",
    "description": "中国語、英語、数字の間隔を自動的に調整します。",
    "highlights": [
      "混合間隔の改善",
      "可読性の向上",
      "ワンクリックで修正"
    ]
  },
  "trim": {
    "title": "テキストのトリミング",
    "description": "テキスト全体または行ごとに空白を削除します。",
    "highlights": [
      "フルトリム",
      "ライントリム",
      "バッチフレンドリー"
    ]
  },
  "regex": {
    "title": "正規表現テスト",
    "description": "文字列が正規表現パターンに一致するかどうかをテストします。",
    "highlights": [
      "サポートされているフラグ",
      "クイック検証",
      "テンプレートの例"
    ]
  },
  "md-html": {
    "title": "HTML へのマークダウン",
    "description": "Markdown を HTML にレンダリングし、コードとプレビューを切り替えます。",
    "highlights": [
      "2 つのペインのフロー",
      "HTML出力",
      "ライブプレビュー"
    ]
  },
  "json": {
    "title": "JSON形式",
    "description": "JSON コンテンツをフォーマット、縮小、検証します。",
    "highlights": [
      "かわいいプリント",
      "縮小する",
      "検証"
    ]
  },
  "json-to-types": {
    "title": "JSONタイプのスケッチ",
    "description": "手動で調整する前に、サンプル JSON から TypeScript インターフェイスをスケッチします。",
    "highlights": [
      "ルートタイプの名前を変更する",
      "ネスティングを続ける",
      "モナコデュアルペイン"
    ]
  },
  "css": {
    "title": "CSS形式",
    "description": "CSS をフォーマットし、軽量圧縮を適用します。",
    "highlights": [
      "よりきれいなフォーマット",
      "縮小された出力",
      "コードエディタ"
    ]
  },
  "js": {
    "title": "JavaScript 形式",
    "description": "すばやくクリーンアップできるように、JavaScript スニペットをフォーマットまたはコンパクトにします。",
    "highlights": [
      "よりきれいなフォーマット",
      "出力を縮小する",
      "コピー結果"
    ]
  },
  "html": {
    "title": "HTML形式",
    "description": "HTML を美しくするか、より厳密な表現に圧縮します。",
    "highlights": [
      "よりクリーンな構造",
      "縮小された出力",
      "スニペットフレンドリー"
    ]
  },
  "sql": {
    "title": "SQL形式",
    "description": "SQL ステートメントを読みやすくするためにフォーマットするか、転送のために圧縮します。",
    "highlights": [
      "大文字のキーワード",
      "スペースを圧縮する",
      "クエリフレンドリー"
    ]
  },
  "crontab": {
    "title": "Cron スケジュール",
    "description": "cron 式から次の数回の実行時間をプレビューします。",
    "highlights": [
      "次の 10 回の実行",
      "式の検証",
      "タイムリスト"
    ]
  },
  "naming-converter": {
    "title": "ギアボックスの命名",
    "description": "自然言語または既存の識別子を分割し、共通のコード命名スタイルに移行します。",
    "highlights": [
      "自動単語分割",
      "6 つの命名スタイル",
      "即時出力"
    ]
  },
  "color-converter": {
    "title": "カラーフォーマットブリッジ",
    "description": "HEX、RGB、HSL フォーマットをライブ スウォッチで橋渡しし、視覚的に素早く確認できます。",
    "highlights": [
      "3つのフォーマット",
      "カラーピッカー",
      "ライブプレビュー"
    ]
  },
  "websocket": {
    "title": "WebSocket テスト",
    "description": "WebSocket エンドポイントに接続し、メッセージを送信し、ログを検査します。",
    "highlights": [
      "接続/閉じる",
      "メッセージログ",
      "ハートビート設定"
    ]
  },
  "go-struct-json": {
    "title": "Go 構造体 / JSON",
    "description": "Go 構造体と JSON スケルトンの間で変換します。",
    "highlights": [
      "双方向変換",
      "ネスティングを続ける",
      "開発者ユーティリティ"
    ]
  },
  "less2css": {
    "title": "CSS の削減",
    "description": "Less スニペットをコンパイルし、生成された CSS を出力します。",
    "highlights": [
      "ブラウザ内コンパイル",
      "2 つの列",
      "出力のコピー"
    ]
  },
  "binary": {
    "title": "塩基変換",
    "description": "数値を 2 進数、8 進数、10 進数、16 進数などに変換します。",
    "highlights": [
      "2/8/10/16/32/36ベース",
      "インスタントテーブル",
      "開発に役立つ"
    ]
  }
};

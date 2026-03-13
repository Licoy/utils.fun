import type { CategoryContentMap, ToolContentMap } from "@/lib/tools/content-types";

export const koCategoryContent: CategoryContentMap = {
  "generate": {
    "title": "생성하다",
    "description": "즉시 사용할 수 있는 자산을 생성하기 위한 빠른 생성 도구입니다."
  },
  "image": {
    "title": "영상",
    "description": "가능할 때마다 브라우저에서 로컬로 유지되는 이미지 워크플로입니다."
  },
  "encrypt": {
    "title": "암호화",
    "description": "해싱, 인코딩 및 일반적인 대칭 암호화 도우미."
  },
  "time": {
    "title": "시간",
    "description": "타임스탬프 변환, 날짜 산술 및 세계 시간 도구."
  },
  "convert": {
    "title": "전환하다",
    "description": "일반 단위, 온도, 데이터 크기 및 기간에 대한 로컬 변환 도구입니다."
  },
  "finance": {
    "title": "재원",
    "description": "금액 문구, 목록 총액 및 대출 견적에 대한 실용적인 도우미입니다."
  },
  "text": {
    "title": "텍스트",
    "description": "편집, 변환, 검증을 위한 실용적인 텍스트 워크벤치입니다."
  },
  "dev": {
    "title": "데브",
    "description": "개발자를 위한 형식 지정, 변환 및 디버깅 도우미입니다."
  }
};

export const koToolContent: ToolContentMap = {
  "rand-password": {
    "title": "무작위 비밀번호",
    "description": "로컬 기록을 사용하여 길이와 문자 집합을 기준으로 강력한 무작위 비밀번호를 생성합니다.",
    "highlights": [
      "맞춤 길이",
      "대소문자, 숫자, 기호",
      "지역 역사"
    ]
  },
  "qrcode": {
    "title": "QR코드",
    "description": "텍스트나 URL을 크기와 색상을 조정할 수 있는 QR 코드로 변환하세요.",
    "highlights": [
      "크기 조정",
      "색상 맞춤설정",
      "이미지 다운로드"
    ]
  },
  "screen-record": {
    "title": "화면 녹화",
    "description": "브라우저 API를 사용하여 화면을 기록하고 결과를 로컬로 내보냅니다.",
    "highlights": [
      "기본 브라우저 캡처",
      "즉시 미리보기",
      "현지 수출"
    ]
  },
  "random-number": {
    "title": "범위 번호 실험실",
    "description": "샘플링 또는 테스트 데이터의 범위, 정밀도 및 고유성을 기준으로 임의 값을 일괄 생성합니다.",
    "highlights": [
      "범위 및 정밀도",
      "독특한 토글",
      "다중 라인 출력"
    ]
  },
  "guid": {
    "title": "UUID 배치 포지",
    "description": "API 테스트, 고정 장치 및 자리 표시자 기록을 위해 브라우저 내에서 여러 UUID를 만듭니다.",
    "highlights": [
      "일괄 출력",
      "케이스 토글",
      "텍스트 내보내기"
    ]
  },
  "random-group": {
    "title": "무작위 그룹화",
    "description": "그룹 수나 크기에 따라 명단을 무작위 그룹으로 섞거나 단일 승자를 선택합니다.",
    "highlights": [
      "그룹 수 또는 크기별",
      "단일 선택 모드",
      "유연한 분리기"
    ]
  },
  "watermark": {
    "title": "오프라인 워터마크",
    "description": "로컬 이미지를 업로드하지 않고도 반복되는 텍스트 워터마크를 로컬 이미지에 적용할 수 있습니다.",
    "highlights": [
      "불투명도 및 각도",
      "로컬 렌더링",
      "결과 내보내기"
    ]
  },
  "image-compress": {
    "title": "이미지 압축",
    "description": "브라우저에서 이미지를 압축하고 전후 결과를 비교하세요.",
    "highlights": [
      "품질 관리",
      "전/후 비교",
      "파일 다운로드"
    ]
  },
  "qrcode-decode": {
    "title": "QR 콘텐츠 리더",
    "description": "로컬 QR 이미지에서 복사 가능한 텍스트를 추출하여 링크, 메모 또는 Wi-Fi 페이로드를 검사합니다.",
    "highlights": [
      "오프라인 디코드",
      "이미지 미리보기",
      "결과 복사"
    ]
  },
  "barcode": {
    "title": "바코드 캔버스",
    "description": "다양한 표준을 사용하여 바코드 초안을 작성하고 선명한 SVG 아트워크를 즉시 내보냅니다.",
    "highlights": [
      "스위치 표준",
      "색상 및 크기",
      "SVG 다운로드"
    ]
  },
  "md5": {
    "title": "MD5에 문자 메시지 보내기",
    "description": "텍스트 MD5 해시를 계산하고 소문자/대문자 변형을 표시합니다.",
    "highlights": [
      "32자 출력",
      "대문자/소문자",
      "빠르게 복사"
    ]
  },
  "file-md5": {
    "title": "파일 MD5",
    "description": "신뢰할 수 있는 MD5 검증을 위해 로컬 파일을 청크로 해시합니다.",
    "highlights": [
      "로컬 파일",
      "청크 해싱",
      "대용량 파일 친화적"
    ]
  },
  "hmac": {
    "title": "HMAC 해시",
    "description": "MD5 및 SHA 변형에 대한 키 지정 HMAC 해시를 계산합니다.",
    "highlights": [
      "다중 알고리즘",
      "키 해시",
      "16진수 출력"
    ]
  },
  "sha": {
    "title": "SHA 해시",
    "description": "SHA1, SHA256, SHA512 및 관련 해시 값을 계산합니다.",
    "highlights": [
      "SHA 변종",
      "빠른 해싱",
      "16진수 출력"
    ]
  },
  "aes": {
    "title": "AES 암호",
    "description": "공통 모드 및 패딩 옵션을 사용하여 AES로 암호화 및 해독합니다.",
    "highlights": [
      "ECB/CBC",
      "16진수 또는 Base64",
      "커스텀 IV"
    ]
  },
  "rabbit": {
    "title": "토끼 암호",
    "description": "Rabbit 스트림 암호를 사용하여 텍스트를 암호화하고 해독합니다.",
    "highlights": [
      "경량",
      "브라우저 측",
      "결과 복사"
    ]
  },
  "des": {
    "title": "DES / 3DES",
    "description": "DES 및 TripleDES 텍스트 암호화 및 암호 해독을 처리합니다.",
    "highlights": [
      "DES와 3DES",
      "텍스트 암호화",
      "Base64 출력"
    ]
  },
  "rc4": {
    "title": "RC4 암호",
    "description": "입력 텍스트에 대해 RC4 암호화 또는 암호 해독을 실행합니다.",
    "highlights": [
      "고전 암호",
      "빠른 조치",
      "로컬 전용"
    ]
  },
  "base64": {
    "title": "Base64",
    "description": "일반 텍스트와 Base64 간에 빠르게 변환하세요.",
    "highlights": [
      "유니코드 안전",
      "인코딩/디코딩",
      "결과 복사"
    ]
  },
  "unicode": {
    "title": "유니코드 변환",
    "description": "텍스트를 유니코드 이스케이프 시퀀스로 변환하거나 그 반대로 변환합니다.",
    "highlights": [
      "이스케이프 출력",
      "읽을 수 있는 텍스트 복원",
      "현지 처리"
    ]
  },
  "url": {
    "title": "URL 인코딩",
    "description": "전송을 위해 URL 값을 안전하게 인코딩하고 디코딩합니다.",
    "highlights": [
      "매개변수에 안전함",
      "인코딩/디코딩",
      "즉각적인 결과"
    ]
  },
  "timestamp": {
    "title": "타임스탬프",
    "description": "현재 타임스탬프를 표시하고 시간 문자열과 타임스탬프 간을 변환합니다.",
    "highlights": [
      "초/밀리초",
      "라이브 시계",
      "양방향 변환"
    ]
  },
  "calculation": {
    "title": "날짜 계산",
    "description": "날짜에서 시간을 더하거나 빼고 날짜 간격을 측정합니다.",
    "highlights": [
      "일/월/년 추가",
      "일 간격",
      "명확한 양식"
    ]
  },
  "world": {
    "title": "세계 시간",
    "description": "세계의 주요 시간대에 걸쳐 특정 순간을 확인하세요.",
    "highlights": [
      "여러 도시",
      "나란히 놓인 테이블",
      "기본 구역 선택"
    ]
  },
  "working-day": {
    "title": "영업일 상쇄",
    "description": "선택적 휴일 및 보충 근무일 재정의를 통해 영업일별로 일정을 변경하세요.",
    "highlights": [
      "주말을 건너뛰세요",
      "맞춤 휴일 목록",
      "범위 계산"
    ]
  },
  "batch-timestamp": {
    "title": "다중 회선 시간 변환기",
    "description": "타임스탬프가 많은 로그를 한 줄씩 읽을 수 있는 날짜 또는 원시 Unix 값으로 정규화합니다.",
    "highlights": [
      "자동 방향",
      "초 및 밀리초",
      "일괄 내보내기"
    ]
  },
  "unit-converter": {
    "title": "유닛 배전반",
    "description": "빠른 병렬 변환을 위해 공통 엔지니어링 및 일일 단위를 한 곳에 보관하십시오.",
    "highlights": [
      "그룹화된 스위칭",
      "직접 대상 유닛",
      "전체 그룹 테이블"
    ]
  },
  "english-amount": {
    "title": "영문 금액 초안",
    "description": "숫자로 된 금액 값으로 송장 준비가 된 영어 금액 문구 초안을 작성합니다.",
    "highlights": [
      "문장 사례",
      "대문자 스타일",
      "송장 준비됨"
    ]
  },
  "sum-list": {
    "title": "번호 시트 요약",
    "description": "빠른 예산 책정을 위해 느슨한 숫자 목록을 합계, 평균 및 최소/최대 요약으로 전환합니다.",
    "highlights": [
      "혼합 분리막",
      "평균과 극단",
      "잘못된 토큰 힌트"
    ]
  },
  "loan": {
    "title": "대출 지불 플래너",
    "description": "대출원금, 이자율, 기간 등을 통해 월 부담금과 총 이자를 추정합니다.",
    "highlights": [
      "월별 견적",
      "총이자",
      "처음 12개월"
    ]
  },
  "rmb": {
    "title": "RMB 대문자",
    "description": "숫자를 대문자 중국어 RMB 표현으로 변환합니다.",
    "highlights": [
      "재정적 표현",
      "정수와 소수",
      "즉각적인 결과"
    ]
  },
  "text-dedupe": {
    "title": "목록 정리",
    "description": "반복되는 항목, 대소문자 차이, 불필요한 간격을 깔끔한 목록으로 정리하세요.",
    "highlights": [
      "줄, 쉼표 또는 공백",
      "대소문자 무시",
      "요약 보관됨"
    ]
  },
  "emoji-clean": {
    "title": "이모티콘 클리너",
    "description": "더 깔끔하고 공식적인 일반 텍스트 출력을 위해 텍스트에서 이모티콘과 그림 기호를 제거합니다.",
    "highlights": [
      "일반 텍스트 출력",
      "삭제된 개수",
      "형식 친화적"
    ]
  },
  "id-card-cn": {
    "title": "CN ID 확인",
    "description": "중국 본토 18자리 ID 번호를 검증하고 생일, 나이, 성별 세부정보를 추출합니다.",
    "highlights": [
      "18자리 유효성 검사",
      "생일과 나이",
      "지역 접두어"
    ]
  },
  "simplified-traditional": {
    "title": "중국어 스크립트 스위치",
    "description": "복사 정리 및 지역별 변형을 위해 중국어 간체와 중국어 번체 간에 빠르게 전환하세요.",
    "highlights": [
      "양방향 스위치",
      "오프라인 사전",
      "긴 텍스트 친화적"
    ]
  },
  "pinyin": {
    "title": "병음 전사기",
    "description": "색인 생성, 검색 또는 메모 구성을 위해 중국어 텍스트를 병음 및 이니셜로 변환합니다.",
    "highlights": [
      "표시됨, 일반 또는 숫자",
      "이니셜 출력",
      "로컬 전용"
    ]
  },
  "pluralize": {
    "title": "복수화하다",
    "description": "단수형과 복수형 영어 명사 사이를 빠르게 전환하세요.",
    "highlights": [
      "단수/복수",
      "일반적인 단어 형태",
      "간단한 입력"
    ]
  },
  "english-case": {
    "title": "영어 사례",
    "description": "텍스트를 대문자, 소문자, 제목 또는 문장 케이스로 변환합니다.",
    "highlights": [
      "다양한 케이스 스타일",
      "깨끗한 사본",
      "빠르게 복사"
    ]
  },
  "cn-en": {
    "title": "CN/EN 간격",
    "description": "중국어, 영어, 숫자 사이의 간격을 자동으로 개선합니다.",
    "highlights": [
      "더 나은 혼합 간격",
      "가독성 향상",
      "원클릭 수정"
    ]
  },
  "trim": {
    "title": "텍스트 자르기",
    "description": "전체 텍스트 또는 한 줄씩 공백을 제거합니다.",
    "highlights": [
      "풀 트림",
      "라인 트림",
      "일괄 친화적"
    ]
  },
  "regex": {
    "title": "정규식 테스트",
    "description": "문자열이 정규식 패턴과 일치하는지 테스트합니다.",
    "highlights": [
      "지원되는 플래그",
      "빠른 검증",
      "템플릿 예"
    ]
  },
  "md-html": {
    "title": "마크다운을 HTML로",
    "description": "Markdown을 HTML로 렌더링하고 코드와 미리보기 간을 전환합니다.",
    "highlights": [
      "두 창 흐름",
      "HTML 출력",
      "실시간 미리보기"
    ]
  },
  "json": {
    "title": "JSON 형식",
    "description": "JSON 콘텐츠의 형식을 지정하고 축소하고 검증합니다.",
    "highlights": [
      "예쁜 인쇄물",
      "작게 하다",
      "확인"
    ]
  },
  "json-to-types": {
    "title": "JSON 유형 스케치",
    "description": "샘플 JSON에서 TypeScript 인터페이스를 스케치한 후 직접 다듬으세요.",
    "highlights": [
      "루트 유형 이름 바꾸기",
      "계속 중첩됨",
      "모나코 이중 창"
    ]
  },
  "css": {
    "title": "CSS 형식",
    "description": "CSS 형식을 지정하고 경량 압축을 적용합니다.",
    "highlights": [
      "더 예쁜 형식",
      "출력 최소화",
      "코드 편집기"
    ]
  },
  "js": {
    "title": "자바스크립트 형식",
    "description": "빠른 정리를 위해 형식을 지정하거나 JavaScript 스니펫을 압축합니다.",
    "highlights": [
      "더 예쁜 형식",
      "출력 최소화",
      "결과 복사"
    ]
  },
  "html": {
    "title": "HTML 형식",
    "description": "HTML을 아름답게 만들거나 더 엄격한 표현으로 압축하세요.",
    "highlights": [
      "더욱 깨끗한 구조",
      "출력 최소화",
      "스니펫 친화적"
    ]
  },
  "sql": {
    "title": "SQL 형식",
    "description": "가독성을 위해 SQL 문 형식을 지정하거나 전송을 위해 압축합니다.",
    "highlights": [
      "대문자 키워드",
      "공간을 압축하다",
      "쿼리 친화적"
    ]
  },
  "crontab": {
    "title": "크론 일정",
    "description": "cron 표현식에서 다음 여러 실행 시간을 미리 봅니다.",
    "highlights": [
      "다음 10회 실행",
      "표현 검증",
      "시간 목록"
    ]
  },
  "naming-converter": {
    "title": "기어박스 명명",
    "description": "자연어 또는 기존 식별자를 분할하여 공통 코드 명명 스타일로 전환합니다.",
    "highlights": [
      "자동 단어 분할",
      "6가지 명명 스타일",
      "즉시 출력"
    ]
  },
  "color-converter": {
    "title": "컬러 형식 브리지",
    "description": "빠른 시각적 확인을 위해 실시간 견본으로 HEX, RGB 및 HSL 형식을 연결합니다.",
    "highlights": [
      "세 가지 형식",
      "색상 선택기",
      "실시간 미리보기"
    ]
  },
  "websocket": {
    "title": "웹소켓 테스트",
    "description": "WebSocket 엔드포인트에 연결하고, 메시지를 보내고, 로그를 검사하세요.",
    "highlights": [
      "연결/닫기",
      "메시지 로그",
      "하트비트 설정"
    ]
  },
  "go-struct-json": {
    "title": "Go 구조체/JSON",
    "description": "Go 구조체와 JSON 뼈대 사이를 변환합니다.",
    "highlights": [
      "양방향 변환",
      "계속 중첩됨",
      "개발자 유틸리티"
    ]
  },
  "less2css": {
    "title": "CSS에 대한 간략한 설명",
    "description": "Less 스니펫을 컴파일하고 생성된 CSS를 출력합니다.",
    "highlights": [
      "브라우저 내 컴파일",
      "두 개의 열",
      "출력 복사"
    ]
  },
  "binary": {
    "title": "기본 변환",
    "description": "숫자를 2진수, 8진수, 10진수, 16진수 등으로 변환합니다.",
    "highlights": [
      "2/8/10/16/32/36 베이스",
      "인스턴트 테이블",
      "개발에 유용함"
    ]
  }
};

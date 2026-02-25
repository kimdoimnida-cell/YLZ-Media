# YLZ MEDIA — The New Media Group

## 프로젝트 개요
YLZ MEDIA 공식 웹사이트. 전략 선행형 뉴미디어 그로스 파트너 에이전시 소개 사이트.

## 디자인 시스템
- **테마**: 다크 블랙 베이스 + 미니멀리스트
- **키 컬러**: Ultramarine `#3B4EFF`
- **서브 컬러**: White `#ffffff`
- **폰트**: DM Sans (영문) + Noto Sans KR (한글)

## 구현된 기능
- [x] 커스텀 커서 (울트라마린 포인트 + 팔로워)
- [x] 네비게이션 스크롤 감지 + 모바일 햄버거 메뉴
- [x] Hero 섹션 — 그리드 배경 + Glow 효과 + 마퀴 배너
- [x] 텍스트 Char-by-Char 스플릿 애니메이션 (Hero 타이틀)
- [x] Scroll Reveal 애니메이션 (IntersectionObserver)
- [x] 카운터 애니메이션 (Performance 섹션)
- [x] 포트폴리오 필터 (카테고리별)
- [x] 라이트박스 (키보드 지원)
- [x] Contact Form (Table API 연동)
- [x] 스크롤 탑 버튼
- [x] 반응형 레이아웃 (모바일/태블릿/데스크탑)

## 섹션 구조
| ID | 섹션 | 설명 |
|----|------|------|
| `#hero` | Hero | 메인 타이틀 + CTA + 마퀴 |
| `#about` | About | 브랜드 소개 + 문제 제기 |
| `#solution` | Solution | 3단계 솔루션 |
| `#values` | Values | 핵심 역량 3가지 |
| `#performance` | Performance | 실적 카운터 |
| `#services` | Services | 5가지 서비스 |
| `#portfolio` | Portfolio | 필터 갤러리 + 라이트박스 |
| `#contact` | Contact | 문의 폼 |

## 파일 구조
```
index.html
css/style.css
js/main.js
images/portfolio-1~9.jpg  (별도 업로드 필요)
```

## 다음 개선 권장사항
- [ ] 포트폴리오 실제 이미지 업로드 (`images/` 폴더)
- [ ] YLZ 로고 이미지 적용
- [ ] OG Meta 태그 추가
- [ ] 실제 Contact API 연동

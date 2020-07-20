# PDF2Slides

Generate pdf for specific page using puppeteer

## Getting Started

### How to Use

What things you need to install the software and how to install them

```
yarn start
```

## Acknowledgments

- puppeteer
- etc

## TODO

- mode : 'slow' | "fast"(tobe)

```
 1. fast 모드는 사전에 element 수집 가능. (.stack 엘리먼트 확인)
 2. slides간 보이지 past, future 클래스 제거 및 current 적용
 3. 각 페이지간 이미지 수집

```

- slow모드는 브라우저 한단계씩 스샷 1. url로 스냅샷 확인

tobe : fast모드는 엘리먼트 사전 수집 가능(document.querySelector('.stack')으로 슬라이드 수집(예외처리 적용해야함)), 각 slides간 데이터 수집 및 병렬작업 처리

TODO

- 테스트 코드
-

//pdf margin값 적용
//퍼페티어 속성 사용자 수정

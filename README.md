# Riiid 기술블로그 에디터 구현 예시

[Prosemirror](https://prosemirror.net/)로 간단한 에디터를 만든 예시입니다.

`Paragraph`, `Text`, `Image` 와 `bold`, `italic`, `underline` 서식을 구현했습니다.

- Schema 정의 코드
- `ImageView` 를 사용해서 image View 를 정의하는 코드
- plugin 으로 keymap 과 history 기능을 넣는 코드
- add Image 커맨드를 만든 코드

를 중점적으로 보면 좋을거에요 :)

## 직접 테스트해보기

```sh
yarn
yarn dev
# 브라우저에서 http://localhost:3000 로 접속
```

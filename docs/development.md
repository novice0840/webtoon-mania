# Development

개발과 관련된 문서 정리

## Tanstack-query

모든 API는 `react-query`를 통해 호출한다. SSR 환경에서는 굳이 없어도 되지 않을까 생각했으나 사용한 이유는 크게 2가지

1. `react-query-devtools` 에서 모든 API를 관리할 수 있다. 개인적으로는 해당 툴의 개발 경험이 상당히 좋아 모든 API를 하나의 디버거 툴에서 관리하여 개발 편의성을 높힘

2. 유지보수와 코드의 통일성 측면에 좋다고 판단. 모든 API를 `react-query`에서 호출한다는 규칙만으로 어느 정도 코드의 일관성을 유지할 수 있다고 판단함.

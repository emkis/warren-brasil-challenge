# Warren Brasil Challenge


## Justificativas de decisões técnicas
Abaixo explico um pouco o por que de eu ter adicionado algumas dependências, e como foram resolvidos os problemas que essa aplicação precisava resolver.


### Dependências externas

**debounce** *([link + bundle size](https://bundlephobia.com/result?p=debounce@1.2.0))*

Lib utilitária para criar funções com debounce.

O objetivo de uso dela foi para tratar o caso do filtro das transações. Filtrar uma lista não é uma operação barata, utilizando esse tipo de wrapper function com o debounce, ajuda a evitar problemas de performance.

Escolhi adicionar ela o projeto por já ser muito popular na comunidade, resolver o problema muito bem e pra não precisar reinventar a roda. É uma lib super leve e que só faz uma coisa, mas ainda sim acho que vale a pena.

---

**axios** *([link + bundle size](https://bundlephobia.com/result?p=axios@0.21.0))*

Lib para lidar com métodos HTTP.

Acredito que não precisa de explicações, é basicamente a lib mais famosa do ecossistema JS. Escolhi adicionar ela por facilitar muito a construção de serviços para lidar com API, definições de timeout, cancelamento de requests, enfim.

---

**normalize.css** *([link + bundle size](https://bundlephobia.com/result?p=normalize.css@8.0.1))*

Lib de CSS para normalizar os estilos entre os browsers.

Escolho sempre utilizar essa lib por ela ser muito leve, e de partida já resolver vários problemas de compatibilidade entre browsers que teriam que ser resolvidos manualmente quando encontrados.


### Features

**Pesquisa de transações**

Para resolver esse problema, utilizei a função nativa do javascript chamada `filter`. Decidi utilizar essa função, porque a busca que precisa ser feita é pequena, e essa função já alcança o resultado que preciso sem afetar a performance, até em dispositivos com menor poder de processamento.

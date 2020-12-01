
# Warren Brasil Challenge
Projeto construído para o desafio técnico da Warren Brasil.

<img alt="Capa da aplicação" src="https://github.com/emkis/warren-brasil-challenge/blob/main/.github/github-template.jpg?raw=true" />

## Interface do projeto
Toda UI implementada para esse desafio foi criada por mim utilizando a ferramenta Figma. Para acessar o layout do projeto você pode acessar esse [**link aqui**](https://www.figma.com/file/dirryQFaWAsnolYyRve2s7/Warren-Brasil-Challenge).

A ideia da interface foi criada apenas me baseando nos requisitos, features e wireframe previamente informados desse desafio.

Sei que não era um requisito do desafio, mas eu amo design e interfaces lindas e usuais, então não queria deixar a oportunidade de fazer um app massa.

## Deploy
Foi feito deploy da aplicação utilizando o serviço Netlify.
**Acesse a aplicação online** está acessível por esse [**link aqui**](https://emkis-warren-challenge.netlify.app).

## Métricas do LightHouse (Google)
Auditando a aplicação em produção com o [LightHouse](https://developers.google.com/web/tools/lighthouse), em modo Desktop, os resultados alcançados foram esse:

<img alt="Resultados do LightHouse" src="https://github.com/emkis/warren-brasil-challenge/blob/main/.github/lighthouse-results.png?raw=true" />

## Justificativas de decisões técnicas
Abaixo explico um pouco o porque de eu ter adicionado algumas dependências, e como foram resolvidos os problemas que essa aplicação precisava resolver.

### Dependências externas
Lista de dependências externas utilizadas no projeto, fora as necessárias para build.
Todas as ferramentas listadas tem link para o (Bundlephobia)[https://bundlephobia.com] que é uma ótima ferramenta para descobrir os tamanhos de libs externas, assim como outras sugestões pra lib pesquisada.

**debounce** *([link + bundle size](https://bundlephobia.com/result?p=debounce@1.2.0))*

Lib utilitária para criar funções com debounce.

O objetivo de uso dela foi para tratar o caso do filtro das transações. Filtrar uma lista não é uma operação barata, utilizando esse tipo de wrapper function com o debounce, ajuda a evitar chamadas excessivas que podem gerar problemas de performance dependendo do tamanho da lista filtrada.

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

Para resolver esse problema, utilizei apenas funções nativas do javascript como o `filter`, `reduce` e `map`.
Como a busca que precisava ser feita é pequena e simples, essas funções já alcançam o resultado que preciso sem afetar a performance, até em dispositivos com menor poder de processamento.

Mas igualmente para evitar o custo desnecessário, foi utilizando o recurso de `debouce`, como mencionado na seção de dependências externas.

**Code splitting & Lazy loading**

Foram utilizados essas técnicas para evitar com que o tamanho do bundle da aplicação ficasse "grande" sem necessidade.

Componentes como a "Modal" e o "Detalhe da Transação", que não são renderizadas imediatamente na página, foram separados em arquivos `.js` separados, para ser carregados como módulos *(chunks)* somente quando necessário. O que beneficia a performance da página.

### Scripts

- `start`: Para executar a aplicação em modo de desenvolvimento.
- `build`: Para gerar a build da aplicação.
- `test:unit`: Para executar os testes unitários.
- `test:unit:watch`: Para executar os testes unitários sempre que houverem alterações.
- `test:unit:coverage`: Para gerar o relatório de cobertura de testes.
- `lint`: Executar o linter.
- `report`: Executar a build do projeto e gerar página do Webpack Bundle Analyzer para analisar o bundle do projeto.


### Observações
- Todos components foram criados do zero, sem utilização de nenhuma lib de componentes.

- Atualmente eu considero meu ponto fraco sendo testes, tenho mais experiência com testes unitários com Jest, mas outros tipos de testes, como por exemplo com Cypress é algo que ainda não explorei, mas estou em busca de aprender sobre.


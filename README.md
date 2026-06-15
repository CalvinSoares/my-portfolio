# Portfolio Calvin Soares

Portfolio pessoal desenvolvido para apresentar posicionamento profissional, projetos selecionados e canais de contato com foco em uma leitura mais premium, objetiva e profissional.

## Objetivo

Este projeto deve comunicar com clareza:

- quem e o Calvin
- o tipo de problema que ele resolve
- o nivel tecnico atual
- os projetos que melhor representam esse momento profissional
- como entrar em contato com o menor atrito possivel

O portfolio nao deve parecer apenas uma galeria de cards. A experiencia precisa transmitir:

- direcao
- maturidade
- consistencia visual
- leitura facil
- motion premium sem excesso

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- i18n proprio via `LanguageContext`

## Estrutura Atual

### Home

Objetivo:

- apresentar posicionamento profissional
- mostrar valor rapido
- direcionar para projetos ou contato

Blocos:

- badge com cargo
- hero com headline e descricao
- disponibilidade atual
- metricas principais
- lista de valor agregado
- CTAs principais
- links sociais
- painel lateral de perfil tecnico

### About

Objetivo:

- aprofundar o perfil sem ficar redundante
- mostrar foco tecnico e experiencia principal

Blocos:

- imagem e resumo
- areas de foco
- experiencia em destaque
- skills principais
- CTA para projetos

### Projects

Objetivo:

- mostrar um case principal primeiro
- permitir leitura rapida do restante
- facilitar navegacao por categoria

Blocos:

- introducao da secao
- filtros
- projeto em destaque
- grade dos demais projetos
- CTA final para contato

### Contact

Objetivo:

- reduzir friccao
- oferecer contato direto

Blocos:

- introducao
- email e telefone
- redes sociais
- acoes rapidas
- disponibilidade

## Guia De Conteudo

### O que manter

- textos curtos e claros
- linguagem profissional
- foco em impacto, papel e stack
- descricao orientada a produto e entrega

### O que evitar

- inventar metricas
- inflar escopo de projeto
- repetir a mesma informacao em varias secoes
- transformar tudo em card
- usar jargao tecnico sem contexto

### Padrao de escrita

- titulo forte
- subtitulo explicando valor
- papel no projeto
- impacto ou finalidade
- stack apenas no nivel necessario para reforcar senioridade

## Direcao Visual

### Identidade

O visual deve continuar com uma linha:

- dark
- premium
- tecnica
- futurista com controle

Nao deve virar:

- gaming exagerado
- neon sem hierarquia
- UI barulhenta
- dashboard genérico

### Paleta principal

Base usada hoje:

- fundo principal: `#121212`
- superficie elevada: `#171717`
- superficie secundaria: `#1e1e1e`
- borda: `rgba(255,255,255,0.10)`
- accent principal: `#583ebc`
- accent hover/apoio: `#7c5ce6`
- texto principal: `#ffffff`
- texto secundario: `#d1d5db`
- texto terciario: `#9ca3af`
- sucesso/disponibilidade: `#22c55e`

### Uso de cor

- roxo deve guiar CTA, destaque e detalhes importantes
- branco e cinza devem segurar legibilidade e hierarquia
- verde deve aparecer apenas em disponibilidade e feedback positivo
- gradientes devem ser de apoio, nunca competir com o conteudo

## Guia De Layout

### Espacamento

- priorizar respiro vertical amplo
- usar `max-width` para conter leitura
- evitar muitas caixas pequenas competindo na mesma dobra
- preferir listas, linhas editoriais e secoes com respiro antes de criar novos cards

### Raio e superficie

- secoes principais: `rounded-[2rem]` quando forem blocos de destaque
- cards menores: `rounded-xl` ou `rounded-2xl`
- superficies devem usar blur e transparencia com moderacao

### Hierarquia

Ordem visual ideal:

- badge
- titulo
- subtitulo
- prova/metricas
- CTA
- conteudo complementar

## Guia De Motion

### Principios

- motion deve apoiar leitura
- movimento deve reforcar hierarquia
- hover deve ser sutil
- entrada de secoes deve ser elegante e curta

### Motion recomendado

- `fade + y` para entrada de secoes
- `stagger` leve em listas e grupos
- `scale` pequeno em botoes e CTAs
- `translateY` suave em hover de cards e icones
- parallax apenas em elementos decorativos

### Motion a evitar

- animacao constante em muitos elementos ao mesmo tempo
- duracoes longas demais
- overshoot exagerado
- elementos principais pulsando sem necessidade

### Reduced motion

Sempre respeitar `prefers-reduced-motion`:

- remover animacoes continuas
- reduzir transicoes para quase instantaneas
- evitar parallax e loops decorativos

## Regras De Componentes

### Header

- navegacao simples
- destaque claro da rota ativa
- seletor de idioma visivel

### Hero

- no maximo 1 mensagem principal
- no maximo 3 metricas
- no maximo 3 pontos de valor
- 2 CTAs principais e 1 secundario

### Cards de projeto

- imagem forte
- titulo
- papel
- descricao curta
- 4 stacks visiveis no maximo
- botoes claros de preview, codigo e detalhes

### Skills

- apresentar como repertorio
- evitar grade pesada demais
- preferir pills ou linhas compactas

## Checklist Antes De Alterar O Design

- essa mudanca melhora a leitura?
- essa informacao ja existe em outro lugar?
- isso ajuda a vender o perfil profissional?
- o destaque esta em conteudo ou apenas em efeito?
- a secao continua boa em mobile?
- o motion continua elegante com `prefers-reduced-motion`?

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Direcao Para Proximas Iteracoes

Se novas melhorias forem feitas, seguir esta prioridade:

1. clareza de mensagem
2. hierarquia visual
3. consistencia entre secoes
4. motion refinado
5. detalhe estetico

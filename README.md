# Kompô — Compostagem em casa

Plataforma educativa sobre compostagem doméstica, com foco inicial em Bokashi. Reúne nove lições, três desafios, consulta de resíduos, lista de preparo, vídeos, ajuda contextual, pontos, níveis e conquistas.

**Acessar:** https://kompo-ten.vercel.app/  
**Autor:** Francisco Kazanowski Santos — IFSC, Campus Garopaba.  
**Versão deste pacote:** 4 de novembro de 2026.

## Executar no computador

Requisitos: Node.js 24 e pnpm 11.25.0, conforme `package.json`.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Abra http://localhost:3000. A demonstração funciona sem conta e guarda o progresso neste navegador. Não oferece sincronização automática entre navegadores.

## Configurar sua própria instalação com contas

1. Crie seu projeto Supabase e habilite o provedor Google seguindo a documentação oficial.
2. Em um banco novo, aplique os arquivos de `supabase/migrations/` na ordem dos nomes. Eles contêm esquema, políticas e catálogos, sem registros de participantes. Em uma instalação existente, confira antes quais migrações já foram aplicadas.
3. Copie `.env.example` para `.env.local`. Preencha a URL e a chave **publicável** de seu projeto, além do contato público de sua instalação. O arquivo não acompanha o repositório.
4. Configure o Site URL e os Redirect URLs do Supabase para o endereço da instalação. Configure no Google o callback fornecido pelo Supabase.
5. Confira entrada, saída, persistência e isolamento entre duas contas de teste de sua própria instalação.

Use apenas a configuração pública no cliente. Chaves administrativas, senha do banco e segredo OAuth ficam fora do código e do repositório.

## Compilar e verificar

```bash
pnpm typecheck
pnpm test:db
pnpm build
pnpm start
```

O teste de banco utiliza PGlite e identidades sintéticas. Ele verifica regras locais de persistência; não substitui a conferência da integração real com Google e Supabase.

## Estrutura

- `app/`: entrada, estilos e configuração pública.
- `components/`: navegação, lições, desafios, vídeos, montagem e termos explicativos.
- `hooks/`: sessão, progresso e instalação PWA.
- `lib/`: conteúdos, fontes e regras de aprendizagem.
- `public/`: identidade, ícones e ilustrações.
- `supabase/migrations/`: esquema, políticas e catálogos.
- `tests/`: verificações locais com registros sintéticos.
- `docs/`: fontes, créditos e orientações de continuidade.

## Dados e autenticação

O modo sem conta e o histórico autenticado são separados; o primeiro não é importado automaticamente para a conta. O banco associa o histórico autenticado à identidade de acesso. Questionários, termos de consentimento e respostas da pesquisa não integram este pacote.

## Publicação e PWA

A aplicação usa Next.js e pode ser publicada na Vercel com Node.js 24 e `pnpm build`. As variáveis da instalação devem ser cadastradas no ambiente da hospedagem, não no GitHub. A instalação PWA é opcional; login, sincronização e vídeos precisam de internet. Esta versão não oferece funcionamento offline.

## Fontes, créditos e licença

Consulte `docs/FONTES-E-CREDITOS.md`. Os vídeos são incorporados de seus canais originais e não são distribuídos no pacote. Dependências e materiais de terceiros conservam suas condições de uso.

Este pacote não define uma licença de distribuição para o código. Ao criar o repositório, o autor pode selecionar a licença MIT para autorizar reutilização e modificações com preservação do aviso de autoria. A licença escolhida deve constar em `LICENSE`; a condição `private: true` de `package.json` somente impede publicação acidental no registro npm e não controla a visibilidade no GitHub.

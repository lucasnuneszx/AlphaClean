# AlphaClean

Site da Alpha Clean (estética automotiva) com orçamento e agendamento via WhatsApp, mais um painel administrativo (dashboard, kanban operacional, financeiro, clientes). Agendamentos confirmados no Chatwoot entram no banco por webhook.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS e Framer Motion
- Prisma + PostgreSQL

## Rodando localmente

```bash
npm install          # roda prisma generate no postinstall
npx prisma db push   # cria as tabelas a partir de prisma/schema.prisma
npm run dev
```

Build de produção: `npm run build && npm start`. Lint: `npm run lint`.

## Variáveis de ambiente

- `DATABASE_URL` — conexão PostgreSQL usada pelo Prisma

O número do WhatsApp fica em `lib/whatsapp.ts`.

## Estrutura

- `app/page.tsx` — landing page
- `app/components/ui/` — componentes do site
- `app/admin/` — painel administrativo
- `app/api/webhooks/chatwoot/` — webhook do Chatwoot
- `lib/` — cliente Prisma e helpers
- `prisma/schema.prisma` — modelos do banco

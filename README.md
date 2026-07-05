# Venturo Jeri Offroad

Landing page estatica para a Venturo Jeri Offroad.

## Como abrir

Abra o arquivo `index.html` diretamente no navegador.

## Como publicar

Pode ser publicado como site estatico em Vercel, Netlify, Cloudflare Pages ou qualquer hospedagem que sirva HTML/CSS/JS.

Dominio oficial: `venturojeri.com`.

Configuração comum de DNS:

```txt
A      @    76.76.21.21
CNAME  www  cname.vercel-dns.com
```

Depois de publicar, adicione `venturojeri.com` e `www.venturojeri.com` no painel da hospedagem escolhida.

## WhatsApp

O botao de reserva monta uma mensagem pronta. Quando tiver o telefone oficial, ajuste o link em `script.js` para usar o numero no formato:

```js
https://wa.me/5588999999999?text=${message}
```

## Supabase

O formulario pode salvar cada pedido na tabela `booking_leads` antes de abrir o WhatsApp.

1. No Supabase, abra **SQL Editor**.
2. Execute o arquivo `supabase/schema.sql`.
3. Em **Project Settings > API**, copie:
   - Project URL
   - anon public key
4. Preencha essas constantes em `script.js`:

```js
const supabaseUrl = "https://seu-projeto.supabase.co";
const supabaseAnonKey = "sua-anon-public-key";
```

Com essas duas constantes vazias, o site continua funcionando normalmente e apenas abre o WhatsApp.

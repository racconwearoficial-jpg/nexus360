// Estilo compartilhado das telas de login e registro (mesma paleta do sistema: preto azulado + roxo escuro discreto).
// Aplicado por classes (.nx-*) para permitir :focus/:hover, que estilos inline não suportam.
export const authCss = `
.nx-auth{min-height:100vh;min-height:100dvh;background:#05070D;display:flex;align-items:center;justify-content:center;font-family:Inter,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;position:relative;overflow:hidden;padding:32px 20px;color:#F1F5F9}
.nx-grid{position:fixed;inset:0;pointer-events:none;background-image:linear-gradient(rgba(167,139,250,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.025) 1px,transparent 1px);background-size:60px 60px}
.nx-wrap{position:relative;z-index:1;width:100%;max-width:420px}
.nx-wrap.nx-wide{max-width:480px}
.nx-logo{display:block;text-align:center;margin-bottom:26px;font-weight:800;font-size:26px;letter-spacing:-.5px;color:#F1F5F9;text-decoration:none}
.nx-logo span{display:inline-block;margin-left:5px;padding:1px 10px 3px;border-radius:10px;color:#C9BFEA;background:linear-gradient(180deg,#261650 0%,#0E0919 100%);box-shadow:inset 0 1px 0 rgba(216,204,255,.07),inset 0 0 0 1px rgba(167,139,250,.17)}
.nx-card{position:relative;background:#0B1020;border:1px solid #1E2740;border-radius:20px;padding:36px 32px;box-shadow:0 32px 80px rgba(0,0,0,.55);overflow:hidden}
.nx-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(167,139,250,.4),transparent)}
.nx-card h1{font-size:24px;font-weight:800;letter-spacing:-.6px;margin:0 0 6px;text-align:center;color:#fff}
.nx-sub{margin:0 0 26px;text-align:center;font-size:14px;color:rgba(255,255,255,.5)}
.nx-form{display:flex;flex-direction:column;gap:16px}
.nx-label{display:block;margin-bottom:7px;font-size:11px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:rgba(255,255,255,.55)}
.nx-input{width:100%;box-sizing:border-box;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:13px 15px;color:#fff;font-size:16px;font-family:inherit;outline:none;transition:border-color .15s,box-shadow .15s}
.nx-input::placeholder{color:rgba(255,255,255,.3)}
.nx-input:hover{border-color:rgba(255,255,255,.2)}
.nx-input:focus{border-color:rgba(167,139,250,.65);box-shadow:0 0 0 3px rgba(167,139,250,.16)}
.nx-btn{width:100%;margin-top:4px;padding:14px;border:none;border-radius:12px;font-size:15px;font-weight:700;font-family:inherit;color:#fff;cursor:pointer;background:linear-gradient(180deg,#261650 0%,#0E0919 100%);box-shadow:inset 0 1px 0 rgba(216,204,255,.07),inset 0 0 0 1px rgba(167,139,250,.17),0 1px 2px rgba(0,0,0,.5);transition:background .16s,box-shadow .16s}
.nx-btn:hover:not(:disabled){background:linear-gradient(180deg,#32226E 0%,#160E28 100%);box-shadow:inset 0 1px 0 rgba(216,204,255,.10),inset 0 0 0 1px rgba(167,139,250,.30),0 1px 2px rgba(0,0,0,.6)}
.nx-btn:disabled{opacity:.6;cursor:not-allowed}
.nx-btn:focus-visible,.nx-alt a:focus-visible,.nx-logo:focus-visible{outline:2px solid #A78BFA;outline-offset:2px}
.nx-erro{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.22);border-radius:10px;padding:11px 14px;color:#F87171;font-size:13px}
.nx-alt{margin:22px 0 0;text-align:center;font-size:13px;color:rgba(255,255,255,.45)}
.nx-alt a{color:#B4AAD8;text-decoration:none;font-weight:600}
.nx-alt a:hover{color:#fff}
.nx-feats{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;margin-top:22px;font-size:12px;color:rgba(255,255,255,.4)}
.nx-feats span{display:inline-flex;align-items:center;gap:6px}
.nx-feats span::before{content:'';width:4px;height:4px;border-radius:50%;background:rgba(167,139,250,.6)}
@media (max-width:480px){.nx-card{padding:28px 20px}}
@media (prefers-reduced-motion:reduce){.nx-input,.nx-btn{transition:none}}
`

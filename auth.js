// ============================================================
// auth.js — CONTROLE DE ACESSO DAS TELAS INTERNAS
// Projeto: ShowTime Festival de Vozes (3ª edição)
// ------------------------------------------------------------
// O que faz:
//   1) Lê a sessão salva pelo login (index.html).
//   2) Pergunta ao backend (ação 'validarAcesso') se o papel do
//      usuário pode abrir ESTA página.
//   3) Libera a tela somente se autorizado; caso contrário,
//      redireciona para index.html.
//
// COMO USAR — no <head> de cada tela interna, ANTES dos scripts
// que carregam dados, inclua:
//
//   <script src="config.js"></script>
//   <script src="auth.js"></script>
//
// A página é identificada pelo nome do arquivo, sem extensão:
//   st_fila.html      -> 'st_fila'      (Operacional, Master)
//   apresentacao.html -> 'apresentacao' (Operacional, Master)
//   avaliacao.html    -> 'avaliacao'    (Jurado, Master)
//   dicas.html        -> 'dicas'        (Jurado, Master)
//   quesitos.html     -> 'quesitos'     (Master)
//   jurados.html      -> 'jurados'      (Master)
//   ranking.html      -> 'ranking'      (Master)
//
// As regras por página ficam no BACKEND (ACESSO_PAGINAS, codigo.js).
// Para telas públicas (st_candidatos, resultado) NÃO inclua auth.js.
// ============================================================
(function () {
  'use strict';

  var ACESSO_KEY   = 'st_acesso_v1';   // mesma chave usada no index.html
  var PAGINA_LOGIN = 'index.html';
  var ACAO_AUTH    = 'validarAcesso';
  var TEMPO_LIMITE = 12000;            // ms — tempo máximo de espera da resposta

  // ------------------------------------------------------------
  // SESSÃO (sessionStorage) — compartilhada com o index.html
  // Formato: { token, papel, usuario, expira }
  // ------------------------------------------------------------
  function lerSessao() {
    try {
      var raw = sessionStorage.getItem(ACESSO_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.token || !s.papel) return null;
      if (s.expira && Date.now() > s.expira) {
        sessionStorage.removeItem(ACESSO_KEY);
        return null;
      }
      return s;
    } catch (e) { return null; }
  }

  function salvarSessao(token, papel, usuario, email, ttlMs) {
    var ttl = Number(ttlMs) || (6 * 60 * 60 * 1000);
    var s = {
      token:   token || '',
      papel:   papel || '',
      usuario: usuario || '',
      email:   email || '',
      expira:  Date.now() + ttl
    };
    try { sessionStorage.setItem(ACESSO_KEY, JSON.stringify(s)); } catch (e) {}
    return s;
  }

  function limparSessao() {
    try { sessionStorage.removeItem(ACESSO_KEY); } catch (e) {}
  }

  // ------------------------------------------------------------
  // IDENTIFICA A PÁGINA ATUAL (nome do arquivo sem .html)
  // ------------------------------------------------------------
  function paginaAtual() {
    var nome = (location.pathname.split('/').pop() || '');
    return nome.replace(/\.html?$/i, '').toLowerCase();
  }

  // ------------------------------------------------------------
  // REDIRECIONA PARA O LOGIN
  // ------------------------------------------------------------
  function voltarParaLogin(motivo) {
    if (motivo) {
      try { sessionStorage.setItem('st_acesso_msg', motivo); } catch (e) {}
    }
    location.replace(PAGINA_LOGIN);
  }

  // ------------------------------------------------------------
  // TELA DE BLOQUEIO ENQUANTO VALIDA (esconde o conteúdo)
  // ------------------------------------------------------------
  function mostrarBloqueio(texto) {
    try {
      document.documentElement.classList.add('st-auth-pendente');
      var style = document.createElement('style');
      style.textContent =
        'html.st-auth-pendente body{visibility:hidden !important;}' +
        '#stAuthOverlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;' +
        'flex-direction:column;gap:12px;background:linear-gradient(140deg,#000,#0a2e12,#000);' +
        'color:#e0e0e0;font-family:"Segoe UI",system-ui,sans-serif;font-size:1.05rem;z-index:2147483647;}' +
        '#stAuthOverlay .st-spin{width:34px;height:34px;border:3px solid rgba(255,255,255,.2);' +
        'border-top-color:#009C3B;border-radius:50%;animation:stspin .8s linear infinite;}' +
        '@keyframes stspin{to{transform:rotate(360deg);}}';
      (document.head || document.documentElement).appendChild(style);
      var ov = document.createElement('div');
      ov.id = 'stAuthOverlay';
      ov.innerHTML = '<div class="st-spin"></div><div>' + (texto || 'Verificando acesso…') + '</div>';
      (document.body || document.documentElement).appendChild(ov);
    } catch (e) {}
  }

  function mostrarNegado(texto) {
    try {
      var ov = document.getElementById('stAuthOverlay');
      if (!ov) { mostrarBloqueio(texto); ov = document.getElementById('stAuthOverlay'); }
      if (ov) {
        ov.innerHTML =
          '<div style="font-size:2rem;">🔒</div>' +
          '<div>' + (texto || 'Acesso não autorizado.') + '</div>' +
          '<div style="font-size:.85rem;color:#999;">Redirecionando para o início…</div>';
      }
    } catch (e) {}
  }

  function liberarTela(sessao) {
    try {
      document.documentElement.classList.remove('st-auth-pendente');
      var ov = document.getElementById('stAuthOverlay');
      if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    } catch (e) {}
    // Disponibiliza a sessão para os scripts da própria página
    window.ST_SESSAO = sessao || null;
    try {
      window.dispatchEvent(new CustomEvent('st-auth-ok', { detail: sessao || null }));
    } catch (e) {}
  }

  // ------------------------------------------------------------
  // VALIDAÇÃO NO BACKEND
  // ------------------------------------------------------------
  function validar(pagina, token) {
    return new Promise(function (resolve) {
      var url = (typeof WEB_APP_URL !== 'undefined' && WEB_APP_URL) ? WEB_APP_URL : '';
      if (!url) { resolve({ ok: false, erro: 'config_ausente' }); return; }

      var controle = null;
      var finalizado = false;
      function finalizar(r) {
        if (!finalizado) {
          finalizado = true;
          if (controle) clearTimeout(controle);
          resolve(r);
        }
      }

      try {
        controle = setTimeout(function () { finalizar({ ok: false, erro: 'timeout' }); }, TEMPO_LIMITE);
      } catch (e) {}

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ acao: ACAO_AUTH, token: token, pagina: pagina })
      })
        .then(function (res) { return res.json(); })
        .then(function (j) { finalizar(j || { ok: false, erro: 'resposta_invalida' }); })
        .catch(function () { finalizar({ ok: false, erro: 'conexao' }); });
    });
  }

  // ------------------------------------------------------------
  // FLUXO PRINCIPAL
  // ------------------------------------------------------------
  function iniciar() {
    var pagina = paginaAtual();
    mostrarBloqueio('Verificando acesso…');

    var sessao = lerSessao();
    if (!sessao || !sessao.token) {
      voltarParaLogin('Faça login para acessar esta área.');
      return;
    }

    validar(pagina, sessao.token).then(function (j) {
      if (j && j.ok) {
        liberarTela(sessao);
        return;
      }
      // Sessão expirada → limpa antes de voltar
      if (j && j.erro && String(j.erro).indexOf('Sessão') !== -1) {
        limparSessao();
      }
      mostrarNegado('Acesso não autorizado a esta área.');
      setTimeout(function () { voltarParaLogin('Acesso não autorizado.'); }, 1500);
    });
  }

  // Utilitários compartilhados (podem ser usados pelo index.html)
  window.STAuth = {
    lerSessao:    lerSessao,
    salvarSessao: salvarSessao,
    limparSessao: limparSessao,
    sair: function () { limparSessao(); location.replace(PAGINA_LOGIN); },
    chave: ACESSO_KEY
  };

  // Roda imediatamente (auth.js fica no <head>)
  iniciar();
})();

// ============================================================
// CONFIGURAÇÃO CENTRAL DO SHOWTIME 
// Defina a URL do Web App UMA ÚNICA VEZ aqui.
// Todas as páginas leem esta variável via <script src="config.js">
// ============================================================
// config.js — ShowTime Festival de Vozes
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzmL1IU10IKyyjd6H48iRATaLmLWfOKnnjXFuQ70VAOn4l6zmlI5KHhenraDT24LCLzRg/exec';
window.WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzmL1IU10IKyyjd6H48iRATaLmLWfOKnnjXFuQ70VAOn4l6zmlI5KHhenraDT24LCLzRg/exec';

// Opcional: áudio de tambores (local ou remoto)
// const DRUM_URL = 'https://seusite.com/audio/drumroll.mp3';
const DRUM_URL = 'https://raw.githubusercontent.com/PUBVILLAVELHA-OSS/STF_Vozes/main/Suspense.mp3';

const DRUM_DURACAO = 7; // ← substitua pela duração exata do seu suspense.mp3

// Caminho do logotipo oficial
// Opção 1: arquivo local na mesma pasta
const LOGO_URL = 'https://raw.githubusercontent.com/PUBVILLAVELHA-OSS/STF_Vozes/main/LG_STFV.png';
// Opção 2: link direto do GitHub (descomente e use o seu)
// const LOGO_URL = 'https://raw.githubusercontent.com/SEU_USUARIO/SEU_REPO/main/LG_STFV.png';
// OU lista de imagens (sorteia uma a cada carregamento)
const IMAGENS_LATERAIS = [
  'https://drive.google.com/thumbnail?id=1CmcEvxRKctqdcv3jDwcLQ5-vBRTk-rQK&sz=w400', // _Emporio do Queijo
    'https://drive.google.com/thumbnail?id=1OtJl1MQkGJzhPT87PHUhagKpTBAKJFkf&sz=w400', // _Seven Mobby
    'https://drive.google.com/thumbnail?id=1jdXhblQD1eFj-7Op99sOzHqE8g2mhW17&sz=w400', // _Peixinho Felix
    'https://drive.google.com/thumbnail?id=1MGMYNDiwzQqhe1RcsuW-xth4vNFwJsNC&sz=w400', // _Motinha 
    'https://drive.google.com/thumbnail?id=1hoWLJYKlShex5S3punCac2k84ekKt6aP&sz=w400', // _Beholdme
    'https://drive.google.com/thumbnail?id=1izgtJXcmwEPFxSezcn_m_Q0ts_clvSMC&sz=w400', // _Imobiliaria Lencois
    'https://drive.google.com/thumbnail?id=1IxQVIxm3XbHCXg32qpRQHHPopKjzjGyI&sz=w400', // _Descomplicanto
    'https://drive.google.com/thumbnail?id=1OtJl1MQkGJzhPT87PHUhagKpTBAKJFkf&sz=w400', // _Seven Mobby
    'https://drive.google.com/thumbnail?id=1p0kZx2YWnNiPYfIe7bN33rwP15alB2ve&sz=w400', // _Bolsa de Mulher
    'https://drive.google.com/thumbnail?id=1YGmWPgHbCrgteyBgd8ZgZMQI8gTJ_ufl&sz=w400', // _Case Store
    'https://drive.google.com/thumbnail?id=1YgQQ5e-te6rJK_dNvLVF9M0QpeUHnFsf&sz=w400', // _Ideali
    'https://drive.google.com/thumbnail?id=1CmcEvxRKctqdcv3jDwcLQ5-vBRTk-rQK&sz=w400', // _Emporio do Queijo
    'https://drive.google.com/thumbnail?id=1hojFbNqhoZsZ80MvYxPUu5RYPSwsbjXv&sz=w400', // _PC SHOW
    'https://drive.google.com/thumbnail?id=1axPA2samXNo532kHJ30M38A8yI05538x&sz=w400', // _Pet Shop
    'https://drive.google.com/thumbnail?id=1F2h3Oo12Ab2K9OLkKQH2uFKFe_7NzqUA&sz=w400', // _Estetic Car Purgano
    'https://drive.google.com/thumbnail?id=1UbZvEzyirFKFpt_lniw-w4PZaiYWTbmi&sz=w400', // _Sellum
    'https://drive.google.com/thumbnail?id=1_B3TnZV6OD8-c9OwLjZZX8UdUOgBSNF2&sz=w400', // _Tempo Livre
    'https://drive.google.com/thumbnail?id=1HZ9QqIWOlCiVQOF7TlpbQpnRXTXIp9_8&sz=w400', // _Velozo
    'https://drive.google.com/thumbnail?id=1MYHduZsvPeFLUxipCrC6G6oBa0JY08TR&sz=w400', // _VVP
    'https://drive.google.com/thumbnail?id=1dQVVbok48bJPKNssOy3D_2hImOsPnLXv&sz=w400', // _GABRIEL
    'https://drive.google.com/thumbnail?id=1vAGQfHfEukyS-ssMftwOnLdTv6q-FAbl&sz=w400' // MARTINS
];

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
    'https://drive.google.com/thumbnail?id=1CmcEvxRKctqdcv3jDwcLQ5-vBRTk-rQK&sz=w400', // Emporio do Queijo
    'https://drive.google.com/thumbnail?id=1MNdjkYFzmHPwnsJkM9XYQWYqReYdulVt&sz=w400', // Seven Mobby
    'https://drive.google.com/thumbnail?id=1D3qVaKSK-QN_CwIbgaZf1nRo6lxPTnNk&sz=w400', // Peixinho Felix
    'https://drive.google.com/thumbnail?id=1MGMYNDiwzQqhe1RcsuW-xth4vNFwJsNC&sz=w400', // Motinha 
    'https://drive.google.com/thumbnail?id=1nPaoZZs29SuiWBHJumPcK2WPr5n6eTg3&sz=w400', //Beholdme
    'https://drive.google.com/thumbnail?id=11Q6d45tJ7kzFz1h6DUjAQ6wkRmxmWuC1&sz=w400', //Imobiliaria Lencois
    'https://drive.google.com/thumbnail?id=11OqzpZ5NhvgmdyD2-7tCYhqc3zr6ZY_-&sz=w400', // Descomplicanto
    'https://drive.google.com/thumbnail?id=1MNdjkYFzmHPwnsJkM9XYQWYqReYdulVt&sz=w400'  // Seven Mobby
];
